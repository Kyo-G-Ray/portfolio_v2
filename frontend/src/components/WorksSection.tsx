import { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/base';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getImageUrl } from '../utils/storage';
import { fetchDataWithImageUrl } from '../utils/fetchImage';

import { fetchWorks } from '../../api/work';  // 制作実績API
import { fetchInterviews } from '../../api/interview';  // インタビューAPI


type workProps = {
  works: any[] | null;
  setWorks: React.Dispatch<React.SetStateAction<any[] | null>>;
}

export function WorksSection({ works, setWorks }: workProps) {

  const isLocalDev = import.meta.env.VITE_DEV;  // ローカル開発の場合True

  const [worksWithoutImage, setWorksWithoutImage] = useState<any[] | null>(null); // データとローディング状態
  const [isDoneFetchWorks, setIsDoneFetchWorks] = useState(false);  // 一度画像URL取得が完了したかどうかのフラグ

  // works初回読み込み
  useEffect(() => {
    const loadWorkData = async () => {
      const data = await fetchWorks();
      setWorksWithoutImage(data);
    };
      loadWorkData();
  }, []);

  // worksが更新されたら画像URLを取得してworksに反映
  useEffect(() => {
    if (isDoneFetchWorks) { return; }  // 既に一度取得済みなら処理しない
    if (!worksWithoutImage) { return; }

    if (!isLocalDev) {
      console.log("prod work images fetch...");

      const fetchUrls = async (works) => {
      const worksWithUrls = await fetchDataWithImageUrl(works, getImageUrl, 'public');
      setWorks(worksWithUrls);
      };
      fetchUrls(worksWithoutImage);
    }

    else {
      console.log("dev work images fetch...");
      const PARSED_WORKS = JSON.parse(import.meta.env.VITE_WORK);  // ローカルの場合は環境変数からのデータに対しても画像URLを追加処理
      
      const PARSED_WORKS_WITHURL = PARSED_WORKS.map((work) => {
        return { 
          ...work, 
          imageUrl: work.image  // 新しいプロパティとして imageUrl を追加
        };
      });
      setWorks(PARSED_WORKS_WITHURL);
    }

    setIsDoneFetchWorks(true);  // 一度画像URLの取得が完了したことを示す
}, [worksWithoutImage]);


    // インタビュー読み込み
  const [interviews, setInterviews] = useState<any[] | null>(null); // データとローディング状態
  const [interviewsWithoutImage, setInterviewsWithoutImage] = useState<any[] | null>(null); // データとローディング状態
  const [isDoneFetchInterviews, setIsDoneFetchInterviews] = useState(false);  // 一度画像URL取得が完了したかどうかのフラグ

  useEffect(() => {
    const loadInterviewData = async () => {
      const data = await fetchInterviews();
      setInterviewsWithoutImage(data);
    };
    loadInterviewData();
  }, []);

  useEffect(() => {
    if (isDoneFetchInterviews) { return; }  // 既に一度取得済みなら処理しない
    if (!interviewsWithoutImage) { return; }

    if (!isLocalDev) {
      console.log("prod interview images fetch...");

      const fetchUrls = async (interviews) => {
      const interviewsWithUrls = await fetchDataWithImageUrl(interviews, getImageUrl, 'public');
      setInterviews(interviewsWithUrls);
      };
      fetchUrls(interviewsWithoutImage);
    }
    else {
      console.log("dev interview images fetch...");

      const PARSED_INTERVIEW = JSON.parse(import.meta.env.VITE_INTERVIEW);  // ローカルの場合は環境変数からのデータに対しても画像URLを追加処理
      const PARSED_INTERVIEW_WITHURL = PARSED_INTERVIEW.map((interview) => {
        return { 
          ...interview, 
          imageUrl: interview.image  // 新しいプロパティとして imageUrl を追加
        };
      });
      setInterviews(PARSED_INTERVIEW_WITHURL);
    }

    setIsDoneFetchInterviews(true);  // 一度画像URLの取得が完了したことを示す
  }, [interviewsWithoutImage]);


  return (
    <section id="works" className="py-40 px-6 bg-gradient-to-br from-slate-900/50 to-emerald-900/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Works & Articles
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            これまでの制作実績と技術記事をご紹介します
          </p>
        </div>

        {/* Works Section */}
        <div className="mb-20">
          <h3 className="text-3xl mb-12 text-emerald-400 text-center">制作実績</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works !== null ? (
              works
                // .slice() // 元の配列を変更しないようにコピーを作成
                // .sort((a, b) => a.image.id - b.image.id) // image.idで昇順にソート
                .map((work, index) => {
              
              return (
              <a
                key={index}
                href={work.href}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group hover:scale-105"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className="backdrop-blur-md bg-emerald-400/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-sm">
                      {work.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="text-xl mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {work.title}
                  </h4>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {work.description}
                  </p>

                  {/* Tags */}
                  {/* <div className="flex flex-wrap gap-2 mb-6">
                    {work.techs !== null ? (work.techs.map((tech, index_tech) => {
                      return (
                      <span
                        key={tech.id}
                        className="backdrop-blur-md bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 px-2 py-1 rounded-md text-sm"
                      >
                        {tech.name}
                      </span>
                    )}
                    )): (<p className="text-gray-400">読み込み中...</p>)}
                  </div> */}

                  <div className="mt-4 flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                    <span className="text-sm">実績を見る</span>
                    <ExternalLink size={14} className="ml-2" />
                  </div>
                </div>
              </a>
            );
            })) : (<p className="text-gray-400">読み込み中...</p>)}
          </div>
        </div>



        {/* interviews Section */}
        <div>
          <h3 className="text-3xl mb-12 text-cyan-400 text-center">技術記事・インタビュー</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviews !== null ? (
              interviews
                // .slice() // 元の配列を変更しないようにコピーを作成
                // .sort((a, b) => a.image.id - b.image.id) // image.idで昇順にソート
                .map((interview, index) => {
              // const interviewImageURL = `${BASE_URL}${interview.image.formats.thumbnail.url}`;
              return (
              <a
                key={index}
                href={interview.href}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300 group hover:scale-105"
              >
              {/* Image */}
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={interview.imageUrl}
                  alt={interview.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* {interview.image} */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="backdrop-blur-md bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full text-sm">
                    {interview.publication}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-gray-500 text-sm">{interview.date}</span>
                </div>


                <h4 className="text-xl mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {interview.title}
                </h4>

                <p className="text-gray-400 leading-relaxed">
                  {interview.description}
                </p>

                <div className="mt-4 flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200">
                  <span className="text-sm">記事を読む</span>
                  <ExternalLink size={14} className="ml-2" />
                </div>
              </div>
            </a>
            );
            })) : (<p className="text-gray-400">読み込み中...</p>)}
          </div>
          <p className="text-gray-400 text-xs mt-16">
          【重要：所属先への連絡に関する厳重な警告】<br />本サイトに掲載している実績およびインタビュー記事は、個人の活動内容を公開しているものであり、所属企業（就業先）の事業とは一切無関係です。<br />本活動に関する所属企業への直接の連絡（電話、メール、SNS等）は、手段の如何を問わず一切を固く禁じます。<br />万が一、所属企業への連絡により所属企業の業務や私個人の活動への支障が生じた場合、偽計業務妨害罪等の刑事罰、および損害賠償請求を含む法的措置を辞さない構えであり、厳正に対処いたします。
          </p>
        </div>
      </div>
    </section>
  );
}