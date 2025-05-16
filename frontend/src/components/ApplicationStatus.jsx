import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicationStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:5000/application-status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        setApplications(response.data.applications);
      } else {
        console.error("Failed to fetch application status");
      }
    } catch (error) {
      console.error("Error fetching application status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.application_id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{app.job_title}</h2>
              <p className="text-gray-600 mb-2">{app.job_description}</p>
              <p
                className={`font-semibold ${
                  app.status === "Accepted"
                    ? "text-green-600"
                    : app.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                Status: {app.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
