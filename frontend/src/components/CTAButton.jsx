import { Link } from "react-router-dom";

export default function CTAButton({ text, href, outlined = false }) {
  const base = "rounded-full px-6 py-3 text-sm font-semibold transition";
  const filled = "bg-[#FF6B00] text-white hover:bg-[#f95a00]";
  const outline = "border border-[#FF6B00] text-[#FF6B00] hover:bg-[#FFF1E6]";
  return (
    <Link to={href} className={`${base} ${outlined ? outline : filled}`}>
      {text}
    </Link>
  );
}
