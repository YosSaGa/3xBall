import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, LayoutGrid, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkModal from '../components/ArtworkModal';
import { CoverFlowCarousel } from '@/components/ui/3-d-coverflow-carousel';
import { artworksData } from '../data/artworks';

export default function GalleryPage({ initialMode }) {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(() => {
    if (initialMode) return initialMode;
    if (location.pathname === '/showcase' || location.pathname === '/coverflow') return '3d';
    return '3d'; // Default to 3D mode for maximum wow factor!
  });

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const fullScreenContainerRef = useRef(null);

  // Fullscreen event listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsBrowserFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      if (fullScreenContainerRef.current?.requestFullscreen) {
        fullScreenContainerRef.current.requestFullscreen().catch((err) => {
          console.warn('Browser fullscreen request failed:', err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      }
    }
  };

  const categories = [
    { id: 'All', label: 'All Projects', count: artworksData.length },
    { id: 'Landscape / Keyframe', label: 'Landscape & Keyframe', count: artworksData.filter(a => a.category === 'Landscape / Keyframe').length },
    { id: 'Digital Illustration', label: 'Digital Illustration', count: artworksData.filter(a => a.category === 'Digital Illustration').length },
    { id: 'Cyberpunk / Character', label: 'Sci-Fi / Cyberpunk', count: artworksData.filter(a => a.category === 'Cyberpunk / Character').length },
    { id: 'Fantasy Concept', label: 'Fantasy Concept', count: artworksData.filter(a => a.category === 'Fantasy Concept').length },
    { id: 'Portrait Illustration', label: 'Character Portrait', count: artworksData.filter(a => a.category === 'Portrait Illustration').length },
  ];

  const filteredArtworks = activeCategory === 'All'
    ? artworksData
    : artworksData.filter(art => art.category === activeCategory);

  // 3D Carousel Item Mapping
  const artistItems = artworksData.map((art) => ({
    tag: `#${art.category.split('/')[0].trim().replace(/\s+/g, '')}`,
    titleLine1: art.title.toUpperCase(),
    titleLine2: `– ${art.year} • ${art.role ? art.role.toUpperCase() : 'CONCEPT ART'}`,
    desc: art.description,
    img: art.thumbnail || art.image,
    srcSet: art.srcSet,
    ctaText: "Inspect Specs (ดูสเปก)",
    originalArt: art,
  }));

  const handleCarouselCtaClick = (item) => {
    if (item.originalArt) {
      setSelectedArtwork(item.originalArt);
    }
  };


  return (
    <div className="w-full relative">
      {/* ============================================================ */}
      {/* MODE 1: FULL SCREEN 3D COVERFLOW MODE (เต็มจอ EDGE-TO-EDGE)  */}
      {/* ============================================================ */}
      {viewMode === '3d' && (
        <motion.div
          key="3d-mode-fullscreen"
          ref={fullScreenContainerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className={`w-full flex flex-col justify-between overflow-hidden bg-[#0c0a09] select-none transition-all duration-300 ${
            isBrowserFullscreen
              ? 'fixed inset-0 z-50 h-screen w-screen'
              : 'min-h-[calc(100vh-4.5rem)] pt-18 sm:pt-20 md:pt-22'
          }`}
        >
          {/* Floating Top Header Bar */}
          <div className="w-full z-30 px-3 sm:px-6 py-2.5 sm:py-3.5 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2.5">
              {/* Left Badge: 3D Stage Info */}
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs font-display font-semibold text-slate-200 backdrop-blur-xl shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">โหมด 3D เต็มจอ (IMMERSIVE SHOWCASE)</span>
                  <span className="sm:hidden font-bold">3D เต็มจอ</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    {artworksData.length} PIECES
                  </span>
                </div>
              </div>

              {/* Center: Mode Switcher (3D Fullscreen vs Grid Gallery) */}
              <div className="inline-flex items-center p-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl">
                <button
                  onClick={() => setViewMode('3d')}
                  className="relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer text-white"
                >
                  <motion.div
                    layoutId="activeViewModeTab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-600/40 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>โหมด 3D เต็มจอ</span>
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className="relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer text-slate-400 hover:text-white"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-indigo-300" />
                  <span>โหมด Grid รวม</span>
                </button>
              </div>

              {/* Right: Dataset Toggle & Browser Fullscreen Button */}
              <div className="flex items-center gap-2">

                {/* Browser Fullscreen Button */}
                <button
                  onClick={toggleBrowserFullscreen}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-xs font-display font-semibold text-slate-200 transition-all cursor-pointer backdrop-blur-xl shadow-lg hover:border-white/30"
                  title={isBrowserFullscreen ? 'ออกจากโหมดเต็มจอ (ESC)' : 'ขยายเต็มจอเบราว์เซอร์ (Fullscreen Mode)'}
                >
                  {isBrowserFullscreen ? (
                    <>
                      <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden md:inline">ย่อปกติ</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden md:inline">ขยายเต็มจอ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Center: 3D CoverFlow Stage stretching to full height */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <CoverFlowCarousel
              fullScreen={true}
              items={artistItems}
              sectionLabel="FEATURED STUDIO ARTWORKS & KEYFRAMES"
              autoplay={true}
              autoplayDelay={4500}
              onCtaClick={handleCarouselCtaClick}
            />
          </div>

          {/* Bottom Floating Footer / Helper Controls */}
          <div className="w-full z-30 px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 text-xs text-slate-400">
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-sans font-bold">←</span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-sans font-bold">→</span>
                <span>ปัดนิ้ว หรือกดลูกศรคีย์บอร์ดเพื่อหมุน 3D • คลิกการ์ดตรงกลางเพื่อเปิดดูสเปกเต็ม (Specs Breakdown)</span>
              </div>
              <div className="sm:hidden text-[11px] text-slate-400">
                ปัดนิ้วเพื่อหมุน 3D • แตะการ์ดเพื่อดูสเปก
              </div>

              <button
                onClick={() => setViewMode('grid')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-indigo-300 hover:text-white font-display font-semibold transition-all cursor-pointer text-xs"
              >
                <span>ดูทั้งหมดแบบ Grid ({artworksData.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Modal inside Fullscreen Container so it displays in Browser Fullscreen */}
          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}
        </motion.div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: GRID GALLERY VIEW                                    */}
      {/* ============================================================ */}
      {viewMode === 'grid' && (
        <motion.div
          key="grid-mode-portfolio"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden studio-mesh relative min-h-screen flex flex-col justify-between"
        >
          {/* Background ambient lighting */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-amber-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8 sm:space-y-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-display font-semibold text-xs uppercase tracking-wider backdrop-blur-md"
              >
                <Palette className="w-3.5 h-3.5 text-indigo-400" />
                <span>Artwork Archive & Case Studies ({artworksData.length} Selected Pieces)</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight"
              >
                Selected Production Portfolio
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed"
              >
                แฟ้มรวมผลงานภาพวาดดิจิทัล, การออกแบบตัวละคร และคีย์เฟรมมุมมองภาพยนตร์สำหรับโปรดักชันสตูดิโอ คลิกที่ภาพเพื่อเปิดดูสเปกและรายละเอียดเชิงเทคนิค
              </motion.p>

              {/* VIEW MODE SWITCHER (3D Coverflow vs Grid Gallery) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="pt-2 flex justify-center"
              >
                <div className="inline-flex items-center p-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl">
                  <button
                    onClick={() => setViewMode('3d')}
                    className="relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white"
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
                    <span>โหมด 3D เต็มจอ</span>
                  </button>

                  <button
                    onClick={() => setViewMode('grid')}
                    className="relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer text-white"
                  >
                    <motion.div
                      layoutId="activeViewModeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-600/40 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                    <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300" />
                    <span>โหมด Grid Gallery</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Category Filter Pills with Framer layoutId */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-display font-semibold rounded-full transition-colors duration-200 touch-manipulation select-none cursor-pointer flex items-center gap-1.5 z-10 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeGalleryCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full shadow-lg shadow-indigo-600/40 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span>{cat.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Dynamic Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredArtworks.map((artwork, idx) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    index={idx}
                    onSelect={setSelectedArtwork}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Shared Production Case Study Lightbox Modal */}
          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
