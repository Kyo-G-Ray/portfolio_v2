import React, { useState, useEffect } from "react";

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
