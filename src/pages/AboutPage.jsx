import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Palette, Image as ImageIcon, ShieldCheck, Layers, ArrowRight, Eye, FileText, Send, Award, Briefcase, Zap } from 'lucide-react';
import { artistBio, artworksData } from '../data/artworks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage({ onOpenResume }) {
  const recentPreviews = artworksData.slice(1, 4);

  // 3D Tilt for Hero Showcase Banner
  const heroCardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateXSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 250,
    damping: 25,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 250,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;

    mouseX.set(mouseClientX / width - 0.5);
    mouseY.set(mouseClientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden studio-mesh relative"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-40 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        
        {/* HERO INTRO & STATS */}
        <div className="space-y-10 sm:space-y-14">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6"
          >
            {/* Candidate Live Status Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-display font-semibold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{artistBio.availability}</span>
              </div>
            </motion.div>

            {/* Main Headline & Target Title */}
            <motion.div variants={itemVariants} className="space-y-2 sm:space-y-3">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.1]">
                {artistBio.name}
              </h1>
              
              <div className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 flex items-center justify-center gap-2">
                <span>{artistBio.title}</span>
              </div>
            </motion.div>

            {/* Career Objective / Recruiter Summary */}
            <motion.p variants={itemVariants} className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
              {artistBio.tagline} ยินดีต้อนรับสู่แฟ้มสะสมผลงานดิจิทัลอาร์ต ออกแบบตัวละคร คีย์เฟรมภาพยนตร์ และคอนเซปต์อาร์ตระดับโปรดักชันสตูดิโอ
            </motion.p>

            {/* Action Buttons for Recruiters */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-3">
              <Link
                to="/gallery"
                className="btn-primary shimmer-effect px-6 sm:px-8 py-3.5 sm:py-4 font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30"
              >
                <ImageIcon className="w-4 h-4" />
                <span>ชมผลงานทั้งหมด (View Portfolio)</span>
              </Link>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="btn-secondary px-6 sm:px-8 py-3.5 sm:py-4 font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>ดูเรซูเม่ (Resume / CV)</span>
                </button>
              )}

              <Link
                to="/contact"
                className="btn-secondary px-6 sm:px-8 py-3.5 sm:py-4 font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 hover:border-indigo-400"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>ติดต่องาน / สัมภาษณ์</span>
              </Link>
            </motion.div>

            {/* Candidate Key Metrics */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 max-w-3xl mx-auto"
            >
              {artistBio.stats.map((stat, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-0.5">
                  <div className="text-xl sm:text-2xl font-display font-black text-white">{stat.value}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D TILT HORIZONTAL SHOWCASE BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative [perspective:1000px]"
          >
            <Link to="/gallery">
              <motion.div
                ref={heroCardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX: rotateXSpring,
                  rotateY: rotateYSpring,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: 1.015 }}
                className="relative mx-auto artwork-glow cursor-pointer"
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#101326] border border-white/15 shadow-2xl p-2 sm:p-3 group">
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] max-h-[520px]">
                    <img
                      src="/assets/artworks/hero-banner.png"
                      alt="Featured Horizontal Artwork by Chatchanok Makmool"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay & High-Tech Badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A10]/95 via-[#090A10]/35 sm:via-transparent to-transparent flex items-end justify-between p-4 sm:p-8">
                      <div className="text-white space-y-1 sm:space-y-2 max-w-xl">
                        <span className="px-3 py-1 rounded-full bg-indigo-600/90 text-white text-[10px] sm:text-xs font-display font-bold tracking-wider uppercase inline-flex items-center gap-1.5 border border-white/20 backdrop-blur-md">
                          <Sparkles className="w-3 h-3" />
                          Featured Studio Keyframe
                        </span>
                        <h3 className="text-xl sm:text-3xl md:text-4xl font-display font-extrabold tracking-tight">
                          Panorama Horizon
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 font-normal line-clamp-1 sm:line-clamp-none">
                          Cinematic landscape & keyframe digital concept illustration with volumetric atmospheric depth.
                        </p>
                      </div>

                      <span className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-display font-bold text-xs backdrop-blur-md border border-white/20 shadow-lg shrink-0 transition-colors">
                        <Eye className="w-4 h-4 text-indigo-400" />
                        <span>Inspect in Gallery</span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* STUDIO READINESS & VALUE PROPOSITION */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 space-y-8 sm:space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-display font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Production Readiness</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white">
              ทำไมสตูดิโอจึงควรเลือกผมร่วมทีม?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-normal">
              ความพร้อมในการทำงานร่วมกับทีมผู้กำกับศิลป์, 3D Modelers และ Animators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {artistBio.studioAdvantages.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-display font-bold text-white leading-snug">
                  {adv.title}
                </h3>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CANDIDATE PROFILE & ARTIST NARRATIVE */}
        <div className="pt-12 sm:pt-16 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Portrait Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="p-3 rounded-2xl sm:rounded-3xl bg-[#101326] border border-white/10 shadow-2xl space-y-3">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 aspect-[3/4]">
                  <img
                    src={artistBio.portraitImage}
                    alt="Chatchanok Makmool Studio Portrait"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <h4 className="text-base font-display font-bold text-white">{artistBio.name}</h4>
                      <p className="text-xs text-indigo-400 font-medium">{artistBio.title}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.03] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-400">Current Availability</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open to Work
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Bio & Core Values */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-display font-semibold text-xs">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Professional Background & Philosophy</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white leading-tight">
                Crafting Visual Stories with Production Discipline
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-normal leading-relaxed">
                {artistBio.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Core Skill Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { icon: Palette, title: 'Character & Silhouette Design', desc: 'Dynamic anatomy, clear costume silhouettes, and emotional expression sheets.' },
                  { icon: Layers, title: 'Cinematic Keyframe Lighting', desc: 'Volumetric depth, narrative light keys, and atmospheric color temperature.' },
                  { icon: ShieldCheck, title: 'Organized Production Passes', desc: 'Named, layered PSD assets tailored for 3D sculptors and 2D animators.' },
                  { icon: Award, title: 'Fast Feedback Revisions', desc: 'Quick turnaround on director revisions and dedicated art test execution.' }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 hover:border-indigo-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-indigo-400 font-display font-bold text-xs sm:text-sm">
                        <IconComp className="w-4 h-4 flex-shrink-0" />
                        <span className="text-white">{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 font-normal leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Recruiter Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {onOpenResume && (
                  <button
                    onClick={onOpenResume}
                    className="btn-primary shimmer-effect px-5 py-2.5 text-xs font-display font-bold flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30"
                  >
                    <FileText className="w-4 h-4" />
                    <span>เปิดเรซูเม่ฉบับเต็ม (Full Resume)</span>
                  </button>
                )}

                <Link
                  to="/skills"
                  className="btn-secondary px-5 py-2.5 text-xs font-display font-bold flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>ดูไปป์ไลน์และเครื่องมือ (Pipeline & Tools)</span>
                </Link>
              </div>

            </motion.div>

          </div>
        </div>

        {/* SELECTED ARTWORK PREVIEWS */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-display font-semibold text-indigo-400 uppercase tracking-wider">
                Featured Portfolio Samples
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white">
                ตัวอย่างผลงานเด่น (Recent Works)
              </h3>
            </div>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-display font-semibold text-xs sm:text-sm group self-start sm:self-auto"
            >
              <span>ดูทั้งหมด 9 ชิ้นงาน (View All 9 Pieces)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recentPreviews.map((art) => (
              <Link to="/gallery" key={art.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="studio-card overflow-hidden group border border-white/10"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#0A0C16] relative">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-indigo-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-full bg-white text-slate-900 text-xs font-display font-bold shadow-xl">
                        Inspect Details
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-[#101326] space-y-1">
                    <div className="text-[11px] font-display font-semibold text-indigo-400">{art.category}</div>
                    <h4 className="text-sm sm:text-base font-display font-bold text-white">{art.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{art.description}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM RECRUITER CTA CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 md:p-14 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-indigo-950/80 border border-indigo-500/30 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-display font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              พร้อมเริ่มงานทันที (Available for Hire)
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold leading-tight">
              พร้อมสร้างสรรค์ผลงานร่วมกับสตูดิโอของคุณ
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
              สนใจพิจารณาร่วมงาน ทั้งตำแหน่งงานประจำ (Full-Time), สัญญาจ้างโปรเจกต์ (Contract) หรือต้องการส่งโจทย์ทดสอบฝีมือ (Art Test) ยินดีติดต่อพูดคุยได้ทันทีครับ
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-slate-900 font-display font-bold text-xs sm:text-sm hover:bg-slate-100 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>เปิดดูเรซูเม่ (CV)</span>
              </button>
            )}
            <Link
              to="/contact"
              className="btn-primary shimmer-effect w-full sm:w-auto px-6 py-3.5 rounded-xl text-white font-display font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Send className="w-4 h-4" />
              <span>ส่งข้อความนัดสัมภาษณ์</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
