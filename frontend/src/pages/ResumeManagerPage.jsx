import Sidebar from "../components/Sidebar";

export default function ResumeManager() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Resume Manager</h1>
        <p className="text-gray-600">Coming soon: Here you’ll manage previously uploaded resumes.</p>
      </div>
    </div>
  );
}
