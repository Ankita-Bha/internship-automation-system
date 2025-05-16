import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#FFF9F4] text-[#1E293B] border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 py-8 md:flex md:justify-between md:items-start">
        {/* Left - About */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-[#FF6B00] font-semibold text-lg mb-2">AutoIntern</h3>
          <p className="text-[#475569] text-sm leading-relaxed max-w-xs">
            Connecting talented students with the right internship opportunities through our advanced automation system.
          </p>
        </div>

        {/* Middle - Quick Links */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-[#FF6B00] font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 text-[#475569] text-sm">
            <li>
              <a href="/internships" className="hover:text-[#F97316] transition-colors duration-200">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/resume-upload" className="hover:text-[#F97316] transition-colors duration-200">
                Find Internships
              </a>
            </li>
            <li>
              <a href="/application-status" className="hover:text-[#F97316] transition-colors duration-200">
                Application Status
              </a>
            </li>
          </ul>
        </div>

        {/* Right - Contact */}
        <div className="md:w-1/3">
          <h3 className="text-[#FF6B00] font-semibold text-lg mb-2">Contact</h3>
          <p className="text-[#475569] text-sm">
            Email:{" "}
            <a
              href="mailto:ankitabhamidimarri21804@gmail.com"
              className="hover:text-[#F97316] transition-colors duration-200"
              target="_blank"
              rel="noreferrer"
            >
              ankitabhamidimarri21804@gmail.com
            </a>
          </p>
          <p className="text-[#475569] text-sm mt-1">
            Phone:{" "}
            <a
              href="tel:+916304450121"
              className="hover:text-[#F97316] transition-colors duration-200"
              target="_blank"
              rel="noreferrer"
            >
              +91 6304450121
            </a>
          </p>
          <p className="text-[#475569] text-sm mt-1">Address: Hyderabad, Telangana, India</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="border-t border-[#E5E7EB] mt-4 pt-4 max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between text-[#94A3B8] text-xs">
        <p>© 2025 AutoIntern. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-[#FF6B00] transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors duration-200">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#FF6B00] transition-colors duration-200">
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
