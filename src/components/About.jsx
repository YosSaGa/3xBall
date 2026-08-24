import { motion } from 'framer-motion';
import { Sparkles, Palette, Image as ImageIcon, ShieldCheck, Layers } from 'lucide-react';
import { artistBio } from '../data/artworks';

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

export default function About() {
  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const highlights = [
    { icon: Palette, title: 'Character & Keyframe Design', desc: 'Crafting expressive digital character art with focus on dynamic posing, costume detail, and silhouette.' },
    { icon: Layers, title: 'Cinematic Lighting & Tone', desc: 'Utilizing rich color palettes, atmospheric glow, and narrative keylight to evoke emotional depth.' },
    { icon: Sparkles, title: 'Digital Painting Technique', desc: 'Combining sharp digital linework with soft textured rendering for high-resolution deliverables.' },
    { icon: ShieldCheck, title: 'Professional Workflow', desc: 'Transparent milestone approvals from thumb-sketches to final color polish for clients and studios.' }
  ];

  return (
    <section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#FAFAFD] overflow-hidden">
      {/* Background Soft Gradient Aura Spotlights */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-rose-500/5 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO INTRO BLOCK WITH STAGGERED MOTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center mb-24">
          
          {/* Left Column: Greeting & Headline */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-display font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>แนะนำตัว — Illustrator Portfolio</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                {artistBio.name}
              </h1>
              
              <div className="text-xl sm:text-3xl font-display font-bold text-indigo-600 flex items-center justify-center lg:justify-start gap-2">
                <h2>{artistBio.title}</h2>
              </div>
            </motion.div>

            {/* Tagline / Short Intro */}
            <motion.p variants={itemVariants} className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {artistBio.tagline} Welcome to my digital artwork archive featuring character illustrations, concept paintings, and custom commission work.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScrollTo('gallery')}
                className="btn-primary px-7 py-3.5 w-full sm:w-auto font-display font-semibold text-sm flex items-center justify-center gap-2.5"
              >
                <ImageIcon className="w-4 h-4" />
                <span>ดูผลงาน (View Gallery)</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleScrollTo('commissions')}
                className="btn-secondary px-7 py-3.5 w-full sm:w-auto font-display font-semibold text-sm flex items-center justify-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>สั่งทำ Commission</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Featured Artwork Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative mx-auto max-w-md lg:max-w-none artwork-glow cursor-pointer"
              onClick={() => handleScrollTo('gallery')}
            >
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-2xl shadow-indigo-500/10 p-2.5">
                <div className="rounded-2xl overflow-hidden border border-slate-100">
                  <img
                    src="/assets/artworks/art-57.png"
                    alt="Featured Artwork by Chatchanok Makmool"
                    className="w-full h-[420px] sm:h-[500px] object-cover object-center"
                  />
                </div>

                <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-display font-bold tracking-widest text-indigo-600 block">Featured Piece</span>
                    <h3 className="text-base font-display font-bold text-slate-900">Celestial Harmony</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-indigo-600 border border-slate-200 text-xs font-mono font-semibold shadow-sm">2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* INTEGRATED BIO STORY & ARTIST BACKGROUND */}
        <div className="pt-20 border-t border-slate-200/80">
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

            {/* Right Column: Narrative Story & Highlights */}
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

              {/* Highlights Cards */}
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

      </div>
    </section>
  );
}
