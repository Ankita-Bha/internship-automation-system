import Sidebar from "../components/Sidebar";
// import FilterSidebar from "../components/FilterSidebar";
// import SortDropdown from "../components/SortDropdown";
import InternshipListing from "../components/InternshipListing";

export default function InternshipPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* <SortDropdown onSort={(val) => console.log("Sort by:", val)} />
        <FilterSidebar /> */}
        <InternshipListing />
      </div>
    </div>
  );
}
