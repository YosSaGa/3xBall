import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle2, Copy } from 'lucide-react';
import { contactInfo } from '../data/artworks';

// Custom Instagram SVG Icon
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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

export default function ContactPage() {
  const location = useLocation();
  const [formData, setFormData] = useState(() => ({
    name: '',
    email: '',
    commissionType: location.state?.selectedCategory || 'Character Illustration',
    message: ''
  }));
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', commissionType: 'Character Illustration', message: '' });
    }, 4000);
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const socialChannels = [
    { name: 'Email', value: contactInfo.email, icon: Mail },
    { name: 'Instagram', value: contactInfo.instagram, icon: InstagramIcon },
    { name: 'X / Twitter', value: contactInfo.twitter, icon: XTwitterIcon },
    { name: 'Discord', value: contactInfo.discord, icon: MessageSquare },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="pt-24 sm:pt-28 md:pt-36 pb-16 md:pb-28 bg-[#FAFAFD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 font-display font-semibold text-xs uppercase tracking-wider"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-600" />
            <span>ติดต่อฉัน — Contact & Inquiries</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 tracking-tight"
          >
            Get In Touch
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed"
          >
            Send a commission inquiry or connect via social channels below. All social handles are customizable placeholders.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          
          {/* Social Channels Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">Social Channels</h3>
              <p className="text-xs text-slate-500 font-normal">Click any channel below to copy the handle to clipboard.</p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {socialChannels.map((channel) => {
                const IconComponent = channel.icon;
                const isCopied = copiedField === channel.name;
                return (
                  <motion.div
                    key={channel.name}
                    whileHover={{ scale: 1.02, x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCopy(channel.value, channel.name)}
                    className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-500/40 hover:shadow-md cursor-pointer transition-all duration-200 touch-manipulation"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] sm:text-xs font-display font-semibold text-indigo-600">{channel.name}</div>
                        <div className="text-xs sm:text-sm font-display font-bold text-slate-900 truncate">{channel.value}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="p-2 rounded-lg bg-slate-50 text-slate-500 group-hover:text-indigo-600 transition-colors shrink-0"
                      aria-label={`Copy ${channel.name}`}
                    >
                      {isCopied ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Note Box */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-50/60 border border-indigo-200/60 text-xs text-slate-600 space-y-1">
              <div className="font-display font-bold text-indigo-700 flex items-center gap-1">
                <span>💡</span> Note
              </div>
              <p>Social handles (`your@email.com`, `@yourusername`) are placeholders ready to edit in `src/data/artworks.js`.</p>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-xl shadow-indigo-500/5"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-1">
              Send Commission Inquiry
            </h3>
            <p className="text-xs text-slate-500 font-normal mb-5 sm:mb-6">
              Fill out your concept ideas below and I will respond to your email.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="py-8 sm:py-10 text-center space-y-3 bg-indigo-50 rounded-2xl border border-indigo-200/60 p-5 sm:p-6"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white inline-flex items-center justify-center text-xl shadow-md">
                  ✓
                </div>
                <h4 className="text-lg sm:text-xl font-display font-bold text-slate-900">Inquiry Received!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Thank you! Your message has been logged. I will review your concept and reply shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-normal text-base sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-normal text-base sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">Commission Category</label>
                  <select
                    id="commission-type-select"
                    value={formData.commissionType}
                    onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-normal text-base sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                  >
                    <option value="Character Illustration">Character Illustration</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Fan Art">Fan Art</option>
                    <option value="Custom Illustration">Custom Illustration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-display font-semibold text-slate-700 uppercase tracking-wider">Project Concept / Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your character concept, references, pose ideas, and turnaround timeframe..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-normal text-base sm:text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary w-full py-3 sm:py-3.5 px-6 font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 touch-manipulation shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </motion.button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
