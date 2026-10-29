import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Mail,
  MapPin,
  Phone,
  Copy,
  Check,
  Palette,
  ArrowRight,
  User,
  Briefcase
} from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { artistBio, contactInfo } from '../data/artworks';

export default function AboutPage() {
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const keySkills = [
    'Character Design',
    'Cinematic Keyframe',
    'Environment Art',
    'Organized PSD Layers',
    'Adobe Photoshop',
    'Clip Studio Paint',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35 }}
      className="pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-24 studio-mesh relative overflow-hidden"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Profile Card */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#101326]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Portrait Avatar */}
            <div className="md:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-xl shadow-indigo-950/50 group">
                <OptimizedImage
                  src={artistBio.portraitImage}
                  srcSet={artistBio.portraitSrcSet}
                  sizes="(max-width: 640px) 200px, 240px"
                  alt="นายฉัตรชนก มากมูล Portrait"
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-3">
                  <span className="text-xs font-display font-semibold text-white/90">
                    บอล (Ball)
                  </span>
                </div>
              </div>

              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>พร้อมรับงานฟรีแลนซ์ & สตูดิโอ</span>
              </div>
            </div>

            {/* Right: Info & Bio */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div>
                <span className="text-xs font-display font-bold text-indigo-400 tracking-wider uppercase">
                  ข้อมูลโปรไฟล์ & ติดต่องาน
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight mt-1">
                  {artistBio.name}
                </h1>
                <p className="text-sm sm:text-base font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 mt-1">
                  {artistBio.title}
                </p>
                
                {/* Personal Meta Badges */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-300 pt-2 font-medium">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    <User className="w-3.5 h-3.5 text-indigo-400" />
                    <span>อายุ {artistBio.age}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{artistBio.occupation}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>กรุงเทพฯ (Bangkok)</span>
                  </span>
                </div>
              </div>

              {/* Bio description */}
              <div className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed space-y-1.5">
                <p>
                  สวัสดีครับ ผมนายฉัตรชนก มากมูล (บอล) — Digital Illustrator และ 2D Concept Artist ทำงานสายฟรีแลนซ์ มุ่งเน้นการออกแบบตัวละคร (Character Design) และภาพคีย์เฟรมมุมมองภาพยนตร์ (Cinematic Keyframe)
                </p>
                <p className="text-slate-400">
                  ไปป์ไลน์การทำงานมาตรฐานสตูดิโอ แยกเลเยอร์ไฟล์ PSD (Line, Flats, Shadows, Rimlight, FX) ชัดเจน พร้อมส่งต่อให้ทีม 3D และ Animation ได้ทันที ยินดีรับทำแบบทดสอบฝีมือ (Art Test) ครับ
                </p>
              </div>

              {/* Key Skills Tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-display font-semibold text-slate-400 uppercase tracking-wider block">
                  ทักษะและโปรแกรมหลัก
                </span>
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                  {keySkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <Link
                  to="/"
                  className="btn-primary shimmer-effect px-4 py-2 text-xs font-display font-bold flex items-center gap-1.5 rounded-xl shadow-lg shadow-indigo-600/30"
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>ดูผลงานทั้งหมด</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href="/portfolio.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-4 py-2 text-xs font-display font-bold flex items-center gap-1.5 rounded-xl cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>เปิดเรซูเม่ (CV PDF)</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Contact Info Card: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Email Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-medium">ติดต่องาน / บรีฟ / Art Test</span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-xs sm:text-sm font-display font-bold text-white hover:text-indigo-300 transition-colors truncate block"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleCopy(contactInfo.email, 'email')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
                title="คัดลอกอีเมล"
                aria-label="Copy email"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-indigo-400" />
                )}
              </button>
              <a
                href={`mailto:${contactInfo.email}`}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer"
                title="ส่งอีเมลทันที"
                aria-label="Send email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Phone Number Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 block font-medium">เบอร์โทรศัพท์</span>
                <a
                  href={`tel:${contactInfo.phone.replace(/-/g, '')}`}
                  className="text-xs sm:text-sm font-display font-bold text-white hover:text-emerald-300 transition-colors truncate block font-mono"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => handleCopy(contactInfo.phone, 'phone')}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors cursor-pointer"
                title="คัดลอกเบอร์โทร"
                aria-label="Copy phone"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-emerald-400" />
                )}
              </button>
              <a
                href={`tel:${contactInfo.phone.replace(/-/g, '')}`}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
                title="โทรออก"
                aria-label="Call phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
