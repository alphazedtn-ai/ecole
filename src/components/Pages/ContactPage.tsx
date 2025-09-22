import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Bonjour! Je souhaite obtenir des informations sur vos formations.

Nom: ${formData.name}
Email: ${formData.email}
Formation d'intérêt: ${formData.course}
Message: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/21654023807?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: t('contact.address'),
      content: '12 Rue Hasan Hosni, El Mourouj 4, Tunisie',
      subtitle: '(Derrière Carrefour, en face de l\'institut El Mourouj 4)',
      action: () => window.open('https://maps.google.com/?q=El+Mourouj+4+Tunisia', '_blank')
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      content: '+216 98 821 822',
      subtitle: 'Appel direct',
      action: () => window.open('tel:+21698821822')
    },
    {
      icon: MessageCircle,
      title: t('contact.whatsapp'),
      content: '+216 54 023 807',
      subtitle: 'Message instantané',
      action: () => window.open('https://wa.me/21654023807')
    },
    {
      icon: Clock,
      title: 'Horaires d\'ouverture',
      content: 'Lun - Sam: 9h00 - 18h00',
      subtitle: 'Dimanche: Fermé',
      action: null
    }
  ];

  const courses = [
    'Club Programmation (Développement Web)',
    'Maîtriser WordPress',
    'Français - Tous Niveaux',
    'Allemand A1 → B1',
    'Autre formation'
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une question sur nos formations ? Besoin de conseils personnalisés ? 
            Notre équipe est là pour vous accompagner dans votre projet professionnel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Informations de Contact
            </h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <info.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                    <p className="text-lg text-gray-700 mb-1">{info.content}</p>
                    {info.subtitle && (
                      <p className="text-sm text-gray-500">{info.subtitle}</p>
                    )}
                    {info.action && (
                      <button
                        onClick={info.action}
                        className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                      >
                        Cliquer pour contacter →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl">
              <h3 className="text-xl font-bold mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <a 
                  href="https://wa.me/21654023807"
                  className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 p-3 rounded-lg transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Démarrer une conversation WhatsApp</span>
                </a>
                <a 
                  href="tel:+21698821822"
                  className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Appeler maintenant</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.form.title')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.course')}
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Sélectionnez une formation</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Décrivez votre projet, vos objectifs ou vos questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>{t('contact.form.send')}</span>
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-4 text-center">
                En soumettant ce formulaire, vous serez redirigé vers WhatsApp pour envoyer votre message.
              </p>
            </div>

            {/* Map placeholder */}
            <div className="mt-8 h-64 bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Carte de localisation</p>
                <p className="text-sm text-gray-500">El Mourouj 4, Tunisie</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Comment s'inscrire à une formation ?
                </h3>
                <p className="text-gray-600">
                  Contactez-nous via WhatsApp, téléphone ou visitez notre centre. 
                  Nous vous expliquerons le processus d'inscription et les documents nécessaires.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Les certificats sont-ils reconnus ?
                </h3>
                <p className="text-gray-600">
                  Oui, tous nos certificats sont officiellement reconnus par le Ministère 
                  de la Formation Professionnelle et de l'Emploi (Licence n° 13/547/25).
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Quels sont les horaires des cours ?
                </h3>
                <p className="text-gray-600">
                  Nous proposons des horaires flexibles : matin, après-midi et soir, 
                  ainsi que des sessions weekend pour s'adapter à votre emploi du temps.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Y a-t-il un suivi après la formation ?
                </h3>
                <p className="text-gray-600">
                  Oui, nous assurons un accompagnement post-formation pour vous aider 
                  dans votre recherche d'emploi ou le lancement de votre projet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}