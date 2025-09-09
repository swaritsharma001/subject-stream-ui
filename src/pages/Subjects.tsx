import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Book, FileText, ArrowRight, Beaker, Calculator, Globe } from 'lucide-react';
import { api, Subject as SubjectType, Class as ClassType } from '@/lib/api';

const Subjects = () => {
  const { classId } = useParams<{ classId: string }>();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [classInfo, setClassInfo] = useState<ClassType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Subject icons mapping
  const getSubjectIcon = (subjectName: string) => {
    const name = subjectName.toLowerCase();
    if (name.includes('math') || name.includes('algebra') || name.includes('geometry')) {
      return Calculator;
    } else if (name.includes('physics') || name.includes('chemistry') || name.includes('biology') || name.includes('science')) {
      return Beaker;
    } else if (name.includes('geography') || name.includes('history') || name.includes('social')) {
      return Globe;
    } else {
      return Book;
    }
  };

  useEffect(() => {
    if (!classId) {
      navigate('/schools');
      return;
    }

    const loadData = async () => {
      try {
        const subjectsData = await api.fetchSubjects(classId);
        setSubjects(subjectsData);
        
        // Mock class info - in real app, we'd fetch this
        setClassInfo({
          id: classId,
          schoolId: 'mock-school',
          name: 'Class Information',
          description: 'Class details',
          isActive: true,
          createdAt: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to load subjects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [classId, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse mb-8">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-muted rounded w-1/2"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4"
        >
          <Link to="/schools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classes
          </Link>
        </Button>
        
        <h1 className="text-4xl font-heading font-bold mb-4">
          Available Subjects
        </h1>
        <p className="text-xl text-muted-foreground">
          Choose a subject to access chapters and learning materials.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const IconComponent = getSubjectIcon(subject.name);
          
          return (
            <Card key={subject.id} className="hover:shadow-large transition-all duration-300 card-gradient group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-accent transition-colors">
                        {subject.name}
                      </CardTitle>
                      <Badge variant={subject.isActive ? "default" : "secondary"} className="mt-1">
                        {subject.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {subject.description || 'Comprehensive study material with detailed explanations and practical examples.'}
                </CardDescription>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>Multiple chapters available</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Book className="h-4 w-4" />
                  <span>Detailed learning content</span>
                </div>
                
                <Button asChild className="w-full" variant="outline">
                  <Link to={`/subjects/${subject.id}/chapters`}>
                    View Chapters
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {subjects.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Book className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No subjects found</h3>
          <p className="text-muted-foreground">
            This class doesn't have any subjects available yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Subjects;