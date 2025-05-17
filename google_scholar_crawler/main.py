from scholarly import scholarly
import json
from datetime import datetime
import os
import time
import sys

# Simple script to fetch Google Scholar data without complex proxy handling

print("Starting Google Scholar data crawler...")

try:
    # Get the Google Scholar ID
    scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ')
    print(f"Looking up Google Scholar ID: {scholar_id}")
    
    # Basic fetch with retry
    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            print(f"Attempt {attempt+1} of {max_attempts}")
            
            # Simple direct fetch without proxies
            author = scholarly.search_author_id(scholar_id)
            print("Retrieved basic author data")
            
            # Fill with publications
            print("Fetching detailed author data...")
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            print(f"Retrieved {len(author['publications'])} publications")
            
            # We've succeeded, so break out of the retry loop
            break
            
        except Exception as e:
            print(f"Error on attempt {attempt+1}: {e}")
            if attempt < max_attempts - 1:
                wait_time = 5 * (attempt + 1)  # Simple linear backoff
                print(f"Waiting {wait_time} seconds before retrying...")
                time.sleep(wait_time)
            else:
                print("All attempts failed. Exiting.")
                raise
    
    # Process publications data to extract what we need
    print("Processing publication data...")
    
    # Basic author metadata
    result = {
        "name": author.get('name', 'Unknown'),
        "updated": str(datetime.now()),
        "citedby": author.get('citedby', 0),
        "publications": {}
    }
    
    # Process publications
    target_paper_ids = [
        'KDNRnW0AAAAJ:2osOgNQ5qMEC',  # UCTransNet
        'KDNRnW0AAAAJ:Tyk-4Ss8FVUC'   # DHC
    ]
    
    pub_dict = {}
    for pub in author['publications']:
        pub_id = pub.get('author_pub_id')
        if pub_id:
            pub_dict[pub_id] = {
                "title": pub.get('bib', {}).get('title', 'Unknown'),
                "num_citations": pub.get('num_citations', 0)
            }
    
    # Make sure we capture our target papers
    for target in target_paper_ids:
        if target not in pub_dict:
            print(f"Warning: Target paper {target} not found in publications data")
    
    result['publications'] = pub_dict
    
    # Save the results
    os.makedirs('results', exist_ok=True)
    print("Saving data to JSON files...")
    
    # Save the full data
    with open(f'results/gs_data.json', 'w') as outfile:
        json.dump(result, outfile, ensure_ascii=False)
    
    # Save the shield.io badge data
    shieldio_data = {
      "schemaVersion": 1,
      "label": "citations",
      "message": f"{result['citedby']}",
    }
    with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)
    
    print("Successfully updated citation data!")
    sys.exit(0)  # Successful exit
    
except Exception as e:
    print(f"Error in main script: {e}")
    print("Failed to update citation data. No fallback data will be generated.")
    
    # Instead of creating fallback files with hardcoded data,
    # we'll just exit and keep the existing files (if any)
    # This ensures we're not using any static data
    
    # Create empty/minimal files only if they don't already exist
    os.makedirs('results', exist_ok=True)
    
    if not os.path.exists(f'results/gs_data.json'):
        minimal_data = {
            "name": "Haonan Wang",
            "updated": str(datetime.now()),
            "citedby": "?",
            "publications": {}
        }
        with open(f'results/gs_data.json', 'w') as outfile:
            json.dump(minimal_data, outfile, ensure_ascii=False)
    
    if not os.path.exists(f'results/gs_data_shieldsio.json'):
        minimal_shield_data = {
          "schemaVersion": 1,
          "label": "citations",
          "message": "?",
        }
        with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
            json.dump(minimal_shield_data, outfile, ensure_ascii=False)
