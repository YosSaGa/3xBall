import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';

export default function ArtworkModal({
  artwork,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={artwork.title}
      >
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/92 backdrop-blur-xl -z-10"
        />

        {/* Modal Content Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-6xl max-h-[95vh] flex flex-col items-center justify-between select-none"
        >
          {/* Top Floating Control Bar */}
          <div className="w-full flex items-center justify-between px-3 sm:px-6 py-2.5 z-30 bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-full border border-white/10 mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm sm:text-base font-display font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {artwork.title}
              </span>
              {totalCount > 1 && (
                <span className="text-xs font-mono text-indigo-300 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25">
                  {currentIndex + 1} / {totalCount}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                title={isZoomed ? 'ย่อรูป (Fit)' : 'ขยายรูป (Zoom)'}
                aria-label="Toggle zoom"
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer"
                title="ปิด (ESC)"
                aria-label="Close image viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Image Stage */}
          <div className="relative w-full flex-1 flex items-center justify-center overflow-auto max-h-[82vh] rounded-2xl">
            <motion.div
              key={artwork.image}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`relative flex items-center justify-center ${
                isZoomed ? 'max-w-none cursor-zoom-out' : 'max-h-[82vh] max-w-full cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <OptimizedImage
                src={artwork.image}
                alt={artwork.title}
                containerClassName={`${
                  isZoomed
                    ? 'w-auto h-auto'
                    : 'max-h-[80vh] max-w-full flex items-center justify-center'
                }`}
                className={`rounded-xl sm:rounded-2xl shadow-2xl object-contain ${
                  isZoomed ? 'max-w-none' : 'max-h-[80vh] w-auto'
                }`}
              />
            </motion.div>

            {/* Left Prev Arrow Button */}
            {onPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                title="รูปก่อนหน้า (←)"
                aria-label="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            {/* Right Next Arrow Button */}
            {onNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
                title="รูปถัดไป (→)"
                aria-label="Next artwork"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
