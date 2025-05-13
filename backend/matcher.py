import re
import json
from collections import Counter

# Sample mock job listings (for now, static — later replace with real scraped data)
job_data = [
    {
        "id": 1,
        "title": "Frontend Developer Intern",
        "description": "Looking for someone with React, JavaScript, and UI/UX design skills."
    },
    {
        "id": 2,
        "title": "Data Analyst Intern",
        "description": "Must have experience in Python, Pandas, SQL, and data visualization tools."
    },
    {
        "id": 3,
        "title": "Backend Developer Intern",
        "description": "Requires Flask, REST APIs, and database knowledge."
    }
]

# Basic keyword matcher
def extract_keywords(text):
    # Clean and tokenize
    words = re.findall(r'\b\w+\b', text.lower())
    # Filter out short/common words
    stopwords = {'the', 'and', 'for', 'with', 'a', 'to', 'in', 'on', 'of', 'at', 'is', 'are', 'as'}
    keywords = [word for word in words if len(word) > 2 and word not in stopwords]
    return set(keywords)

def match_jobs(resume_text):
    resume_keywords = extract_keywords(resume_text)
    matches = []

    for job in job_data:
        job_keywords = extract_keywords(job['description'])
        match_score = len(resume_keywords.intersection(job_keywords))
        matches.append({**job, 'match_score': match_score})

    matches.sort(key=lambda x: x['match_score'], reverse=True)
    return matches
