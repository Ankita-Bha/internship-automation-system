from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from parser import parse_resume
from job_matcher import match_jobs  # Matches jobs from DB

# Import external job aggregators
from job_apis.adzuna import fetch_adzuna_jobs
from job_apis.findwork import fetch_findwork_jobs
from job_apis.jooble import fetch_jooble_jobs

app = Flask(__name__)
CORS(app,supports_credentials=True)

app.config["JWT_SECRET_KEY"] = "your_secret_key"
jwt = JWTManager(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def create_connection():
    return sqlite3.connect("jobs.db")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    password_hash = generate_password_hash(password)

    conn = None
    try:
        conn = create_connection()
        cursor = conn.cursor()

        # Check if email already exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
        existing_user = cursor.fetchone()
        if existing_user:
            return jsonify({"status": "error", "message": "Email already registered"}), 409  # Conflict

        # Insert new user
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
            (username, email, password_hash)
        )
        conn.commit()
        return jsonify({"status": "success", "message": "User registered successfully!"}), 201

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

    finally:
        if conn:
            conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"status": "error", "message": "Email and password are required"}), 400

    conn = create_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user or not check_password_hash(user[3], password):
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user[0]))
    return jsonify({"status": "success", "access_token": access_token}), 200

'''@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    if not isinstance(current_user, str):
        return jsonify({"msg": "Subject must be a string"}), 422
    return jsonify({
        "status": "success",
        "message": "This is a protected route!",
        "user": current_user
    }), 200'''

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    user_id = get_jwt_identity()

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute("SELECT id, username, email FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        conn.close()

        if not user:
            return jsonify({"status": "error", "message": "User not found"}), 404

        return jsonify({
            "status": "success",
            "message": "This is a protected route!",
            "user": {
                "id": user[0],
                "username": user[1],
                "email": user[2]
            }
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/upload-resume', methods=['POST'])
@jwt_required()
def upload_resume():
    user_id = get_jwt_identity()
    if 'resume' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400

    file = request.files['resume']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    parsed_text = parse_resume(filepath)
    return jsonify({'status': 'success', 'parsed_text': parsed_text})


@app.route('/match-jobs', methods=['POST'])
@jwt_required()
def match_jobs_api():
    user_id = get_jwt_identity()
    data = request.get_json()
    resume_text = data.get('resume_text', '')

    if not resume_text:
        return jsonify({'status': 'error', 'message': 'Resume text not provided'}), 400

    matches = match_jobs(resume_text)
    return jsonify({'status': 'success', 'matches': matches})


@app.route('/apply-all', methods=['POST', 'OPTIONS'])
@cross_origin(supports_credentials=True)
@jwt_required()
def apply_all_jobs():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 200

    user_id = get_jwt_identity()
    data = request.get_json()
    job_ids = data.get('job_ids')

    if not job_ids or not isinstance(job_ids, list):
        return jsonify({'status': 'error', 'message': 'Invalid job list'}), 400

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        for job_id in job_ids:
            cursor.execute('INSERT INTO job_applications (user_id, job_id, status) VALUES (?, ?, ?)', 
                           (user_id, job_id, 'Pending'))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': f'Applied to {len(job_ids)} jobs'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/add-job', methods=['POST'])
def add_job():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title or not description:
        return jsonify({'status': 'error', 'message': 'Title and description are required'}), 400

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO jobs (title, description) VALUES (?, ?)', (title, description))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Job added successfully'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/apply-job', methods=['POST'])
@jwt_required()
def apply_job():
    user_id = get_jwt_identity()

    job_id = request.form.get('job_id')  # Expecting from FormData

    if not job_id:
        return jsonify({'status': 'error', 'message': 'Job ID is required'}), 400

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO job_applications (user_id, job_id, status) VALUES (?, ?, ?)',
                       (user_id, job_id, 'Pending'))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Application submitted successfully'}), 201
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/update-application-status', methods=['POST'])
def update_application_status():
    data = request.get_json()
    application_id = data.get('application_id')
    status = data.get('status')

    if not application_id or status not in ['Accepted', 'Rejected']:
        return jsonify({'status': 'error', 'message': 'Invalid application ID or status'}), 400

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute('UPDATE job_applications SET status = ? WHERE id = ?', (status, application_id))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success', 'message': 'Application status updated'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute('SELECT id, title, description FROM jobs')
        jobs = cursor.fetchall()
        conn.close()

        job_list = [{'id': row[0], 'title': row[1], 'description': row[2]} for row in jobs]
        return jsonify({'status': 'success', 'jobs': job_list}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500


# 🚀 New Route for External Aggregated Jobs
@app.route('/api/external-jobs', methods=['GET'])
def get_external_jobs():
    keyword = request.args.get("keyword", "developer")
    location = request.args.get("location", "bangalore")

    adzuna_jobs = fetch_adzuna_jobs(keyword, location)
    findwork_jobs = fetch_findwork_jobs(keyword)
    jooble_jobs = fetch_jooble_jobs(keyword, location)

    all_jobs = adzuna_jobs + findwork_jobs + jooble_jobs
    return jsonify({"status": "success", "jobs": all_jobs}), 200

# Stub for scraping routes (if still needed)
'''@app.route('/scrape/internshala', methods=['GET'])
def scrape_internshala():
    try:
        jobs = internshala.scrape_jobs()
        return jsonify({'status': 'success', 'jobs': jobs}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/scrape/unstop', methods=['GET'])
def scrape_unstop():
    try:
        jobs = unstop.scrape_jobs()
        return jsonify({'status': 'success', 'jobs': jobs}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/scrape/naukri', methods=['GET'])
def scrape_naukri():
    try:
        jobs = naukri.scrape_jobs()
        return jsonify({'status': 'success', 'jobs': jobs}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500'''

@app.route('/application-status', methods=['GET'])
@jwt_required()
def get_application_status():
    user_id = get_jwt_identity()

    try:
        conn = sqlite3.connect('jobs.db')
        cursor = conn.cursor()
        cursor.execute('''
            SELECT 
                job_applications.id, 
                jobs.title, 
                jobs.description, 
                job_applications.status 
            FROM job_applications 
            JOIN jobs ON job_applications.job_id = jobs.id 
            WHERE job_applications.user_id = ?
        ''', (user_id,))
        applications = cursor.fetchall()
        conn.close()

        status_list = [
            {
                'application_id': row[0],
                'job_title': row[1],
                'job_description': row[2],
                'status': row[3]
            }
            for row in applications
        ]
        return jsonify({'status': 'success', 'applications': status_list}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
