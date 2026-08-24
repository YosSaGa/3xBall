import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Image as ImageIcon, Paintbrush } from 'lucide-react';
import { artistBio } from '../data/artworks';

export default function Hero() {
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

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/20 via-indigo-600/15 to-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-medium uppercase tracking-widest backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Accepting Commissions</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.1]"
              >
                {artistBio.name}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center justify-center lg:justify-start gap-3 text-lg sm:text-2xl font-light text-purple-300/90"
              >
                <Paintbrush className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                <h2>{artistBio.title}</h2>
              </motion.div>
            </div>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              {artistBio.tagline} Welcome to my visual archive featuring digital paintings, original character artwork, and custom commission work.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={() => handleScrollTo('gallery')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto font-medium text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <ImageIcon className="w-4 h-4 text-purple-200 relative z-10" />
                <span className="relative z-10">View Artwork</span>
              </button>

              <button
                onClick={() => handleScrollTo('commissions')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto font-medium text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-2xl backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Commission Me</span>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-xl mx-auto lg:mx-0"
            >
              {artistBio.stats.map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* Right Column - Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Floating Artwork Frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 via-indigo-600/20 to-pink-500/30 rounded-3xl blur-2xl opacity-70 animate-pulse pointer-events-none" />

              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#121422] shadow-2xl group">
                <img
                  src="/assets/artworks/artwork-01.jpg"
                  alt="Featured Artwork by Chatchanok Makmool"
                  className="w-full h-[460px] sm:h-[540px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Glass Badge Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold tracking-widest text-purple-400 block">Featured Artwork</span>
                    <h3 className="text-base font-display font-bold text-white">Celestial Echoes</h3>
                  </div>
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">2026</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 sm:mt-24 flex justify-center"
        >
          <button
            onClick={() => handleScrollTo('gallery')}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-purple-400 text-xs font-mono tracking-widest uppercase transition-colors group"
          >
            <span>Explore Archive</span>
            <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-purple-400" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
