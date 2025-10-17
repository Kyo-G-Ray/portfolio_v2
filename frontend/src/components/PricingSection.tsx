import { motion } from 'motion/react';
import { Check, Star, Zap, Crown, ArrowRight } from 'lucide-react';
import { WaveSection } from './WaveSection';
import { SectionTitle } from './SectionTitle';

export function PricingSection() {
  const pricingPlans = [
    {
      name: 'スタートアップ',
      subtitle: 'MVP・プロトタイプ開発',
      price: '¥300,000',
      period: '〜',
      description: '新規事業やアイデア検証に最適なプラン',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'from-emerald-500 to-teal-500',
      popular: false,
      features: [
        'MVP開発（1-2ヶ月）',
        'レスポンシブデザイン',
        '基本的なSEO対策',
        'モバイル対応',
        '1ヶ月間の無償サポート',
        'ソースコード提供',
        '基本的なデプロイ設定'
      ],
      deliverables: [
        'フロントエンド開発',
        '基本的なバックエンド',
        'データベース設計',
        '基本ドキュメント'
      ]
    },
    {
      name: 'ビジネス',
      subtitle: '本格的なWebアプリ開発',
      price: '¥800,000',
      period: '〜',
      description: '事業成長を支える高品質なシステム',
      icon: <Star className="w-6 h-6" />,
      gradient: 'from-cyan-500 to-blue-500',
      popular: true,
      features: [
        'フルスタック開発（2-4ヶ月）',
        'カスタムデザインシステム',
        '高度なSEO・パフォーマンス最適化',
        'ユーザー認証・権限管理',
        '決済システム連携',
        'API設計・開発',
        'CI/CD パイプライン構築',
        '3ヶ月間の保守サポート'
      ],
      deliverables: [
        'スケーラブルアーキテクチャ',
        'テスト自動化',
        'セキュリティ対策',
        '詳細ドキュメント',
        '運用マニュアル'
      ]
    },
    {
      name: 'エンタープライズ',
      subtitle: 'AI・自動化ソリューション',
      price: '¥1,500,000',
      period: '〜',
      description: '最先端技術による業務変革',
      icon: <Crown className="w-6 h-6" />,
      gradient: 'from-purple-500 to-pink-500',
      popular: false,
      features: [
        'AI機能実装（3-6ヶ月）',
        '業務自動化・RPA開発',
        'データ分析・可視化',
        'マルチプラットフォーム対応',
        'クラウドインフラ設計',
        '高可用性・スケーラビリティ',
        'セキュリティ監査',
        '6ヶ月間のプレミアムサポート'
      ],
      deliverables: [
        'カスタムAIモデル',
        'マイクロサービス設計',
        'パフォーマンス監視',
        '技術コンサルティング',
        'チーム教育・研修'
      ]
    }
  ];

  const additionalServices = [
    {
      title: '技術コンサルティング',
      price: '¥50,000/日',
      description: '技術選定、アーキテクチャ設計、コードレビューなど'
    },
    {
      title: '保守・運用サポート',
      price: '¥100,000/月',
      description: 'システム監視、バグ修正、機能追加、パフォーマンス改善'
    },
    {
      title: 'チーム開発サポート',
      price: '¥200,000/月',
      description: 'チームリード、メンタリング、開発プロセス改善'
    },
    {
      title: '緊急対応・障害復旧',
      price: '¥100,000/件',
      description: '24時間以内の緊急対応、システム復旧作業'
    }
  ];

  return (
    <WaveSection id="pricing" waveTop waveBottom className="py-32 bg-gradient-to-br from-slate-900/90 to-purple-900/30">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Pricing Plans"
          subtitle="プロジェクトの規模と要件に応じた柔軟な料金体系"
          style="diagonal"
          position="center"
          accent="purple"
        />

        {/* Main Pricing Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative backdrop-blur-2xl bg-white/5 border rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 ${
                plan.popular 
                  ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/20 scale-105' 
                  : 'border-white/10'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="backdrop-blur-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.gradient} text-white mb-4`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className="text-lg text-white mb-4">含まれるサービス</h4>
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="mb-8">
                <h4 className="text-lg text-white mb-4">成果物</h4>
                <div className="space-y-2">
                  {plan.deliverables.map((deliverable, deliverableIndex) => (
                    <div key={deliverableIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-400 text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                className={`block w-full text-center py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600'
                    : 'backdrop-blur-lg bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  相談する
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-3xl text-emerald-400 text-center mb-12">追加サービス</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg text-white">{service.title}</h4>
                  <div className="text-emerald-400 font-medium">{service.price}</div>
                </div>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Payment & Process Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid md:grid-cols-2 gap-8"
        >
          <div className="backdrop-blur-lg bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8">
            <h4 className="text-2xl text-emerald-400 mb-4">お支払いについて</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>着手金50%、完成時50%の分割払い</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>銀行振込・PayPal対応</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>月額サービスはクレジットカード可</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>請求書発行・領収書対応</span>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-8">
            <h4 className="text-2xl text-cyan-400 mb-4">開発プロセス</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold">1</div>
                <span>要件ヒアリング・見積り</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold">2</div>
                <span>設計・プロトタイプ作成</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold">3</div>
                <span>アジャイル開発・定期報告</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black text-sm font-bold">4</div>
                <span>テスト・納品・サポート</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </WaveSection>
  );
}