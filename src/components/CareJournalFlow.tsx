import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Heart, Trophy, Lightbulb, Smile } from "lucide-react";

interface CareEntry {
  compliment: string;
  achievement: string;
  reflection: string;
  emotion: string;
}

interface CareJournalFlowProps {
  onBack: () => void;
  onComplete: (entry: CareEntry) => void;
}

const careSteps = [
  {
    key: 'compliment',
    title: 'Compliment (Self-Praise)',
    icon: Heart,
    question: "What behavior or attitude am I proud of this week?",
    prompt: "Focus on your internal evaluation - moments where you positively viewed your mindset, decisions, or personal approach, regardless of the outcome...",
    placeholder: "This week I'm proud of my attitude when...",
    color: "text-primary"
  },
  {
    key: 'achievement',
    title: 'Achievement',
    icon: Trophy,
    question: "What specific goals or results did I accomplish this week?",
    prompt: "Record concrete external accomplishments - completed tasks, met goals, or valuable outcomes you produced...",
    placeholder: "I accomplished the specific goal of...",
    color: "text-yellow-600"
  },
  {
    key: 'reflection',
    title: 'Reflection',
    icon: Lightbulb,
    question: "What lesson did I learn from my experiences this week?",
    prompt: "Consider both successes and failures - what insights did you gain that will help you grow or make better decisions in the future?",
    placeholder: "From this week's experiences, I learned that...",
    color: "text-blue-600"
  },
  {
    key: 'emotion',
    title: 'Emotion',
    icon: Smile,
    question: "What were the key emotions I felt this week, and what situations triggered those emotions?",
    prompt: "Focus on emotional awareness - identify the main emotions you experienced and the specific contexts or situations that brought them up...",
    placeholder: "The main emotions I felt were... and they were triggered by...",
    color: "text-green-600"
  }
];

export const CareJournalFlow = ({ onBack, onComplete }: CareJournalFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [entries, setEntries] = useState<Partial<CareEntry>>({});
  const [showPreview, setShowPreview] = useState(false);

  const currentStepData = careSteps[currentStep];
  const progress = ((currentStep + 1) / careSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < careSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPreview(true);
    }
  };

  const handlePrevious = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (value: string) => {
    setEntries(prev => ({
      ...prev,
      [currentStepData.key]: value
    }));
  };

  const handleSubmit = () => {
    const completeEntry: CareEntry = {
      compliment: entries.compliment || '',
      achievement: entries.achievement || '',
      reflection: entries.reflection || '',
      emotion: entries.emotion || ''
    };
    onComplete(completeEntry);
  };

  const canProceed = entries[currentStepData?.key as keyof CareEntry]?.trim().length > 0;

  if (showPreview) {
    return (
      <div className="journal-gradient min-h-screen">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <Card className="care-step-shadow">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
                <Check className="w-8 h-8 text-primary" />
                Review Your CARE Entry
              </CardTitle>
              <p className="text-muted-foreground">Take a moment to review your reflection</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {careSteps.map((step, index) => {
                const Icon = step.icon;
                const content = entries[step.key as keyof CareEntry];
                
                return (
                  <div key={step.key} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`w-5 h-5 ${step.color}`} />
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.question}</p>
                    <p className="text-foreground leading-relaxed">{content}</p>
                  </div>
                );
              })}
              
              <div className="flex gap-4 pt-6">
                <Button variant="outline" onClick={handlePrevious} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Entries
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Complete Entry
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-gradient min-h-screen">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" onClick={showPreview ? handlePrevious : onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex-1">
              <Progress value={progress} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {careSteps.length}
            </span>
          </div>
        </div>

        {/* Current Step */}
        <Card className="care-step-shadow">
          <CardHeader className="text-center pb-6">
            <div className="mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <currentStepData.icon className={`w-8 h-8 ${currentStepData.color}`} />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">
                {currentStepData.title}
              </CardTitle>
              <p className="text-lg text-foreground font-medium">
                {currentStepData.question}
              </p>
              <p className="text-muted-foreground mt-2">
                {currentStepData.prompt}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Textarea
                placeholder={currentStepData.placeholder}
                value={entries[currentStepData.key as keyof CareEntry] || ''}
                onChange={(e) => handleInputChange(e.target.value)}
                className="min-h-[120px] text-base leading-relaxed resize-none"
                autoFocus
              />
              
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrevious} className="flex-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceed}
                  className="flex-1"
                >
                  {currentStep === careSteps.length - 1 ? 'Review' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};