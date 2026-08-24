import { motion } from 'framer-motion';
import { Maximize2, Tag } from 'lucide-react';

export default function ArtworkCard({ artwork, index, onSelect }) {
  const isLandscape = artwork.aspectRatio === 'landscape';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.05 }}
      onClick={() => onSelect(artwork)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-200/80 shadow-md shadow-indigo-500/5 hover:shadow-xl hover:shadow-indigo-500/15 hover:border-indigo-500/30 transition-shadow duration-300 flex flex-col justify-between ${
        isLandscape ? 'sm:col-span-2' : 'col-span-1'
      }`}
      tabIndex={0}
      role="button"
      aria-label={`View ${artwork.title} details`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-slate-100 border-b border-slate-100 ${
        isLandscape ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/5]'
      }`}>
        <img
          src={artwork.image}
          alt={artwork.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
          <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold bg-white/90 text-slate-900 backdrop-blur-sm shadow-md">
              <Tag className="w-3 h-3 text-indigo-600" />
              {artwork.category}
            </span>
            <span className="p-2 rounded-full bg-indigo-600 text-white shadow-md">
              <Maximize2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Year Tag */}
        <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm text-slate-700 border border-slate-200/60 font-mono font-semibold text-[11px] rounded-md shadow-sm">
          {artwork.year}
        </div>
      </div>

      {/* Info Bar */}
      <div className="p-5 bg-white space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-display font-semibold text-indigo-600">
            {artwork.category}
          </span>
        </div>

        <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
          {artwork.title}
        </h3>

        <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
          {artwork.description}
        </p>
      </div>
    </motion.div>
  );
}
