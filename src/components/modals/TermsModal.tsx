import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { api, SiteSettings } from '@/lib/api';
import { AlertTriangle } from 'lucide-react';

interface TermsModalProps {
  open: boolean;
  onAccept: () => void;
}

export const TermsModal = ({ open, onAccept }: TermsModalProps) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const siteSettings = await api.fetchSiteSettings();
        setSettings(siteSettings);
      } catch (error) {
        console.error('Failed to load site settings:', error);
      }
    };

    if (open) {
      loadSettings();
    }
  }, [open]);

  const canProceed = agreedToTerms && agreedToPrivacy;

  const handleAccept = () => {
    if (canProceed) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-heading">
            Welcome to {settings?.websiteName || 'EduPortal'}
          </DialogTitle>
          <DialogDescription className="text-base">
            Please review and accept our Terms of Service and Privacy Policy to continue.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-6 max-h-[50vh]">
          <div className="space-y-6">
            {/* Critical Copyright Warning */}
            <section className="bg-destructive/10 border-2 border-destructive rounded-lg p-4">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-xl font-bold">CRITICAL WARNING / महत्वपूर्ण चेतावनी</h3>
                </div>
                
                <div className="space-y-3 text-left">
                  <p className="font-medium text-destructive text-sm">
                    <strong>🚨 ENGLISH:</strong> Any person found sharing, distributing, or unauthorized copying of PDF files or educational content from this platform will face IMMEDIATE LEGAL ACTION and PROSECUTION under applicable laws including Copyright Act and Information Technology Act.
                  </p>
                  <p className="font-medium text-destructive text-sm">
                    <strong>🚨 हिंदी:</strong> इस प्लेटफॉर्म से पीडीएफ फाइलें या शैक्षिक सामग्री साझा करने, वितरित करने या अनधिकृत कॉपी करने वाले किसी भी व्यक्ति के खिलाफ कॉपीराइट अधिनियम और सूचना प्रौद्योगिकी अधिनियम के तहत तत्काल कानूनी कार्रवाई की जाएगी।
                  </p>
                  <p className="text-center font-bold text-destructive">
                    ⚖️ WE MONITOR ALL ACTIVITIES / हम सभी गतिविधियों की निगरानी करते हैं ⚖️
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Terms of Service */}
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Terms of Service
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  {settings?.termsOfService || 'By using our service, you agree to these terms...'}
                </p>
                <div className="space-y-3 mt-4">
                  <p><strong>1. Acceptance of Terms:</strong> By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                  <p><strong>2. Educational Content:</strong> All content provided is for educational purposes only. We strive to ensure accuracy but make no guarantees.</p>
                  <p><strong>3. Payment Terms:</strong> All payments are processed securely. Refunds are subject to our refund policy.</p>
                  <p><strong>4. User Conduct:</strong> Users must not misuse our platform or attempt to gain unauthorized access to content.</p>
                  <p><strong>5. Intellectual Property:</strong> All content remains the property of the respective educational institutions and content creators.</p>
                </div>
              </div>
            </section>

            <Separator />

            {/* Privacy Policy */}
            <section>
              <h3 className="text-lg font-semibold mb-3 text-primary">
                Privacy Policy
              </h3>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  {settings?.privacyPolicy || 'Our privacy policy ensures your data is protected...'}
                </p>
                <div className="space-y-3 mt-4">
                  <p><strong>Data Collection:</strong> We collect minimal necessary information to provide our services effectively.</p>
                  <p><strong>Data Usage:</strong> Your information is used solely for educational content delivery and account management.</p>
                  <p><strong>Data Protection:</strong> We implement industry-standard security measures to protect your personal information.</p>
                  <p><strong>Third Parties:</strong> We do not sell or share your personal information with third parties for marketing purposes.</p>
                  <p><strong>Cookies:</strong> We use cookies to enhance your browsing experience and remember your preferences.</p>
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 space-y-4">
          <div className="space-y-3 w-full">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">
                I have read and agree to the <strong>Terms of Service</strong>
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="mt-1 h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">
                I have read and agree to the <strong>Privacy Policy</strong>
              </span>
            </label>
          </div>

          <div className="flex justify-end w-full">
            <Button
              onClick={handleAccept}
              disabled={!canProceed}
              variant="hero"
              size="lg"
              className="min-w-32"
            >
              Continue to Site
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};