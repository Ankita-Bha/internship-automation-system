import { Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import CallToActionSection from "./components/CallToActionSection";
import Header from "./components/Header";
import Footer from "./components/Footer";  // <-- import Footer

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import NotFound from "./pages/NotFound";
import InternshipPage from "./pages/InternshipPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
import ApplicationStatusPage from "./pages/ApplicationStatusPage";

import PrivateRoute from "./components/PrivateRoute";

function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <ProcessSection />
      <CallToActionSection />
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content container grows to fill vertical space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* ✅ Protected routes */}
          <Route
            path="/internships"
            element={
              <PrivateRoute>
                <InternshipPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/resume-upload"
            element={
              <PrivateRoute>
                <ResumeUploadPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/application-status"
            element={
              <PrivateRoute>
                <ApplicationStatusPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
