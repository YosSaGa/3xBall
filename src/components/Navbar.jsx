import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Send } from 'lucide-react';

const navLinks = [
  { name: 'โปรไฟล์', path: '/' },
  { name: 'ผลงาน', path: '/gallery' },
  { name: 'ทักษะ & ไปป์ไลน์', path: '/skills' },
  { name: 'ติดต่อฉัน', path: '/contact' },
];

export default function Navbar({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[#0F1222]/90 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/40'
              : 'bg-[#0F1222]/70 backdrop-blur-md border-white/10 shadow-lg shadow-black/20'
          }`}
        >
          {/* Brand Logo & Candidate Title */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 sm:gap-3 text-white font-display font-extrabold text-sm sm:text-base md:text-lg tracking-tight select-none"
          >
            <motion.span
              whileHover={{ rotate: 8, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/40 shrink-0 border border-white/20"
            >
              CM
            </motion.span>
            <div className="flex flex-col">
              <span className="truncate leading-tight">
                CHATCHANOK <span className="text-indigo-400 font-semibold">MAKMOOL</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-normal uppercase hidden sm:block">
                Digital Illustrator & 2D Artist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Animated Framer Pill */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10 relative">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/' && location.pathname === '/about') ||
                (link.path === '/gallery' && (location.pathname === '/showcase' || location.pathname === '/coverflow')) ||
                (link.path === '/skills' && location.pathname === '/commissions');

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 lg:px-4 py-1.5 text-xs lg:text-sm font-display font-semibold rounded-full transition-colors duration-200 z-10 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeStudioNavPill"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-lg shadow-indigo-600/35 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Recruiter Action CTA: Resume Modal & Contact */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Open to Work Indicator */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>พร้อมเริ่มงาน (Open to Work)</span>
            </div>

            {/* Resume Button */}
            {onOpenResume && (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenResume}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-display font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/15 rounded-full transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Resume (CV)</span>
              </motion.button>
            )}

            {/* Direct Hire CTA */}
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/contact"
                className="btn-primary shimmer-effect px-3.5 sm:px-4 py-2 text-xs font-display font-bold flex items-center gap-1.5 rounded-full shadow-md shadow-indigo-600/30 whitespace-nowrap"
              >
                <Send className="w-3 h-3" />
                <span>สมัครงาน / สัมภาษณ์</span>
              </Link>
            </motion.div>

            {/* Mobile Menu Hamburger */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 text-slate-200 transition-colors touch-manipulation"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs -z-10 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="md:hidden mt-2.5 max-w-lg mx-auto rounded-2xl border border-white/15 bg-[#0F1222]/95 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl shadow-black/80 space-y-3 text-slate-200"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-display font-semibold text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Full-Time / Contract
                </span>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const isActive =
                    location.pathname === link.path ||
                    (link.path === '/' && location.pathname === '/about') ||
                    (link.path === '/gallery' && (location.pathname === '/showcase' || location.pathname === '/coverflow')) ||
                    (link.path === '/skills' && location.pathname === '/commissions');

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl font-display font-bold text-sm transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'text-slate-300 hover:bg-white/5 active:bg-white/10'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenResume();
                    }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-display font-bold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl transition-colors border border-white/10"
                  >
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>เปิดดูเรซูเม่ (View Resume / CV)</span>
                  </button>
                )}

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary shimmer-effect flex items-center justify-center gap-2 w-full py-3 text-xs font-display font-bold rounded-xl shadow-lg shadow-indigo-600/30 text-white"
                >
                  <Send className="w-4 h-4" />
                  <span>ติดต่อนัดสัมภาษณ์ / Art Test</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
