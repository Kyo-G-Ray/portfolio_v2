import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Home, User, Briefcase, Code, Palette, Star, DollarSign, MessageCircle, Mail } from 'lucide-react';



type workProps = {
  works: any[] | null;
}

type voiceProps = {
  voices: any[] | null;
}

type CombinedProps = workProps & voiceProps;


export function TrackNavigation({ works, voices }: CombinedProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionHeights, setSectionHeights] = useState<number[]>([]);
  const [sectionHeightSum, setSectionHeightSum] = useState(0);


  const navItems = [
    { title:'home', href: '#hero', label: 'Home', id: 'hero', icon: <Home className="w-4 h-4" />, color: 'from-blue-400 to-blue-600' },
    { title:'about', href: '#about', label: 'About', id: 'about', icon: <User className="w-4 h-4" />, color: 'from-emerald-400 to-emerald-600' },
    { title:'exp', href: '#experience', label: 'Experience', id: 'experience', icon: <Briefcase className="w-4 h-4" />, color: 'from-purple-400 to-purple-600' },
    { title:'serv', href: '#services', label: 'Services', id: 'services', icon: <Code className="w-4 h-4" />, color: 'from-orange-400 to-orange-600' },
    { title:'skill', href: '#skills', label: 'Skills', id: 'skills', icon: <Palette className="w-4 h-4" />, color: 'from-pink-400 to-pink-600' },
    { title:'work', href: '#works', label: 'Works', id: 'works', icon: <Star className="w-4 h-4" />, color: 'from-cyan-400 to-cyan-600' },
    { title:'voice', href: '#testimonials', label: 'testimonials', id: 'testimonials', icon: <DollarSign className="w-4 h-4" />, color: 'from-yellow-400 to-yellow-600' },
    { title:'chat', href: '#contact', label: 'Contact', id: 'contact', icon: <Mail className="w-4 h-4" />, color: 'from-red-400 to-red-600' },
  ];

  useEffect(() => {
    // セクションの高さを取得
    const calculateSectionHeights = () => {
      const sections = document.querySelectorAll('section');
      const heights = Array.from(sections).map(section => section.getBoundingClientRect().height);
      // const heightSum = 0;
      const heightSum = heights.reduce((accumulator, currentValue) => {
        // ここに処理を記述
        return accumulator + currentValue;
      }, 0);
      setSectionHeights(heights);
      setSectionHeightSum(heightSum);
    };

    // 初回実行とリサイズ時の再計算
    calculateSectionHeights();
    window.addEventListener('resize', calculateSectionHeights);

    return () => window.removeEventListener('resize', calculateSectionHeights);
  }, [works, voices]);

  useEffect(() => {
    // スクロール進捗を計算
    const handleScroll = () => {
      const totalHeight = sectionHeights.reduce((sum, height) => sum + height, 0); // セクションの高さの合計
      const currentScroll = window.scrollY;
      setScrollProgress(totalHeight > 0 ? currentScroll / totalHeight : 0); // 比率を計算
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHeights]);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(currentProgress, 1));

      // Determine active section
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate position for each nav item based on scroll progress
  const getItemPosition = (index: number, isActive: boolean) => {
    // const totalItems = navItems.length;
    // const itemProgress =  index * 0.06 - scrollProgress * .5 + .7;

    let sectionHeight = sectionHeights[index];
    const cumulativeSum = sectionHeights
      .slice(0, index + 1) // 0 から index まで（indexを含む）の要素を抽出
      .reduce((sum, height) => sum + height, 0); // その部分配列の和を計算
    let _sectionHeightSum = sectionHeightSum;
    if(sectionHeight === undefined || isNaN(sectionHeight)) {sectionHeight = 0; _sectionHeightSum = 1;}; // 初期値を返す

    // console.log(sectionHeight);
    // console.log(index,cumulativeSum/_sectionHeightSum, sectionHeight, sectionHeightSum);
    // console.log("\n");
    // TODO 値調整して円がかぶらないようにする。うまくいかなければ上のitemProgressを使う
    const itemProgress = (cumulativeSum / _sectionHeightSum) * .6 - scrollProgress * .6 + .7; // スクロール比率を反映

    // Track stages:
    // Stage 1: Moving horizontally across the top (0 to 0.7)
    // Stage 2: Moving vertically down from magnifier (0.7 to 1.0)
    
    const magnifierX = window.innerWidth - 80; // Right side
    const magnifierY = 60; // Top
    
    if (itemProgress <= 0.7) {
      // Horizontal movement across top
      const horizontalProgress = itemProgress / 0.7;
      return {
        x: 60 + (magnifierX - 60) * horizontalProgress,
        y: 60,
        scale: isActive ? 1.3 : 1,
        opacity: 1
      };
    } else {
      // Vertical movement down from magnifier
      const verticalProgress = (itemProgress - 0.7) / 0.8;
      return {
        x: magnifierX,
        y: magnifierY + (window.innerHeight - magnifierY - 100) * verticalProgress,
        scale: isActive ? 1.3 : 1,
        opacity: Math.max(0.3, 1 - verticalProgress * 0.7)
      };
    }
  };

  return (
    <>
      {/* Magnifying Glass Focus Zone */}
      <motion.div
        className="fixed z-50 -top-20 -right-20 pointer-events-none"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative">
          {/* Outer Glass Ring */}
          <motion.div
            className="w-56 h-56 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
              border: '2px solid rgba(255,255,255,0.25)',
              boxShadow: '0 12px 40px rgba(255,255,255,0.1), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.1)'
            }}
            animate={{
              boxShadow: [
                '0 12px 40px rgba(255,255,255,0.1), inset 0 2px 0 rgba(255,255,255,0.3)',
                '0 16px 50px rgba(255,255,255,0.2), inset 0 2px 0 rgba(255,255,255,0.4)',
                '0 12px 40px rgba(255,255,255,0.1), inset 0 2px 0 rgba(255,255,255,0.3)'
              ]
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Search Icon */}
            {/* <motion.div
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Search className="w-8 h-8 text-white/90 drop-shadow-lg" />
            </motion.div> */}
          </motion.div>

          {/* Pulse Rings */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{
                scale: [1, 1.5 + i * 0.2],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Focus Beam */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Track Path Visualization */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <svg className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.5)' }} />
              <stop offset="70%" style={{ stopColor: 'rgba(255,255,255,0.8)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.3)' }} />
            </linearGradient>
          </defs>
          
          <line
            x1={60}
            y1={60}
            x2={window.innerWidth - 80}
            y2={60}
            stroke="url(#trackGradient)"
            strokeWidth="2"
            strokeDasharray="10,5"
          />
          
          <line
            x1={window.innerWidth - 80}
            y1={60}
            x2={window.innerWidth - 80}
            y2={window.innerHeight - 100}
            stroke="url(#trackGradient)"
            strokeWidth="2"
            strokeDasharray="10,5"
          />
        </svg>
      </div>

      {/* Navigation Items */}
      <div className="fixed inset-0 z-40 pointer-events-none">
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          const position = getItemPosition(index, isActive);
          
          return (
            <motion.div
              key={item.id}
              className="absolute pointer-events-auto"
              animate={{
                x: position.x - 16,
                y: position.y - 25,
                scale: position.scale,
                opacity: position.opacity
              }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                duration: 0.6
              }}
            >
              <motion.a
                href={item.href}
                className="relative block w-12 h-12 group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Glass Background */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: isActive 
                      ? '2px solid rgba(255,255,255,0.4)' 
                      : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: isActive
                      ? '0 8px 32px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.4)'
                      : '0 4px 16px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                  animate={{
                    boxShadow: isActive
                      ? [
                          '0 8px 32px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                          '0 12px 40px rgba(255,255,255,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
                          '0 8px 32px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.4)'
                        ]
                      : undefined
                  }}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent drop-shadow-sm`}
                    animate={{
                      filter: isActive ? 'brightness(1.5) drop-shadow(0 0 8px rgba(255,255,255,0.5))' : 'brightness(1)'
                    }}
                  >
                    {item.title}
                    {/* {item.icon} */}
                  </motion.div>
                </div>

                {/* Active Ring */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 0.4, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Tooltip */}
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
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
              </motion.a>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.1 ? 1 : 0 }}
      >
        <div
          className="px-4 py-2 rounded-full text-xs text-white/80"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        >
          {Math.round(scrollProgress * 100)}% explored
        </div>
      </motion.div>


    </>
  );
}