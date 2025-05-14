import { useEffect, useState } from "react";
import InternshipCard from "./InternshipCard";
import axios from "axios";

export default function InternshipListing() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/jobs")
      .then((res) => {
        if (res.data.status === "success") {
          setJobs(res.data.jobs);
        }
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {jobs.map((job) => (
        <InternshipCard key={job.id} job={job} />
      ))}
    </div>
  );
}
