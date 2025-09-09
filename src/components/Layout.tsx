import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { AnnouncementBar } from './AnnouncementBar';
import { TermsModal } from './modals/TermsModal';

export const Layout = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    // Check if user has accepted terms
    const hasAcceptedTerms = localStorage.getItem('hasAcceptedTerms');
    if (!hasAcceptedTerms) {
      setShowTermsModal(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('hasAcceptedTerms', 'true');
    setShowTermsModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
      <TermsModal 
        open={showTermsModal} 
        onAccept={handleAcceptTerms}
      />
    </div>
  );
};