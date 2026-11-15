#!/usr/bin/env python3
"""Fail if citations.json's Scholar half has gone stale.

How the counts silently rotted for a month: the only signal that they had
stopped moving was the *absence* of a commit, and the star job commits several
times a day, so the file's git history looked healthy throughout. Worse, the
monthly citations job had never once succeeded, and nothing said so.

`updated` is written only by a full scrape (--stars-only deliberately leaves it
alone), so its distance from today is a direct measure of when Scholar was last
read. Comparing the two turns a missing commit into something a run reports.

Run from anywhere; the path is resolved relative to this file, not the cwd.
Exits 1 when the data is older than MAX_AGE_DAYS.
"""

import json
import sys
from datetime import date, datetime
from pathlib import Path

# The scrape runs weekly, so one unlucky captcha costs 7 days and is not worth
# shouting about. Past two missed runs it is a standing failure, not bad luck.
MAX_AGE_DAYS = 16

JSON_PATH = Path(__file__).resolve().parent.parent / "google-scholar-stats" / "citations.json"


def main():
    try:
        data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        print(f"::error::cannot read {JSON_PATH}: {e}")
        return 1

    stamp = data.get("updated")
    if not stamp:
        print(f"::error::{JSON_PATH.name} has no 'updated' field")
        return 1

    try:
        updated = datetime.strptime(stamp, "%Y-%m-%d").date()
    except ValueError:
        print(f"::error::cannot parse 'updated' value {stamp!r} as YYYY-MM-DD")
        return 1

    age = (date.today() - updated).days
    print(f"citations.json 'updated' = {stamp} ({age} days old)")

    if age > MAX_AGE_DAYS:
        print(
            f"::error::Citation counts are {age} days old (limit {MAX_AGE_DAYS}). "
            "The weekly Scholar scrape has been failing -- check this "
            "workflow's recent runs, and whether Scholar changed its markup."
        )
        return 1

    # A clock skew or a hand-edited file would otherwise pass unnoticed.
    if age < 0:
        print(f"::warning::'updated' is {-age} days in the future")

    return 0


if __name__ == "__main__":
    sys.exit(main())
