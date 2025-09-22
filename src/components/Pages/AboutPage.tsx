import React from 'react';
import { Award, Users, BookOpen, TrendingUp, MapPin, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function AboutPage() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Award,
      title: 'Centre Agréé par l\'État',
      description: 'Licence officielle n° 13/547/25 délivrée par les autorités tunisiennes'
    },
    {
      icon: Users,
      title: '500+ Étudiants Formés',
      description: 'Plus de 500 étudiants ont bénéficié de nos formations depuis notre création'
    },
    {
      icon: BookOpen,
      title: 'Formations Certifiées',
      description: 'Certificats reconnus par le Ministère de la Formation Professionnelle'
    },
    {
      icon: TrendingUp,
      title: '85% de Placement',
      description: 'Taux élevé d\'insertion professionnelle de nos diplômés'
    }
  ];

  const values = [
    {
      title: 'Excellence Pédagogique',
      description: 'Nous nous engageons à fournir une formation de haute qualité avec des formateurs expérimentés et des méthodes d\'apprentissage modernes.'
    },
    {
      title: 'Accompagnement Personnalisé',
      description: 'Chaque étudiant bénéficie d\'un suivi individuel pour maximiser ses chances de réussite et d\'insertion professionnelle.'
    },
    {
      title: 'Innovation Continue',
      description: 'Nous adaptons constamment nos programmes aux évolutions du marché du travail et aux nouvelles technologies.'
    },
    {
      title: 'Proximité et Accessibilité',
      description: 'Situés au cœur d\'El Mourouj, nous offrons des formations accessibles à tous avec des horaires flexibles.'
    }
  ];

  const certifications = [
    'Certificats reconnus par le Ministère de la Formation Professionnelle',
    'Programmes conformes aux standards internationaux',
    'Évaluation continue et certification finale',
    'Accompagnement post-formation',
    'Partenariats avec des entreprises locales'
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            École de Formation Senatec est un centre de formation professionnel agréé par l'État, 
            spécialisé dans les formations certifiées accélérées. Nous accompagnons nos étudiants 
            vers l'excellence professionnelle depuis notre établissement à El Mourouj.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('about.mission')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Notre mission est de démocratiser l'accès à une formation professionnelle de qualité 
                en offrant des programmes certifiés qui répondent aux besoins réels du marché du travail tunisien.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Nous croyons que chaque individu mérite d'avoir les outils nécessaires pour construire 
                une carrière épanouissante et contribuer au développement économique de notre pays.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{t('about.license')}</h3>
                <p className="text-blue-700">
                  Notre centre est officiellement reconnu et agréé par les autorités tunisiennes, 
                  garantissant la qualité et la validité de nos formations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg" 
                alt="Formation Senatec"
                className="rounded-xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-orange-500 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">13/547/25</div>
                <div className="text-sm">Licence d'État</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nos Réalisations
            </h2>
            <p className="text-xl text-gray-600">
              Des chiffres qui témoignent de notre engagement envers l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-blue-600 group-hover:bg-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <achievement.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos Valeurs
              </h2>
              <p className="text-xl text-gray-600">
                Les principes qui guident notre approche pédagogique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg" 
                alt="Certifications"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('about.certificates')}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                À l'issue de chaque formation, nos étudiants reçoivent un certificat officiel 
                reconnu par le Ministère de la Formation Professionnelle et de l'Emploi, 
                attestant de leurs nouvelles compétences.
              </p>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-blue-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Notre Emplacement
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MapPin className="h-6 w-6" />
            <span className="text-xl">12 Rue Hasan Hosni, El Mourouj 4, Tunisie</span>
          </div>
          <p className="text-blue-200 mb-8">
            Situé derrière Carrefour, en face de l'institut El Mourouj 4, notre centre est 
            facilement accessible par les transports en commun.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Planifier une Visite
          </button>
        </div>
      </div>
    </div>
  );
}