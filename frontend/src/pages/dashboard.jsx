import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mt-2">Here you can view jobs, upload resumes, and check your application status.</p>
      </div>
    </div>
  );
}
