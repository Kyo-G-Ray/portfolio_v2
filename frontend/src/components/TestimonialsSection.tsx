import { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/base';
import { Star, Quote } from 'lucide-react';
import { fetchVoices } from '../../api/voice';  // クライアント様の声API




type voiceProps = {
  voices: any[] | null;
  setVoices: React.Dispatch<React.SetStateAction<any[] | null>>;
}


export function TestimonialsSection({ voices, setVoices }: voiceProps) {

  const isLocalDev = import.meta.env.VITE_DEV;  // ローカル開発の場合True

    // クライアント様の声読み込み
  // const [voices, setVoices] = useState<any[] | null>(null); // データとローディング状態

  useEffect(() => {
    const loadVoiceData = async () => {
      const data = await fetchVoices();
      setVoices(data);
    };

    if (!isLocalDev) {
      loadVoiceData();
    }
    else {
      console.log('ローカル開発');
      const PARSED_VOICE = JSON.parse(import.meta.env.VITE_VOICE);
      setVoices(PARSED_VOICE);
    }
  }, []);


  return (
    <section id="testimonials" className="py-40 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            クライアント様からいただいた声です
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {voices !== null ? (
            voices
              // .slice() // 元の配列を変更しないようにコピーを作成
              // .sort((a, b) => a.date - b.date) // 日付で昇順にソート
              .map((voice, index) =>  {
                // console.log(voice.id);

                return (
            <div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="flex items-start justify-between mb-6">
                <Quote className="text-emerald-400 w-8 h-8 flex-shrink-0" />
                <div className="text-right">
                  <div className="backdrop-blur-md bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                    {voice.title}
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{voice.description}"
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(voice.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 w-5 h-5 fill-current"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                {/* <div className="text-white font-medium">{testimonial.name}</div> */}
                <div className="text-gray-400 text-sm">{voice.clientName}</div>
              </div>
            </div>
          )}
        )) : (<p className="text-gray-400">Loading testimonials...</p>)}
        </div>
      </div>
    </section>
  );
}