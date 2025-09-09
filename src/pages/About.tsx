import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  Target, 
  Heart, 
  Shield,
  Clock,
  Star,
  ArrowRight 
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in educational content and user experience.'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making quality education accessible to students from all backgrounds.'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Protecting student data and ensuring secure access to learning materials.'
    },
    {
      icon: Clock,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology.'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Content',
      description: 'Extensive library of educational materials from top institutions covering multiple subjects and grade levels.'
    },
    {
      icon: Users,
      title: 'Expert Curation',
      description: 'All content is carefully reviewed and curated by educational experts and experienced teachers.'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'Rigorous quality control ensures that all materials meet the highest educational standards.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 educational-gradient">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
              About Our
              <span className="block text-accent"> Educational Platform</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              We're dedicated to making quality education accessible to everyone through our innovative digital platform, connecting students with premium educational content from top institutions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              To democratize access to quality education by providing a secure, user-friendly platform 
              where students can access premium educational content from top schools and institutions. 
              We believe that every student deserves access to excellent learning materials, regardless 
              of their geographic location or economic background.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-large transition-all duration-300 card-gradient">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to educational excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-heading font-bold text-center mb-12">How We Work</h2>
            
            <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Partnership with Schools</h3>
                  <p className="text-muted-foreground text-lg">
                    We collaborate directly with educational institutions to bring their quality content 
                    to our platform. This ensures authenticity and maintains the high standards that 
                    these institutions are known for.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:order-1">
                  <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                    <Shield className="h-12 w-12 text-secondary" />
                  </div>
                </div>
                <div className="md:order-2">
                  <h3 className="text-2xl font-semibold mb-4">Secure Access System</h3>
                  <p className="text-muted-foreground text-lg">
                    Our innovative pass key system ensures that content creators are fairly compensated 
                    while providing students with affordable access to premium educational materials.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Continuous Support</h3>
                  <p className="text-muted-foreground text-lg">
                    We provide 24/7 support to ensure students can access their learning materials 
                    without any interruptions. Our dedicated team is always ready to help with any 
                    technical or academic queries.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="h-12 w-12 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-muted-foreground">
              Numbers that reflect our commitment to educational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Partner Schools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Chapters Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-muted-foreground">Happy Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-3xl mx-auto card-gradient">
            <CardContent className="p-12">
              <Star className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our community of learners and access premium educational content today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link to="/schools">
                    Browse Content
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;