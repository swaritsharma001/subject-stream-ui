import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Lock, Play, Eye, IndianRupee } from 'lucide-react';
import { api, Chapter as ChapterType } from '@/lib/api';
import { ChapterAccessModal } from '@/components/modals/ChapterAccessModal';
import { PDFReader } from '@/components/PDFReader';
import { toast } from 'sonner';

const Chapters = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<ChapterType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapter, setSelectedChapter] = useState<ChapterType | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [showPDFReader, setShowPDFReader] = useState(false);
  const [unlockedChapters, setUnlockedChapters] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!subjectId) {
      navigate('/schools');
      return;
    }

    const loadChapters = async () => {
      try {
        const chaptersData = await api.fetchChapters(subjectId);
        setChapters(chaptersData);
        
        // Load unlocked chapters from localStorage
        const unlocked = localStorage.getItem(`unlocked_chapters_${subjectId}`);
        if (unlocked) {
          setUnlockedChapters(new Set(JSON.parse(unlocked)));
        }
      } catch (error) {
        console.error('Failed to load chapters:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChapters();
  }, [subjectId, navigate]);

  const handleChapterClick = (chapter: ChapterType) => {
    if (!chapter.isLocked || unlockedChapters.has(chapter.id)) {
      // Chapter is unlocked, show PDF reader
      setSelectedChapter(chapter);
      setShowPDFReader(true);
    } else {
      // Chapter is locked, show access modal
      setSelectedChapter(chapter);
      setShowAccessModal(true);
    }
  };

  const handleAccessGranted = () => {
    if (selectedChapter) {
      const newUnlocked = new Set(unlockedChapters);
      newUnlocked.add(selectedChapter.id);
      setUnlockedChapters(newUnlocked);
      
      // Save to localStorage
      localStorage.setItem(
        `unlocked_chapters_${subjectId}`,
        JSON.stringify(Array.from(newUnlocked))
      );
      
      toast.success('Chapter unlocked successfully!');
      setShowPDFReader(true);
    }
  };

  const isChapterUnlocked = (chapter: ChapterType) => {
    return !chapter.isLocked || unlockedChapters.has(chapter.id);
  };

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
            Back to Subjects
          </Link>
        </Button>
        
        <h1 className="text-4xl font-heading font-bold mb-4">
          Chapter Library
        </h1>
        <p className="text-xl text-muted-foreground">
          Select a chapter to start learning. Some chapters may require access keys or payment.
        </p>
      </div>

      {/* Chapters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => {
          const unlocked = isChapterUnlocked(chapter);
          
          return (
            <Card 
              key={chapter.id} 
              className={`transition-all duration-300 card-gradient group cursor-pointer ${
                unlocked 
                  ? 'hover:shadow-large' 
                  : 'opacity-80 hover:opacity-100'
              }`}
              onClick={() => handleChapterClick(chapter)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      unlocked 
                        ? 'bg-primary/10 group-hover:bg-primary/20' 
                        : 'bg-muted'
                    }`}>
                      {unlocked ? (
                        <FileText className="h-6 w-6 text-primary" />
                      ) : (
                        <Lock className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <CardTitle className={`text-xl transition-colors ${
                        unlocked 
                          ? 'group-hover:text-primary' 
                          : 'text-muted-foreground'
                      }`}>
                        {chapter.name}
                      </CardTitle>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={chapter.isActive ? "default" : "secondary"}>
                          {chapter.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {unlocked && (
                          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-base">
                  {chapter.description || 'Comprehensive learning material with detailed explanations and examples.'}
                </CardDescription>
                
                {!unlocked && (
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <IndianRupee className="h-4 w-4" />
                    <span>₹{chapter.price} for access</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>{unlocked ? 'Available to read' : 'Requires access'}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  variant={unlocked ? "default" : "locked"}
                  disabled={!chapter.isActive}
                >
                  {unlocked ? (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Read Chapter
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Get Access
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {chapters.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No chapters found</h3>
          <p className="text-muted-foreground">
            This subject doesn't have any chapters available yet.
          </p>
        </div>
      )}

      {/* Chapter Access Modal */}
      <ChapterAccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        chapter={selectedChapter}
        onAccessGranted={handleAccessGranted}
      />

      {/* PDF Reader */}
      {showPDFReader && selectedChapter && (
        <PDFReader
          pdfUrl={selectedChapter.pdfUrl || '/sample-chapter.pdf'}
          title={selectedChapter.name}
          onClose={() => setShowPDFReader(false)}
        />
      )}
    </div>
  );
};

export default Chapters;