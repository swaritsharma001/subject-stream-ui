import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Users, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Play,
  Shield,
  Clock
} from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Quality Content',
      description: 'Comprehensive educational materials from top institutions'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'Protected content with secure pass key system'
    },
    {
      icon: Clock,
      title: 'Instant Access',
      description: 'Get immediate access to purchased content'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Direct contact with educational administrators'
    }
  ];

  const stats = [
    { number: '500+', label: 'Chapters Available' },
    { number: '50+', label: 'Subjects Covered' },
    { number: '1000+', label: 'Happy Students' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 educational-gradient">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight">
              Your Gateway to
              <span className="block text-accent"> Quality Education</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Access premium educational content from top schools and institutions. 
              Learn at your own pace with our secure, easy-to-use platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" variant="hero" className="text-lg px-8 py-6">
                <Link to="/schools">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning Now
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide the best educational experience with cutting-edge technology and quality content.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-large transition-all duration-300 card-gradient group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in just a few simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold">Browse Content</h3>
              <p className="text-muted-foreground">
                Explore schools, classes, subjects, and chapters to find the content you need.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold">Get Access</h3>
              <p className="text-muted-foreground">
                Use your pass key or make a quick payment to unlock premium content.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold">Start Learning</h3>
              <p className="text-muted-foreground">
                Access your content instantly and start your educational journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-3xl mx-auto card-gradient">
            <CardContent className="p-12">
              <Award className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of students who are already learning with our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="hero">
                  <Link to="/schools">
                    Browse All Content
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    Contact Support
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

export default Index;
