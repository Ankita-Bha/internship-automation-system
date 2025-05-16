import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applyingIds, setApplyingIds] = useState([]);

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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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
    if (applyingIds.length > 0) return setError("Please wait for ongoing applications to complete.");

    const jobIds = matches.map((job) => job.id);
    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        jobIds.map((id) =>
          axios.post(
            "http://127.0.0.1:5000/apply-job",
            new URLSearchParams({ job_id: id }),
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
        )
      );
      alert("Applied to all matched jobs!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Error applying to jobs.");
      } else {
        setError("Unexpected error occurred.");
      }
      console.error(error);
    } finally {
      setLoading(false);
      setApplyingIds([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
        Upload Your Resume
      </h1>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Upload your resume to get matched with the best internship opportunities that fit your skills and experience.
      </p>

      <label
        htmlFor="resume-upload"
        className="w-full max-w-xl cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 flex flex-col items-center justify-center text-center hover:border-orange-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-orange-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
        </svg>
        <p className="text-gray-600 mb-1 font-medium">Drag & Drop your resume here</p>
        <p className="text-gray-400 text-sm mb-5">or click to browse from your computer</p>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />

        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow"
          onClick={() => document.getElementById("resume-upload").click()}
          disabled={loading}
        >
          Select File
        </button>

        {file && (
          <p className="mt-3 text-sm text-gray-700 font-medium">
            Selected file: <span className="text-gray-900">{file.name}</span>
          </p>
        )}
      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload & Match Jobs"}
      </button>

      <div className="bg-white max-w-xl w-full rounded-lg shadow mt-8 p-6 text-gray-700">
        <h3 className="font-semibold mb-3 text-lg">Resume Tips</h3>
        <ul className="space-y-2 text-sm list-inside">
          <li className="flex items-start">
            <span className="text-orange-500 font-bold mr-2">1.</span>
            Use <strong>keywords</strong> related to your desired internship.
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 font-bold mr-2">2.</span>
            Be <strong>specific</strong> about your skills, projects, and coursework.
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 font-bold mr-2">3.</span>
            Format <strong>properly</strong> with clear sections and consistent styling.
          </li>
        </ul>
      </div>

      {error && (
        <p className="mt-6 text-red-600 font-semibold max-w-xl text-center">
          {error}
        </p>
      )}

      {matches.length > 0 && (
        <div className="max-w-xl w-full mt-10 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Matched Jobs:</h2>
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

      <div className="mt-12 text-gray-500 text-sm">
        <a href="/internships" className="hover:underline">
          Skip for now and explore internships &rarr;
        </a>
      </div>
    </div>
  );
}
