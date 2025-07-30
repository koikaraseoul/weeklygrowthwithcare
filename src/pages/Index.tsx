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
