import React, { useState, useEffect } from "react";
import { Amplify } from 'aws-amplify';

import { TrackNavigation } from '../components/TrackNavigation';
import { AdvancedHeroSection } from '../components/AdvancedHeroSection';
import { AboutSection } from '../components/AboutSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ServicesSection } from '../components/ServicesSection';
import { SkillsSection } from '../components/SkillsSection';
import { WorksSection } from '../components/WorksSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

import { createRoot } from "react-dom/client";
// import App from "./frontend/src/pages/index.tsx";
import "../index.css";




// Amplify.configure({
//   // 認証（Cognito Identity Pool）設定
//   Auth: {
//     // ユーザー認証機能を使っていなくても、Identity Pool を使用するために設定が必要
//     identityPoolId: 'ap-northeast-1:1ac52806-6707-4d6e-91be-1d9b67211b1c', 
//     region: 'ap-northeast-1',
//   },

//   // ストレージ（S3）設定
//   Storage: {
//     AWSS3: {
//       bucket: 'kyoport-figs',
//       region: 'ap-northeast-1',
//     }
//   }
// });

import { getCurrentUser } from 'aws-amplify/auth'; // Authモジュールを使う場合のみ

Amplify.configure({
    // 従来のAuth, Storageオブジェクトではなく、直接サービスのエンドポイントを設定
    aws_project_region: 'ap-northeast-1', // リージョンはプロジェクト全体で設定
    
    // Identity Pool ID は、ユーザー認証フローがない場合、Cognito設定に直接含めることが推奨されます
    aws_cognito_identity_pool_id: 'ap-northeast-1:1ac52806-6707-4d6e-91be-1d9b67211b1c', 
    
    // S3 設定
    aws_user_files_s3_bucket: 'kyoport-figs',

    // S3 リージョン設定
    aws_user_files_s3_bucket_region: 'ap-northeast-1',
});






createRoot(document.getElementById("root")!).render(<App />);


export default function App() {
  const [sharedWorks, setSharedWorks] = useState<any[] | null>(null);
  const [sharedVoices, setSharedVoices] = useState<any[] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-x-hidden">
      <TrackNavigation
        works={sharedWorks}
        voices={sharedVoices}
      />
      <AdvancedHeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <SkillsSection />
      <WorksSection
        works={sharedWorks}
        setWorks={setSharedWorks}
      />
      <TestimonialsSection
        voices={sharedVoices}
        setVoices={setSharedVoices}
      />
      <ContactSection />
      <Footer />
    </div>
  );
}
