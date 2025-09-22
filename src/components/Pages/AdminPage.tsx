import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, BookOpen, FileText, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../lib/supabase';
import { Course } from '../../types';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      onNavigate('home');
      return;
    }

    loadCourses();
  }, [isAuthenticated, isAdmin]);

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

  const handleCreateCourse = async (courseData: Partial<Course>) => {
    try {
      const newCourse = await createCourse({
        ...courseData,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      });
      setCourses([...courses, ...newCourse]);
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleUpdateCourse = async (id: string, courseData: Partial<Course>) => {
    try {
      await updateCourse(id, courseData);
      setCourses(courses.map(course => 
        course.id === id ? { ...course, ...courseData } : course
      ));
      setEditingCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      try {
        await deleteCourse(id);
        setCourses(courses.filter(course => course.id !== id));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const tabs = [
    { key: 'courses', label: 'Formations', icon: BookOpen },
    { key: 'blog', label: 'Blog', icon: FileText },
    { key: 'testimonials', label: 'Témoignages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panneau d'Administration
          </h1>
          <p className="text-gray-600">
            Gérez le contenu de votre site web Senatec
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'courses' && (
              <CoursesTab
                courses={courses}
                loading={loading}
                editingCourse={editingCourse}
                setEditingCourse={setEditingCourse}
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                onCreateCourse={handleCreateCourse}
                onUpdateCourse={handleUpdateCourse}
                onDeleteCourse={handleDeleteCourse}
              />
            )}
            
            {activeTab === 'blog' && (
              <div className="text-center py-20">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestion du Blog
                </h3>
                <p className="text-gray-600">
                  Fonctionnalité en développement
                </p>
              </div>
            )}
            
            {activeTab === 'testimonials' && (
              <div className="text-center py-20">
                <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Gestion des Témoignages
                </h3>
                <p className="text-gray-600">
                  Fonctionnalité en développement
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesTab({
  courses,
  loading,
  editingCourse,
  setEditingCourse,
  isCreating,
  setIsCreating,
  onCreateCourse,
  onUpdateCourse,
  onDeleteCourse
}: any) {
  const [formData, setFormData] = useState<Partial<Course>>({
    title_fr: '',
    title_en: '',
    title_ar: '',
    description_fr: '',
    description_en: '',
    description_ar: '',
    category: 'programming',
    duration: '',
    price: 0,
    image_url: '',
    is_featured: false
  });

  useEffect(() => {
    if (editingCourse) {
      setFormData(editingCourse);
    } else if (isCreating) {
      setFormData({
        title_fr: '',
        title_en: '',
        title_ar: '',
        description_fr: '',
        description_en: '',
        description_ar: '',
        category: 'programming',
        duration: '',
        price: 0,
        image_url: '',
        is_featured: false
      });
    }
  }, [editingCourse, isCreating]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCourse) {
      onUpdateCourse(editingCourse.id, formData);
    } else if (isCreating) {
      onCreateCourse(formData);
    }
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setIsCreating(false);
    setFormData({});
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des Formations
        </h2>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle Formation</span>
        </button>
      </div>

      {/* Course Form */}
      {(isCreating || editingCourse) && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (Français)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_fr || ''}
                  onChange={(e) => setFormData({ ...formData, title_fr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (Anglais)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_en || ''}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre (Arabe)
                </label>
                <input
                  type="text"
                  required
                  value={formData.title_ar || ''}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Français)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description_fr || ''}
                  onChange={(e) => setFormData({ ...formData, description_fr: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Anglais)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description_en || ''}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Arabe)
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description_ar || ''}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="programming">Programmation</option>
                  <option value="web">Web Design</option>
                  <option value="languages">Langues</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ex: 3 mois"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (DT)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.is_featured || false}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Formation populaire</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de l'image
              </label>
              <input
                type="url"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://images.pexels.com/..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Sauvegarder</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Annuler</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{course.title_fr}</h3>
                  {course.is_featured && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                      Populaire
                    </span>
                  )}
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {course.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{course.description_fr}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Durée: {course.duration}</span>
                  <span>Prix: {course.price} DT</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingCourse(course)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteCourse(course.id)}
                  className="text-red-600 hover:text-red-800 p-1"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Aucune formation trouvée
          </h3>
          <p className="text-gray-600 mb-6">
            Commencez par créer votre première formation
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Créer une Formation
          </button>
        </div>
      )}
    </div>
  );
}