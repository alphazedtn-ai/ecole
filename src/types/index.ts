export interface Course {
  id: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  category: string;
  duration: string;
  price: number;
  image_url: string;
  created_at: string;
  is_featured: boolean;
}

export interface BlogPost {
  id: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  content_fr: string;
  content_en: string;
  content_ar: string;
  excerpt_fr: string;
  excerpt_en: string;
  excerpt_ar: string;
  image_url: string;
  created_at: string;
  published: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  comment_fr: string;
  comment_en: string;
  comment_ar: string;
  image_url?: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export type Language = 'fr' | 'en' | 'ar';