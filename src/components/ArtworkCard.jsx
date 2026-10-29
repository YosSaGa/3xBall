import { memo } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import OptimizedImage from './ui/OptimizedImage';

function ArtworkCard({ artwork, index, onSelect }) {
  const isLandscape = artwork.aspectRatio === 'landscape';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.25) }}
      className={`${isLandscape ? 'sm:col-span-2' : 'col-span-1'} relative group cursor-pointer`}
      onClick={() => onSelect(artwork)}
      role="button"
      tabIndex={0}
      aria-label={`View ${artwork.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
    >
      <div className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0C16] border border-white/10 group-hover:border-indigo-500/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-indigo-500/10 transition-all duration-300 ${
        isLandscape ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/5] sm:aspect-[3/4]'
      }`}>
        <OptimizedImage
          src={artwork.thumbnail || artwork.image}
          alt={artwork.title}
          containerClassName="w-full h-full"
          className="group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Minimal Subtle Hover Gradient with Just Title & Zoom Icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
          <div className="text-white min-w-0 pr-2">
            <h3 className="text-sm sm:text-base font-display font-bold tracking-tight truncate">
              {artwork.title}
            </h3>
            {artwork.category && (
              <span className="text-[11px] text-indigo-300 font-medium block">
                {artwork.category}
              </span>
            )}
          </div>

          <span className="p-2 sm:p-2.5 rounded-xl bg-indigo-600/90 text-white shadow-lg backdrop-blur-md shrink-0">
            <Maximize2 className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default memo(ArtworkCard);
