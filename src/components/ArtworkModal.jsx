import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, Sparkles } from 'lucide-react';

export default function ArtworkModal({ artwork, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm -z-10"
        />

        {/* Professional Anime Lightbox Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/15 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur-md transition-all group"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[88vh] overflow-y-auto lg:overflow-visible">
            {/* Image Showcase */}
            <div className="lg:col-span-7 bg-slate-950 flex items-center justify-center p-4 sm:p-6">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Artwork Details */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
              <div className="space-y-4">
                {/* Category & Year Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                    <Tag className="w-3.5 h-3.5" />
                    {artwork.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700">
                    <Calendar className="w-3.5 h-3.5" />
                    {artwork.year}
                  </span>
                </div>

                {/* Title */}
                <h2 id="modal-title" className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
                  {artwork.title}
                </h2>

                {/* Concept Notes */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <h4 className="text-xs uppercase font-display font-semibold text-indigo-600">Artwork Concept</h4>
                  <p className="text-slate-600 text-sm font-normal leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                {/* Tags */}
                {artwork.tags && artwork.tags.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-display font-semibold text-slate-700">Tags & Style</h4>
                    <div className="flex flex-wrap gap-2">
                      {artwork.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs rounded-lg bg-slate-100 text-slate-600 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="#commissions"
                  onClick={onClose}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-display font-semibold uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Similar Commission</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
