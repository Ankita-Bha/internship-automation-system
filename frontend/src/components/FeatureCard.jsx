export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-left max-w-sm w-full">
      <div className="bg-orange-100 p-2 rounded-xl inline-block mb-4 text-orange-500 text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#0F172A] mb-2">{title}</h3>
      <p className="text-sm text-[#6B7280]">{desc}</p>
    </div>
  );
}
