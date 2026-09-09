import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LayoutGrid, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CoverFlowCarousel } from '@/components/ui/3-d-coverflow-carousel';
import ArtworkModal from '@/components/ArtworkModal';
import { artworksData } from '@/data/artworks';

export default function ShowcasePage() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Map candidate's artworks to CarouselItem structure
  const artistItems = artworksData.map((art) => ({
    tag: `#${art.category.split('/')[0].trim().replace(/\s+/g, '')}`,
    titleLine1: art.title.toUpperCase(),
    titleLine2: `– ${art.year} • ${art.role ? art.role.toUpperCase() : 'CONCEPT ART'}`,
    desc: art.description,
    img: art.image,
    ctaText: "Inspect Specs (ดูสเปก)",
    originalArt: art,
  }));

  const handleCtaClick = (item) => {
    if (item.originalArt) {
      setSelectedArtwork(item.originalArt);
    }
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 sm:pt-28 md:pt-32 pb-16 overflow-hidden studio-mesh relative min-h-screen flex flex-col justify-between"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-amber-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6 sm:space-y-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-display font-semibold text-xs uppercase tracking-wider backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>3D Coverflow Showcase • Cinematic Perspective</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight"
          >
            3D Coverflow Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base font-normal leading-relaxed"
          >
            นำเสนอผลงานด้วย 3D Coverflow Stage พร้อม Ambient Blur Background สามารถคลิกเลื่อน, ลากเมาส์ หรือใช้ปุ่มลูกศร (← / →) บนคีย์บอร์ด
          </motion.p>


        </div>

        {/* New 3-D Coverflow Carousel Stage */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0a09]">
          <CoverFlowCarousel
            items={artistItems}
            sectionLabel="FEATURED STUDIO ARTWORKS & KEYFRAMES"
            autoplay={true}
            autoplayDelay={4500}
            onCtaClick={handleCtaClick}
          />
        </div>

        {/* Quick Actions & Navigation to Grid Gallery */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-xl mx-auto">
          <Link
            to="/gallery"
            className="btn-secondary w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 text-center"
          >
            <LayoutGrid className="w-4 h-4 text-indigo-400" />
            <span>สลับไปหน้าแกลเลอรีแบบ Grid (Standard Gallery)</span>
          </Link>

          <Link
            to="/contact"
            className="btn-primary shimmer-effect w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-display font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 text-white text-center"
          >
            <Send className="w-4 h-4" />
            <span>ติดต่อร่วมงาน / นัดสัมภาษณ์</span>
          </Link>
        </div>

      </div>

      {/* Production Case Study Lightbox Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </motion.div>
  );
}
