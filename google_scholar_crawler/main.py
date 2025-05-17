from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os

author: dict = scholarly.search_author_id(os.environ['GOOGLE_SCHOLAR_ID'])
scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
name = author['name']
author['updated'] = str(datetime.now())

# Create a separate dictionary for individual paper citations
paper_citations = {}
for pub in author['publications']:
    paper_citations[pub['author_pub_id']] = {
        'title': pub.get('bib', {}).get('title', ''),
        'citations': pub.get('num_citations', 0),
        'year': pub.get('bib', {}).get('pub_year', '')
    }

# Save individual paper citations to a separate file
with open(f'results/paper_citations.json', 'w') as outfile:
    json.dump(paper_citations, outfile, ensure_ascii=False)

# Continue with the original code
author['publications'] = {v['author_pub_id']:v for v in author['publications']}
print(json.dumps(author, indent=2))
os.makedirs('results', exist_ok=True)
with open(f'results/gs_data.json', 'w') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
  "schemaVersion": 1,
  "label": "citations",
  "message": f"{author['citedby']}",
}
with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)

print(f"Saved citation data for {len(paper_citations)} papers")
