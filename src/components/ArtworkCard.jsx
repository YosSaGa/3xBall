import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Maximize2, Tag, Layers, Wrench, Sparkles } from 'lucide-react';

export default function ArtworkCard({ artwork, index, onSelect }) {
  const cardRef = useRef(null);
  const isLandscape = artwork.aspectRatio === 'landscape';

  // 3D Tilt and Cursor Spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 280,
    damping: 24,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;

    const xPct = mouseClientX / width - 0.5;
    const yPct = mouseClientY / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, delay: index * 0.05 }}
      className={`${isLandscape ? 'sm:col-span-2' : 'col-span-1'} [perspective:1000px]`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(artwork)}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d',
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer studio-card border border-white/10 hover:border-indigo-500/50 transition-colors duration-300 flex flex-col justify-between touch-manipulation h-full"
        tabIndex={0}
        role="button"
        aria-label={`View ${artwork.title} project breakdown`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(artwork);
          }
        }}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(400px circle at ${
              (mouseX.get() + 0.5) * 100
            }% ${(mouseY.get() + 0.5) * 100}%, rgba(129, 140, 248, 0.18), transparent 80%)`,
          }}
        />

        {/* Artwork Image Container */}
        <div
          className={`relative overflow-hidden bg-[#0A0C16] border-b border-white/10 ${
            isLandscape ? 'aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/5]'
          }`}
        >
          <img
            src={artwork.image}
            alt={artwork.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Vignette Shadow on Image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C16] via-transparent to-black/30 pointer-events-none" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-display font-semibold bg-[#0F1222]/85 text-indigo-300 border border-white/15 backdrop-blur-md shadow-lg">
              <Tag className="w-3 h-3 text-indigo-400" />
              {artwork.category}
            </span>

            <span className="px-2.5 py-1 bg-[#0F1222]/85 backdrop-blur-md text-slate-300 border border-white/15 font-mono font-bold text-[11px] rounded-lg shadow-sm">
              {artwork.year}
            </span>
          </div>

          {/* Hover Overlay with Studio Inspection Cue */}
          <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 backdrop-blur-xs">
            <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between">
              <div className="space-y-0.5 text-white">
                <span className="text-[10px] uppercase font-display font-bold tracking-widest text-indigo-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Studio Case Study
                </span>
                <span className="text-xs text-slate-200 font-normal">Click to Inspect Details & Pipeline</span>
              </div>
              <span className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/40">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* Artwork Info & Studio Specs Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-[#13162A]/90 to-[#0F1222] space-y-2.5 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                {artwork.title}
              </h3>
              {artwork.timeSpent && (
                <span className="text-[11px] font-mono text-indigo-300/80 shrink-0">
                  ⏱ {artwork.timeSpent}
                </span>
              )}
            </div>

            {artwork.role && (
              <p className="text-xs font-display font-semibold text-indigo-400/90">
                {artwork.role}
              </p>
            )}

            <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed pt-0.5">
              {artwork.description}
            </p>
          </div>

          {/* Studio Tools & Tags Footer */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 truncate">
              <Wrench className="w-3 h-3 text-indigo-400 shrink-0" />
              <span className="truncate">{artwork.tools?.join(', ') || 'Photoshop, CSP'}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px] shrink-0">
              <Layers className="w-3 h-3 text-indigo-400" />
              <span>Layered PSD</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
