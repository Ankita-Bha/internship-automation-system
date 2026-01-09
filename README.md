# AutoIntern

AutoIntern is a modern web application designed to streamline the job application process by automatically matching resumes with job descriptions and managing job applications efficiently.

## 🚀 Features

- Resume parsing and analysis
- Automated job matching
- Job application tracking
- File upload and management
- Modern, responsive user interface

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- TailwindCSS for styling
- Modern ES6+ JavaScript

### Backend
- Python Flask
- SQLite Database
- Resume parsing and matching algorithms

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- npm (Node package manager)

## 🔧 Installation

### Backend Setup
```bash
cd backend
python -m venv venv
# On Windows
.\venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
# Activate virtual environment if not already activated
python app.py
```

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
AutoIntern/
├── frontend/               # React frontend application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── backend/               # Python Flask backend
│   ├── app.py            # Main application file
│   ├── job_matcher.py    # Job matching logic
│   ├── parser.py         # Resume parsing
│   └── requirements.txt   # Python dependencies
└── package.json          # Root dependencies
```

## 🔒 Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the backend directory with the following variables:

```env
FLASK_ENV=development
DATABASE_URL=sqlite:///jobs.db
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Create a Pull Request

## 👥 Authors

- Ankita 

## 🙏 Acknowledgments

- Thanks to the open-source community for the tools and libraries used in this project
