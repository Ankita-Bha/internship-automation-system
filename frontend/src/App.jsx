// import HeroSection from "./components/HeroSection";
// import ProcessSection from "./components/ProcessSection";
// import CallToActionSection from "./components/CallToActionSection";

// function App() {
//   return (
//     <>
//       <HeroSection />
//       <ProcessSection />
//       <CallToActionSection />
//     </>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import CallToActionSection from "./components/CallToActionSection";

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard";
import InternshipPage from "./pages/InternshipPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ResumeManagerPage from "./pages/ResumeManagerPage";
import ApplicationStatusPage from "./pages/ApplicationStatusPage";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <CallToActionSection />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/internships" element={<InternshipPage />} />
      <Route path="/resume-upload" element={<ResumeUploadPage />} />
      <Route path="/resume-manager" element={<ResumeManagerPage />} />
      <Route path="/application-status" element={<ApplicationStatusPage />} />
    </Routes>
  );
}

export default App;
