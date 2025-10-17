import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Home, User, Briefcase, Code, Palette, Star, DollarSign, MessageCircle, Mail } from 'lucide-react';

export function OrbitalHeader() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { href: '#hero', label: 'Home', id: 'hero', icon: <Home className="w-4 h-4" />, color: 'from-blue-400 to-blue-600' },
    { href: '#about', label: 'About', id: 'about', icon: <User className="w-4 h-4" />, color: 'from-emerald-400 to-emerald-600' },
    { href: '#experience', label: 'Experience', id: 'experience', icon: <Briefcase className="w-4 h-4" />, color: 'from-purple-400 to-purple-600' },
    { href: '#services', label: 'Services', id: 'services', icon: <Code className="w-4 h-4" />, color: 'from-orange-400 to-orange-600' },
    { href: '#skills', label: 'Skills', id: 'skills', icon: <Palette className="w-4 h-4" />, color: 'from-pink-400 to-pink-600' },
    { href: '#works', label: 'Works', id: 'works', icon: <Star className="w-4 h-4" />, color: 'from-cyan-400 to-cyan-600' },
    { href: '#pricing', label: 'Pricing', id: 'pricing', icon: <DollarSign className="w-4 h-4" />, color: 'from-yellow-400 to-yellow-600' },
    { href: '#testimonials', label: 'Reviews', id: 'testimonials', icon: <MessageCircle className="w-4 h-4" />, color: 'from-indigo-400 to-indigo-600' },
    { href: '#contact', label: 'Contact', id: 'contact', icon: <Mail className="w-4 h-4" />, color: 'from-red-400 to-red-600' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate orbital positions
  const getOrbitalPosition = (index: number, total: number, isActive: boolean) => {
    if (isActive) {
      // Active item gets pulled to the focus zone (top-right)
      return {
        x: window.innerWidth - 120,
        y: 80,
        scale: 1.5,
        opacity: 1
      };
    }

    const angle = (index * 360) / total + (Date.now() * 0.02) % 360;
    const radius = 150;
    const centerX = window.innerWidth - 200;
    const centerY = 200;
    
    return {
      x: centerX + Math.cos((angle * Math.PI) / 180) * radius,
      y: centerY + Math.sin((angle * Math.PI) / 180) * radius,
      scale: 1,
      opacity: 0.7
    };
  };

  return (
    <>
      {/* Focus Zone - The "Magnifying Glass" */}
      <motion.div
        className="fixed top-8 right-8 z-50 pointer-events-none"
        animate={{
          scale: isHovering ? 1.1 : 1,
          rotate: (Date.now() * 0.01) % 360
        }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="w-32 h-32 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
            }}
            animate={{
              rotate: 360,
              borderColor: `hsl(${(Date.now() * 0.1) % 360}, 70%, 60%)`
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          {/* Inner Search Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -((Date.now() * 0.01) % 360) }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <Search className="w-8 h-8 text-white/80" />
            </motion.div>
          </div>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Orbital Navigation Items */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const position = getOrbitalPosition(index, navItems.length, isActive);
          
          return (
            <motion.div
              key={item.id}
              className="absolute pointer-events-auto"
              animate={{
                x: position.x - 25, // Center the 50px width element
                y: position.y - 25, // Center the 50px height element
                scale: position.scale,
                opacity: position.opacity
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                duration: 0.8
              }}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <motion.a
                href={item.href}
                className="relative block w-12 h-12 group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Glassmorphism Background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isActive 
                      ? `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)`
                      : `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)`,
                    backdropFilter: 'blur(20px)',
                    border: isActive 
                      ? '2px solid rgba(255,255,255,0.4)' 
                      : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                      : '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  animate={{
                    boxShadow: isActive
                      ? [
                          '0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)',
                          '0 12px 40px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
                          '0 8px 32px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
                        ]
                      : undefined
                  }}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />

                {/* Icon with Gradient */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                    animate={{
                      filter: isActive ? 'brightness(1.5)' : 'brightness(1)'
                    }}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Orbital Trail Effect */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-30"
                    style={{
                      background: `conic-gradient(from ${index * 40}deg, transparent, ${item.color.split(' ')[1]}, transparent)`
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  <motion.div
                    className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div
                      className="px-3 py-1 rounded-lg text-xs text-white whitespace-nowrap"
                      style={{
                        background: 'rgba(0,0,0,0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      {item.label}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.a>
            </motion.div>
          );
        })}
      </div>

      {/* Center Hub */}
      <motion.div
        className="fixed z-30 pointer-events-none"
        style={{
          top: 170,
          right: 150,
          transform: 'translate(50%, -50%)'
        }}
        animate={{
          rotate: -((Date.now() * 0.005) % 360)
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(255,255,255,0.1)'
          }}
        >
          <motion.div
            className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-600"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Connection Lines (Orbital Paths) */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        {/* <svg className="w-full h-full opacity-20">
          <defs>
            <radialGradient id="orbitalGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.3)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.05)' }} />
            </radialGradient>
          </defs>
          <circle
            cx={window.innerWidth - 200}
            cy={200}
            r={150}
            fill="none"
            stroke="url(#orbitalGradient)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        </svg> */}
      </div>

      {/* Mobile Fallback */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            <motion.div
              className="p-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5 text-white/80" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}