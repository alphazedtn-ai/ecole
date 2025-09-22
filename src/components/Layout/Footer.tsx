import React from 'react';
import { Phone, MessageCircle, MapPin, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="https://i.postimg.cc/sgqqmn1f/image.png" 
                alt="Senatec Logo" 
                className="h-12 w-auto"
              />
              <div className="ml-3">
                <h3 className="text-xl font-bold">École de Formation Senatec</h3>
                <p className="text-gray-400 text-sm">{t('hero.subtitle')}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('hero.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact.title')}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-sm">{t('footer.address')}</p>
                  <p className="text-xs text-gray-400">{t('footer.behind')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <a href="tel:+21698821822" className="text-sm hover:text-green-400 transition-colors">
                  +216 98 821 822
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-green-400" />
                <a href="https://wa.me/21654023807" className="text-sm hover:text-green-400 transition-colors">
                  +216 54 023 807
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.courses')}
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.about')}
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.contact')}
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-white transition-colors">
                {t('nav.blog')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} École de Formation Senatec. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}