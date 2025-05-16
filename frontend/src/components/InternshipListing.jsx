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
    <div>
      {/* Search Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Keyword (e.g., developer)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <input
          type="text"
          placeholder="Location (e.g., Bangalore)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
      </div>

      {/* Jobs Listing */}
      {loading ? (
        <p className="text-center mt-8">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <InternshipCard key={job.id} job={job} />
            ))
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      )}
    </div>
  );
}
