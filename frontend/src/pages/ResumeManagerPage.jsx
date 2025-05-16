// import React, { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";

// export default function ResumeManager() {
//   const [resumes, setResumes] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchResumes = async () => {
//     try {
//       const response = await fetch("/api/resumes");
//       const data = await response.json();
//       setResumes(data);
//     } catch (error) {
//       console.error("Failed to fetch resumes", error);
//     }
//   };

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return alert("Please select a file first.");
//     setLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("resume", selectedFile);

//       const res = await fetch("/api/resumes/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         alert("Resume uploaded successfully!");
//         setSelectedFile(null);
//         fetchResumes();
//       } else {
//         alert("Upload failed.");
//       }
//     } catch (error) {
//       alert("Error uploading file.");
//       console.error(error);
//     }
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this resume?")) return;
//     try {
//       const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
//       if (res.ok) {
//         fetchResumes();
//       } else {
//         alert("Failed to delete resume.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-semibold mb-4">Resume Manager</h1>

//         {/* Upload Section */}
//         <div className="mb-6">
//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept=".pdf,.doc,.docx"
//             className="border p-2"
//           />
//           <button
//             className="ml-3 px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
//             onClick={handleUpload}
//             disabled={loading || !selectedFile}
//           >
//             {loading ? "Uploading..." : "Upload Resume"}
//           </button>
//         </div>

//         {/* Resume List */}
//         <div>
//           {resumes.length === 0 ? (
//             <p>No resumes uploaded yet.</p>
//           ) : (
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 p-2 text-left">File Name</th>
//                   <th className="border border-gray-300 p-2 text-left">Uploaded At</th>
//                   <th className="border border-gray-300 p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {resumes.map((resume) => (
//                   <tr key={resume.id}>
//                     <td className="border border-gray-300 p-2">{resume.fileName}</td>
//                     <td className="border border-gray-300 p-2">
//                       {new Date(resume.uploadedAt).toLocaleString()}
//                     </td>
//                     <td className="border border-gray-300 p-2 text-center space-x-2">
//                       <a
//                         href={resume.fileUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:underline"
//                       >
//                         View
//                       </a>
//                       <button
//                         onClick={() => handleDelete(resume.id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
