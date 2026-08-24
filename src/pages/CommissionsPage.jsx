import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';
import { commissionCategories, commissionSteps } from '../data/artworks';

export default function CommissionsPage() {
  const navigate = useNavigate();

  const handleRequestClick = (categoryTitle) => {
    navigate('/contact', { state: { selectedCategory: categoryTitle } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[#FAFAFD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-display font-semibold text-xs uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Commission Services & Pricing</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-slate-900 tracking-tight"
          >
            Commission Me
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg font-normal leading-relaxed"
          >
            I accept custom artwork inquiries for character designs, portraits, fan art, and full keyframe illustrations. Select a tier below to request a commission.
          </motion.p>
        </div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {commissionCategories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="anime-card p-6 bg-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badge & Tier */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                    {cat.badge}
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-400">Tier 0{idx + 1}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-slate-900">
                  {cat.title}
                </h3>

                {/* Price Display */}
                <div className="py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200/60 space-y-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-display font-extrabold text-slate-900">
                      {cat.startingPrice}
                    </span>
                    <span className="text-xs font-medium text-slate-500">starting price</span>
                  </div>
                  {cat.isPlaceholder && (
                    <p className="text-[11px] font-mono text-indigo-600/80 italic">
                      *Editable placeholder price
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {cat.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-2 pt-2 border-t border-slate-100">
                  {cat.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleRequestClick(cat.title)}
                  className="btn-primary w-full py-3 px-4 text-xs font-display font-semibold flex items-center justify-center gap-2"
                >
                  <span>Request Commission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4-Step Process Section */}
        <div className="pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <span className="text-xs font-display font-semibold text-indigo-600 uppercase tracking-wider">Workflow Milestone</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              4-Step Commission Process
            </h3>
            <p className="text-slate-600 text-sm font-normal">
              Structured progress milestones ensuring your concept moves seamlessly from draft sketch to final art.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 font-display font-extrabold text-sm flex items-center justify-center">
                  {step.step}
                </div>
                <h4 className="text-base font-display font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
