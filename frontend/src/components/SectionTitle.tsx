import { motion } from 'motion/react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  position?: 'left' | 'center' | 'right';
  style?: 'vertical' | 'diagonal' | 'floating' | 'split';
  accent?: 'emerald' | 'cyan' | 'purple' | 'pink';
}

export function SectionTitle({ 
  title, 
  subtitle, 
  position = 'center', 
  style = 'floating',
  accent = 'emerald' 
}: SectionTitleProps) {
  const accentColors = {
    emerald: 'from-emerald-400 to-emerald-600',
    cyan: 'from-cyan-400 to-cyan-600',
    purple: 'from-purple-400 to-purple-600',
    pink: 'from-pink-400 to-pink-600'
  };

  const positions = {
    left: 'text-left justify-start',
    center: 'text-center justify-center',
    right: 'text-right justify-end'
  };

  if (style === 'vertical') {
    return (
      <div className={`flex ${positions[position]} mb-16`}>
        <motion.div
          initial={{ opacity: 0, x: position === 'left' ? -50 : position === 'right' ? 50 : 0 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Vertical Text */}
          <div className="writing-mode-vertical text-orientation-mixed">
            <h2 className={`text-6xl md:text-8xl bg-gradient-to-b ${accentColors[accent]} bg-clip-text text-transparent transform translate-y-[20vw] rotate-90 origin-center opacity-30`}>
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-gray-400 mt-4 max-w-md">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  if (style === 'diagonal') {
    return (
      <div className={`flex ${positions[position]} mb-16 relative`}>
        <motion.div
          initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Background Glass Effect */}
          <div className="absolute -inset-4 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl transform -rotate-3"></div>
          
          <div className="relative p-8">
            <h2 className={`text-4xl md:text-6xl bg-gradient-to-r ${accentColors[accent]} bg-clip-text text-transparent transform rotate-2`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-400 mt-4 max-w-2xl transform -rotate-1">
                {subtitle}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (style === 'split') {
    const words = title.split(' ');
    const firstWord = words[0];
    const restWords = words.slice(1).join(' ');

    return (
      <div className={`flex ${positions[position]} mb-16 relative`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* First Word - Large and Floating */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl transform rotate-3"></div>
              <h2 className={`relative text-7xl md:text-9xl bg-gradient-to-r ${accentColors[accent]} bg-clip-text text-transparent p-4`}>
                {firstWord}
              </h2>
            </motion.div>

            {/* Rest of Words */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col"
            >
              <h2 className="text-4xl md:text-6xl text-white mb-2">
                {restWords}
              </h2>
              {subtitle && (
                <p className="text-gray-400 max-w-2xl">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Default: floating style
  return (
    <div className={`flex ${positions[position]} mb-16 relative`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Floating Background */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 1, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -inset-8 backdrop-blur-3xl bg-gradient-to-r from-white/5 via-emerald-500/10 to-cyan-500/5 border border-white/10 rounded-[2rem] shadow-2xl"
        ></motion.div>

        <div className="relative p-8">
          <h2 className={`text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r ${accentColors[accent]} bg-clip-text text-transparent mb-4`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-400 max-w-3xl">
              {subtitle}
            </p>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full backdrop-blur-lg border border-white/20"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full backdrop-blur-lg border border-white/20"></div>
      </motion.div>
    </div>
  );
}