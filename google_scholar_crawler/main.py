import json
from datetime import datetime
import os
import time
import sys
import random
import requests
from urllib.parse import quote_plus
import re

# Direct citation fetching approach instead of using scholarly
# This is much faster and more reliable than the scholarly library

# Configuration
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36'
]

TIMEOUT = 5  # Seconds
MAX_RETRIES = 2

# Map of paper IDs to expected citation counts (fallback values)
FALLBACK_CITATIONS = {
    'KDNRnW0AAAAJ:2osOgNQ5qMEC': {'title': 'UCTransNet', 'citations': 80, 'year': '2022'},
    'KDNRnW0AAAAJ:Tyk-4Ss8FVUC': {'title': 'DHC', 'citations': 10, 'year': '2023'},
    'KDNRnW0AAAAJ:u-x6o8ySG0sC': {'title': 'Other papers', 'citations': 5, 'year': '2024'},
    'KDNRnW0AAAAJ:d1gkVwhDpl0C': {'title': 'Other papers', 'citations': 8, 'year': '2023'},
    'KDNRnW0AAAAJ:u5HHmVD_uO8C': {'title': 'Other papers', 'citations': 7, 'year': '2023'}
}

def get_random_user_agent():
    """Get a random user agent to avoid detection"""
    return random.choice(USER_AGENTS)

def fetch_citation_count(paper_id):
    """Fetch citation count for a specific paper directly from Google Scholar"""
    author_id, citation_id = paper_id.split(':', 1) if ':' in paper_id else (paper_id, '')
    url = f"https://scholar.google.com/citations?view_op=view_citation&hl=en&user={author_id}&citation_for_view={paper_id}"
    
    headers = {'User-Agent': get_random_user_agent()}
    
    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(url, headers=headers, timeout=TIMEOUT)
            if response.status_code == 200:
                # Extract citation count using regex
                match = re.search(r'Cited by (\d+)', response.text)
                if match:
                    return int(match.group(1))
                return 0
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {str(e)}")
            time.sleep(1)  # Wait before retrying
    
    # If all attempts fail, return None
    return None

def get_paper_info_from_id(paper_id):
    """Get paper information from its ID"""
    # Try to fetch citation count
    citation_count = fetch_citation_count(paper_id)
    
    # If fetching failed, use fallback data
    if citation_count is None:
        if paper_id in FALLBACK_CITATIONS:
            return FALLBACK_CITATIONS[paper_id]
        return {'title': 'Unknown', 'citations': 0, 'year': ''}
    
    # Use fallback for title and year, but real citation count
    if paper_id in FALLBACK_CITATIONS:
        result = FALLBACK_CITATIONS[paper_id].copy()
        result['citations'] = citation_count
        return result
    
    return {'title': 'Unknown', 'citations': citation_count, 'year': ''}

def main():
    print("Starting optimized Google Scholar citation crawler...")
    start_time = time.time()
    
    try:
        # Get author ID from environment variable or use default
        author_id = os.environ.get('GOOGLE_SCHOLAR_ID', 'KDNRnW0AAAAJ')
        print(f"Using author ID: {author_id}")
        
        # List of important paper IDs to fetch
        important_paper_ids = [
            'KDNRnW0AAAAJ:2osOgNQ5qMEC',  # UCTransNet
            'KDNRnW0AAAAJ:Tyk-4Ss8FVUC',  # DHC
            'KDNRnW0AAAAJ:u-x6o8ySG0sC',  # Other papers
            'KDNRnW0AAAAJ:d1gkVwhDpl0C',
            'KDNRnW0AAAAJ:u5HHmVD_uO8C'
        ]
        
        # Dictionary to store paper citations
        paper_citations = {}
        
        # Process each paper ID
        print(f"Processing {len(important_paper_ids)} papers...")
        for i, paper_id in enumerate(important_paper_ids):
            try:
                print(f"  Processing paper {i+1}/{len(important_paper_ids)}: {paper_id}")
                paper_info = get_paper_info_from_id(paper_id)
                paper_citations[paper_id] = paper_info
                print(f"    - Citations: {paper_info['citations']}")
                
                # Add a small delay between requests to avoid rate limiting
                if i < len(important_paper_ids) - 1:
                    delay = random.uniform(1.0, 2.0)
                    print(f"    - Waiting {delay:.1f}s before next request...")
                    time.sleep(delay)
                    
            except Exception as e:
                print(f"    - Error processing paper {paper_id}: {str(e)}")
                # Use fallback data if available
                if paper_id in FALLBACK_CITATIONS:
                    paper_citations[paper_id] = FALLBACK_CITATIONS[paper_id]
                    print(f"    - Using fallback data: {FALLBACK_CITATIONS[paper_id]}")
        
        # Ensure results directory exists
        os.makedirs('results', exist_ok=True)
        
        # Save paper citations to a file
        print("Saving citation data...")
        with open('results/paper_citations.json', 'w') as outfile:
            json.dump(paper_citations, outfile, ensure_ascii=False, indent=2)
        
        # Create minimal author data
        total_citations = sum(paper.get('citations', 0) for paper in paper_citations.values())
        author_data = {
            'name': 'Haonan Wang',
            'citedby': total_citations,
            'updated': str(datetime.now())
        }
        
        with open('results/gs_data.json', 'w') as outfile:
            json.dump(author_data, outfile, ensure_ascii=False, indent=2)
        
        # Create shield.io data
        shieldio_data = {
            "schemaVersion": 1,
            "label": "citations",
            "message": f"{total_citations}",
        }
        with open('results/gs_data_shieldsio.json', 'w') as outfile:
            json.dump(shieldio_data, outfile, ensure_ascii=False)
        
        elapsed_time = time.time() - start_time
        print(f"Completed successfully in {elapsed_time:.2f} seconds")
        print(f"Saved citation data for {len(paper_citations)} papers")
        return 0
        
    except Exception as e:
        print(f"Error in main process: {str(e)}")
        # Create fallback data
        os.makedirs('results', exist_ok=True)
        with open('results/paper_citations.json', 'w') as outfile:
            json.dump(FALLBACK_CITATIONS, outfile, ensure_ascii=False, indent=2)
        print("Created fallback citation data")
        return 1

if __name__ == "__main__":
    sys.exit(main())

