import CTAButton from "./CTAButton";
import ApplicationCard from "./ApplicationCard";

export default function HeroSection() {
  return (
    <section className="bg-[#FFF7F0] py-20 px-8 flex flex-col md:flex-row items-center justify-between mt-16">
      <div className="max-w-xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">
          Find Your <span className="text-orange-500">Perfect</span> Internship Match
        </h1>
        <p className="text-[#475569] text-lg">
          Upload your resume and let AutoIntern do the rest — match, apply, and track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAButton text="Get Started" href="/resume-upload" />
          <CTAButton text="Browse Internships" href="/internships" outlined />
        </div>
      </div>
      <div className="mt-12 md:mt-0">
        <ApplicationCard />
      </div>
    </section>
  );
}
