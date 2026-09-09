import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Mail, MapPin, Briefcase, GraduationCap, Wrench, CheckCircle2, Globe, Sparkles, Send } from 'lucide-react';
import { resumeData } from '../data/artworks';

export default function ResumeModal({ isOpen, onClose, onOpenContact }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
      >
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md -z-10"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 340 }}
          className="relative w-full max-w-4xl bg-[#0F1222] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/20 my-auto max-h-[92vh] flex flex-col overflow-hidden text-slate-200"
        >
          {/* Top Control Bar */}
          <div className="sticky top-0 z-30 px-5 sm:px-8 py-4 bg-[#14182E]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-display font-semibold uppercase tracking-widest text-emerald-300">
                Official Candidate CV / Resume
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-display font-semibold text-white transition-colors"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Print / Save PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                aria-label="Close resume modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Resume Content */}
          <div className="p-5 sm:p-8 md:p-10 space-y-8 sm:space-y-10 overflow-y-auto">
            
            {/* Header / Bio */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-display font-semibold">
                  {resumeData.workStatus}
                </div>
                <h1 id="resume-title" className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
                  {resumeData.fullName}
                </h1>
                <p className="text-base sm:text-lg font-display font-bold text-indigo-400">
                  {resumeData.roleTitle}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1 font-normal">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    {resumeData.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                    {resumeData.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-indigo-400" />
                    Portfolio Archive
                  </span>
                </div>
              </div>

              {/* Target Roles Pill Box */}
              <div className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 space-y-2 md:max-w-xs">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-display font-semibold block">
                  Target Positions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {resumeData.targetRoles.map((role, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-[11px] rounded-lg bg-indigo-500/10 text-indigo-200 border border-indigo-500/20 font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Executive Summary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal bg-white/[0.02] p-4 rounded-xl border border-white/5">
                {resumeData.summary}
              </p>
            </div>

            {/* Work Experience */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                Experience & Studio Milestones
              </h3>

              <div className="space-y-5">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-5 sm:pl-6 border-l-2 border-indigo-500/30 space-y-2">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-[#0F1222]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm sm:text-base font-display font-bold text-white">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-mono text-indigo-300 px-2 py-0.5 rounded-md bg-white/5 w-fit">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-medium">{exp.company} • {exp.location}</div>
                    <ul className="space-y-1.5 pt-1">
                      {exp.highlights.map((item, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Software Proficiency Matrix */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5" />
                Software & Tool Proficiency
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {resumeData.softwareMatrix.map((soft, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-display font-bold">
                      <span className="text-white">{soft.name}</span>
                      <span className="text-indigo-300 font-mono">{soft.proficiency}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full"
                        style={{ width: `${soft.proficiency}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{soft.category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Competencies Chips */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400">
                Core Production Competencies
              </h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.coreSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Languages Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Education
                </h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="font-display font-bold text-white">{edu.degree}</div>
                    <div className="text-slate-400">{edu.institution} ({edu.period})</div>
                    <div className="text-slate-400 text-[11px]">{edu.details}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-wider font-display font-bold text-indigo-400 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5" />
                  Languages
                </h3>
                <div className="space-y-1.5 text-xs">
                  {resumeData.languages.map((lang, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03]">
                      <span className="font-semibold text-white">{lang.language}</span>
                      <span className="text-slate-400 text-[11px]">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom CTA Footer */}
          <div className="px-5 sm:px-8 py-4 bg-[#14182E]/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              พร้อมส่งแบบทดสอบฝีมือ (Art Test) หรือนัดพูดคุยสัมภาษณ์
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenContact) onOpenContact();
                }}
                className="btn-primary shimmer-effect px-5 py-2.5 text-xs font-display font-bold w-full sm:w-auto flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>นัดสัมภาษณ์ / ส่ง Art Test</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
