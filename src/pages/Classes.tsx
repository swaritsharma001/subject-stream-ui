import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, Users, ArrowRight, BookOpen } from 'lucide-react';
import { api, Class as ClassType, School as SchoolType } from '@/lib/api';

const Classes = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [school, setSchool] = useState<SchoolType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!schoolId) {
      navigate('/schools');
      return;
    }

    const loadData = async () => {
      try {
        const [classesData, schoolsData] = await Promise.all([
          api.fetchClasses(schoolId),
          api.fetchSchools()
        ]);
        
        setClasses(classesData);
        const currentSchool = schoolsData.find(s => s.id === schoolId);
        setSchool(currentSchool || null);
      } catch (error) {
        console.error('Failed to load classes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [schoolId, navigate]);

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
            Back to Schools
          </Link>
        </Button>
        
        <h1 className="text-4xl font-heading font-bold mb-4">
          {school?.name || 'School'} - Classes
        </h1>
        <p className="text-xl text-muted-foreground">
          Select a class to explore available subjects and educational content.
        </p>
      </div>

      {/* Classes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-large transition-all duration-300 card-gradient group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <GraduationCap className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                      {classItem.name}
                    </CardTitle>
                    <Badge variant={classItem.isActive ? "default" : "secondary"} className="mt-1">
                      {classItem.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription className="text-base">
                {classItem.description || 'Comprehensive curriculum with multiple subjects and specialized learning modules.'}
              </CardDescription>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>Multiple subjects available</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Chapter-wise content</span>
              </div>
              
              <Button asChild className="w-full" variant="outline">
                <Link to={`/classes/${classItem.id}/subjects`}>
                  View Subjects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {classes.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <GraduationCap className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No classes found</h3>
          <p className="text-muted-foreground">
            This school doesn't have any classes available yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default Classes;