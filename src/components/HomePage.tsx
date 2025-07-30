import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Sparkles, CalendarDays } from "lucide-react";

interface HomePageProps {
  onStartJournal: () => void;
  onViewArchive: () => void;
  entriesCount: number;
}

export const HomePage = ({ onStartJournal, onViewArchive, entriesCount }: HomePageProps) => {
  const currentWeek = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="journal-gradient min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Weekly Growth with CARE</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nurture your personal growth through weekly reflection with our gentle CARE framework
          </p>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="care-step-shadow gentle-transition hover:scale-[1.02] cursor-pointer" onClick={onStartJournal}>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Start Weekly CARE Journal</h2>
                <p className="text-muted-foreground mb-6">
                  Reflect on your week with guided prompts for Compliment, Achievement, Reflection, and Emotion
                </p>
              </div>
              <Button size="lg" className="w-full">
                Begin This Week's Entry
              </Button>
            </CardContent>
          </Card>

          <Card className="care-step-shadow gentle-transition hover:scale-[1.02] cursor-pointer" onClick={onViewArchive}>
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-accent/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-8 h-8 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">View My Growth Archive</h2>
                <p className="text-muted-foreground mb-6">
                  Revisit your personal journey and see how far you've come
                </p>
              </div>
              <Button variant="outline" size="lg" className="w-full">
                Explore {entriesCount} Entries
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CARE Framework Explanation */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">The CARE Framework</h3>
              <p className="text-muted-foreground">Four pillars for meaningful weekly reflection</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">C</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Compliment</h4>
                <p className="text-sm text-muted-foreground">Acknowledge what you're proud of</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">A</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Achievement</h4>
                <p className="text-sm text-muted-foreground">Celebrate your accomplishments</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">R</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Reflection</h4>
                <p className="text-sm text-muted-foreground">Learn from your experiences</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-lg">E</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Emotion</h4>
                <p className="text-sm text-muted-foreground">Honor your feelings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Prompt */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            Week of {currentWeek}
          </p>
        </div>
      </div>
    </div>
  );
};