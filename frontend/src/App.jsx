import { Routes, Route } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import ProcessSection from "./components/ProcessSection";
import CallToActionSection from "./components/CallToActionSection";
import Header from "./components/Header";

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import NotFound from "./pages/NotFound";
import InternshipPage from "./pages/InternshipPage";
import ResumeUploadPage from "./pages/ResumeUploadPage";
// import ResumeManagerPage from "./pages/ResumeManagerPage";
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
      {/* <Route
        path="/resume-manager"
        element={
          <PrivateRoute>
            <ResumeManagerPage />
          </PrivateRoute>
        }
      /> */}
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
  );
}

export default App;
