import sqlite3
from werkzeug.security import generate_password_hash

def create_connection():
    return sqlite3.connect("jobs.db")

def setup_database():
    conn = create_connection()
    cursor = conn.cursor()

    # Create users table (for storing user details securely)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # Create jobs table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL
        )
    ''')

    # Insert sample job data
    sample_jobs = [
        ("Frontend Developer Intern", "Looking for someone with React, JavaScript, and UI/UX design skills."),
        ("Data Analyst Intern", "Must have experience in Python, Pandas, SQL, and data visualization tools."),
        ("Backend Developer Intern", "Requires Flask, REST APIs, and database knowledge.")
    ]
    cursor.executemany("INSERT INTO jobs (title, description) VALUES (?, ?)", sample_jobs)

    # Create job_applications table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS job_applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'Pending',
            FOREIGN KEY (job_id) REFERENCES jobs (id)
        )
    ''')

    # Insert sample application data
    sample_applications = [
        (1, 1, 'Pending'),
        (2, 2, 'Accepted'),
    ]
    cursor.executemany("INSERT INTO job_applications (job_id, user_id, status) VALUES (?, ?, ?)", sample_applications)

    # Create an admin user for testing (with hashed password)
    password_hash = generate_password_hash("admin123", method='sha256')
    cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", ("admin", "admin@example.com", password_hash))

    conn.commit()
    conn.close()
    print("✅ Database, sample jobs, applications, and user created.")

if __name__ == "__main__":
    setup_database()
