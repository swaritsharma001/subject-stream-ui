import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, Upload, Plus, Trash2, QrCode, Phone, Globe, FileText } from 'lucide-react';
import { api, SiteSettings as SiteSettingsType, PaymentQR } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSettingsType>({
    websiteName: '',
    logoUrl: '',
    footerText: '',
    announcementText: '',
    contactNumbers: [],
    privacyPolicy: '',
    termsOfService: ''
  });
  const [paymentQR, setPaymentQR] = useState<PaymentQR | null>(null);
  const [newContactNumber, setNewContactNumber] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [qrFile, setQrFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = async () => {
      const [settingsData, qrData] = await Promise.all([
        api.fetchSiteSettings(),
        api.fetchPaymentQR()
      ]);
      setSettings(settingsData);
      setPaymentQR(qrData);
    };
    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      let logoUrl = settings.logoUrl;
      if (logoFile) {
        logoUrl = await api.uploadLogo(logoFile);
      }

      const updatedSettings = { ...settings, logoUrl };
      await api.updateSiteSettings(updatedSettings);
      setSettings(updatedSettings);
      setLogoFile(null);
      toast({ title: "Success", description: "Settings saved successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
    }
  };

  const handleUploadQR = async () => {
    if (!qrFile) return;
    
    try {
      const qrUrl = await api.uploadQRCode(qrFile);
      const newQR = {
        id: Date.now().toString(),
        imageUrl: qrUrl,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      setPaymentQR(newQR);
      setQrFile(null);
      toast({ title: "Success", description: "QR code uploaded successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to upload QR code", variant: "destructive" });
    }
  };

  const handleAddContactNumber = () => {
    if (newContactNumber.trim() && !settings.contactNumbers.includes(newContactNumber.trim())) {
      setSettings({
        ...settings,
        contactNumbers: [...settings.contactNumbers, newContactNumber.trim()]
      });
      setNewContactNumber('');
    }
  };

  const handleRemoveContactNumber = (index: number) => {
    setSettings({
      ...settings,
      contactNumbers: settings.contactNumbers.filter((_, i) => i !== index)
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
    } else {
      toast({ title: "Error", description: "Please select a valid image file", variant: "destructive" });
    }
  };

  const handleQRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setQrFile(file);
    } else {
      toast({ title: "Error", description: "Please select a valid image file", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Configure website settings and preferences</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Settings className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Basic Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="websiteName">Website Name</Label>
              <Input
                id="websiteName"
                value={settings.websiteName}
                onChange={(e) => setSettings({ ...settings, websiteName: e.target.value })}
                placeholder="Your Website Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo Upload</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="flex-1"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {logoFile && (
                <p className="text-sm text-muted-foreground">Selected: {logoFile.name}</p>
              )}
              {settings.logoUrl && !logoFile && (
                <Badge variant="outline">Current logo uploaded</Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="announcement">Announcement Text</Label>
              <Textarea
                id="announcement"
                value={settings.announcementText}
                onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                placeholder="Welcome message or important announcements"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="footer">Footer Text</Label>
              <Textarea
                id="footer"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                placeholder="Copyright and footer information"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Numbers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newContactNumber}
                onChange={(e) => setNewContactNumber(e.target.value)}
                placeholder="+91 98765 43210"
              />
              <Button onClick={handleAddContactNumber}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {settings.contactNumbers.map((number, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span>{number}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveContactNumber(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment QR Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              Payment QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="qr">Upload QR Code</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="qr"
                  type="file"
                  accept="image/*"
                  onChange={handleQRChange}
                  className="flex-1"
                />
                <Button onClick={handleUploadQR} disabled={!qrFile}>
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {qrFile && (
                <p className="text-sm text-muted-foreground">Selected: {qrFile.name}</p>
              )}
            </div>

            {paymentQR && (
              <div className="space-y-2">
                <Label>Current QR Code</Label>
                <div className="flex items-center gap-2">
                  <Badge variant={paymentQR.isActive ? "default" : "secondary"}>
                    {paymentQR.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Uploaded: {new Date(paymentQR.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legal Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Legal Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="privacy">Privacy Policy</Label>
              <Textarea
                id="privacy"
                value={settings.privacyPolicy}
                onChange={(e) => setSettings({ ...settings, privacyPolicy: e.target.value })}
                placeholder="Your privacy policy content..."
                rows={4}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="terms">Terms of Service</Label>
              <Textarea
                id="terms"
                value={settings.termsOfService}
                onChange={(e) => setSettings({ ...settings, termsOfService: e.target.value })}
                placeholder="Your terms of service content..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;