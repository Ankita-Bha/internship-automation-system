import React, { useRef, useState } from "react";

const steps = [
  { title: "Register", description: "Create your account to get started" },
  { title: "Upload Resume", description: "Upload your resume or CV for analysis" },
  { title: "Browse Internships", description: "Find internships that match your profile" },
  { title: "Apply", description: "Apply directly through the platform" },
  { title: "Track Application", description: "Monitor your application status" },
];

export default function ApplicationCard() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative max-w-lg mx-auto px-4 group select-none cursor-grab">
      {/* Orange shadow card behind */}
      <div className="absolute -top-4 -left-4 w-full h-full bg-orange-300 rounded-xl filter blur-lg opacity-40"></div>

      <div className="relative bg-white rounded-xl shadow-lg p-8" style={{ minWidth: "380px" }}>
        <h3 className="text-lg font-semibold mb-6">Application Process</h3>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto scrollbar-hide px-2"
          style={{ scrollSnapType: "x mandatory", cursor: isDragging ? "grabbing" : "grab" }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          tabIndex={0}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-56 p-6 bg-white rounded-lg border border-transparent focus:outline-none"
              style={{ scrollSnapAlign: "start" }}
              tabIndex={-1}
            >
              <div className="flex items-center mb-3">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full font-bold text-lg">
                  {index + 1}
                </div>
                <h4 className="ml-4 font-semibold text-orange-600 text-lg">{step.title}</h4>
              </div>
              <p className="text-gray-600 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .focus\\:outline-none:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
