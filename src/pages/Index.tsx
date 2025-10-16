import { useState } from "react";
import { Leaf, Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/ImageUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { useToast } from "@/hooks/use-toast";

interface AnalysisData {
  status: string;
  disease: string;
  treatment: string;
  confidence: number;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (imageData: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-plant`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageData }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysisResult(data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your plant has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Please try again with a clearer image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="w-full py-8 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Genfarm
          </h1>
        </div>
        <p className="text-center text-muted-foreground mt-2 text-lg">
          AI-Powered Plant Health Checker
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Hero Section */}
          {!analysisResult && !isAnalyzing && (
            <div className="text-center space-y-4 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Is Your Plant Healthy?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload a photo of your plant's leaves, fruits, or whole plant, and our AI will detect diseases 
                and suggest treatments instantly.
              </p>
            </div>
          )}

          {/* Upload Section */}
          {!analysisResult && (
            <ImageUpload 
              onImageSelect={handleImageSelect}
              isAnalyzing={isAnalyzing}
            />
          )}

          {/* Loading State */}
          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyzing Your Plant...</h3>
              <p className="text-muted-foreground">Our AI is examining the image</p>
            </div>
          )}

          {/* Results Section */}
          {analysisResult && (
            <AnalysisResult 
              {...analysisResult}
              onReset={handleReset}
            />
          )}

          {/* Info Cards */}
          {!analysisResult && !isAnalyzing && (
            <div className="grid md:grid-cols-3 gap-6 mt-12 animate-fade-in">
              <div className="p-6 rounded-xl bg-card border border-border text-center space-y-2">
                <div className="text-3xl">📸</div>
                <h3 className="font-semibold">Upload Image</h3>
                <p className="text-sm text-muted-foreground">
                  Take or upload a clear photo of your plant
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border text-center space-y-2">
                <div className="text-3xl">🤖</div>
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced AI detects diseases and issues
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border text-center space-y-2">
                <div className="text-3xl">💡</div>
                <h3 className="font-semibold">Get Solutions</h3>
                <p className="text-sm text-muted-foreground">
                  Receive treatment recommendations instantly
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 mt-16 border-t border-border/50 text-center text-sm text-muted-foreground">
        <p>🌿 Genfarm - Helping plants thrive with AI technology</p>
      </footer>
    </div>
  );
};

export default Index;
