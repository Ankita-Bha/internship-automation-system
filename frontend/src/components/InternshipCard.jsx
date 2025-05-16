import React from "react";
import axios from "axios";

const InternshipCard = ({ job }) => {
  const { id, title, description, company } = job;

  const handleApplyJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to apply.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job_id", id);

      const response = await axios.post("http://127.0.0.1:5000/apply-job", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Applied successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("Application failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold text-textDark">{title}</h2>
      {company && <p className="text-textMedium">{company}</p>}
      <p className="mt-2 text-textMedium">{description}</p>
      <button
        onClick={handleApplyJob}
        className="mt-4 bg-[#FF6B00] hover:bg-[#F97316] text-white px-4 py-2 rounded transition-colors duration-300"
      >
        Apply
      </button>
    </div>
  );
};

export default InternshipCard;
