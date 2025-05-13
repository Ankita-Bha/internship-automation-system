from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from parser import parse_resume
from matcher import match_jobs  # Import the matching function

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

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
    # Ensure that the request contains JSON data
    data = request.get_json()

    # Check if the data is empty or not JSON
    if not data:
        return jsonify({'status': 'error', 'message': 'No JSON data received'}), 400

    resume_text = data.get('resume_text', '')

    # Check if resume text is provided
    if not resume_text:
        return jsonify({'status': 'error', 'message': 'Resume text not provided'}), 400

    # Get job matches based on resume text
    matches = match_jobs(resume_text)

    return jsonify({'status': 'success', 'matches': matches})

if __name__ == '__main__':
    app.run(debug=True)
