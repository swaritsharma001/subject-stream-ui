import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, UserCheck, FileText } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: Eye,
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and payment information.`
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: `We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers.`
    },
    {
      icon: Shield,
      title: 'Information Security',
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption and security protocols.`
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: `You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us. Contact us if you wish to exercise any of these rights.`
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 educational-gradient">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
              Privacy
              <span className="block text-accent"> Policy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-white/80">
              <FileText className="h-5 w-5" />
              <span>Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Introduction */}
          <Card className="mb-12 card-gradient">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Our Commitment to Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how we collect, use, and protect your information when you use our educational platform. 
                We respect your privacy and are committed to protecting your personal data in accordance with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="card-gradient">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Sections */}
          <div className="mt-12 space-y-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">Types of cookies we use:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Essential cookies for site functionality</li>
                    <li>Analytics cookies to understand usage patterns</li>
                    <li>Preference cookies to remember your settings</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy:
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">We may share information with:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Service providers who assist in our operations</li>
                    <li>Educational institutions whose content you access</li>
                    <li>Legal authorities when required by law</li>
                    <li>Business partners with your explicit consent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, 
                  unless a longer retention period is required or permitted by law. When we no longer need your information, 
                  we will securely delete or anonymize it.
                </p>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Email:</strong> privacy@eduportal.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> Educational District, Learning City</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Policy Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                  We will notify you of any material changes by posting the updated policy on our website and updating the 
                  "Last updated" date at the top of this page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;