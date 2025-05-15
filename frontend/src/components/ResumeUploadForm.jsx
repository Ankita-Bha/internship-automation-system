import { useState, useEffect } from "react";
import axios from "axios";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applyingIds, setApplyingIds] = useState([]); // track applying jobs

  // Fetch userId on mount from /me API using token
  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://127.0.0.1:5000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.user_id);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
    fetchUserId();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume file first.");
      return;
    }
    if (!userId) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    setError(null);
    setMatches([]);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      // Upload resume and get parsed text
      const res = await axios.post("http://127.0.0.1:5000/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const parsedText = res.data.parsed_text;

      // Use parsed text to get matched jobs
      const token = localStorage.getItem("token");
      const matchRes = await axios.post(
        "http://127.0.0.1:5000/match-jobs",
        { resume_text: parsedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMatches(matchRes.data.matches);
    } catch (error) {
      setError("Error uploading or matching resume. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Apply to a single job
  const handleApplyJob = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setError("User not authenticated.");
      return;
    }

    setApplyingIds((ids) => [...ids, jobId]);
    setError(null);

    try {
      await axios.post(
        "http://127.0.0.1:5000/apply-job",
        { user_id: userId, job_id: jobId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Successfully applied to job ID: ${jobId}`);
    } catch (error) {
      setError("Error applying to job. Please try again.");
      console.error(error);
    } finally {
      setApplyingIds((ids) => ids.filter((id) => id !== jobId));
    }
  };

  // Apply to all matched jobs
  const handleApplyAll = async () => {
    if (matches.length === 0) return;
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setError("User not authenticated.");
      return;
    }

    // Disable apply all if any individual apply in progress
    if (applyingIds.length > 0) {
      setError("Please wait for ongoing applications to complete.");
      return;
    }

    const jobIds = matches.map((job) => job.id);
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://127.0.0.1:5000/apply-multiple",
        { user_id: userId, job_ids: jobIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully applied to all matched jobs.");
    } catch (error) {
      setError("Error applying to all jobs. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-6 rounded shadow bg-white max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Upload Resume & Find Matches</h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`ml-3 px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload & Match"}
      </button>

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      {matches.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-3">Matched Jobs:</h2>
          <ul className="space-y-4 max-h-96 overflow-y-auto">
            {matches.map((job) => (
              <li
                key={job.id}
                className="border p-4 rounded shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <strong className="text-lg">{job.title}</strong>
                  <p className="text-sm text-gray-600">{job.description}</p>
                  <p className="mt-1 text-sm font-semibold">Match Score: {job.match_score}/10</p>
                </div>
                <div className="mt-3 sm:mt-0">
                  <button
                    onClick={() => handleApplyJob(job.id)}
                    disabled={applyingIds.includes(job.id)}
                    className={`px-4 py-2 rounded text-white ${
                      applyingIds.includes(job.id)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {applyingIds.includes(job.id) ? "Applying..." : "Apply"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={handleApplyAll}
            disabled={loading || applyingIds.length > 0}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Applying to all..." : "Apply to All Matched Jobs"}
          </button>
        </div>
      )}
    </div>
  );
}
