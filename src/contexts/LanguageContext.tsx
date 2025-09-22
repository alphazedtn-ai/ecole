import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.courses': 'Formations',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'École de Formation Senatec',
    'hero.subtitle': 'Centre de formation agréé par l\'État - Licence n° 13/547/25',
    'hero.description': 'Formations certifiées accélérées dans différentes spécialités pour vous aider à intégrer le marché du travail ou lancer vos projets.',
    'hero.cta.register': 'S\'inscrire Maintenant',
    'hero.cta.whatsapp': 'Contacter WhatsApp',
    'hero.cta.visit': 'Réserver une Visite',
    
    // About
    'about.title': 'À Propos de Senatec',
    'about.mission': 'Notre Mission',
    'about.mission.text': 'École de Formation Senatec est un centre de formation agréé par l\'État, basé à El Mourouj, Tunisie. Nous proposons des formations certifiées accélérées pour aider les étudiants à s\'intégrer rapidement sur le marché du travail.',
    'about.license': 'Licence d\'État n° 13/547/25',
    'about.certificates': 'Certificats Officiels',
    'about.certificates.text': 'À la fin de chaque programme, les étudiants reçoivent un certificat officiellement reconnu par le Ministère de la Formation Professionnelle et de l\'Emploi.',
    
    // Courses
    'courses.title': 'Nos Formations',
    'courses.filter.all': 'Toutes',
    'courses.filter.programming': 'Programmation',
    'courses.filter.web': 'Web Design',
    'courses.filter.languages': 'Langues',
    'courses.duration': 'Durée',
    'courses.price': 'Prix',
    'courses.register': 'S\'inscrire',
    
    // Contact
    'contact.title': 'Nous Contacter',
    'contact.address': 'Adresse',
    'contact.phone': 'Téléphone',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.title': 'Envoyez-nous un Message',
    'contact.form.name': 'Nom Complet',
    'contact.form.email': 'Email',
    'contact.form.course': 'Formation d\'Intérêt',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer',
    
    // Footer
    'footer.address': '12 Rue Hasan Hosni, El Mourouj 4, Tunisie',
    'footer.behind': '(Derrière Carrefour, en face de l\'institut El Mourouj 4)',
    'footer.rights': 'Tous droits réservés',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur s\'est produite',
    'common.success': 'Succès!',
  },
  
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'École de Formation Senatec',
    'hero.subtitle': 'State-Licensed Training Center - License No. 13/547/25',
    'hero.description': 'Fast-track certified training courses in different specialties to help you integrate into the job market or launch your projects.',
    'hero.cta.register': 'Register Now',
    'hero.cta.whatsapp': 'Contact WhatsApp',
    'hero.cta.visit': 'Book a Visit',
    
    // About
    'about.title': 'About Senatec',
    'about.mission': 'Our Mission',
    'about.mission.text': 'École de Formation Senatec is a state-licensed training center based in El Mourouj, Tunisia. We provide fast-track certified training courses to help students quickly integrate into the job market.',
    'about.license': 'State License No. 13/547/25',
    'about.certificates': 'Official Certificates',
    'about.certificates.text': 'At the end of each program, students receive an officially recognized certificate from the Ministry of Vocational Training and Employment.',
    
    // Courses
    'courses.title': 'Our Courses',
    'courses.filter.all': 'All',
    'courses.filter.programming': 'Programming',
    'courses.filter.web': 'Web Design',
    'courses.filter.languages': 'Languages',
    'courses.duration': 'Duration',
    'courses.price': 'Price',
    'courses.register': 'Register',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.course': 'Course of Interest',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send',
    
    // Footer
    'footer.address': '12 Rue Hasan Hosni, El Mourouj 4, Tunisia',
    'footer.behind': '(Behind Carrefour, opposite El Mourouj 4 institute)',
    'footer.rights': 'All rights reserved',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
  },
  
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'حول',
    'nav.courses': 'الدورات',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'المشرف',
    
    // Hero Section
    'hero.title': 'مدرسة التكوين سناتك',
    'hero.subtitle': 'مركز تكوين مرخص من الدولة - رخصة رقم 13/547/25',
    'hero.description': 'دورات تدريبية معتمدة مسرعة في تخصصات مختلفة لمساعدتك على الاندماج في سوق العمل أو إطلاق مشاريعك.',
    'hero.cta.register': 'سجل الآن',
    'hero.cta.whatsapp': 'اتصل عبر واتساب',
    'hero.cta.visit': 'احجز زيارة',
    
    // About
    'about.title': 'حول سناتك',
    'about.mission': 'مهمتنا',
    'about.mission.text': 'مدرسة التكوين سناتك هي مركز تكوين مرخص من الدولة، يقع في المروج، تونس. نقدم دورات تدريبية معتمدة مسرعة لمساعدة الطلاب على الاندماج بسرعة في سوق العمل.',
    'about.license': 'رخصة الدولة رقم 13/547/25',
    'about.certificates': 'شهادات رسمية',
    'about.certificates.text': 'في نهاية كل برنامج، يتلقى الطلاب شهادة معترف بها رسمياً من وزارة التكوين المهني والتشغيل.',
    
    // Courses
    'courses.title': 'دوراتنا',
    'courses.filter.all': 'الكل',
    'courses.filter.programming': 'البرمجة',
    'courses.filter.web': 'تصميم الويب',
    'courses.filter.languages': 'اللغات',
    'courses.duration': 'المدة',
    'courses.price': 'السعر',
    'courses.register': 'سجل',
    
    // Contact
    'contact.title': 'اتصل بنا',
    'contact.address': 'العنوان',
    'contact.phone': 'الهاتف',
    'contact.whatsapp': 'واتساب',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.course': 'الدورة المهتم بها',
    'contact.form.message': 'الرسالة',
    'contact.form.send': 'إرسال',
    
    // Footer
    'footer.address': '12 شارع حسن حسني، المروج 4، تونس',
    'footer.behind': '(خلف كارفور، مقابل معهد المروج 4)',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح!',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}