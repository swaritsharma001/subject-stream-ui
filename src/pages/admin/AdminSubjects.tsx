import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { BookOpen, Plus, Search, Edit, Trash2, GraduationCap } from 'lucide-react';
import { api, Subject as SubjectType, Class as ClassType, School as SchoolType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AdminSubjects = () => {
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<SubjectType | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    classId: '',
    isActive: true
  });

  useEffect(() => {
    const loadSchools = async () => {
      const data = await api.fetchSchools();
      setSchools(data);
      if (data.length > 0) {
        setSelectedSchool(data[0].id);
      }
    };
    loadSchools();
  }, []);

  useEffect(() => {
    if (selectedSchool) {
      const loadClasses = async () => {
        const data = await api.fetchClasses(selectedSchool);
        setClasses(data);
        if (data.length > 0) {
          setSelectedClass(data[0].id);
        }
      };
      loadClasses();
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedClass) {
      const loadSubjects = async () => {
        const data = await api.fetchSubjects(selectedClass);
        setSubjects(data);
      };
      loadSubjects();
    }
  }, [selectedClass]);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await api.updateSubject(editingSubject.id, formData);
        toast({ title: "Success", description: "Subject updated successfully" });
      } else {
        await api.createSubject({ ...formData, classId: selectedClass });
        toast({ title: "Success", description: "Subject created successfully" });
      }
      
      // Reload subjects
      const data = await api.fetchSubjects(selectedClass);
      setSubjects(data);
      
      // Reset form
      setFormData({ name: '', description: '', classId: '', isActive: true });
      setEditingSubject(null);
      setIsAddOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save subject", variant: "destructive" });
    }
  };

  const handleEdit = (subject: SubjectType) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      description: subject.description || '',
      classId: subject.classId,
      isActive: subject.isActive
    });
    setIsAddOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteSubject(id);
      const data = await api.fetchSubjects(selectedClass);
      setSubjects(data);
      toast({ title: "Success", description: "Subject deleted successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete subject", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Subjects Management</h1>
          <p className="text-muted-foreground">Manage subject categories and content</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingSubject(null);
              setFormData({ name: '', description: '', classId: '', isActive: true });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSubject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Subject Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the subject"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit">{editingSubject ? 'Update' : 'Create'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <Select value={selectedSchool} onValueChange={setSelectedSchool}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select school" />
          </SelectTrigger>
          <SelectContent>
            {schools.map((school) => (
              <SelectItem key={school.id} value={school.id}>
                {school.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <Badge variant={subject.isActive ? "default" : "secondary"}>
                      {subject.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {subject.description || 'No description available'}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(subject)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(subject.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSubjects;