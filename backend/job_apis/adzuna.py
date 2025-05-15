# job_apis/adzuna.py

import requests
from config import ADZUNA_APP_ID, ADZUNA_APP_KEY

def fetch_adzuna_jobs(keyword, location):
    url = f"https://api.adzuna.com/v1/api/jobs/in/search/1"
    params = {
        "app_id": ADZUNA_APP_ID,
        "app_key": ADZUNA_APP_KEY,
        "what": keyword,
        "where": location
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        jobs = []
        for job in data.get("results", []):
            jobs.append({
                "title": job.get("title"),
                "company": job.get("company", {}).get("display_name"),
                "location": job.get("location", {}).get("display_name"),
                "url": job.get("redirect_url"),
                "source": "Adzuna"
            })
        return jobs
    except Exception as e:
        return []
