export default function InternshipCard({ job }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.description}</p>
        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Apply
        </button>
      </div>
    );
  }
  