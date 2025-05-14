export default function ApplicationCard() {
    return (
      <div className="bg-white rounded-xl shadow-md px-6 py-4 w-[320px] space-y-4">
        <h2 className="text-xl font-semibold text-[#0F172A]">Application Process</h2>
        <ul className="space-y-2 text-[#475569]">
          <li>📤 Upload Resume → `/upload-resume`</li>
          <li>🧠 Smart Match → `/match-jobs`</li>
          <li>📄 Apply → `/apply-job`</li>
          <li>📊 Track Status → `/get-status`</li>
        </ul>
      </div>
    );
  }
  