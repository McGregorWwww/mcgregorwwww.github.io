from scholarly import scholarly, ProxyGenerator
import jsonpickle
import json
from datetime import datetime
import os
import time

# Add timeout and retry logic to make it more robust
def get_author_with_retry(scholar_id, max_retries=3, retry_delay=5):
    for attempt in range(max_retries):
        try:
            print(f"Attempt {attempt+1} of {max_retries} to fetch author data")
            # Set up a proxy generator to avoid Google rate limits
            pg = ProxyGenerator()
            pg.FreeProxies()
            scholarly.use_proxy(pg)
            
            # Fetch basic author data first
            author = scholarly.search_author_id(scholar_id)
            
            # Only fill necessary sections to speed things up
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            
            # Focus on only recent/important publications
            # Limit to top publications to avoid timeouts
            limited_pubs = author['publications'][:15] if len(author['publications']) > 15 else author['publications']
            
            # Get citation data for specific papers (the ones we're showing on the website)
            target_paper_ids = [
                'KDNRnW0AAAAJ:2osOgNQ5qMEC',  # UCTransNet
                'KDNRnW0AAAAJ:Tyk-4Ss8FVUC'   # DHC
            ]
            
            # Keep only the publications we're interested in
            filtered_pubs = []
            for pub in limited_pubs:
                if pub['author_pub_id'] in target_paper_ids or len(filtered_pubs) < 10:
                    filtered_pubs.append(pub)
            
            # Replace the full list with our filtered one to reduce data size
            author['publications'] = filtered_pubs
            return author
            
        except Exception as e:
            print(f"Error fetching author data: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
            else:
                print("Maximum retries reached. Unable to fetch author data.")
                raise

try:
    # Get author data with retry logic
    scholar_id = os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ')
    author = get_author_with_retry(scholar_id)
    
    # Process author data
    name = author['name']
    author['updated'] = str(datetime.now())
    
    # Convert publications to a dictionary for easier lookup
    author['publications'] = {p['author_pub_id']: p for p in author['publications']}
    
    # Save results
    os.makedirs('results', exist_ok=True)
    with open(f'results/gs_data.json', 'w') as outfile:
        json.dump(author, outfile, ensure_ascii=False)
    
    # Create shield.io badge data
    shieldio_data = {
      "schemaVersion": 1,
      "label": "citations",
      "message": f"{author['citedby']}",
    }
    with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)
    
    print("Successfully updated citation data")
    
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
