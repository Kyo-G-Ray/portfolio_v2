import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { timeStamp } from 'console';
import DOMPurify from 'dompurify';





export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    timeStamp: '',
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    hp:''
  });

// 1. errors stateの追加
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 2. validateForm関数の作成
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    let isValid = true;

    // 例: 名前 (name) が必須
    if (!formData.name.trim()) {
      newErrors.name = 'お名前は必須です。';
      isValid = false;
    }

    // 例: メールアドレス (email) が必須かつ形式チェック
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスは必須です。';
      isValid = false;
    }
    else if (!emailRegex.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください。';
      isValid = false;
    }

    // 例: メッセージ (message) が必須
    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容は必須です。';
      isValid = false;
    }

    setErrors(newErrors); // エラー情報を更新
    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    if (isSubmitting || !validateForm()) {
      return;
    }
    setIsSubmitting(true);


    try {
      const response = await fetch(

        import.meta.env.VITE_GAS_URL,
        {
          method: "POST",
          mode: "no-cors", // GAS側がCORS対応していないのでこれでOK
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("送信成功:", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("送信エラー:", error);
    } finally {
      // 処理が完了したらフラグを下ろす（成功・失敗に関わらず）
      setIsSubmitting(false); 
    }
  };

  const handleInputChange = (field: string, value: string) => {
    const sanitizedValue = DOMPurify.sanitize(value.trim()); // サニタイズ
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="backdrop-blur-lg bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-12">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl text-emerald-400 mb-4">お問い合わせありがとうございます</h2>
            <p className="text-gray-300 mb-6">
              24時間以内にご返信させていただきます。
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
            >
              新しいお問い合わせ
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-slate-900/50 to-emerald-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Contact
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            業務効率化のご相談やお見積りなど、お気軽にお問い合わせください
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl text-emerald-400 mb-6">お問い合わせ</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Email</div>
                    <div className="text-white">kyogo.port.pgm@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Location</div>
                    <div className="text-white">東京都・埼玉県/リモート対応可</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Response Time</div>
                    <div className="text-white">24時間以内に返信</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl text-cyan-400 mb-6">よくあるご質問</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-white mb-2">Q. 開発期間はどのくらいですか？</div>
                  <div className="text-gray-400 text-sm">A. プロジェクトの規模によりますが、通常1〜6ヶ月程度です。</div>
                </div>
                <div>
                  <div className="text-white mb-2">Q. 料金体系はどうなっていますか？</div>
                  <div className="text-gray-400 text-sm">A. 固定料金またはタイムベースでご相談に応じます。</div>
                </div>
                <div>
                  <div className="text-white mb-2">Q. 保守・運用サポートはありますか？</div>
                  <div className="text-gray-400 text-sm">A. はい、納品後の保守・運用サポートも承っております。</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl text-white mb-6">お問い合わせフォーム</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">お名前 *</label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="山田 太郎"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">メールアドレス *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    placeholder="example@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">会社名</label>
                <Input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  placeholder="株式会社サンプル"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">ご希望のサービス *</label>
                  <Select onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="サービスを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web制作・開発</SelectItem>
                      <SelectItem value="ai">AI開発・実装</SelectItem>
                      <SelectItem value="automation">業務自動化・RPA</SelectItem>
                      <SelectItem value="mobile">モバイルアプリ</SelectItem>
                      <SelectItem value="backend">バックエンド・インフラ</SelectItem>
                      <SelectItem value="consulting">コンサルティング</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">ご予算</label>
                  <Select onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="予算を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50万円未満">50万円未満</SelectItem>
                      <SelectItem value="50-100万円">50-100万円</SelectItem>
                      <SelectItem value="100-300万円">100-300万円</SelectItem>
                      <SelectItem value="300万円以上">300万円以上</SelectItem>
                      <SelectItem value="要相談">要相談</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">希望納期</label>
                <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="納期を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1ヶ月以内">1ヶ月以内</SelectItem>
                    <SelectItem value="2-3ヶ月">2-3ヶ月</SelectItem>
                    <SelectItem value="3-6ヶ月">3-6ヶ月</SelectItem>
                    <SelectItem value="6ヶ月以上">6ヶ月以上</SelectItem>
                    <SelectItem value="要相談">要相談</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">メッセージ *</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[120px]"
                  placeholder="プロジェクトの詳細、ご要望、ご質問など、お聞かせください。"
                />
              </div>

              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="hp">ボット対策</label>
                <Input
                  id="hp"
                  type="text"
                  value={formData.hp}
                  onChange={(e) => handleInputChange('hp', e.target.value)}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 text-lg group"
              >
                {isSubmitting ? '送信中...' : '送信する'}
                <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                お問い合わせを送信
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}