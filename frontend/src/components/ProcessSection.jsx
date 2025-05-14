import FeatureCard from "./FeatureCard";

export default function ProcessSection() {
  const features = [
    {
      title: "Smart Matching",
      desc: "Resume parsing + AI-powered internship matches",
      icon: "🤖",
    },
    {
      title: "One-Click Apply",
      desc: "Apply instantly to top matches from backend",
      icon: "⚡",
    },
    {
      title: "Real-time Tracking",
      desc: "Live updates from `/get-status` API",
      icon: "📈",
    },
  ];

  return (
    <section className="bg-[#FFF7F0] py-12 px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
