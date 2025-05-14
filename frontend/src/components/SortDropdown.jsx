export default function SortDropdown({ onSort }) {
    const handleChange = (e) => {
      onSort(e.target.value);
    };
  
    return (
      <div className="mb-4">
        <label className="block">Sort By</label>
        <select
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="company">Company</option>
        </select>
      </div>
    );
  }
  