import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, Layers, Palette, ShieldCheck, Wrench, Image as ImageIcon, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { skillsCategories, skillProcess, resumeData } from '../data/artworks';

export default function SkillsPage({ onOpenResume }) {
  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Layers': return Layers;
      case 'Palette': return Palette;
      case 'Sparkles': return Sparkles;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-display font-semibold text-xs uppercase tracking-wider backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Studio Production Skills & Workflow</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight leading-tight"
          >
            ทักษะ & ไปป์ไลน์การทำงาน
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed"
          >
            สรุปความถนัดด้านการออกแบบตัวละคร, คีย์เฟรมฉากสภาพแวดล้อม, ทฤษฎีการจัดแสง และมาตรฐานการจัดส่งไฟล์แบบแยกเลเยอร์พร้อมใช้งาน
          </motion.p>
        </div>

        {/* Studio Skills Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {skillsCategories.map((skill, idx) => {
            const IconComp = getSkillIcon(skill.icon);
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="studio-card p-5 sm:p-6 flex flex-col justify-between border border-white/10"
              >
                <div className="space-y-4">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-semibold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {skill.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-indigo-400 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Proficiency Bar */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
                      {skill.title}
                    </h3>
                    {skill.proficiency && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-mono text-indigo-300">
                          <span>Studio Mastery</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Features / Competencies List */}
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {skill.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                        <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Link to Gallery */}
                <div className="pt-6">
                  <Link
                    to="/gallery"
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 hover:border-indigo-400/40 text-xs font-display font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ชมตัวอย่างผลงาน</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Software & Tools Section */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-display font-semibold text-indigo-400 uppercase tracking-wider">
              <Wrench className="w-3.5 h-3.5" />
              <span>Software & Pipeline Tools</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
              โปรแกรมและเครื่องมือที่ใช้ในระดับสตูดิโอ
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal">
              ความเชี่ยวชาญในโปรแกรมมาตรฐานอุตสาหกรรมสำหรับการผลิตงาน 2D และ Visual Concept
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {resumeData.softwareMatrix.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-[#101326] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-display font-bold text-white">{tool.name}</h4>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-mono font-semibold">
                    {tool.proficiency}%
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full"
                    style={{ width: `${tool.proficiency}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">{tool.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4-Step Production Process */}
        <div className="pt-12 sm:pt-16 border-t border-white/10 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-display font-semibold text-indigo-400 uppercase tracking-wider">
              Studio Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white">
              กระบวนการทำงานอย่างเป็นระบบ (Production Pipeline)
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-normal">
              ลำดับขั้นตอนตั้งแต่การรับบรีฟ, วางองค์ประกอบ, จัดแสงเงา จนถึงการแยกเลเยอร์ไฟล์ส่งต่อทีมงาน
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {skillProcess.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-display font-black text-sm flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  {step.step}
                </div>
                <h4 className="text-sm sm:text-base font-display font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 font-normal leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ART TEST GUARANTEE CALLOUT */}
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#101326] border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-display font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Studio Art Test Commitment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              ยินดีรับการทดสอบฝีมือ (Art Test) ตามโจทย์ของสตูดิโอ
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-normal max-w-xl">
              เพื่อให้ทีมมั่นใจในฝีมือ ความรวดเร็วในการส่งงาน และการจัดเตรียมเลเยอร์ สามารถส่งโจทย์หรือรายละเอียดการทดสอบงานมาได้ตลอดเวลาครับ
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-display font-bold text-xs sm:text-sm border border-white/15 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>เปิดดูเรซูเม่ (CV)</span>
              </button>
            )}
            <Link
              to="/contact"
              className="btn-primary shimmer-effect w-full sm:w-auto px-5 py-3 rounded-xl text-white font-display font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Mail className="w-4 h-4" />
              <span>ส่งโจทย์ Art Test / ติดต่อ</span>
            </Link>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
