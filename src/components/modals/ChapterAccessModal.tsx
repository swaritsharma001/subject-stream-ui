import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Lock, Key, CreditCard, Phone, CheckCircle } from 'lucide-react';
import { api, Chapter, PaymentQR } from '@/lib/api';
import { toast } from 'sonner';

interface ChapterAccessModalProps {
  open: boolean;
  onClose: () => void;
  chapter: Chapter | null;
  onAccessGranted: () => void;
}

export const ChapterAccessModal = ({ open, onClose, chapter, onAccessGranted }: ChapterAccessModalProps) => {
  const [passKey, setPassKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [paymentQR, setPaymentQR] = useState<PaymentQR | null>(null);
  const [contactNumbers, setContactNumbers] = useState<string[]>([]);

  useEffect(() => {
    const loadPaymentData = async () => {
      if (open) {
        try {
          const [qrData, settings] = await Promise.all([
            api.fetchPaymentQR(),
            api.fetchSiteSettings()
          ]);
          setPaymentQR(qrData);
          setContactNumbers(settings.contactNumbers);
        } catch (error) {
          console.error('Failed to load payment data:', error);
        }
      }
    };

    loadPaymentData();
  }, [open]);

  const handlePassKeySubmit = async () => {
    if (!passKey.trim() || !chapter) return;

    setIsValidating(true);
    try {
      const isValid = await api.validatePassKey(passKey, chapter.id);
      if (isValid) {
        toast.success('Access granted! Enjoy your content.');
        onAccessGranted();
        onClose();
      } else {
        toast.error('Invalid pass key. Please check and try again.');
      }
    } catch (error) {
      toast.error('Failed to validate pass key.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePassKeySubmit();
    }
  };

  if (!chapter) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Chapter Access Required
          </DialogTitle>
          <DialogDescription>
            <strong>{chapter.name}</strong> requires access. Choose your preferred method below.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="passkey" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="passkey" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Pass Key
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="passkey" className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="passkey">Enter Pass Key</Label>
              <Input
                id="passkey"
                type="text"
                placeholder="Enter your pass key..."
                value={passKey}
                onChange={(e) => setPassKey(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-center font-mono"
              />
              <p className="text-xs text-muted-foreground text-center">
                Pass keys are case-sensitive
              </p>
            </div>

            <Button
              onClick={handlePassKeySubmit}
              disabled={!passKey.trim() || isValidating}
              className="w-full"
              variant="hero"
            >
              {isValidating ? 'Validating...' : 'Access Chapter'}
            </Button>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4">
            <Card className="p-4 space-y-4">
              <div className="text-center">
                <h3 className="font-semibold text-lg">Payment Required</h3>
                <p className="text-2xl font-bold text-primary">₹{chapter.price}</p>
                <p className="text-sm text-muted-foreground">One-time access fee</p>
              </div>

              {paymentQR?.imageUrl && (
                <div className="flex justify-center">
                  <img
                    src={paymentQR.imageUrl}
                    alt="Payment QR Code"
                    className="w-48 h-48 object-contain border rounded-lg"
                  />
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>Scan the QR code with any UPI app</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>Pay ₹{chapter.price} to get instant access</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                  <span>Contact admin for pass key after payment</span>
                </div>
              </div>

              {contactNumbers.length > 0 && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Contact Numbers:</span>
                  </div>
                  <div className="space-y-1">
                    {contactNumbers.map((number, index) => (
                      <p key={index} className="text-sm font-mono">
                        {number}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};