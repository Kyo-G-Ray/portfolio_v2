import { Code, Brain, Zap, Smartphone, Database, Globe } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Web制作・開発',
      description: 'モダンなWebサイト・Webアプリケーションの設計・開発。レスポンシブデザイン対応、SEO最適化、高いパフォーマンスを実現します。',
      features: [
        'React / Next.js開発',
        'レスポンシブデザイン',
        'SEO最適化',
        'パフォーマンス最適化',
        'CMS構築'
      ],
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI開発・実装',
      description: 'ChatGPT API、機械学習モデルを活用したAIアプリケーション開発。チャットボット、データ分析、予測システムなど。',
      features: [
        'ChatGPT API連携',
        'カスタムAIモデル開発',
        'データ分析・可視化',
        '自然言語処理',
        '画像認識システム'
      ],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '業務自動化・RPA',
      description: '定型業務の自動化、データ処理の効率化。Python、Node.jsを使った業務プロセスの自動化で生産性を大幅に向上させます。',
      features: [
        'データ処理自動化',
        'Web スクレイピング',
        'API連携システム',
        'レポート自動生成',
        'タスクスケジューリング'
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    // {
    //   icon: <Smartphone className="w-8 h-8" />,
    //   title: 'モバイルアプリ',
    //   description: 'React Native、PWAを使ったクロスプラットフォーム対応のモバイルアプリケーション開発。',
    //   features: [
    //     'React Native開発',
    //     'PWA対応',
    //     'ネイティブ機能連携',
    //     'プッシュ通知',
    //     'オフライン対応'
    //   ],
    //   gradient: 'from-green-500 to-emerald-500'
    // },
    // {
    //   icon: <Database className="w-8 h-8" />,
    //   title: 'バックエンド',
    //   description: 'スケーラブルなサーバーサイド開発、クラウドインフラ構築。AWSを使った高可用性システム設計。',
    //   features: [
    //     'Node.js / Python開発',
    //     'データベース設計',
    //     'クラウドインフラ構築',
    //     'CI/CD パイプライン',
    //     'セキュリティ対策'
    //   ],
    //   gradient: 'from-orange-500 to-red-500'
    // },
    // {
    //   icon: <Code className="w-8 h-8" />,
    //   title: 'コンサルティング',
    //   description: '技術選定、アーキテクチャ設計、開発チームのサポート。技術的な課題解決から事業戦略まで幅広くご相談いただけます。',
    //   features: [
    //     '技術選定・設計',
    //     'コードレビュー',
    //     'チーム教育・研修',
    //     'パフォーマンス改善',
    //     '保守・運用サポート'
    //   ],
    //   gradient: 'from-indigo-500 to-purple-500'
    // }
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            最新の技術を駆使して、ビジネス成長の一翼を担うソリューションを提供します
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group hover:scale-105"
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                {service.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-gray-300"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className={`inline-block px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  詳細を相談する
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20">
          <h3 className="text-3xl text-center mb-12 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            開発プロセス
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'ヒアリング', desc: '要件の詳細確認' },
              { step: '02', title: '提案・設計', desc: '最適なソリューション提案' },
              { step: '03', title: '開発・実装', desc: 'アジャイル開発で進行' },
              { step: '04', title: '納品・サポート', desc: '運用サポートまで対応' }
            ].map((process, index) => (
              <div
                key={index}
                className="text-center backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl text-emerald-400 mb-4">{process.step}</div>
                <h4 className="text-xl text-white mb-2">{process.title}</h4>
                <p className="text-gray-400">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}