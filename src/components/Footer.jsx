import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const footerNavLinks = [
  { name: 'แนะนำตัว', path: '/' },
  { name: 'ผลงาน', path: '/gallery' },
  { name: 'Commission', path: '/commissions' },
  { name: 'ติดต่อฉัน', path: '/contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-white">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
              CM
            </span>
            <span>Chatchanok Makmool</span>
          </Link>

          {/* Nav Links (4 items) */}
          <div className="flex items-center gap-6 flex-wrap justify-center font-display font-semibold text-xs sm:text-sm text-slate-400">
            {footerNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-display font-semibold text-white border border-slate-700 transition-all"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-indigo-400" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center text-xs font-normal text-slate-500">
          © {new Date().getFullYear()} Chatchanok Makmool. All rights reserved. Professional Digital Illustrator Portfolio.
        </div>
      </div>
    </footer>
  );
}
