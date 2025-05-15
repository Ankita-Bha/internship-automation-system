import { Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import CallToActionSection from "./components/CallToActionSection";
import Header from "./components/Header";
// import Footer from "./components/FooterLink";

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
      <Header />
      <HeroSection />
      <ProcessSection />
      <CallToActionSection />
      {/* <FooterLink /> */}
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
      <Route path="/internships" element={<InternshipPage />} />
      <Route path="/resume-upload" element={<ResumeUploadPage />} />
      <Route path="/resume-manager" element={<ResumeManagerPage />} />
      <Route path="/application-status" element={<ApplicationStatusPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
