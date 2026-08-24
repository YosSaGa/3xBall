import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Palette, Image as ImageIcon, ShieldCheck, Layers, ArrowRight, Eye } from 'lucide-react';
import { artistBio, artworksData } from '../data/artworks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AboutPage() {
  const highlights = [
    { icon: Palette, title: 'Character & Keyframe Design', desc: 'Crafting expressive digital character art with focus on dynamic posing, costume detail, and silhouette.' },
    { icon: Layers, title: 'Cinematic Lighting & Tone', desc: 'Utilizing rich color palettes, atmospheric glow, and narrative keylight to evoke emotional depth.' },
    { icon: Sparkles, title: 'Digital Painting Technique', desc: 'Combining sharp digital linework with soft textured rendering for high-resolution deliverables.' },
    { icon: ShieldCheck, title: 'Professional Workflow', desc: 'Transparent milestone approvals from thumb-sketches to final color polish for clients and studios.' }
  ];

  const recentPreviews = artworksData.slice(1, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FAFAFD] overflow-hidden"
    >
      {/* Background Soft Gradient Aura Spotlights */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-rose-500/5 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* HERO BANNER SECTION (WITH HORIZONTAL LANDSCAPE IMAGE) */}
        <div className="space-y-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-display font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>แนะนำตัว — Illustrator Portfolio</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                {artistBio.name}
              </h1>
              
              <div className="text-xl sm:text-3xl font-display font-bold text-indigo-600 flex items-center justify-center gap-2">
                <h2>{artistBio.title}</h2>
              </div>
            </motion.div>

            {/* Tagline / Intro */}
            <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed">
              {artistBio.tagline} Welcome to my digital artwork archive featuring character illustrations, concept paintings, and custom commission work.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to="/gallery"
                className="btn-primary px-8 py-3.5 w-full sm:w-auto font-display font-semibold text-sm flex items-center justify-center gap-2.5"
              >
                <ImageIcon className="w-4 h-4" />
                <span>ดูผลงานทั้งหมด (View Gallery)</span>
              </Link>

              <Link
                to="/commissions"
                className="btn-secondary px-8 py-3.5 w-full sm:w-auto font-display font-semibold text-sm flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>สั่งทำ Commission</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* HORIZONTAL LANDSCAPE HERO SHOWCASE (horizontalpic.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <Link to="/gallery">
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative mx-auto artwork-glow cursor-pointer"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-2xl shadow-indigo-500/10 p-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-100 relative aspect-[16/9] sm:aspect-[21/9] max-h-[500px]">
                    <img
                      src="/assets/artworks/hero-banner.png"
                      alt="Featured Horizontal Artwork by Chatchanok Makmool"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradient Overlay & Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end justify-between p-6">
                      <div className="text-white space-y-1">
                        <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-display font-semibold tracking-wider uppercase inline-block mb-1">
                          Featured Horizontal Banner
                        </span>
                        <h3 className="text-xl sm:text-3xl font-display font-bold">Panorama Horizon</h3>
                        <p className="text-xs sm:text-sm text-slate-200 font-normal">Cinematic landscape & keyframe digital illustration</p>
                      </div>

                      <span className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 text-slate-900 font-display font-semibold text-xs backdrop-blur-md shadow-lg">
                        <Eye className="w-4 h-4 text-indigo-600" />
                        <span>Click to Explore</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* FULL BIO & BACKGROUND NARRATIVE */}
        <div className="pt-16 border-t border-slate-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Studio Portrait Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="anime-card p-3 bg-white"
              >
                <div className="relative rounded-2xl overflow-hidden border border-slate-100">
                  <img
                    src={artistBio.portraitImage}
                    alt="Chatchanok Makmool Artist Portrait"
                    className="w-full h-[360px] sm:h-[420px] object-cover object-center"
                  />
                  <div className="p-4 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-display font-bold text-slate-900">{artistBio.name}</h4>
                      <p className="text-xs text-indigo-600 font-medium">{artistBio.title}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-display font-semibold">
                      Digital Artist
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Bio Narrative & Skill Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-display font-semibold text-xs">
                <span>📖</span>
                <span>เรื่องราวของฉัน — Background & Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
                Creating Expressive Visual Stories
              </h2>

              <div className="space-y-4 text-slate-600 text-base font-normal leading-relaxed">
                {artistBio.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Skill Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {highlights.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3 }}
                      className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1.5 hover:border-indigo-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-indigo-600 font-display font-bold text-sm">
                        <IconComp className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        <span className="text-slate-900">{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-normal leading-normal">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

            </motion.div>

          </div>
        </div>

        {/* GALLERY PREVIEW TEASER SECTION */}
        <div className="pt-16 border-t border-slate-200/80 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-display font-semibold text-indigo-600 uppercase tracking-wider">Preview Works</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">Recent Character Artworks</h3>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-display font-semibold text-sm group"
            >
              <span>View All 9 Artworks</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recentPreviews.map((art) => (
              <Link to="/gallery" key={art.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="anime-card overflow-hidden group"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white text-slate-900 text-xs font-display font-bold">
                        View in Gallery
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <div className="text-xs font-display font-semibold text-indigo-600">{art.category}</div>
                    <h4 className="text-base font-display font-bold text-slate-900">{art.title}</h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA CALLOUT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/20"
        >
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-bold">Ready to Start a Project?</h3>
            <p className="text-indigo-100 text-sm font-normal max-w-xl">
              Explore the complete 9-piece artwork gallery or send a commission request for custom illustrations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="px-6 py-3 rounded-xl bg-white text-indigo-600 font-display font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              Explore Gallery
            </Link>
            <Link
              to="/commissions"
              className="px-6 py-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-display font-semibold text-sm border border-indigo-500 transition-colors flex items-center gap-1.5"
            >
              <span>Commissions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
