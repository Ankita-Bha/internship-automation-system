import { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import axios from "axios";

export default function InternshipListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const fetchJobs = () => {
    setLoading(true);
    const fetchLocalJobs = axios.get("http://127.0.0.1:5000/jobs");
    const fetchExternalJobs = axios.get(
      `http://127.0.0.1:5000/api/external-jobs?keyword=${encodeURIComponent(
        keyword
      )}&location=${encodeURIComponent(location)}`
    );

    Promise.all([fetchLocalJobs, fetchExternalJobs])
      .then(([localRes, externalRes]) => {
        const localJobs =
          localRes.data.status === "success" ? localRes.data.jobs : [];
        const externalJobs =
          externalRes.data.status === "success"
            ? externalRes.data.jobs.map((job, i) => ({
                ...job,
                id: `external-${i}`, // Assign unique fallback ID
              }))
            : [];
        setJobs([...localJobs, ...externalJobs]);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, [keyword, location]);

  return (
    <div className="min-h-screen bg-[#fffaf5] px-6 py-12 flex flex-col items-center">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
        Browse Internship Opportunities
      </h1>
      <p className="text-center text-gray-600 max-w-md mb-8">
        Discover internships that align with your skills, interests, and goals.
        Use the filters below to find your perfect match.
      </p>
  
      {/* Search Filters */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Keyword (e.g., developer, design, data)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
        <input
          type="text"
          placeholder="Location (e.g., Bangalore, Remote)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
        />
      </div>
  
      {/* Job Listings */}
      {loading ? (
        <p className="text-orange-500 font-medium text-center mt-10">
          Loading internships...
        </p>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {jobs.map((job) => (
            <InternshipCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-10 text-center">
          No internships found. Try different keywords or locations.
        </p>
      )}
  
      {/* Skip Link */}
      <div className="mt-16 text-gray-500 text-sm">
        <a href="/resume-upload" className="hover:underline">
          Want better matches? Upload your resume &rarr;
        </a>
      </div>
    </div>
  );
  
}
