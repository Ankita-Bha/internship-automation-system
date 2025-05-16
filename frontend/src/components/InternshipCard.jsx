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
    <div className="relative max-w-sm mx-auto px-4 group select-none cursor-grab">
      {/* Orange blurred background shadow */}
      <div className="absolute -top-3 -left-3 w-full h-full bg-orange-300 rounded-xl filter blur-lg opacity-30 z-0"></div>
  
      <div className="relative z-10 bg-white rounded-xl shadow-md p-6 min-w-[300px]">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
            {company && <p className="text-sm text-gray-500 font-medium mb-3">{company}</p>}
            <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
          </div>
  
          <button
            onClick={handleApplyJob}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
export default InternshipCard;
