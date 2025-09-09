import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Scale, Shield, CreditCard, BookOpen, AlertTriangle } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: Scale,
      title: 'Acceptance of Terms',
      content: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. These terms apply to all users of the platform, including students, educators, and administrators.`
    },
    {
      icon: BookOpen,
      title: 'Educational Content',
      content: `All content provided is for educational purposes only. We strive to ensure accuracy but make no guarantees. Content is provided by partner educational institutions and is subject to their terms and conditions.`
    },
    {
      icon: CreditCard,
      title: 'Payment Terms',
      content: `All payments are processed securely through our payment gateway. Fees are non-refundable unless otherwise specified. Access to paid content is granted immediately upon successful payment verification.`
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      content: `Users must not misuse our platform, attempt to gain unauthorized access to content, or share access credentials. Any violation may result in immediate account termination.`
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 educational-gradient">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
              Terms of
              <span className="block text-accent"> Service</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Please read these terms carefully before using our educational platform.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-white/80">
              <FileText className="h-5 w-5" />
              <span>Effective date: {new Date().toLocaleDateString()}</span>
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
                <Scale className="h-6 w-6 text-primary" />
                Terms and Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service govern your use of our educational platform. By using our services, 
                you agree to comply with these terms. If you do not agree with any part of these terms, 
                please do not use our platform.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
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

          {/* Detailed Terms */}
          <div className="mt-12 space-y-8">
            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Access and Account Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Account Creation</h4>
                    <p className="text-muted-foreground">
                      You may need to create an account to access certain features. You are responsible for maintaining 
                      the confidentiality of your account information and for all activities that occur under your account.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Pass Key System</h4>
                    <p className="text-muted-foreground">
                      Pass keys are unique access codes that grant access to specific educational content. 
                      Pass keys are non-transferable and must not be shared with others.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Account Termination</h4>
                    <p className="text-muted-foreground">
                      We reserve the right to terminate or suspend your account at any time for violations of these terms 
                      or for any other reason we deem appropriate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  All content on this platform, including but not limited to text, graphics, logos, images, and software, 
                  is the property of the respective educational institutions or their licensors and is protected by copyright 
                  and other intellectual property laws.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">You may not:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Reproduce, distribute, or create derivative works from our content</li>
                    <li>Use our content for commercial purposes without permission</li>
                    <li>Remove or modify any copyright or other proprietary notices</li>
                    <li>Attempt to reverse engineer or extract source material</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Payment and Refund Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Payment Processing</h4>
                    <p className="text-muted-foreground">
                      All payments are processed through secure payment gateways. We accept UPI payments and other 
                      specified payment methods. Prices are subject to change without notice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Refund Policy</h4>
                    <p className="text-muted-foreground">
                      Generally, all sales are final. Refunds may be considered in exceptional circumstances 
                      and are at our sole discretion. Contact customer support for refund requests.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Access After Payment</h4>
                    <p className="text-muted-foreground">
                      Access to paid content is granted immediately upon payment verification. 
                      You will need to contact the administrator for your pass key after payment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-destructive/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Disclaimers and Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">No Warranty</h4>
                    <p className="text-muted-foreground">
                      The platform and content are provided "as is" without any warranties, express or implied. 
                      We do not guarantee that the service will be uninterrupted or error-free.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Limitation of Liability</h4>
                    <p className="text-muted-foreground">
                      In no event shall we be liable for any indirect, incidental, special, or consequential damages 
                      arising out of or in connection with your use of the platform.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Educational Purpose</h4>
                    <p className="text-muted-foreground">
                      All content is provided for educational purposes only. We make no representations about the 
                      accuracy, completeness, or suitability of the content for any particular purpose.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient">
              <CardHeader>
                <CardTitle className="text-xl">Governing Law and Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Governing Law</h4>
                  <p className="text-muted-foreground">
                    These terms shall be governed by and construed in accordance with the laws of India. 
                    Any disputes arising under these terms shall be subject to the jurisdiction of Indian courts.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at legal@eduportal.com 
                    or through our customer support channels.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Changes to Terms</h4>
                  <p className="text-muted-foreground">
                    We reserve the right to modify these terms at any time. Changes will be effective immediately 
                    upon posting. Your continued use of the platform constitutes acceptance of the modified terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;