import React, { createContext, useContext, useState, useEffect } from 'react';

export type Mood = 'happy' | 'sad' | 'anxious' | 'stressed' | 'lonely' | 'neutral';

interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}

interface MoodContextType {
  moodEntries: MoodEntry[];
  addMoodEntry: (mood: Mood, note?: string) => void;
  currentMood: Mood;
  setCurrentMood: (mood: Mood) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentMood, setCurrentMood] = useState<Mood>('neutral');

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = (mood: Mood, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setMoodEntries(prevEntries => {
      // Check if we already have an entry for today
      const existingEntryIndex = prevEntries.findIndex(entry => entry.date === today);
      
      if (existingEntryIndex !== -1) {
        // Update existing entry
        const updatedEntries = [...prevEntries];
        updatedEntries[existingEntryIndex] = { date: today, mood, note };
        return updatedEntries;
      } else {
        // Add new entry
        return [...prevEntries, { date: today, mood, note }];
      }
    });
  };

  return (
    <MoodContext.Provider value={{ moodEntries, addMoodEntry, currentMood, setCurrentMood }}>
      {children}
    </MoodContext.Provider>
  );
};