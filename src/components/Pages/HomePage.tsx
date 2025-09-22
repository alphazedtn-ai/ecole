import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Award, TrendingUp, Phone, MessageCircle, Calendar, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCourses, getTestimonials } from '../../lib/supabase';
import { Course, Testimonial } from '../../types';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, language } = useLanguage();
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesData, testimonialsData] = await Promise.all([
          getCourses(),
          getTestimonials()
        ]);
        
        setFeaturedCourses(coursesData?.filter(course => course.is_featured) || []);
        setTestimonials(testimonialsData?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const stats = [
    { icon: BookOpen, value: '15+', label: 'Formations Disponibles' },
    { icon: Users, value: '500+', label: 'Étudiants Formés' },
    { icon: Award, value: '100%', label: 'Certification Garantie' },
    { icon: TrendingUp, value: '85%', label: 'Taux de Placement' },
  ];

  const features = [
    {
      icon: Award,
      title: 'Formations Certifiées',
      description: 'Certificats officiels reconnus par le Ministère de la Formation Professionnelle'
    },
    {
      icon: Users,
      title: 'Encadrement Personnalisé',
      description: 'Groupes réduits et suivi individuel pour garantir votre réussite'
    },
    {
      icon: BookOpen,
      title: 'Apprentissage Pratique',
      description: 'Formation basée sur des projets concrets et des cas d\'usage réels'
    },
    {
      icon: TrendingUp,
      title: 'Insertion Professionnelle',
      description: 'Accompagnement dans la recherche d\'emploi et création d\'entreprise'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg mb-8 text-blue-200 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onNavigate('courses')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('hero.cta.register')}
              </button>
              <a 
                href="https://wa.me/21654023807"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t('hero.cta.whatsapp')}
              </a>
              <button 
                onClick={() => onNavigate('contact')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5 inline" />
                {t('hero.cta.visit')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi Choisir Senatec ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre approche unique combine formation théorique et pratique pour garantir votre insertion professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-blue-600 group-hover:bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('courses.title')}
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos formations les plus populaires
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={course.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'} 
                    alt={course[`title_${language}`] || course.title_fr}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {course[`title_${language}`] || course.title_fr}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course[`description_${language}`] || course.description_fr}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">{course.price} DT</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                        {t('courses.register')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <button 
              onClick={() => onNavigate('courses')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Voir Toutes les Formations
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Témoignages d'Étudiants
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez ce que disent nos anciens étudiants
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial[`comment_${language}`] || testimonial.comment_fr}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.course}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Commencer Votre Formation ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines d'étudiants qui ont transformé leur carrière grâce à nos formations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Contactez-nous Maintenant
            </button>
            <a 
              href="tel:+21698821822"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              +216 98 821 822
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}