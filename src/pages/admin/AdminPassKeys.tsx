import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Key, Plus, Search, Edit, Trash2, Copy, Calendar } from 'lucide-react';
import { api, PassKey as PassKeyType, Chapter as ChapterType } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const AdminPassKeys = () => {
  const [passKeys, setPassKeys] = useState<PassKeyType[]>([]);
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingPassKey, setEditingPassKey] = useState<PassKeyType | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    key: '',
    type: 'single' as 'single' | 'quota',
    chapterId: '',
    quota: 10,
    expiresAt: '',
    isActive: true
  });

  useEffect(() => {
    const loadData = async () => {
      const [passKeysData, chaptersData] = await Promise.all([
        api.fetchPassKeys(),
        api.fetchChapters('1') // Mock subject ID
      ]);
      setPassKeys(passKeysData);
      setChapters(chaptersData);
    };
    loadData();
  }, []);

  const filteredPassKeys = passKeys.filter(passKey =>
    passKey.key.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateRandomKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, key: result });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const passKeyData = {
        ...formData,
        chapterId: formData.type === 'single' ? formData.chapterId : undefined,
        quota: formData.type === 'quota' ? formData.quota : undefined,
        expiresAt: formData.expiresAt || undefined
      };

      if (editingPassKey) {
        // Update logic would go here
        toast({ title: "Success", description: "Pass key updated successfully" });
      } else {
        await api.createPassKey(passKeyData);
        toast({ title: "Success", description: "Pass key created successfully" });
      }
      
      // Reload pass keys
      const data = await api.fetchPassKeys();
      setPassKeys(data);
      
      // Reset form
      setFormData({ key: '', type: 'single', chapterId: '', quota: 10, expiresAt: '', isActive: true });
      setEditingPassKey(null);
      setIsAddOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "Failed to save pass key", variant: "destructive" });
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: "Copied", description: "Pass key copied to clipboard" });
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete logic would go here
      const updatedKeys = passKeys.filter(pk => pk.id !== id);
      setPassKeys(updatedKeys);
      toast({ title: "Success", description: "Pass key deleted successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete pass key", variant: "destructive" });
    }
  };

  const getPassKeyStatus = (passKey: PassKeyType) => {
    if (!passKey.isActive) return { label: 'Inactive', variant: 'secondary' as const };
    if (passKey.expiresAt && new Date(passKey.expiresAt) < new Date()) {
      return { label: 'Expired', variant: 'destructive' as const };
    }
    if (passKey.type === 'quota' && passKey.usedCount >= (passKey.quota || 0)) {
      return { label: 'Exhausted', variant: 'destructive' as const };
    }
    return { label: 'Active', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pass Keys Management</h1>
          <p className="text-muted-foreground">Generate and manage access keys</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPassKey(null);
              setFormData({ key: '', type: 'single', chapterId: '', quota: 10, expiresAt: '', isActive: true });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Generate Pass Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPassKey ? 'Edit Pass Key' : 'Generate New Pass Key'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="key">Pass Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
                    placeholder="Enter custom key or generate random"
                    required
                  />
                  <Button type="button" variant="outline" onClick={generateRandomKey}>
                    Generate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Pass Key Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value: 'single' | 'quota') => setFormData({ ...formData, type: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single Chapter Access</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quota" id="quota" />
                    <Label htmlFor="quota">Quota-based (Multiple Uses)</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.type === 'single' && (
                <div className="space-y-2">
                  <Label htmlFor="chapter">Select Chapter</Label>
                  <Select value={formData.chapterId} onValueChange={(value) => setFormData({ ...formData, chapterId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map((chapter) => (
                        <SelectItem key={chapter.id} value={chapter.id}>
                          {chapter.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.type === 'quota' && (
                <div className="space-y-2">
                  <Label htmlFor="quota">Usage Quota</Label>
                  <Input
                    id="quota"
                    type="number"
                    min="1"
                    value={formData.quota}
                    onChange={(e) => setFormData({ ...formData, quota: Number(e.target.value) })}
                    placeholder="Number of uses allowed"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="expires">Expiration Date (Optional)</Label>
                <Input
                  id="expires"
                  type="datetime-local"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
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
                <Button type="submit">{editingPassKey ? 'Update' : 'Generate'}</Button>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search pass keys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPassKeys.map((passKey) => {
          const status = getPassKeyStatus(passKey);
          return (
            <Card key={passKey.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-lg font-mono">{passKey.key}</CardTitle>
                      <Badge variant={status.variant}>
                        {status.label}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleCopyKey(passKey.key)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="capitalize">{passKey.type}</span>
                  </div>
                  {passKey.type === 'quota' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Usage:</span>
                      <span>{passKey.usedCount}/{passKey.quota}</span>
                    </div>
                  )}
                  {passKey.expiresAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expires:</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(passKey.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(passKey.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPassKeys;