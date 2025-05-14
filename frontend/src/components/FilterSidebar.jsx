import { useState } from "react";
import SearchInput from "./SearchInput";

export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "full-time",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-4 w-64">
      <SearchInput
        value={filters.search}
        onChange={handleChange}
        name="search"
        placeholder="Search internships"
      />
      <div className="mt-4">
        <label className="block">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mt-4">
        <label className="block">Type</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
        </select>
      </div>
    </div>
  );
}
