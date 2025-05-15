# job_apis/findwork.py

import requests
from config import FINDWORK_API_KEY

def fetch_findwork_jobs(keyword):
    headers = {
        "Authorization": f"Token {FINDWORK_API_KEY}"
    }
    url = "https://findwork.dev/api/jobs/"

    try:
        response = requests.get(url, headers=headers, params={"search": keyword})
        response.raise_for_status()
        data = response.json()

        jobs = []
        for job in data.get("results", []):
            jobs.append({
                "title": job.get("role"),
                "company": job.get("company_name"),
                "location": job.get("location"),
                "url": job.get("url"),
                "source": "Findwork"
            })
        return jobs
    except Exception as e:
        return []
