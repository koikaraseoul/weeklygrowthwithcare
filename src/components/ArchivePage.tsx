import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Trophy, Lightbulb, Smile, Filter, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface JournalEntry {
  id: string;
  date: string;
  compliment: string;
  achievement: string;
  reflection: string;
  emotion: string;
}

interface ArchivePageProps {
  onBack: () => void;
  entries: JournalEntry[];
}

const careCategories = [
  { key: 'all', label: 'All Entries', icon: Calendar },
  { key: 'compliment', label: 'Compliments', icon: Heart },
  { key: 'achievement', label: 'Achievements', icon: Trophy },
  { key: 'reflection', label: 'Reflections', icon: Lightbulb },
  { key: 'emotion', label: 'Emotions', icon: Smile }
];

export const ArchivePage = ({ onBack, entries }: ArchivePageProps) => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [filterBy, setFilterBy] = useState('all');

  const filteredEntries = entries.filter(entry => {
    if (filterBy === 'all') return true;
    const content = entry[filterBy as keyof Omit<JournalEntry, 'id' | 'date'>];
    return content.trim().length > 0;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getWeekNumber = (dateString: string) => {
    const date = new Date(dateString);
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  if (selectedEntry) {
    return (
      <div className="journal-gradient min-h-screen">
        <div className="container max-w-3xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" onClick={() => setSelectedEntry(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Archive
            </Button>
          </div>

          <Card className="care-step-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Week {getWeekNumber(selectedEntry.date)} Journal Entry
              </CardTitle>
              <p className="text-muted-foreground">{formatDate(selectedEntry.date)}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">Compliment</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedEntry.compliment}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-lg">Achievement</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedEntry.achievement}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-lg">Reflection</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedEntry.reflection}</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Smile className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-lg">Emotion</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{selectedEntry.emotion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-gradient min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {careCategories.map(category => {
                    const Icon = category.icon;
                    return (
                      <SelectItem key={category.key} value={category.key}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">My Growth Archive</h1>
            <p className="text-muted-foreground">
              {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} in your journey
            </p>
          </div>
        </div>

        {/* Entries List */}
        {filteredEntries.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Entries Yet</h3>
              <p className="text-muted-foreground mb-6">
                {filterBy === 'all' 
                  ? "Start your growth journey by creating your first weekly entry" 
                  : `No entries found for ${careCategories.find(c => c.key === filterBy)?.label.toLowerCase()}`
                }
              </p>
              <Button onClick={onBack}>
                Create First Entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card 
                key={entry.id} 
                className="care-step-shadow gentle-transition hover:scale-[1.01] cursor-pointer"
                onClick={() => setSelectedEntry(entry)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Week {getWeekNumber(entry.date)} - {formatDate(entry.date)}
                      </h3>
                    </div>
                    <Badge variant="secondary">
                      CARE Entry
                    </Badge>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Heart className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground line-clamp-2">
                        {entry.compliment.substring(0, 80)}...
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground line-clamp-2">
                        {entry.achievement.substring(0, 80)}...
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground line-clamp-2">
                        {entry.reflection.substring(0, 80)}...
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Smile className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground line-clamp-2">
                        {entry.emotion.substring(0, 80)}...
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};