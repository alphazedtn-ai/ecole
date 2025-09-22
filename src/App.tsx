import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './components/Pages/HomePage';
import { AboutPage } from './components/Pages/AboutPage';
import { CoursesPage } from './components/Pages/CoursesPage';
import { BlogPage } from './components/Pages/BlogPage';
import { ContactPage } from './components/Pages/ContactPage';
import { LoginPage } from './components/Pages/LoginPage';
import { AdminPage } from './components/Pages/AdminPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'courses':
        return <CoursesPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          <Header currentPage={currentPage} onNavigate={setCurrentPage} />
          <main className="flex-1">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;