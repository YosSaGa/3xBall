import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutGrid, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkModal from '../components/ArtworkModal';
import { CoverFlowCarousel } from '@/components/ui/3-d-coverflow-carousel';
import { artworksData } from '../data/artworks';

export default function GalleryPage({ initialMode }) {
  const location = useLocation();
  const [viewMode, setViewMode] = useState(() => {
    if (initialMode) return initialMode;
    if (location.pathname === '/showcase' || location.pathname === '/coverflow') return '3d';
    return '3d';
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
    { id: 'All', label: 'ทั้งหมด', count: artworksData.length },
    { id: 'ตัวละคร', label: 'ตัวละคร', count: artworksData.filter(a => a.category === 'ตัวละคร').length },
    { id: 'ฉาก & คีย์เฟรม', label: 'ฉาก & คีย์เฟรม', count: artworksData.filter(a => a.category === 'ฉาก & คีย์เฟรม').length },
    { id: 'ภาพประกอบ', label: 'ภาพประกอบ', count: artworksData.filter(a => a.category === 'ภาพประกอบ').length },
    { id: 'คอนเซปต์ดีไซน์', label: 'คอนเซปต์ดีไซน์', count: artworksData.filter(a => a.category === 'คอนเซปต์ดีไซน์').length },
  ];

  const filteredArtworks = activeCategory === 'All'
    ? artworksData
    : artworksData.filter(art => art.category === activeCategory);

  // 3D Carousel Item Mapping
  const artistItems = artworksData.map((art) => ({
    tag: `#${art.category.replace(/\s+/g, '')}`,
    titleLine1: art.title,
    img: art.image,
    ctaText: "ดูภาพเต็มจอ",
    originalArt: art,
  }));

  const handleCarouselCtaClick = (item) => {
    if (item.originalArt) {
      setSelectedArtwork(item.originalArt);
    }
  };

  const currentIndex = selectedArtwork
    ? filteredArtworks.findIndex(a => a.id === selectedArtwork.id)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
    } else if (filteredArtworks.length > 0) {
      setSelectedArtwork(filteredArtworks[filteredArtworks.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredArtworks.length - 1) {
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
    } else if (filteredArtworks.length > 0) {
      setSelectedArtwork(filteredArtworks[0]);
    }
  };

  return (
    <div className="w-full relative">
      {/* ============================================================ */}
      {/* MODE 1: FULL SCREEN 3D COVERFLOW MODE                       */}
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
                  <span>3D เต็มจอ</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                    {artworksData.length} รูป
                  </span>
                </div>
              </div>

              {/* Center: Mode Switcher */}
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
                  <span>โหมด 3D</span>
                </button>

                <button
                  onClick={() => setViewMode('grid')}
                  className="relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer text-slate-400 hover:text-white"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-indigo-300" />
                  <span>โหมด Grid</span>
                </button>
              </div>

              {/* Right: Fullscreen Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleBrowserFullscreen}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-xs font-display font-semibold text-slate-200 transition-all cursor-pointer backdrop-blur-xl shadow-lg hover:border-white/30"
                  title={isBrowserFullscreen ? 'ออกจากโหมดเต็มจอ (ESC)' : 'ขยายเต็มจอเบราว์เซอร์'}
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

          {/* Center: 3D CoverFlow Stage */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10">
            <CoverFlowCarousel
              fullScreen={true}
              items={artistItems}
              sectionLabel="PORTFOLIO SHOWCASE"
              autoplay={true}
              autoplayDelay={4500}
              onCtaClick={handleCarouselCtaClick}
            />
          </div>

          {/* Bottom Floating Footer */}
          <div className="w-full z-30 px-3 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 text-xs text-slate-400">
              <div className="text-[11px] text-slate-400">
                ปัดนิ้วหรือกดลูกศรเพื่อหมุน 3D • แตะเพื่อดูรูปเต็มจอ
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

          {/* Modal inside Fullscreen Container */}
          {selectedArtwork && (
            <ArtworkModal
              key={selectedArtwork.id}
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
              onPrev={handlePrev}
              onNext={handleNext}
              currentIndex={currentIndex >= 0 ? currentIndex : 0}
              totalCount={filteredArtworks.length}
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8">
            {/* Minimal Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight"
              >
                ผลงานภาพวาด ({artworksData.length} ชิ้น)
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-slate-400 text-xs sm:text-sm font-normal"
              >
                คลิกที่รูปภาพเพื่อเปิดดูรูปขนาดเต็ม
              </motion.p>

              {/* VIEW MODE SWITCHER */}
              <div className="pt-1 flex justify-center">
                <div className="inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-xl">
                  <button
                    onClick={() => setViewMode('3d')}
                    className="relative px-4 py-1.5 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-white"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>โหมด 3D</span>
                  </button>

                  <button
                    onClick={() => setViewMode('grid')}
                    className="relative px-4 py-1.5 text-xs sm:text-sm font-display font-bold rounded-full transition-all flex items-center gap-1.5 cursor-pointer text-white"
                  >
                    <motion.div
                      layoutId="activeViewModeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-600/40 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                    <LayoutGrid className="w-3.5 h-3.5 text-indigo-300" />
                    <span>โหมด Grid รวมรูป</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-display font-semibold rounded-full transition-colors duration-200 touch-manipulation select-none cursor-pointer flex items-center gap-1.5 z-10 ${
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
            </div>
          </div>

          {/* Lightbox Image Viewer */}
          {selectedArtwork && (
            <ArtworkModal
              key={selectedArtwork.id}
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
              onPrev={handlePrev}
              onNext={handleNext}
              currentIndex={currentIndex >= 0 ? currentIndex : 0}
              totalCount={filteredArtworks.length}
            />
          )}
        </motion.div>
      )}
    </div>
  );
}
