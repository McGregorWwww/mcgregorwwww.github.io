from scholarly import scholarly
import jsonpickle
import json
from datetime import datetime
import os
import time
import sys

# Set a timeout for scholarly operations
scholarly.set_timeout(10)

# Configure scholarly to use a proxy if needed
# scholarly.use_proxy()

print("Starting Google Scholar citation crawler...")
start_time = time.time()

try:
    # Only fetch specific sections to speed up the process
    print("Searching for author...")
    author_id = os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ')
    author = scholarly.search_author_id(author_id)
    
    print(f"Found author: {author.get('name', 'Unknown')}")
    print("Fetching basic author information...")
    
    # Only fetch the necessary sections
    scholarly.fill(author, sections=['basics', 'counts'])
    name = author.get('name', 'Unknown')
    author['updated'] = str(datetime.now())
    
    # Create a separate dictionary for individual paper citations
    paper_citations = {}
    
    # Get only the most important papers to speed up the process
    print("Fetching publication data...")
    
    # Option 1: Fetch all publications (slower but complete)
    # scholarly.fill(author, sections=['publications'])
    # publications = author.get('publications', [])
    
    # Option 2: Fetch only the most cited papers (faster)
    # Get the publication IDs from your about.md file
    important_pub_ids = [
        'KDNRnW0AAAAJ:2osOgNQ5qMEC',  # UCTransNet
        'KDNRnW0AAAAJ:Tyk-4Ss8FVUC',  # DHC
        'KDNRnW0AAAAJ:u-x6o8ySG0sC',  # Other papers
        'KDNRnW0AAAAJ:d1gkVwhDpl0C',
        'KDNRnW0AAAAJ:u5HHmVD_uO8C'
    ]
    
    # Get the first few publications
    scholarly.fill(author, sections=['publications'])
    publications = author.get('publications', [])
    
    # Process publications with timeout protection
    print(f"Processing {len(publications)} publications...")
    for i, pub in enumerate(publications):
        try:
            pub_id = pub.get('author_pub_id', '')
            if pub_id in important_pub_ids or i < 10:  # Process important ones + first 10
                paper_citations[pub_id] = {
                    'title': pub.get('bib', {}).get('title', ''),
                    'citations': pub.get('num_citations', 0),
                    'year': pub.get('bib', {}).get('pub_year', '')
                }
                print(f"  - Processed: {pub.get('bib', {}).get('title', '')[:40]}... ({pub.get('num_citations', 0)} citations)")
        except Exception as e:
            print(f"Error processing publication {i}: {str(e)}")
    
    # Ensure results directory exists
    os.makedirs('results', exist_ok=True)
    
    # Save individual paper citations to a separate file
    print("Saving citation data...")
    with open(f'results/paper_citations.json', 'w') as outfile:
        json.dump(paper_citations, outfile, ensure_ascii=False, indent=2)
    
    # Save minimal author data
    author_data = {
        'name': name,
        'citedby': author.get('citedby', 0),
        'h_index': author.get('hindex', 0),
        'i10_index': author.get('i10index', 0),
        'updated': author['updated']
    }
    
    with open(f'results/gs_data.json', 'w') as outfile:
        json.dump(author_data, outfile, ensure_ascii=False, indent=2)
    
    # Create shield.io data
    shieldio_data = {
      "schemaVersion": 1,
      "label": "citations",
      "message": f"{author.get('citedby', 0)}",
    }
    with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)
    
    elapsed_time = time.time() - start_time
    print(f"Completed successfully in {elapsed_time:.2f} seconds")
    print(f"Saved citation data for {len(paper_citations)} papers")
    
except Exception as e:
    print(f"Error: {str(e)}")
    # If there's an error, create a minimal paper_citations.json with the hardcoded values
    # This ensures the website still works even if Google Scholar fails
    fallback_citations = {
        'KDNRnW0AAAAJ:2osOgNQ5qMEC': { 'title': 'UCTransNet', 'citations': 80, 'year': '2022' },
        'KDNRnW0AAAAJ:Tyk-4Ss8FVUC': { 'title': 'DHC', 'citations': 10, 'year': '2023' },
        'KDNRnW0AAAAJ:u-x6o8ySG0sC': { 'title': 'Other papers', 'citations': 5, 'year': '2024' }
    }
    
    os.makedirs('results', exist_ok=True)
    with open(f'results/paper_citations.json', 'w') as outfile:
        json.dump(fallback_citations, outfile, ensure_ascii=False, indent=2)
    
    print("Created fallback citation data")
    sys.exit(1)
