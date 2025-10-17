import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzU3OTQwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Professional workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-emerald-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Glass Card */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">
              フルスタック
              <br />
              デベロッパー
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Web開発 / AI開発 / 業務自動化
              <br />
              あなたのビジョンを現実に変える技術パートナー
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
            >
              お問い合わせ
            </a>
            <a
              href="#works"
              className="px-8 py-4 backdrop-blur-md bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              制作実績を見る
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 backdrop-blur-lg bg-emerald-400/10 rounded-full border border-emerald-400/20 hidden lg:block"></div>
      <div className="absolute bottom-40 right-20 w-16 h-16 backdrop-blur-lg bg-cyan-400/10 rounded-full border border-cyan-400/20 hidden lg:block"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 backdrop-blur-lg bg-white/10 rounded-full border border-white/20 hidden lg:block"></div>
    </section>
  );
}