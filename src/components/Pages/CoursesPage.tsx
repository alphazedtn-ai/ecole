import React, { useState, useEffect } from 'react';
import { Clock, DollarSign, Users, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getCourses } from '../../lib/supabase';
import { Course } from '../../types';

export function CoursesPage() {
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data || []);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const categories = [
    { key: 'all', label: t('courses.filter.all') },
    { key: 'programming', label: t('courses.filter.programming') },
    { key: 'web', label: t('courses.filter.web') },
    { key: 'languages', label: t('courses.filter.languages') },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  // Mock courses data if Supabase is not connected
  const mockCourses: Course[] = [
    {
      id: '1',
      title_fr: 'Club Programmation (Développement Web)',
      title_en: 'Programming Club (Web Development)',
      title_ar: 'نادي البرمجة (تطوير الويب)',
      description_fr: 'Formation complète pour lycéens : HTML, CSS, JavaScript, PHP. Apprentissage par projets concrets.',
      description_en: 'Complete training for high school students: HTML, CSS, JavaScript, PHP. Project-based learning.',
      description_ar: 'تدريب شامل لطلاب الثانوية: HTML، CSS، JavaScript، PHP. تعلم قائم على المشاريع.',
      category: 'programming',
      duration: '3 mois',
      price: 350,
      image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      created_at: '2024-01-01',
      is_featured: true
    },
    {
      id: '2',
      title_fr: 'Maîtriser WordPress - Créer des Sites Web Professionnels',
      title_en: 'Master WordPress - Build Professional Websites',
      title_ar: 'إتقان ووردبريس - إنشاء مواقع ويب احترافية',
      description_fr: 'Créez et gérez des sites web professionnels sans programmation. Utilisation d\'Elementor, WooCommerce.',
      description_en: 'Create and manage professional websites without coding. Using Elementor, WooCommerce.',
      description_ar: 'إنشاء وإدارة مواقع ويب احترافية بدون برمجة. استخدام Elementor، WooCommerce.',
      category: 'web',
      duration: '2 mois',
      price: 450,
      image_url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      created_at: '2024-01-02',
      is_featured: true
    },
    {
      id: '3',
      title_fr: 'Français - Tous Niveaux',
      title_en: 'French - All Levels',
      title_ar: 'الفرنسية - جميع المستويات',
      description_fr: 'Cours de français pour tous les niveaux, de débutant à avancé. Préparation aux examens officiels.',
      description_en: 'French courses for all levels, from beginner to advanced. Official exam preparation.',
      description_ar: 'دروس الفرنسية لجميع المستويات، من المبتدئ إلى المتقدم. التحضير للامتحانات الرسمية.',
      category: 'languages',
      duration: '4 mois',
      price: 250,
      image_url: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      created_at: '2024-01-03',
      is_featured: false
    },
    {
      id: '4',
      title_fr: 'Allemand A1 → B1',
      title_en: 'German A1 → B1',
      title_ar: 'الألمانية A1 → B1',
      description_fr: 'Formation complète en allemand du niveau débutant au niveau intermédiaire.',
      description_en: 'Complete German training from beginner to intermediate level.',
      description_ar: 'تدريب شامل في الألمانية من المستوى المبتدئ إلى المتوسط.',
      category: 'languages',
      duration: '6 mois',
      price: 400,
      image_url: 'https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg',
      created_at: '2024-01-04',
      is_featured: false
    }
  ];

  const coursesToDisplay = courses.length > 0 ? filteredCourses : mockCourses.filter(course => 
    selectedCategory === 'all' || course.category === selectedCategory
  );

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('courses.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos formations certifiées et boostez votre carrière avec des compétences recherchées sur le marché
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesToDisplay.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img 
                    src={course.image_url || 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'} 
                    alt={course[`title_${language}`] || course.title_fr}
                    className="w-full h-48 object-cover"
                  />
                  {course.is_featured && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Populaire
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {course[`title_${language}`] || course.title_fr}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course[`description_${language}`] || course.description_fr}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>Max 12</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      <span className="text-gray-600 ml-1">DT</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold">
                      {t('courses.register')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Besoin d'aide pour choisir votre formation ?
          </h2>
          <p className="text-xl mb-8">
            Nos conseillers sont là pour vous orienter vers la formation qui correspond le mieux à vos objectifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/21654023807"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <span className="mr-2">📱</span>
              Contacter via WhatsApp
            </a>
            <a 
              href="tel:+21698821822"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center justify-center"
            >
              <span className="mr-2">📞</span>
              +216 98 821 822
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}