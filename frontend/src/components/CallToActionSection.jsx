import CTAButton from "./CTAButton";

export default function CallToActionSection() {
  return (
    <section className="bg-gradient-to-r from-[#F95A00] to-[#FF6B00] py-12 px-8 text-center text-white">
      <h2 className="text-3xl font-bold mb-4">Ready to Jumpstart Your Career?</h2>
      <p className="mb-6 text-white text-opacity-90">
        Create your profile and find internships tailored just for you.
      </p>
      <CTAButton text="Create Your Profile" href="/register" />
    </section>
  );
}
