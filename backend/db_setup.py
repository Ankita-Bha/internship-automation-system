import sqlite3
from werkzeug.security import generate_password_hash

def create_connection():
    return sqlite3.connect("jobs.db")

def setup_database():
    conn = create_connection()
    cursor = conn.cursor()

    # Create users table with resume_text column
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            resume_text TEXT
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

    # Create applications table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            status TEXT NOT NULL DEFAULT 'Pending',
            FOREIGN KEY (job_id) REFERENCES jobs (id),
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')

    # Insert sample job data only if empty
    cursor.execute("SELECT COUNT(*) FROM jobs")
    if cursor.fetchone()[0] == 0:
        sample_jobs = [
            ("Frontend Developer Intern", "Looking for someone with React, JavaScript, and UI/UX design skills."),
            ("Data Analyst Intern", "Must have experience in Python, Pandas, SQL, and data visualization tools."),
            ("Backend Developer Intern", "Requires Flask, REST APIs, and database knowledge.")
        ]
        cursor.executemany("INSERT INTO jobs (title, description) VALUES (?, ?)", sample_jobs)

    # Insert sample application data only if empty
    cursor.execute("SELECT COUNT(*) FROM applications")
    if cursor.fetchone()[0] == 0:
        sample_applications = [
            (1, 1, 'Pending'),
            (2, 2, 'Accepted'),
        ]
        cursor.executemany("INSERT INTO applications (job_id, user_id, status) VALUES (?, ?, ?)", sample_applications)

    # Insert an admin user if not exists
    cursor.execute("SELECT * FROM users WHERE email = ?", ("admin@example.com",))
    if not cursor.fetchone():
        password_hash = generate_password_hash("admin123", method='sha256')
        cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
                       ("admin", "admin@example.com", password_hash))

    conn.commit()
    conn.close()
    print("✅ Database initialized with users, jobs, applications.")

if __name__ == "__main__":
    setup_database()
