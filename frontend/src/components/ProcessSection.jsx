import FeatureCard from "./FeatureCard";
import { FaSearch, FaBolt, FaChartLine } from "react-icons/fa";

export default function ProcessSection() {
  const features = [
    {
      title: "Smart Matching",
      desc:
        "Our AI analyzes your resume and matches you with the most relevant internships based on your skills and experiences.",
      icon: <FaSearch />,
    },
    {
      title: "One-Click Apply",
      desc:
        "Apply to multiple internships with a single click, saving you time and effort in the application process.",
      icon: <FaBolt />,
    },
    {
      title: "Real-time Tracking",
      desc:
        "Track the status of your applications in real-time and receive notifications about important updates.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
          Streamlined Internship Process
        </h2>
        <p className="text-[#4B5563] max-w-2xl mx-auto">
          We've simplified the internship application journey, making it easier than ever
          to find and secure opportunities.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch px-4">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}
