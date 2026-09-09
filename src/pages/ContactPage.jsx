import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, CheckCircle2, Copy, FileText, Globe, MapPin, ExternalLink, Sparkles, Send } from 'lucide-react';
import { contactInfo, resumeData, artistBio } from '../data/artworks';

// Custom Instagram SVG Icon
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Custom X / Twitter SVG Icon
function XTwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom LinkedIn SVG Icon
function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
    </svg>
  );
}

export default function ContactPage({ onOpenResume }) {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactCards = [
    {
      name: 'อีเมล (Email)',
      handle: contactInfo.email,
      desc: 'ช่องทางหลักสำหรับส่งรายละเอียดงาน บรีฟ หรือนัดสัมภาษณ์',
      icon: Mail,
      actionUrl: `mailto:${contactInfo.email}`,
      actionLabel: 'ส่งอีเมลทันที',
      color: 'from-indigo-500/20 to-blue-500/10'
    },
    {
      name: 'ArtStation',
      handle: contactInfo.artstation,
      desc: 'แฟ้มผลงานดิจิทัลความละเอียดสูงระดับอุตสาหกรรม',
      icon: Globe,
      actionUrl: `https://${contactInfo.artstation}`,
      actionLabel: 'เปิดดู ArtStation',
      color: 'from-blue-500/20 to-cyan-500/10'
    },
    {
      name: 'LinkedIn',
      handle: contactInfo.linkedin,
      desc: 'โปรไฟล์มืออาชีพ ประวัติการทำงาน และเครือข่ายธุรกิจ',
      icon: LinkedInIcon,
      actionUrl: `https://${contactInfo.linkedin}`,
      actionLabel: 'เปิดดู LinkedIn',
      color: 'from-sky-500/20 to-indigo-500/10'
    },
    {
      name: 'Discord',
      handle: contactInfo.discord,
      desc: 'พูดคุยสื่อสารแบบเรียลไทม์ และประสานงานโปรเจกต์',
      icon: MessageSquare,
      actionUrl: null,
      actionLabel: 'คัดลอก Discord ID',
      color: 'from-purple-500/20 to-indigo-500/10'
    },
    {
      name: 'Instagram',
      handle: contactInfo.instagram,
      desc: 'อัปเดตงานสเก็ตช์ ภาพวาดล่าสุด และกระบวนการสร้างสรรค์',
      icon: InstagramIcon,
      actionUrl: `https://instagram.com/${contactInfo.instagram.replace('@', '')}`,
      actionLabel: 'ติดตามบน Instagram',
      color: 'from-pink-500/20 to-rose-500/10'
    },
    {
      name: 'X (Twitter)',
      handle: contactInfo.twitter,
      desc: 'แชร์ผลงานภาพวาดคอมมูนิตี้ และ WIP ผลงานใหม่',
      icon: XTwitterIcon,
      actionUrl: `https://twitter.com/${contactInfo.twitter.replace('@', '')}`,
      actionLabel: 'ติดตามบน X',
      color: 'from-slate-500/20 to-zinc-500/10'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-28 overflow-hidden studio-mesh relative"
    >
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-indigo-600/10 via-purple-600/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-display font-semibold text-xs uppercase tracking-wider backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Contact Channels • พร้อมเริ่มงานทันที</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight"
          >
            ช่องทางติดต่อ (Contact)
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed"
          >
            สำหรับผู้กำกับศิลป์, สตูดิโอเกม, แอนิเมชัน หรือผู้ที่สนใจร่วมงาน สามารถติดต่อสอบถาม ส่งโจทย์ทดสอบฝีมือ หรือนัดสัมภาษณ์ได้โดยตรงผ่านช่องทางด้านล่างนี้ครับ
          </motion.p>
        </div>

        {/* PROFILE OVERVIEW CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-8 rounded-3xl bg-[#101326] border border-white/15 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shrink-0">
                <img
                  src={artistBio.portraitImage}
                  alt={artistBio.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <div className="inline-block px-3 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-[11px] font-display font-semibold border border-indigo-500/30">
                  {artistBio.availability}
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {artistBio.name} ({artistBio.nickname})
                </h2>
                <p className="text-xs sm:text-sm text-indigo-400 font-medium">
                  {artistBio.title}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{resumeData.location} (On-site / Hybrid / Remote Ready)</span>
                </div>
              </div>
            </div>

            {/* Direct Fast Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-primary shimmer-effect w-full sm:w-auto px-5 py-3 rounded-xl font-display font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 text-white"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งอีเมลหาผมทันที</span>
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-display font-bold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>เปิดดูเรซูเม่ (CV)</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* ALL CONTACT CHANNELS GRID */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>ช่องทางติดต่อทั้งหมด (All Social & Channels)</span>
            </h3>
            <span className="text-xs text-slate-400">คลิกเพื่อคัดลอกหรือเปิดลิงก์</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {contactCards.map((item) => {
              const IconComp = item.icon;
              const isCopied = copiedField === item.name;

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl bg-[#101326] border border-white/10 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-display font-semibold text-indigo-300/80 px-2.5 py-0.5 rounded-full bg-white/5">
                        {item.name}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm sm:text-base font-display font-bold text-white truncate select-all">
                        {item.handle}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Actions (Copy + Open Link) */}
                  <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.handle, item.name)}
                      className="flex-1 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 active:bg-white/15 text-xs font-display font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">คัดลอกแล้ว!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>คัดลอก</span>
                        </>
                      )}
                    </button>

                    {item.actionUrl && (
                      <a
                        href={item.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-display font-semibold flex items-center justify-center gap-1 transition-all"
                        title={item.actionLabel}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>เปิด</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* STUDIO READINESS NOTICE */}
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-2 max-w-2xl mx-auto">
          <h4 className="text-sm font-display font-bold text-white">
            💡 สำหรับการว่าจ้างและสัมภาษณ์งาน
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            สามารถปรับแต่งข้อมูลการติดต่อ เช่น อีเมล, ArtStation หรือเบอร์โทรศัพท์ ได้โดยตรงที่ไฟล์ <code className="text-indigo-400 bg-white/5 px-1.5 py-0.5 rounded">src/data/artworks.js</code>
          </p>
        </div>

      </div>
    </motion.div>
  );
}
