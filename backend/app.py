from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from parser import parse_resume
from job_matcher import match_jobs  # Updated import

app = Flask(__name__)
CORS(app)

# JWT Configuration
app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this key for production
jwt = JWTManager(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Database setup
def create_connection():
    return sqlite3.connect("jobs.db")

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received Data:", data)  # Debug line to see the incoming request
    
    username = data.get('username')  # Ensure this matches the form input
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    password_hash = generate_password_hash(password)

    try:
        conn = create_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
                       (username, email, password_hash))
        conn.commit()
        conn.close()
        return jsonify({"status": "success", "message": "User registered successfully!"}), 201
    except Exception as e:
        print("Error during registration:", str(e))  # Error logging
        return jsonify({"status": "error", "message": str(e)}), 500


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

    if not user or not check_password_hash(user[3], password):  # Assuming password is in the 4th column
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=str(user[0]))  # user[0] is the user ID
    return jsonify({"status": "success", "access_token": access_token}), 200


@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # Get the user identity (which is the 'sub' field in the token)
    identity = get_jwt_identity()
    
    # Ensure 'sub' is a string
    if not isinstance(identity, str):
        return jsonify({"msg": "Subject must be a string"}), 422

    return jsonify({"status": "success", "message": "This is a protected route!"}), 200


@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400

    file = request.files['resume']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    parsed_text = parse_resume(filepath)

    return jsonify({'status': 'success', 'parsed_text': parsed_text})


@app.route('/match-jobs', methods=['POST'])
def match_jobs_api():
    data = request.get_json()
    resume_text = data.get('resume_text', '')

    if not resume_text:
        return jsonify({'status': 'error', 'message': 'Resume text not provided'}), 400

    matches = match_jobs(resume_text)
    return jsonify({'status': 'success', 'matches': matches})


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
def apply_job():
    data = request.get_json()
    user_id = data.get('user_id')
    job_id = data.get('job_id')

    if not user_id or not job_id:
        return jsonify({'status': 'error', 'message': 'User ID and Job ID are required'}), 400

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
    status = data.get('status')  # 'Accepted' or 'Rejected'

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


if __name__ == '__main__':
    app.run(debug=True)
