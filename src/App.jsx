import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import StudioParticles from './components/ui/StudioParticles';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* หน้าหลักคือหน้าผลงาน (Works / Gallery) */}
        <Route path="/" element={<GalleryPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/showcase" element={<GalleryPage initialMode="3d" />} />
        <Route path="/coverflow" element={<GalleryPage initialMode="3d" />} />

        {/* หน้า Profile ปรับให้กระชับ มินิมอล */}
        <Route path="/profile" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Redirect หน้าอื่นๆ ให้เข้าหน้า Profile เพื่อให้ข้อมูลครบถ้วน */}
        <Route path="/skills" element={<Navigate to="/profile" replace />} />
        <Route path="/commissions" element={<Navigate to="/profile" replace />} />
        <Route path="/contact" element={<Navigate to="/profile" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090A10] text-[#F1F5F9] font-sans selection:bg-indigo-500/30 selection:text-white relative">
      <StudioParticles />
      <div className="film-grain" aria-hidden="true" />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <AnimatedRoutes />
      </main>
      <Footer />
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
