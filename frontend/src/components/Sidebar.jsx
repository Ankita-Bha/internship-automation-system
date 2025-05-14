import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-white shadow-md p-4">
      <h2 className="text-xl font-semibold mb-6 text-orange-500">Internship System</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link>
        <Link to="/internships" className="hover:text-orange-500">Browse Internships</Link>
        <Link to="/upload-resume" className="hover:text-orange-500">Upload Resume</Link>
        <Link to="/manage-resumes" className="hover:text-orange-500">Resume Manager</Link>
        <Link to="/application-status" className="hover:text-orange-500">Application Status</Link>
      </nav>
    </div>
  );
}
