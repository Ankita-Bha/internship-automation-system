# job_apis/jooble.py

import requests
from config import JOOBLE_API_KEY

def fetch_jooble_jobs(keyword, location):
    url = f"https://jooble.org/api/{JOOBLE_API_KEY}"
    payload = {
        "keywords": keyword,
        "location": location
    }

    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()

        jobs = []
        for job in data.get("jobs", []):
            jobs.append({
                "title": job.get("title"),
                "company": job.get("company"),
                "location": job.get("location"),
                "url": job.get("link"),
                "source": "Jooble"
            })
        return jobs
    except Exception as e:
        return []
