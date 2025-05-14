export default function UploadZone({ onChange }) {
    return (
      <div className="mt-4">
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    );
  }
  