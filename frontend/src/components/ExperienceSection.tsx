import { motion } from 'motion/react';
import { WaveSection } from './WaveSection';
import { SectionTitle } from './SectionTitle';

export function ExperienceSection() {
  const experiences = [
    {
      period: '2024 - 現在',
      role: 'アプリエンジニア・統括業務',
      company: 'IT企業',
      description: 'Web開発・業務効率化ツールを開発。TypeScript/Next.jsを用いたフロントエンド開発、Pythonを用いたAI開発、RPAツールの設計から実装まで担当。',
      highlights: [
        'SNSから友達リストを一括作成するツールを作成し、人手で2日かかっていた作業を30分に短縮',
        '業務効率を最大83%向上させる自動集計ツールの開発'
      ]
    },
    {
      period: '2021 - 2024',
      role: 'AIエンジニア',
      company: '大学・大学院',
      description: 'AIによる電力使用量の予測モデルを構築し、国際論文誌に掲載',
      highlights: [
        'AIによる電力使用量の予測モデルを構築し、国際論文誌に掲載',
        'インターンシップにてDB設計から前処理、モデル構築、評価まで一貫して担当',
        'マクロによる自動化ツール開発により、非IT部門の業務効率を大幅アップ',
      ]
    },
    {
      period: '2018 - 2021',
      role: 'Webエンジニア',
      company: '大学',
      description: 'プログラミングの基礎から学び、実務経験も徐々に積み始める',
      highlights: [
        '企業向けWebサイト構築',
        'Pythonでの研究効率化ツール開発',
      ]
    }
  ];

  return (
    <WaveSection id="experience" waveTop waveBottom className="py-32 bg-gradient-to-br from-slate-900/50 to-emerald-900/20">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionTitle
          title="Experience Timeline"
          subtitle="これまでの開発経歴と主な実績をご紹介します"
          style="vertical"
          position="left"
          accent="emerald"
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="grid md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <div className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-4 py-2 text-emerald-300 text-center mb-4">
                    {exp.period}
                  </div>
                  <h3 className="text-xl text-emerald-400 mb-2">{exp.role}</h3>
                  <p className="text-gray-400">{exp.company}</p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div>
                    <h4 className="text-lg text-cyan-400 mb-3">主な成果</h4>
                    <div className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-300"
                        >
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology Timeline */}
        {/* <div className="mt-16">
          <h3 className="text-2xl text-center mb-8 text-emerald-400">技術スタックの進化</h3>
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-cyan-400 mb-2">2019-2020</div>
                <div className="space-y-2">
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">HTML/CSS/JS</div>
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">jQuery</div>
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">WordPress</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 mb-2">2020-2022</div>
                <div className="space-y-2">
                  <div className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-1 text-emerald-300 text-sm">React</div>
                  <div className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-1 text-emerald-300 text-sm">TypeScript</div>
                  <div className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-1 text-emerald-300 text-sm">Node.js</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-cyan-400 mb-2">2022-現在</div>
                <div className="space-y-2">
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">Next.js</div>
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">Python/AI</div>
                  <div className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 rounded-lg px-3 py-1 text-cyan-300 text-sm">AWS/GCP</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </WaveSection>
  );
}