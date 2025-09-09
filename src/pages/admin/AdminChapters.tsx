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
import { FileText, Plus, Search, Edit, Trash2, Upload, Lock, Unlock } from 'lucide-react';
import { api, Chapter as ChapterType, Subject as SubjectType, Class as ClassType, School as SchoolType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AdminChapters = () => {
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<ChapterType | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    subjectId: '',
    isLocked: true,
    price: 10,
    passKey: '',
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
        if (data.length > 0) {
          setSelectedSubject(data[0].id);
        }
      };
      loadSubjects();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedSubject) {
      const loadChapters = async () => {
        const data = await api.fetchChapters(selectedSubject);
        setChapters(data);
      };
      loadChapters();
    }
  }, [selectedSubject]);

  const filteredChapters = chapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      toast({ title: "Error", description: "Please select a valid PDF file", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let pdfUrl = '';
      if (pdfFile) {
        pdfUrl = await api.uploadPDF(pdfFile);
      }

      const chapterData = {
        ...formData,
        subjectId: selectedSubject,
        pdfUrl: pdfUrl || undefined
      };

      if (editingChapter) {
        await api.updateChapter(editingChapter.id, chapterData);
        toast({ title: "Success", description: "Chapter updated successfully" });
      } else {
        await api.createChapter(chapterData);
        toast({ title: "Success", description: "Chapter created successfully" });
      }
      
      // Reload chapters
      const data = await api.fetchChapters(selectedSubject);
      setChapters(data);
      
      // Reset form
      setFormData({ name: '', description: '', subjectId: '', isLocked: true, price: 10, passKey: '', isActive: true });
      setPdfFile(null);
      setEditingChapter(null);
      setIsAddOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save chapter", variant: "destructive" });
    }
  };

  const handleEdit = (chapter: ChapterType) => {
    setEditingChapter(chapter);
    setFormData({
      name: chapter.name,
      description: chapter.description || '',
      subjectId: chapter.subjectId,
      isLocked: chapter.isLocked,
      price: chapter.price,
      passKey: chapter.passKey || '',
      isActive: chapter.isActive
    });
    setIsAddOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteChapter(id);
      const data = await api.fetchChapters(selectedSubject);
      setChapters(data);
      toast({ title: "Success", description: "Chapter deleted successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete chapter", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Chapters Management</h1>
          <p className="text-muted-foreground">Upload and manage chapter content</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingChapter(null);
              setFormData({ name: '', description: '', subjectId: '', isLocked: true, price: 10, passKey: '', isActive: true });
              setPdfFile(null);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingChapter ? 'Edit Chapter' : 'Add New Chapter'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Chapter Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Introduction to Algebra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the chapter content"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pdf">Upload PDF</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="pdf"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="flex-1"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                {pdfFile && (
                  <p className="text-sm text-muted-foreground">Selected: {pdfFile.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passKey">Pass Key (Optional)</Label>
                <Input
                  id="passKey"
                  value={formData.passKey}
                  onChange={(e) => setFormData({ ...formData, passKey: e.target.value })}
                  placeholder="Specific access key for this chapter"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="locked"
                    checked={formData.isLocked}
                    onCheckedChange={(checked) => setFormData({ ...formData, isLocked: checked })}
                  />
                  <Label htmlFor="locked">Locked (Requires Payment/Pass Key)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit">{editingChapter ? 'Update' : 'Create'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 flex-wrap">
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

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chapters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChapters.map((chapter) => (
          <Card key={chapter.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {chapter.name}
                      {chapter.isLocked ? (
                        <Lock className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-500" />
                      )}
                    </CardTitle>
                    <Badge variant={chapter.isActive ? "default" : "secondary"}>
                      {chapter.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {chapter.description || 'No description available'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Price: ₹{chapter.price}</span>
                {chapter.pdfUrl && (
                  <Badge variant="outline">PDF Uploaded</Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(chapter)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(chapter.id)}>
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

export default AdminChapters;