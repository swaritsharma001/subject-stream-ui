import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { api, SiteSettings } from '@/lib/api';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const location = useLocation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const siteSettings = await api.fetchSiteSettings();
        setSettings(siteSettings);
      } catch (error) {
        console.error('Failed to load site settings:', error);
      }
    };

    loadSettings();
  }, []);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <header className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {settings?.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt={settings.websiteName}
                className="h-8 w-8 object-contain"
              />
            ) : (
              <BookOpen className="h-8 w-8 text-primary" />
            )}
            <span className="font-heading font-bold text-xl text-foreground">
              {settings?.websiteName || 'EduPortal'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/schools" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Browse Content
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Admin Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAdmin ? (
              <Button asChild variant="outline">
                <Link to="/">
                  <User className="h-4 w-4" />
                  Back to Site
                </Link>
              </Button>
            ) : (
              <Button asChild variant="hero">
                <Link to="/admin">
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <nav className="flex flex-col gap-3">
              <Link 
                to="/" 
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/schools" 
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Content
              </Link>
              <Link 
                to="/about" 
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="px-4 pt-2">
                {isAdmin ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4" />
                      Back to Site
                    </Link>
                  </Button>
                ) : (
                  <Button asChild variant="hero" className="w-full">
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                      <Settings className="h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};