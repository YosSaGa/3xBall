import { Link } from 'react-router-dom';
import { ArrowUp, FileText } from 'lucide-react';

const footerNavLinks = [
  { name: 'ผลงาน', path: '/' },
  { name: 'โปรไฟล์', path: '/profile' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0A0C16] text-slate-300 py-8 sm:py-12 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-t from-indigo-900/10 via-purple-900/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand & Recruiter Availability */}
          <div className="space-y-1.5">
            <Link to="/" className="inline-flex items-center gap-2.5 font-display font-bold text-lg text-white select-none">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-extrabold shadow-md shadow-indigo-500/30">
                CM
              </span>
              <span>Chatchanok Makmool</span>
            </Link>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-time & Contract Studio Roles</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center font-display font-semibold text-xs sm:text-sm text-slate-400">
            {footerNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-white transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors py-1 flex items-center gap-1 text-indigo-400 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume (CV)</span>
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 active:bg-white/15 text-xs font-display font-semibold text-slate-200 border border-white/10 transition-all touch-manipulation cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </button>

        </div>

        <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Chatchanok Makmool. All rights reserved. 2D Concept Art & Digital Illustration.
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Optimized for Game & Animation Studios
          </div>
        </div>
      </div>
    </footer>
  );
}
