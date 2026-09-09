import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ResumeModal from './components/ResumeModal';

import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

function AnimatedRoutes({ onOpenResume }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AboutPage onOpenResume={onOpenResume} />} />
        <Route path="/about" element={<AboutPage onOpenResume={onOpenResume} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/showcase" element={<GalleryPage initialMode="3d" />} />
        <Route path="/coverflow" element={<GalleryPage initialMode="3d" />} />
        <Route path="/skills" element={<SkillsPage onOpenResume={onOpenResume} />} />
        <Route path="/commissions" element={<SkillsPage onOpenResume={onOpenResume} />} />
        <Route path="/contact" element={<ContactPage onOpenResume={onOpenResume} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenResume = () => {
    setIsResumeOpen(true);
  };

  const handleCloseResume = () => {
    setIsResumeOpen(false);
  };

  const handleOpenContactFromResume = () => {
    setIsResumeOpen(false);
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A10] text-[#F1F5F9] font-sans selection:bg-indigo-500/30 selection:text-white relative">
      <ScrollToTop />
      <Navbar onOpenResume={handleOpenResume} />
      <main className="flex-1">
        <AnimatedRoutes onOpenResume={handleOpenResume} />
      </main>
      <Footer onOpenResume={handleOpenResume} />

      {/* Global Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={handleCloseResume}
        onOpenContact={handleOpenContactFromResume}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
