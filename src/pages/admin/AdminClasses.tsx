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
import { BookOpen, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { api, Class as ClassType, School as SchoolType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AdminClasses = () => {
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schoolId: '',
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
      };
      loadClasses();
    }
  }, [selectedSchool]);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await api.updateClass(editingClass.id, formData);
        toast({ title: "Success", description: "Class updated successfully" });
      } else {
        await api.createClass({ ...formData, schoolId: selectedSchool });
        toast({ title: "Success", description: "Class created successfully" });
      }
      
      // Reload classes
      const data = await api.fetchClasses(selectedSchool);
      setClasses(data);
      
      // Reset form
      setFormData({ name: '', description: '', schoolId: '', isActive: true });
      setEditingClass(null);
      setIsAddOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save class", variant: "destructive" });
    }
  };

  const handleEdit = (cls: ClassType) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      description: cls.description || '',
      schoolId: cls.schoolId,
      isActive: cls.isActive
    });
    setIsAddOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteClass(id);
      const data = await api.fetchClasses(selectedSchool);
      setClasses(data);
      toast({ title: "Success", description: "Class deleted successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete class", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Classes Management</h1>
          <p className="text-muted-foreground">Manage class levels and curriculum</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingClass(null);
              setFormData({ name: '', description: '', schoolId: '', isActive: true });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClass ? 'Edit Class' : 'Add New Class'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Class 10, Grade 12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the class level"
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
                <Button type="submit">{editingClass ? 'Update' : 'Create'}</Button>
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
          <SelectTrigger className="w-64">
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
        
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <Card key={cls.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                    <Badge variant={cls.isActive ? "default" : "secondary"}>
                      {cls.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {cls.description || 'No description available'}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(cls)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(cls.id)}>
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

export default AdminClasses;