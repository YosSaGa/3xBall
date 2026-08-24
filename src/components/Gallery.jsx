import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import ArtworkCard from './ArtworkCard';
import ArtworkModal from './ArtworkModal';
import { artworksData } from '../data/artworks';

export default function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Digital Illustration', 'Cyberpunk / Character', 'Fantasy Concept', 'Portrait Illustration'];

  const filteredArtworks = activeCategory === 'All'
    ? artworksData
    : artworksData.filter(art => art.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 bg-[#FAFAFD] overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-display font-semibold text-xs uppercase tracking-wider"
          >
            <Palette className="w-3.5 h-3.5 text-indigo-600" />
            <span>ผลงาน — Artwork Archive</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight"
          >
            Selected Artwork Portfolio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed"
          >
            Explore digital illustrations, anime character designs, and concept pieces. Click any artwork to preview in high resolution.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-2 flex-wrap pt-6"
          >
            {categories.map((cat) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-display font-semibold rounded-full transition-colors duration-200 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Animated Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
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

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <ArtworkModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </section>
  );
}
