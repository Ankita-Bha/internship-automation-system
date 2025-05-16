import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applyingIds, setApplyingIds] = useState([]);

  // ✅ Decode JWT token to get userId
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const uid = decoded.user_id || decoded.sub;
      if (!uid) throw new Error("User ID not found in token.");
      setUserId(uid);
    } catch (e) {
      console.error("Failed to decode token:", e);
      setError("Authentication failed. Please login again.");
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setMatches([]);
    }
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a resume file first.");
    if (!userId) return setError("User not authenticated.");

    setLoading(true);
    setError(null);
    setMatches([]);

    const formData = new FormData();
    formData.append("resume", file);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedText = res.data.parsed_text;

      const matchRes = await axios.post(
        "http://127.0.0.1:5000/match-jobs",
        { resume_text: parsedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMatches(matchRes.data.matches);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error uploading or matching resume.");
      } else {
        setError("Unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyJob = async (jobId) => {
    const token = localStorage.getItem("token");
    if (!userId || !token) return setError("User not authenticated.");

    setApplyingIds((ids) => [...ids, jobId]);
    setError(null);

    try {
      await axios.post(
        "http://127.0.0.1:5000/apply-job",
        new URLSearchParams({ job_id: jobId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      alert(`Successfully applied to job ID: ${jobId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error applying to job.");
      } else {
        setError("Unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setApplyingIds((ids) => ids.filter((id) => id !== jobId));
    }
  };

  const handleApplyAll = async () => {
    if (matches.length === 0) return;
    const token = localStorage.getItem("token");
    if (!userId || !token) return setError("User not authenticated.");

    if (applyingIds.length > 0) {
      return setError("Please wait for ongoing applications to complete.");
    }

    const jobIds = matches.map((job) => job.id);
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://127.0.0.1:5000/apply-all",
        { job_ids: jobIds },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert("Successfully applied to all matched jobs.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error applying to all jobs.");
      } else {
        setError("Unexpected error occurred.");
      }
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
        onChange={handleFileChange}
        className="border p-2 rounded"
        disabled={loading}
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
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
                  <p className="mt-1 text-sm font-semibold">
                    Match Score: {job.match_score}/10
                  </p>
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
