import Sidebar from "../components/Sidebar";
import ResumeUploadForm from "../components/ResumeUploadForm";
// import ResumeTips from "../components/ResumeTips";

export default function ResumeUploadPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Upload Your Resume</h1>
        <ResumeUploadForm />
        {/* <ResumeTips /> */}
      </div>
    </div>
  );
}
