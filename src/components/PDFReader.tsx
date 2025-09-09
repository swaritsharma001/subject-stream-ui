import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Download, 
  X,
  FileText,
  AlertCircle 
} from 'lucide-react';

interface PDFReaderProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

export const PDFReader = ({ pdfUrl, title, onClose }: PDFReaderProps) => {
  const [zoom, setZoom] = useState(100);
  const [error, setError] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleDownload = () => {
    // In a real implementation, this would be controlled by backend permissions
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl h-full max-h-[90vh] flex flex-col bg-background">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg truncate">{title}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* PDF Controls */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              
              <span className="px-2 text-sm font-mono min-w-[3rem] text-center">
                {zoom}%
              </span>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              title="Download PDF"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-hidden">
          {error ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <div>
                  <h3 className="font-semibold">Failed to load PDF</h3>
                  <p className="text-muted-foreground">
                    Please check your connection and try again.
                  </p>
                </div>
                <Button onClick={() => setError(false)} variant="outline">
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full w-full overflow-auto bg-muted/50 flex justify-center">
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&zoom=${zoom}`}
                className="w-full h-full border-0"
                title={title}
                onError={() => setError(true)}
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top center',
                  minHeight: `${100 / (zoom / 100)}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            This content is protected and for educational use only.
          </p>
        </div>
      </Card>
    </div>
  );
};