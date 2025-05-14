export default function FeatureCard({ title, desc, icon }) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center space-y-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-lg font-bold text-[#0F172A]">{title}</h3>
        <p className="text-sm text-[#6B7280]">{desc}</p>
      </div>
    );
  }
  