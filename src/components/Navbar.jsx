import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const navLinks = [
  { name: 'แนะนำตัว', path: '/' },
  { name: 'ผลงาน', path: '/gallery' },
  { name: 'Commission', path: '/commissions' },
  { name: 'ติดต่อฉัน', path: '/contact' },
];

export default function Navbar() {
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
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-white/95 backdrop-blur-md border-slate-200/80 shadow-lg shadow-slate-900/5'
              : 'bg-white/85 backdrop-blur-sm border-slate-200/60 shadow-sm'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2 sm:gap-2.5 text-slate-900 font-display font-extrabold text-sm sm:text-base md:text-lg lg:text-xl tracking-tight select-none"
          >
            <motion.span
              whileHover={{ rotate: 10, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 shrink-0"
            >
              CM
            </motion.span>
            <span className="truncate">
              CHATCHANOK <span className="text-indigo-600 font-medium">MAKMOOL</span>
            </span>
          </Link>

          {/* Desktop & Tablet Navigation with React Router Active Indicator */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 bg-slate-100/80 p-1 sm:p-1.5 rounded-full border border-slate-200/60 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 lg:px-4 py-1.5 sm:py-2 text-xs lg:text-sm font-display font-semibold rounded-full transition-colors duration-200 z-10 whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-indigo-600 rounded-full shadow-md shadow-indigo-600/25 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/commissions"
                className="hidden lg:inline-flex items-center gap-2 px-3.5 lg:px-4 py-2 text-xs font-display font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-full transition-all whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Commission Open</span>
              </Link>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 transition-colors touch-manipulation"
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
            {/* Backdrop overlay to close on touch outside */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs -z-10 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="md:hidden mt-2.5 max-w-lg mx-auto rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl shadow-slate-900/15"
            >
              <div className="space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-display font-bold text-sm transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                          : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to="/commissions"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 text-xs sm:text-sm font-display font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-600/25 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Request Commission</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
