
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'sw';

type Translations = {
  [key: string]: {
    en: string;
    sw: string;
  };
};

// Add all translations here
const translations: Translations = {
  // Navigation
  home: { en: 'Home', sw: 'Nyumbani' },
  about: { en: 'About Us', sw: 'Kuhusu Sisi' },
  events: { en: 'Events', sw: 'Matukio' },
  sermons: { en: 'Sermons', sw: 'Mahubiri' },
  ministries: { en: 'Ministries', sw: 'Wizara' },
  contact: { en: 'Contact', sw: 'Wasiliana Nasi' },
  
  // Hero Section
  welcome: { en: 'Welcome to', sw: 'Karibu' },
  churchName: { en: 'Kinondoni Revival Church', sw: 'Kanisa la Uamsho la Kinondoni' },
  tagline: { en: 'Tanzania Assemblies of God', sw: 'Tanzania Assemblies of God' },
  joinUs: { en: 'Join Us This Sunday', sw: 'Jiunge Nasi Jumapili Hii' },
  learnMore: { en: 'Learn More', sw: 'Jifunze Zaidi' },
  
  // Service Times
  serviceTimes: { en: 'Service Times', sw: 'Nyakati za Ibada' },
  sundayService: { en: 'Sunday Service', sw: 'Ibada ya Jumapili' },
  firstService: { en: '1st Service', sw: 'Ibada ya Kwanza' },
  secondService: { en: '2nd Service', sw: 'Ibada ya Pili' },
  
  // Footer
  address: { en: 'Address', sw: 'Anwani' },
  phone: { en: 'Phone', sw: 'Simu' },
  email: { en: 'Email', sw: 'Barua pepe' },
  followUs: { en: 'Follow Us', sw: 'Tufuate' },
  copyright: { en: 'All Rights Reserved', sw: 'Haki Zote Zimehifadhiwa' },
  quickLinks: { en: 'Quick Links', sw: 'Viungo vya Haraka' },
  
  // About Page
  ourVision: { en: 'Our Vision', sw: 'Maono Yetu' },
  ourMission: { en: 'Our Mission', sw: 'Misheni Yetu' },
  ourValues: { en: 'Our Values', sw: 'Maadili Yetu' },
  
  // Contact Page
  getInTouch: { en: 'Get In Touch', sw: 'Wasiliana Nasi' },
  sendMessage: { en: 'Send Message', sw: 'Tuma Ujumbe' },
  yourName: { en: 'Your Name', sw: 'Jina Lako' },
  yourEmail: { en: 'Your Email', sw: 'Barua Pepe Yako' },
  subject: { en: 'Subject', sw: 'Somo' },
  message: { en: 'Message', sw: 'Ujumbe' },
  submit: { en: 'Submit', sw: 'Wasilisha' },
  
  // Common sections
  upcomingEvents: { en: 'Upcoming Events', sw: 'Matukio Yajayo' },
  viewAllEvents: { en: 'View All Events', sw: 'Ona Matukio Yote' },
  contactUs: { en: 'Contact Us', sw: 'Wasiliana Nasi' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
