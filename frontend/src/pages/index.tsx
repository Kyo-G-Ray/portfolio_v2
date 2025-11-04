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
import { getCurrentUser } from 'aws-amplify/auth'; // Authモジュールを使う場合のみ




Amplify.configure({
  // 従来のAuth, Storageオブジェクトではなく、直接サービスのエンドポイントを設定
  aws_project_region: import.meta.env.VITE_AWS_REGION, // リージョンはプロジェクト全体で設定
  
  // Identity Pool ID は、ユーザー認証フローがない場合、Cognito設定に直接含めることが推奨されます
  aws_cognito_identity_pool_id: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID, 

  // S3 設定
  aws_user_files_s3_bucket: import.meta.env.VITE_S3_BUCKET,

  // S3 リージョン設定
  aws_user_files_s3_bucket_region: import.meta.env.VITE_AWS_REGION,
});







createRoot(document.getElementById("root")!).render(<App />);


export default function App() {
  const [sharedTools, setSharedTools] = useState<any[] | null>(null);
  const [sharedWorks, setSharedWorks] = useState<any[] | null>(null);
  const [sharedVoices, setSharedVoices] = useState<any[] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white overflow-x-hidden">
      <TrackNavigation />
      <AdvancedHeroSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <SkillsSection 
        tools={sharedTools}
        setTools={setSharedTools}
      />
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
