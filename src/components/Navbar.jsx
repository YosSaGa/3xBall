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
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex items-center justify-between px-6 py-3.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 backdrop-blur-md border-slate-200/80 shadow-lg shadow-slate-900/5'
              : 'bg-white/80 backdrop-blur-sm border-slate-200/50'
          }`}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="group flex items-center gap-2.5 text-slate-900 font-display font-extrabold text-lg sm:text-xl tracking-tight"
          >
            <motion.span
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-500/25"
            >
              CM
            </motion.span>
            <span>
              CHATCHANOK <span className="text-indigo-600 font-medium">MAKMOOL</span>
            </span>
          </Link>

          {/* Desktop Navigation with React Router Active Indicator */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-display font-semibold rounded-full transition-colors duration-200 z-10 ${
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
          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/commissions"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-display font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/60 rounded-full transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Commission Open</span>
              </Link>
            </motion.div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
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
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="md:hidden mt-3 max-w-md mx-auto rounded-3xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-900/10"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-display font-bold text-sm transition-all ${
                    location.pathname === link.path
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2">
                <Link
                  to="/commissions"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-display font-bold text-white bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/25"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Commission</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
