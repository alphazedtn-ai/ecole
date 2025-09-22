import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getBlogPosts } from '../../lib/supabase';
import { BlogPost } from '../../types';

export function BlogPage() {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data || []);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Mock blog posts data if Supabase is not connected
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title_fr: 'Les tendances du développement web en 2024',
      title_en: 'Web development trends in 2024',
      title_ar: 'اتجاهات تطوير الويب في 2024',
      excerpt_fr: 'Découvrez les technologies et frameworks qui façonnent l\'avenir du développement web cette année.',
      excerpt_en: 'Discover the technologies and frameworks shaping the future of web development this year.',
      excerpt_ar: 'اكتشف التقنيات والأطر التي تشكل مستقبل تطوير الويب هذا العام.',
      content_fr: 'Le développement web continue d\'évoluer rapidement...',
      content_en: 'Web development continues to evolve rapidly...',
      content_ar: 'يستمر تطوير الويب في التطور بسرعة...',
      image_url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      created_at: '2024-01-15',
      published: true
    },
    {
      id: '2',
      title_fr: 'Pourquoi choisir WordPress pour votre site web ?',
      title_en: 'Why choose WordPress for your website?',
      title_ar: 'لماذا اختيار ووردبريس لموقعك الإلكتروني؟',
      excerpt_fr: 'WordPress reste la plateforme la plus populaire pour créer des sites web professionnels. Voici pourquoi.',
      excerpt_en: 'WordPress remains the most popular platform for creating professional websites. Here\'s why.',
      excerpt_ar: 'يبقى ووردبريس المنصة الأكثر شعبية لإنشاء مواقع ويب احترافية. إليكم السبب.',
      content_fr: 'WordPress est utilisé par plus de 40% des sites web...',
      content_en: 'WordPress is used by more than 40% of websites...',
      content_ar: 'يستخدم ووردبريس من قبل أكثر من 40% من مواقع الويب...',
      image_url: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg',
      created_at: '2024-01-10',
      published: true
    },
    {
      id: '3',
      title_fr: 'L\'importance de l\'apprentissage des langues en 2024',
      title_en: 'The importance of language learning in 2024',
      title_ar: 'أهمية تعلم اللغات في 2024',
      excerpt_fr: 'Dans un monde de plus en plus connecté, maîtriser plusieurs langues devient un atout majeur.',
      excerpt_en: 'In an increasingly connected world, mastering multiple languages becomes a major asset.',
      excerpt_ar: 'في عالم متصل بشكل متزايد، يصبح إتقان عدة لغات ميزة كبيرة.',
      content_fr: 'La mondialisation et le travail à distance...',
      content_en: 'Globalization and remote work...',
      content_ar: 'العولمة والعمل عن بُعد...',
      image_url: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
      created_at: '2024-01-05',
      published: true
    }
  ];

  const postsToDisplay = posts.length > 0 ? posts : mockPosts;

  const filteredPosts = postsToDisplay.filter(post => {
    const title = post[`title_${language}`] || post.title_fr;
    const excerpt = post[`excerpt_${language}`] || post.excerpt_fr;
    return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog Senatec
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Actualités, conseils et insights sur la formation professionnelle, 
            les technologies et les opportunités de carrière
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Blog Posts */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <img 
                    src={post.image_url} 
                    alt={post[`title_${language}`] || post.title_fr}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    Article
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>Senatec</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post[`title_${language}`] || post.title_fr}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post[`excerpt_${language}`] || post.excerpt_fr}
                  </p>
                  
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 group transition-colors">
                    <span>Lire la suite</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Aucun article trouvé
            </h3>
            <p className="text-gray-600 mb-8">
              Essayez de modifier votre recherche ou parcourez tous nos articles
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Voir tous les articles
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Restez Informés
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Recevez nos derniers articles, conseils de carrière et informations 
            sur nos nouvelles formations directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-lg transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}