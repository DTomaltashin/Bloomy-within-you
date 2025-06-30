import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmotionEntry, Emotion } from '../utils/emotionData';

interface EmotionContextType {
  entries: EmotionEntry[];
  addEntry: (emotion: Emotion, note?: string, image?: string) => void;
  updateEntry: (id: string, updates: Partial<EmotionEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntriesForDate: (date: Date) => EmotionEntry[];
  getRecentEntries: (limit?: number) => EmotionEntry[];
}

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const useEmotion = () => {
  const context = useContext(EmotionContext);
  if (!context) {
    throw new Error('useEmotion must be used within an EmotionProvider');
  }
  return context;
};

export const EmotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<EmotionEntry[]>(() => {
    const saved = localStorage.getItem('emotionEntries');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('emotionEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (emotion: Emotion, note?: string, image?: string) => {
    const newEntry: EmotionEntry = {
      id: Date.now().toString(),
      emotion,
      timestamp: new Date(),
      note,
      image,
    };
    
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (id: string, updates: Partial<EmotionEntry>) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updates } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getEntriesForDate = (date: Date) => {
    const dateStr = date.toDateString();
    return entries.filter(entry => entry.timestamp.toDateString() === dateStr);
  };

  const getRecentEntries = (limit = 10) => {
    return entries.slice(0, limit);
  };

  return (
    <EmotionContext.Provider value={{
      entries,
      addEntry,
      updateEntry,
      deleteEntry,
      getEntriesForDate,
      getRecentEntries
    }}>
      {children}
    </EmotionContext.Provider>
  );
};