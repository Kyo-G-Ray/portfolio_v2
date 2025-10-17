import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: 'https://github.com/Kyo-G-Ray', label: 'GitHub' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/smmRSOW5myh4hyU', label: 'Twitter' },
    // { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    // { icon: <Mail className="w-5 h-5" />, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#works', label: 'Works' },
    { href: '#contact', label: 'Contact' }
  ];

  const services = [
    'Web制作・開発',
    'AI開発',
    '業務自動化・RPA',
  ];

  return (
    <footer className="py-16 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="text-3xl mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Web開発からAI開発まで、幅広い技術でビジネスの成長をサポートします。
              伴走型の開発スタイルで、あなたのアイデアを形にします。
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="p-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/20 transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 hover:text-emerald-400 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg text-white mb-6">Services</h3>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service}
                  className="text-gray-400 text-sm"
                >
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between pt-8 border-t border-white/10">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Portfolio. All rights reserved.
          </div>
        </div>

        {/* Legal Links */}
        {/* <div className="flex flex-wrap justify-center gap-6 mt-6 pt-6 border-t border-white/10">
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
            プライバシーポリシー
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
            利用規約
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
            特定商取引法
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors duration-200">
            サイトマップ
          </a>
        </div> */}
      </div>
    </footer>
  );
}