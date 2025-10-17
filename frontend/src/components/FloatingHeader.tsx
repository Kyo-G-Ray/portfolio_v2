import { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FloatingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'services', 'skills', 'works', 'pricing', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#services', label: 'Services', id: 'services' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#works', label: 'Works', id: 'works' },
    { href: '#pricing', label: 'Pricing', id: 'pricing' },
    { href: '#testimonials', label: 'Reviews', id: 'testimonials' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  const socialLinks = [
    { icon: <Mail className="w-4 h-4" />, href: 'mailto:contact@example.com' },
    { icon: <Phone className="w-4 h-4" />, href: 'tel:+81901234567' },
    { icon: <Github className="w-4 h-4" />, href: '#' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#' },
  ];

  return (
    <>
      {/* Main Floating Navigation */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-4 shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <div className="text-xl font-bold bg-gradient-to-b from-emerald-400 to-cyan-400 bg-clip-text text-transparent writing-mode-vertical">
              DEV
            </div>
            
            {/* Navigation Dots */}
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`w-3 h-3 rounded-full transition-all duration-300 relative group ${
                    activeSection === item.id 
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                >
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="backdrop-blur-lg bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="border-t border-white/20 pt-4">
              <div className="flex flex-col space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-200"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-6 left-6 right-6 z-50 lg:hidden"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/80 hover:text-emerald-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-4 backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white/80 hover:text-emerald-400 transition-colors duration-200 py-2"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="border-t border-white/20 pt-4">
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-white/60 hover:text-emerald-400 transition-colors duration-200"
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Top Right Quick Contact */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="fixed top-6 right-6 z-40 hidden lg:block"
      >
        <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="text-sm text-white/80">
              <div className="text-emerald-400">Ready to work?</div>
              <div>Let's discuss your project</div>
            </div>
            <a
              href="#contact"
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 text-sm"
            >
              Get Started
            </a>
          </div>
        </div>
      </motion.div>
    </>
  );
}