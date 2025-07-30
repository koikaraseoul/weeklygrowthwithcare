import { useState, useEffect } from "react";
import { HomePage } from "@/components/HomePage";
import { CareJournalFlow } from "@/components/CareJournalFlow";
import { ArchivePage } from "@/components/ArchivePage";
import { SuccessPage } from "@/components/SuccessPage";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: string;
  date: string;
  compliment: string;
  achievement: string;
  reflection: string;
  emotion: string;
}

interface CareEntry {
  compliment: string;
  achievement: string;
  reflection: string;
  emotion: string;
}

type ViewState = 'home' | 'journal' | 'archive' | 'success';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  // Load entries from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('careJournalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      // Add some sample entries for demonstration
      const sampleEntries: JournalEntry[] = [
        {
          id: '1',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          compliment: "I'm proud of how patient I was during difficult conversations this week. Instead of reacting immediately, I took time to listen and respond thoughtfully.",
          achievement: "I finally completed the online course I've been working on for months. It feels amazing to have followed through on my commitment to learning.",
          reflection: "I learned that I tend to overthink decisions when I'm tired. Taking breaks before making important choices leads to better outcomes for everyone involved.",
          emotion: "I'm feeling grateful and optimistic. There's a sense of momentum in my life right now, and I'm excited about the possibilities ahead."
        },
        {
          id: '2',
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          compliment: "I appreciate how I prioritized self-care this week, even when things got busy. I made time for exercise and actually stuck to my boundaries.",
          achievement: "I organized a successful team meeting that brought everyone together and improved our project workflow. The positive feedback was really encouraging.",
          reflection: "I noticed that I'm most creative in the morning hours. Planning important work during this time could help me be more productive and fulfilled.",
          emotion: "I'm feeling balanced and peaceful. The week had its challenges, but I handled them with more grace than usual."
        }
      ];
      setEntries(sampleEntries);
      localStorage.setItem('careJournalEntries', JSON.stringify(sampleEntries));
    }
  }, []);

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('careJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleStartJournal = () => {
    setCurrentView('journal');
  };

  const handleViewArchive = () => {
    setCurrentView('archive');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleCompleteEntry = (careEntry: CareEntry) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...careEntry
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setCurrentView('success');
    
    toast({
      title: "Journal entry saved!",
      description: "Your weekly reflection has been added to your growth archive.",
    });
  };

  const handleGoToSuccess = () => {
    setCurrentView('success');
  };

  switch (currentView) {
    case 'journal':
      return (
        <CareJournalFlow 
          onBack={handleBackToHome}
          onComplete={handleCompleteEntry}
        />
      );
    case 'archive':
      return (
        <ArchivePage 
          onBack={handleBackToHome}
          entries={entries}
        />
      );
    case 'success':
      return (
        <SuccessPage 
          onGoHome={handleBackToHome}
          onViewArchive={handleViewArchive}
        />
      );
    default:
      return (
        <HomePage 
          onStartJournal={handleStartJournal}
          onViewArchive={handleViewArchive}
          entriesCount={entries.length}
        />
      );
  }
};

export default Index;
