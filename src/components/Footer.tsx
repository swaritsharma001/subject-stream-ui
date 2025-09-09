import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Phone, Mail, MapPin } from 'lucide-react';
import { api, SiteSettings } from '@/lib/api';

export const Footer = () => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

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

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">
                {settings?.websiteName || 'EduPortal'}
              </span>
            </div>
            <p className="text-muted-foreground">
              Empowering students with quality educational content and seamless learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/schools" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Content
              </Link>
              <Link 
                to="/about" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              {settings?.contactNumbers && settings.contactNumbers.length > 0 && (
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    {settings.contactNumbers.map((number, index) => (
                      <p key={index} className="text-muted-foreground">
                        {number}
                      </p>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">
                  info@eduportal.com
                </p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <p className="text-muted-foreground">
                  Educational District, Learning City
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              {settings?.footerText || '© 2024 EduPortal. All rights reserved.'}
            </p>
            <div className="flex gap-6">
              <Link 
                to="/privacy" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};