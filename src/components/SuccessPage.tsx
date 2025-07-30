import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Home, Calendar } from "lucide-react";

interface SuccessPageProps {
  onGoHome: () => void;
  onViewArchive: () => void;
}

export const SuccessPage = ({ onGoHome, onViewArchive }: SuccessPageProps) => {
  return (
    <div className="journal-gradient min-h-screen">
      <div className="container max-w-2xl mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="care-step-shadow text-center">
          <CardContent className="p-12">
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Great job reflecting this week!</h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                You've completed your weekly CARE journal entry. Every reflection is a step toward greater self-awareness and personal growth.
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium">Weekly Reflection Complete</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your thoughts and insights have been saved to your private growth archive
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={onGoHome} className="flex-1">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Button>
              <Button variant="outline" onClick={onViewArchive} className="flex-1">
                <Calendar className="w-4 h-4 mr-2" />
                View Archive
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};