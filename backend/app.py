from flask import Flask, request, jsonify
import os
from parser import parse_resume
from flask_cors import CORS  # To allow cross-origin requests from React

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded'}), 400

    file = request.files['resume']
    if file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        parsed_data = parse_resume(filepath)
        return jsonify({'status': 'success', 'parsed_text': parsed_data})

    return jsonify({'status': 'error', 'message': 'Upload failed'}), 400

if __name__ == '__main__':
    app.run(debug=True)
