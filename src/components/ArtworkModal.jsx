import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, Layers, Wrench, Clock, Send, ZoomIn, ZoomOut } from 'lucide-react';

export default function ArtworkModal({ artwork, onClose }) {
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

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

  const handleRecruitInquiry = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 lg:p-8 overflow-y-auto"
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md -z-10"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-6xl bg-[#0F1222] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/80 my-auto max-h-[92vh] flex flex-col text-slate-200"
        >
          {/* Top Control Bar */}
          <div className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-[#14182E]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-display font-semibold uppercase tracking-wider text-indigo-300">
                Project Case Study & Technical Breakdown
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-display font-semibold text-slate-200 transition-colors"
                title={isZoomed ? "Reset Zoom" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{isZoomed ? "Actual Size" : "Zoom View"}</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-12 overflow-y-auto">
            {/* Artwork Showcase Canvas */}
            <div className="lg:col-span-7 bg-[#07080F] flex items-center justify-center p-3 sm:p-6 min-h-[260px] max-h-[48vh] sm:max-h-[55vh] lg:max-h-[78vh] overflow-auto shrink-0 relative group">
              <img
                src={artwork.image}
                alt={artwork.title}
                className={`max-h-full w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>

            {/* Studio Technical Details & Pipeline Breakdown */}
            <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between space-y-5 bg-[#0F1222] overflow-y-auto">
              <div className="space-y-4">
                {/* Category & Status Pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    <Tag className="w-3.5 h-3.5" />
                    {artwork.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-slate-300 border border-white/10">
                    <Calendar className="w-3.5 h-3.5" />
                    {artwork.year}
                  </span>
                </div>

                {/* Title & Role */}
                <div className="space-y-1">
                  <h2 id="modal-title" className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white leading-tight">
                    {artwork.title}
                  </h2>
                  {artwork.role && (
                    <p className="text-xs sm:text-sm font-display font-semibold text-indigo-400">
                      Role: {artwork.role}
                    </p>
                  )}
                </div>

                {/* Concept Brief & Narrative */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
                  <h4 className="text-[11px] uppercase font-display font-bold text-indigo-400 tracking-wider">
                    Design Intent & Artistic Brief
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-display font-semibold text-slate-400 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-indigo-400" />
                      Tools Used
                    </span>
                    <p className="text-xs font-display font-bold text-white">
                      {artwork.tools?.join(', ') || 'Photoshop, CSP'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-display font-semibold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      Production Time
                    </span>
                    <p className="text-xs font-display font-bold text-white font-mono">
                      {artwork.timeSpent || '16 Hours'}
                    </p>
                  </div>

                  <div className="col-span-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-display font-semibold text-slate-400 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-indigo-400" />
                      Resolution & Deliverables
                    </span>
                    <p className="text-xs font-display font-bold text-white">
                      {artwork.resolution || '3000 x 4000 (300 DPI High-Res)'}
                    </p>
                  </div>
                </div>

                {/* Production Workflow & Layer Structure */}
                {artwork.workflowNotes && (
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 space-y-1">
                    <h4 className="text-[11px] uppercase font-display font-bold text-indigo-400">
                      Production Pipeline Notes
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {artwork.workflowNotes}
                    </p>
                    {artwork.layers && (
                      <p className="text-[11px] text-slate-400 pt-1 border-t border-white/5 font-mono">
                        📁 {artwork.layers}
                      </p>
                    )}
                  </div>
                )}

                {/* Tags & Competencies */}
                {artwork.tags && artwork.tags.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-1.5">
                      {artwork.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 text-[11px] rounded-lg bg-white/5 text-slate-300 border border-white/10 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recruiter Action CTA */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={handleRecruitInquiry}
                  className="btn-primary shimmer-effect w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 text-xs font-display font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/30"
                >
                  <Send className="w-4 h-4" />
                  <span>สนใจร่วมงาน / พูดคุยเกี่ยวกับชิ้นงานนี้</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
