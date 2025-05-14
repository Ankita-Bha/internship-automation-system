import sqlite3
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def fetch_jobs_from_db():
    conn = sqlite3.connect("jobs.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, description FROM jobs")
    jobs = cursor.fetchall()
    conn.close()
    return jobs

def match_jobs(resume_text):
    jobs = fetch_jobs_from_db()

    job_descriptions = [job[2] for job in jobs]
    job_titles = [job[1] for job in jobs]
    job_ids = [job[0] for job in jobs]

    documents = [resume_text] + job_descriptions

    tfidf = TfidfVectorizer()
    matrix = tfidf.fit_transform(documents)

    cosine_sim = cosine_similarity(matrix[0:1], matrix[1:]).flatten()

    matched_jobs = []
    for i, score in enumerate(cosine_sim):
        matched_jobs.append({
            'id': job_ids[i],
            'title': job_titles[i],
            'description': job_descriptions[i],
            'match_score': round(score * 10)  # Scale score 0-10
        })

    # Sort by match_score descending
    matched_jobs.sort(key=lambda x: x['match_score'], reverse=True)
    return matched_jobs
