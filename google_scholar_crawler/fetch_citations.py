#!/usr/bin/env python3
"""
Fetch citation counts from a Google Scholar profile.

Why not `scholarly`:
  scholarly drives a real browser session through rotating proxies (FreeProxies).
  Those proxies die constantly, so the job fails intermittently and the failure
  mode is silent -- the old data just stays put and the page quietly rots.

Why not OpenAlex / Crossref / Semantic Scholar:
  Their per-paper counts disagree with Scholar (verified 2026-10: OpenAlex says
  16 where Scholar says 43; 55 where Scholar says 22), and Crossref's fuzzy
  title match resolves to entirely unrelated papers. This site links to Scholar,
  so a number that contradicts Scholar is worse than no number.

So: one plain HTTPS GET of the public profile page, parsed with a regex.
No browser, no proxy, no credentials. If Google ever serves a captcha the
script exits non-zero and leaves the previous data untouched.

Two modes, because the two halves of citations.json age at different rates
and cost wildly different amounts to refresh:

  python fetch_citations.py                # citations + stars
  python fetch_citations.py --stars-only   # stars only, leaves Scholar alone

The Scholar scrape is the fragile half -- run it on a short interval and the
IP gets captcha'd, after which citation counts stop updating entirely. Star
counts come from the GitHub REST API, which is cheap and rate-limit-generous
(1000 requests/hour with the Actions token), so those can be refreshed often.
"""

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

PROFILE = "https://scholar.google.com/citations?user={uid}&hl=en&cstart=0&pagesize=100"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)
RETRIES = 4
BACKOFF = 20  # seconds, multiplied by attempt number

# Routing the Scholar request through something other than this machine's own
# IP. Google serves plain HTTP 403 -- not a captcha -- to GitHub Actions' shared
# egress addresses, and no amount of waiting clears it: the block is on the
# address range, and sleeping does not move the runner to a new one. So the
# request needs a different exit, and there are two shapes of those:
#
#   * A standard HTTP/HTTPS proxy. Nothing to do here -- urllib reads
#     HTTPS_PROXY from the environment by itself. Set that and this file does
#     not change.
#
#   * SerpApi, which does not return the page at all -- it returns Scholar's
#     content already parsed into JSON. That needs its own reader rather than
#     the HTML regexes below, so it is a separate path: see serpapi_fetch().
#     Set SERPAPI_KEY to turn it on. This is the one in use.
#
#   * A scraping service with a REST endpoint, which wants the target URL as a
#     query parameter and returns the fetched page as the response body. Every
#     vendor spells this differently, so rather than hardcode one, SCRAPER_URL
#     is a template with a {url} placeholder for the percent-encoded target:
#
#       SCRAPER_URL='https://api.scraperapi.com/?api_key=KEY&url={url}'
#       SCRAPER_URL='https://api.scrapingbee.com/api/v1/?api_key=KEY&url={url}'
#
#     Put the key in the template and keep the whole thing in a secret; it is
#     a credential either way. The response must be the target page's own HTML
#     -- a service that wraps it in JSON needs a parser, which this does not
#     have, and parse() would find 0 publications and refuse to write.
#
# Both are optional. With neither set this behaves exactly as before, which is
# what a local run wants: a home IP is not blocked and needs no middleman.
SCRAPER_URL = os.environ.get("SCRAPER_URL", "").strip()


def via_scraper(url):
    """Wrap `url` in SCRAPER_URL's {url} placeholder, percent-encoded."""
    return SCRAPER_URL.replace("{url}", urllib.parse.quote(url, safe=""))


def fetch(url, attempt=1):
    if SCRAPER_URL:
        url = via_scraper(url)
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
        },
    )
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def fetch_with_retry(url):
    """Retry only what retrying can fix.

    Two failures look similar in a log and need opposite handling. A captcha,
    a 429 or a dropped connection is about this moment: the same address will
    very likely work shortly, so back off and ask again. A 403 is about *who
    is asking* -- Google blocks the caller's address range outright -- and no
    number of retries from the same address changes that answer. The retry
    budget was being spent on exactly the case it cannot help: on the Actions
    runners this slept 20+40+60s per attempt, then the workflow slept 5, 10
    and 20 minutes between whole attempts, to arrive at the same 403 and hold
    a runner for half an hour. So 403 now gives up at once, and says what to
    do about it instead.
    """
    last = None
    for i in range(1, RETRIES + 1):
        try:
            html = fetch(url, i)
            if looks_blocked(html):
                last = "Google served a captcha / consent page"
                print(f"  attempt {i}: {last}", file=sys.stderr)
            else:
                return html
        except urllib.error.HTTPError as e:
            last = f"HTTP {e.code}"
            print(f"  attempt {i}: {last}", file=sys.stderr)
            if e.code == 403:
                raise SystemExit(
                    "ERROR: HTTP 403 from Google -- this IP is blocked, not "
                    "rate-limited, so retrying from here cannot help.\n"
                    "       Route the request elsewhere: set HTTPS_PROXY, or "
                    "set SCRAPER_URL to a scraping endpoint template\n"
                    "       (see the note at the top of this file). Running "
                    "the script from a home machine also works."
                ) from e
        except Exception as e:  # noqa: BLE001 - network layer, report and retry
            last = f"{type(e).__name__}: {e}"
            print(f"  attempt {i}: {last}", file=sys.stderr)
        if i < RETRIES:
            time.sleep(BACKOFF * i)
    raise SystemExit(f"ERROR: could not fetch Scholar profile ({last})")


def looks_blocked(html):
    low = html.lower()
    return ("not a robot" in low
            or "gs_captcha" in low
            or "unusual traffic" in low
            or "enablejs" in low)


def clean(s):
    """Strip Scholar's markup and normalise its whitespace.

    Scholar wraps titles in <a> with nested <span>/<b> tags. The \xa0 replace
    is not redundant with the &nbsp; one: the entity arrives spelled out in
    some fields and already decoded to U+00A0 in others, and leaving the two
    forms to coexist meant the HTML path and the SerpApi path wrote venues
    that differed by one invisible character on the same paper.
    """
    s = re.sub(r"<[^>]+>", "", s)
    return (s.replace("&amp;", "&").replace("&#39;", "'")
             .replace("&quot;", '"').replace("&nbsp;", " ")
             .replace("\xa0", " ")
             .replace("&lt;", "<").replace("&gt;", ">")).strip()


# How the profile owner appears in Scholar's author lines. Scholar marks equal
# contribution with a trailing '*', so "H Wang*" anywhere means co-first.
ME = os.environ.get("SCHOLAR_ME", "H Wang")

# Venue line -> kind. Preprint first (an arXiv line can mention a conference),
# and "Proceedings of the IEEE" / PNAS are journals despite the word.
PREPRINT = re.compile(r"arxiv|biorxiv|medrxiv|preprint", re.I)
NOT_CONF = re.compile(r"Proceedings of the (?:IEEE|National Academy)", re.I)
CONF = re.compile(
    r"conference|proceedings|symposium|workshop"
    r"|\b(?:AAAI|CVPR|ICCV|ECCV|MICCAI|NeurIPS|ICLR|ICML|IJCAI|ACL|EMNLP|KDD|WACV|BMVC)\b",
    re.I,
)


def kind_of(venue):
    if not venue:
        return None          # Scholar has no venue for it: counted, not classified
    if PREPRINT.search(venue):
        return "preprint"
    if CONF.search(venue) and not NOT_CONF.search(venue):
        return "conference"
    return "journal"


def is_lead(authors):
    """First author, or any co-first ('*'). Scholar truncates long author lists
    with '...', so a co-first mark past the cut-off would be missed -- in
    practice equal-contribution authors sit at the front of the list."""
    names = [n.strip() for n in authors.split(",")]
    return bool(names) and (names[0].rstrip("*") == ME or f"{ME}*" in names)


SERPAPI_KEY = os.environ.get("SERPAPI_KEY", "").strip()
SERPAPI = "https://serpapi.com/search.json"
# Scholar's own page size, and comfortably above the ~22 records on this
# profile, so one request returns everything and there is no pagination to
# walk. Each request costs one search from the monthly allowance, so a second
# page would double the cost of every run.
SERPAPI_NUM = 100


def serpapi_quota():
    """Searches left this month, or None if the check itself fails.

    account.json does not count against the allowance (verified: usage stayed
    put across a call), so this is free to log on every run. Worth logging:
    the free plan's 250/month is ample for one daily read, but a loop or an
    accidental second schedule would burn it quietly, and the search endpoint
    gives no hint of the balance -- a 429 is the first sign, by which point
    the counts have already stopped updating.
    """
    try:
        q = urllib.parse.urlencode({"api_key": SERPAPI_KEY})
        with urllib.request.urlopen(f"https://serpapi.com/account.json?{q}", timeout=30) as r:
            acct = json.load(r)
    except Exception as e:  # noqa: BLE001 - advisory only, never fail the run
        print(f"  (could not read SerpApi quota: {type(e).__name__})", file=sys.stderr)
        return None
    left = acct.get("total_searches_left")
    total = acct.get("searches_per_month")
    used = acct.get("this_month_usage")
    print(f"serpapi quota   : {left} of {total} left this month "
          f"(used {used}, renews {acct.get('plan_renewal_date', '?')})")
    # One a day plus room for retries; below this something is eating searches.
    if isinstance(left, int) and left < 40:
        print(f"::warning::Only {left} SerpApi searches left this month.")
    return left


def serpapi_fetch(uid):
    """Read the profile through SerpApi, returning what parse() returns.

    SerpApi does not proxy the page, it returns Scholar's content already
    parsed as JSON, so none of the HTML regexes apply. The shapes worth
    naming, because they are easy to guess wrong (verified against a live
    response on 2026-11-24):

      cited_by.table is a *list* of one-key dicts, not a dict:
          [{'citations': {'all': 2714, 'since_2021': 2712}},
           {'h_index': ...}, {'i10_index': ...}]
      articles[].cited_by is a dict with the count under 'value', and the key
      is absent entirely for an uncited paper rather than being 0.
      articles[].year is a string.

    Everything else is deliberately shared with the HTML path: the same
    citation_id keys, the same kind_of() and is_lead() on the same venue and
    author strings. The two paths therefore produce byte-identical output,
    which is what makes it safe to switch between them.
    """
    q = urllib.parse.urlencode({
        "engine": "google_scholar_author",
        "author_id": uid,
        "api_key": SERPAPI_KEY,
        "hl": "en",
        "num": str(SERPAPI_NUM),
    })
    req = urllib.request.Request(
        f"{SERPAPI}?{q}",
        headers={"User-Agent": "citation-fetcher", "Accept": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            data = json.load(r)
    except urllib.error.HTTPError as e:
        body = e.read(400).decode("utf-8", "replace")
        # 401 is a bad key, 429 is the monthly allowance spent. Both are
        # standing conditions: say so rather than retrying into them.
        raise SystemExit(
            f"ERROR: SerpApi returned HTTP {e.code}.\n"
            f"       {body.strip()[:300]}\n"
            "       401/403 = bad or missing SERPAPI_KEY; 429 = monthly "
            "search allowance exhausted."
        ) from e

    if data.get("error"):
        raise SystemExit(f"ERROR: SerpApi reported: {data['error']}")

    total = None
    for row in data.get("cited_by", {}).get("table", []):
        if "citations" in row:
            total = row["citations"].get("all")
            break

    pubs = {}
    for a in data.get("articles", []):
        cid = a.get("citation_id")
        if not cid:
            continue
        venue = clean(a.get("publication", "") or "")
        year = a.get("year")
        pubs[cid] = {
            "title": clean(a.get("title", "")),
            "cites": (a.get("cited_by") or {}).get("value") or 0,
            "year": int(year) if str(year).isdigit() else None,
            "venue": venue,
            "kind": kind_of(venue),
            "lead": is_lead(a.get("authors", "") or ""),
        }

    if not pubs:
        raise SystemExit(
            "ERROR: SerpApi returned 0 articles. Refusing to write an empty "
            "file over good data.\n"
            "       Either the response shape changed or the author_id is "
            f"wrong (used {uid!r})."
        )
    return total, pubs


def parse(html):
    """Return (total_citations, {citation_for_view_id: {title, cites, year,
    venue, kind, lead}})."""
    total = None
    m = re.search(r'gsc_rsb_std[^>]*>\s*(\d+)\s*<', html)
    if m:
        total = int(m.group(1))

    pubs = {}
    # One <tr class="gsc_a_tr"> per paper: a title anchor carrying
    # citation_for_view=<ID>, two gs_gray lines (authors, then venue), the
    # citation count cell and the year cell.
    for row in re.findall(r'<tr class="gsc_a_tr">(.*?)</tr>', html, re.S):
        a = re.search(r'citation_for_view=([\w:.-]+)"[^>]*>(.*?)</a>', row, re.S)
        if not a:
            continue
        c = re.search(r'gsc_a_ac[^>]*>(\d*)<', row)
        yr = re.search(r'gsc_a_h[^>]*>\s*(\d{4})', row)
        gray = [clean(g) for g in re.findall(r'<div class="gs_gray">(.*?)</div>', row, re.S)]
        authors = gray[0] if gray else ""
        venue = gray[1] if len(gray) > 1 else ""
        pubs[a.group(1)] = {
            "title": clean(a.group(2)),
            "cites": int(c.group(1) or 0) if c else 0,
            "year": int(yr.group(1)) if yr else None,
            "venue": venue,
            "kind": kind_of(venue),
            "lead": is_lead(authors),
        }
    return total, pubs


def summarize(pubs):
    """Whole-record counts for the homepage. The page itself only lists
    selected papers, so these must come from the full profile."""
    kinds = [p["kind"] for p in pubs.values()]
    return {
        "papers": len(pubs),
        "lead": sum(p["lead"] for p in pubs.values()),
        "conference": kinds.count("conference"),
        "journal": kinds.count("journal"),
        "preprint": kinds.count("preprint"),
    }


HOME_JS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "js", "home.js")


def repos_from_home_js():
    """The publication list in assets/js/home.js is the single source of truth,
    so read the GitHub repos straight out of its Code links.

    The repo-name character class has to include '-' as well as word chars and
    dots: without it a name like `SD-Messenger` never matches, the repo silently
    drops out of the star map, and its badge just goes missing on the page.
    """
    src = open(HOME_JS, encoding="utf-8").read()
    found = re.findall(r"https://github\.com/([\w.-]+)/([\w.-]+?)(?:\.git)?['\"/#?]", src)
    return sorted({f"{owner}/{name}" for owner, name in found})


def fetch_stars(repos):
    """Star counts via the GitHub REST API. GITHUB_TOKEN (set automatically in
    Actions) lifts the limit from 60 to 1000 requests/hour. Repos that 404 --
    linked from a paper but not public yet -- are simply left out."""
    token = os.environ.get("GITHUB_TOKEN")
    stars = {}
    for repo in repos:
        req = urllib.request.Request(
            f"https://api.github.com/repos/{repo}",
            headers={"Accept": "application/vnd.github+json", "User-Agent": "citation-fetcher"},
        )
        if token:
            req.add_header("Authorization", f"Bearer {token}")
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                stars[repo] = json.load(r)["stargazers_count"]
        except urllib.error.HTTPError as e:
            if e.code != 404:
                raise SystemExit(f"ERROR: GitHub API {e.code} for {repo}")
            print(f"  skip {repo}: 404 (not public)", file=sys.stderr)
    return stars


def main():
    stars_only = "--stars-only" in sys.argv[1:]
    uid = os.environ.get("GOOGLE_SCHOLAR_ID", "KDNRnW0AAAAJ")
    dest = os.environ.get("OUT", "results/citations.json")

    stars = fetch_stars(repos_from_home_js())

    if stars_only:
        # Refresh only the star half, leaving the Scholar fields byte-identical
        # so the committing job's `git diff` stays quiet when no count moved.
        try:
            with open(dest, encoding="utf-8") as f:
                out = json.load(f)
        except (OSError, ValueError) as e:
            raise SystemExit(f"ERROR: cannot read {dest} for --stars-only ({e})")
        if out.get("stars") == stars:
            print("stars unchanged; nothing to do")
            return
        out["stars"] = stars
        # `updated` tracks the Scholar scrape, so it is deliberately not touched
        # here -- bumping it nightly would claim the citations were re-read.
    else:
        # SerpApi when a key is set, a direct scrape otherwise. No fallback
        # between them on purpose: a run that quietly fell back to scraping
        # would 403 on CI and look like a SerpApi problem, and one that fell
        # the other way would spend searches without being asked to. Each
        # path fails with its own diagnosis instead.
        if SERPAPI_KEY:
            total, pubs = serpapi_fetch(uid)
            serpapi_quota()      # after the fetch, so the number reflects it
        else:
            html = fetch_with_retry(PROFILE.format(uid=uid))
            total, pubs = parse(html)

        if not pubs:
            raise SystemExit(
                "ERROR: parsed 0 publications. Scholar probably changed its markup "
                "-- refusing to write an empty file over good data."
            )

        out = {
            "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "source": "serpapi.com/google_scholar_author" if SERPAPI_KEY else "scholar.google.com",
            "profile": f"https://scholar.google.com/citations?user={uid}",
            "citedby": total,
            "publications": pubs,
            "summary": summarize(pubs),
            "stars": stars,
        }

    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    with open(dest, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False, sort_keys=True)

    if stars_only:
        print(f"repos w/ stars  : {len(stars)}")
    else:
        print(f"total citations : {out['citedby']}")
        print(f"publications    : {len(out['publications'])}")
        print(f"summary         : {out['summary']}")
        print(f"repos w/ stars  : {len(stars)}")
        print(f"updated         : {out['updated']}")
    print(f"wrote           : {dest}")


if __name__ == "__main__":
    main()
