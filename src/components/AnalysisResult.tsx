import { CheckCircle2, AlertCircle, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AnalysisResultProps {
  status: string;
  disease: string;
  treatment: string;
  confidence: number;
  onReset: () => void;
}

export const AnalysisResult = ({ 
  status, 
  disease, 
  treatment, 
  confidence, 
  onReset 
}: AnalysisResultProps) => {
  const isHealthy = status === "Healthy";

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          {isHealthy ? (
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
          )}
        </div>
        <CardTitle className="text-2xl">
          {isHealthy ? "🌿 Great News!" : "🌱 Plant Health Alert"}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              <span className="font-semibold">Status:</span>
            </div>
            <Badge 
              variant={isHealthy ? "default" : "destructive"}
              className="text-sm px-4 py-1"
            >
              {status}
            </Badge>
          </div>

          {!isHealthy && disease !== "N/A" && (
            <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
              <div className="font-semibold text-foreground">Disease Detected:</div>
              <div className="text-lg">{disease}</div>
            </div>
          )}

          <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
            <div className="font-semibold text-foreground">
              {isHealthy ? "Care Recommendations:" : "Treatment:"}
            </div>
            <div className="text-sm leading-relaxed">{treatment}</div>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <span className="font-semibold">Confidence:</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-lg font-bold">{confidence}%</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={onReset} 
          className="w-full" 
          size="lg"
        >
          Analyze Another Plant
        </Button>
      </CardContent>
    </Card>
  );
};
