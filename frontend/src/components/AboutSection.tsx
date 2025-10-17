import { motion } from 'motion/react';
import { WaveSection } from './WaveSection';
import { SectionTitle } from './SectionTitle';

export function AboutSection() {
  return (
    <WaveSection id="about" waveTop className="py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle
          title="About Me"
          subtitle="AI・Web開発者としての経歴"
          style="floating"
          position="center"
          accent="emerald"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl mb-4 text-emerald-400">経歴</h3>
              <p className="text-gray-300 leading-relaxed">
                5年以上のWeb開発経験を持ち、最新のフロントエンド技術からバックエンド、AI開発まで幅広くカバーしています。
                特にReact、Next.js、TypeScript、Python、機械学習を得意としており、
                多くの企業へ技術提供を行ってきました。
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl mb-4 text-cyan-400">ミッション</h3>
              <p className="text-gray-300 leading-relaxed">
                単なる開発者ではなく、クライアントの戦略パートナーとして、技術的な課題解決から事業成長まで幅広くサポートいたします。
                お客様が本当に時間を割くべき過程に集中できるよう、集客や業務効率化の側面から支援いたします！
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="backdrop-blur-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-3xl p-8"
            >
              <h3 className="text-2xl mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                開発の心持ち
              </h3>
              <p className="text-gray-300 leading-relaxed">
                「信頼をWebでつなげる」をモットーに、常にビジネス視点を持った開発を心がけています。
                美しいコードと実用性を両立し、長期的な保守性と拡張性を重視したソリューションを提供します。
              </p>
            </motion.div>
          </motion.div>

          {/* Skills & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl mb-6 text-emerald-400">Core Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'React / Next.js',
                  'TypeScript',
                  'Node.js',
                  'Python',
                  'AI / ML',
                  'AWS',
                  'HTML / CSS',
                  'PostgreSQL / MySQL',
                  'マクロ / VBA',
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3 text-center text-emerald-300 hover:bg-emerald-400/20 transition-all duration-300 hover:scale-105"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10+', label: 'プロジェクト', color: 'text-emerald-400' },
                { value: '5+', label: '年の経験', color: 'text-cyan-400' },
                { value: '99%', label: '満足度', color: 'text-emerald-400' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className={`text-3xl ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Personal Touch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="backdrop-blur-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-8"
            >
              <h3 className="text-xl mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Personal Touch
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                新しい技術への探究心と、クライアントとの対話を大切にしています。
                趣味はマラソン。フルマラソンには5回完走しています。
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </WaveSection>
  );
}