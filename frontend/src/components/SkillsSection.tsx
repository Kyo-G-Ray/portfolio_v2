import { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/storage';
import { fetchDataWithImageUrl } from '../utils/fetchImage';
import { motion } from 'motion/react';
import { WaveSection } from './WaveSection';
import { SectionTitle } from './SectionTitle';
import { ImageWithFallback } from './figma/ImageWithFallback';




type skillProps = {
  tools: any[] | null;
  setTools: React.Dispatch<React.SetStateAction<any[] | null>>;
}

export function SkillsSection({ tools, setTools }: skillProps) {

  const isLocalDev = import.meta.env.VITE_DEV;  // ローカル開発の場合True

  const skillCategories = [
    {
      category: 'Web Development',
      gradient: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'TypeScript', level: 90, icon: '🔷' },
        { name: 'Python', level: 80, icon: '🐍' },
        { name: 'React / Next.js', level: 80, icon: '⚛️' },
        { name: 'Node.js / Express', level: 80, icon: '🚀' },
        { name: 'Vue.js / Nuxt.js', level: 70, icon: '🔍' },
      ]
    },
    {
      category: 'AI / ML',
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'LightGBM / Time Series Processing', level: 90, icon: '💡' },
        { name: 'OpenAI API / GPT', level: 90, icon: '🤖' },
        { name: 'TensorFlow / PyTorch', level: 90, icon: '🧠' },
        { name: 'Image Processing', level: 70, icon: '🖼️' },
        { name: 'Natural Language Processing', level: 60, icon: '💬' },
      ]
    }
  ];

  // const certifications = [
  //   { name: 'AWS Solutions Architect', year: '2023', level: 'Associate' },
  //   { name: 'Google Cloud Professional', year: '2023', level: 'Cloud Developer' },
  //   { name: 'React Developer', year: '2022', level: 'Advanced' },
  //   { name: 'Python Institute', year: '2022', level: 'PCAP' },
  // ];


  const [isDoneFetchTools, setIsDoneFetchTools] = useState(false);  // 一度画像URL取得が完了したかどうかのフラグ
  // const [toolWithImages, setToolWithImages] = useState<any[] | null>(null); // データとローディング状態

  useEffect(() => {
    if (isDoneFetchTools) { return; }  // 既に一度取得済みなら処理しない

    if (!isLocalDev) {
      console.log("prod tool images fetch...");

      const useTools = [
        { name: 'VS Code', image: 'vscode.webp' },
        { name: 'Git / GitHub', image: 'github.webp' },
        { name: 'Figma', image: 'figma.webp' },
        { name: 'Slack', image: 'slack.webp' },
        { name: 'ChatWork', image: 'chatwork.webp' },
        { name: 'LINE', image: 'line.webp' },
        { name: 'Notion', image: 'notion.webp' },
      ];

      const fetchUrls = async (useTools) => {
        const toolsWithUrls = await fetchDataWithImageUrl(useTools, getImageUrl, 'public');
        setTools(toolsWithUrls);
      };
      fetchUrls(useTools);
    }

    else {
      console.log("dev tool images fetch...");

      const useTools = [
        { name: 'VS Code', image: '💻', imageURL: "/figs/icon/vscode.webp" },
        { name: 'Git / GitHub', image: '📝', imageURL: "./figs/icon/github.webp" },
        { name: 'Figma', image: '🎨', imageURL: "./figs/icon/figma.webp" },
        { name: 'Slack', image: '💬', imageURL: "./figs/icon/slack.webp" },
        { name: 'ChatWork', image: '💬', imageURL: "./figs/icon/chatwork.webp" },
        { name: 'LINE', image: '💬', imageURL: "./figs/icon/line.webp" },
        { name: 'Notion', image: '📓', imageURL: "./figs/icon/notion.webp" },
      ];

      setTools(useTools);
    }
    console.log(tools);
    setIsDoneFetchTools(true);  // 一度画像URLの取得が完了したことを示す
  }, []);



  return (
    <WaveSection id="skills" waveTop className="py-40 bg-gradient-to-br from-slate-900/80 to-emerald-900/30">
      <div className="container mx-auto max-w-7xl px-6">
        <SectionTitle
          title="Technical Skills"
          subtitle="最新技術とベストプラクティスを駆使した開発力"
          style="split"
          position="center"
          accent="cyan"
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 bg-gradient-to-r ${category.gradient} rounded-full mr-3`}></div>
                <h3 className="text-2xl text-white">{category.category}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{skill.icon}</span>
                        <span className="text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-emerald-400 text-sm">{skill.level}%</span>
                    </div>
                    
                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl text-emerald-400 text-center mb-12">認定資格</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">🏆</div>
                <h4 className="text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                  {cert.name}
                </h4>
                <p className="text-gray-400 text-sm mb-1">{cert.level}</p>
                <p className="text-emerald-400 text-sm">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Tools & Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8"
        >
          <h3 className="text-3xl text-cyan-400 text-center mb-8">開発ツール & ワークフロー</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {tools !== null ? (
            tools.map((tool, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                >
                  {/* <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {tool.image}
                  </div> */}
                  <ImageWithFallback 
                    src={tool.imageURL}
                    alt={tool.name}
                    className="mx-auto mb-2 w-12 h-12 object-contain"
                  />
                  <div className="text-gray-300 text-sm">{tool.name}{tool.imageUrl}</div>
                </motion.div>
              );
            })) : (<p className="text-gray-400">読み込み中...</p>)}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
              効率的にツールを活用して、高品質なプロダクトを迅速にお届けします。
            </p>
          </div>
        </motion.div>
      </div>
    </WaveSection>
  );
}