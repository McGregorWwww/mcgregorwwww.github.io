from scholarly import scholarly, ProxyGenerator
import jsonpickle
import json
from datetime import datetime
import os
import time
import sys

def main():
    # Setup proxy using rotating free proxies
    try:
        print("Setting up proxy generator...")
        pg = ProxyGenerator()
        success = pg.FreeProxies()
        print(f"Proxy setup success: {success}")
        scholarly.use_proxy(pg)
    except Exception as e:
        print(f"Failed to set up proxy: {e}")
        print("Continuing without proxy...")

    print(f"Fetching data for Scholar ID: {os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ')}")

    # Search for author and retrieve data with retry mechanism
    max_retries = 3
    for retry in range(max_retries):
        try:
            print(f"Attempt {retry + 1} of {max_retries}")
            
            # Get author data
            author = scholarly.search_author_id(os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ'))
            print(f"Found author: {author.get('name', 'Unknown')}")
            
            # Fill in additional author details and publications
            scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
            print(f"Retrieved {len(author.get('publications', []))} publications")
            
            # Save the full author data with all publications
            name = author['name']
            author['updated'] = str(datetime.now())
            author['publications'] = {v['author_pub_id']: v for v in author['publications']}
            
            # Print summary
            print(f"Author: {name}")
            print(f"Citations: {author.get('citedby', 0)}")
            print(f"h-index: {author.get('hindex', 0)}")
            print(f"Publications count: {len(author.get('publications', []))}")
            
            # Create output directory (relative to script location)
            script_dir = os.path.dirname(os.path.abspath(__file__))
            results_dir = os.path.join(script_dir, 'results')
            os.makedirs(results_dir, exist_ok=True)
            
            # Save full data to JSON file
            with open(os.path.join(results_dir, 'gs_data.json'), 'w') as outfile:
                json.dump(author, outfile, ensure_ascii=False)
            
            # Create shield.io badge data
            shieldio_data = {
                "schemaVersion": 1,
                "label": "citations",
                "message": f"{author['citedby']}",
            }
            with open(os.path.join(results_dir, 'gs_data_shieldsio.json'), 'w') as outfile:
                json.dump(shieldio_data, outfile, ensure_ascii=False)
            
            print("Successfully saved Google Scholar data")
            return True  # Success
            
        except Exception as e:
            print(f"Error fetching scholar data on attempt {retry + 1}: {e}")
            if retry < max_retries - 1:
                backoff_time = 5 * (2 ** retry)  # Exponential backoff
                print(f"Retrying in {backoff_time} seconds...")
                time.sleep(backoff_time)
            else:
                print("Maximum retries reached. Unable to fetch scholar data.")
                print(f"Error details: {e}")
    
    # All retries failed
    print("Failed to update citation data. No fallback data will be generated.")
    return False

if __name__ == "__main__":
    success = main()
    if not success:
        # Create empty/minimal files only if they don't already exist
        script_dir = os.path.dirname(os.path.abspath(__file__))
        results_dir = os.path.join(script_dir, 'results')
        os.makedirs(results_dir, exist_ok=True)
        
        if not os.path.exists(os.path.join(results_dir, 'gs_data.json')):
            minimal_data = {
                "name": "Haonan Wang",
                "updated": str(datetime.now()),
                "citedby": "?",
                "publications": {}
            }
            with open(os.path.join(results_dir, 'gs_data.json'), 'w') as outfile:
                json.dump(minimal_data, outfile, ensure_ascii=False)
        
        if not os.path.exists(os.path.join(results_dir, 'gs_data_shieldsio.json')):
            minimal_shield_data = {
              "schemaVersion": 1,
              "label": "citations",
              "message": "?",
            }
            with open(os.path.join(results_dir, 'gs_data_shieldsio.json'), 'w') as outfile:
                json.dump(minimal_shield_data, outfile, ensure_ascii=False)
        sys.exit(1)  # Exit with error code
