import { useState } from "react";
import UploadZone from "./UploadZone";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    alert("File uploaded successfully!");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold">Upload Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <UploadZone onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
