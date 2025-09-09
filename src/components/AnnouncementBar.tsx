import { useState, useEffect } from 'react';
import { X, Megaphone } from 'lucide-react';
import { Button } from './ui/button';
import { api } from '@/lib/api';

export const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncement = async () => {
      try {
        const settings = await api.fetchSiteSettings();
        setAnnouncement(settings.announcementText);
      } catch (error) {
        console.error('Failed to load announcement:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnnouncement();
  }, []);

  if (!isVisible || isLoading || !announcement) {
    return null;
  }

  return (
    <div className="bg-gradient-primary text-white py-2 px-4 relative animate-fade-in">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Megaphone className="h-4 w-4 flex-shrink-0" />
        <p className="text-sm font-medium text-center flex-1">
          {announcement}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-white hover:bg-white/20 flex-shrink-0"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};