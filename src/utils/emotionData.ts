export interface Emotion {
  id: string;
  name: string;
  category: 'energized' | 'calm' | 'challenging' | 'social';
  color: string;
  bgColor: string;
  icon: string;
}

export interface EmotionEntry {
  id: string;
  emotion: Emotion;
  timestamp: Date;
  note?: string;
  image?: string;
  tags?: string[];
}

export const emotions: Emotion[] = [
  // Energized emotions (warm tones)
  { id: 'euphoric', name: 'Euphoric', category: 'energized', color: '#FF6B6B', bgColor: 'bg-gradient-to-br from-red-400 to-pink-500', icon: '🚀' },
  { id: 'excited', name: 'Excited', category: 'energized', color: '#FF8E53', bgColor: 'bg-gradient-to-br from-orange-400 to-red-500', icon: '⚡' },
  { id: 'energetic', name: 'Energetic', category: 'energized', color: '#FFD93D', bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500', icon: '🔥' },
  { id: 'motivated', name: 'Motivated', category: 'energized', color: '#6BCF7F', bgColor: 'bg-gradient-to-br from-green-400 to-emerald-500', icon: '💪' },
  { id: 'accomplished', name: 'Accomplished', category: 'energized', color: '#4ECDC4', bgColor: 'bg-gradient-to-br from-teal-400 to-cyan-500', icon: '🏆' },
  
  // Calm emotions (cool tones)
  { id: 'peaceful', name: 'Peaceful', category: 'calm', color: '#A8E6CF', bgColor: 'bg-gradient-to-br from-emerald-300 to-teal-400', icon: '🕊️' },
  { id: 'relaxed', name: 'Relaxed', category: 'calm', color: '#88D8C0', bgColor: 'bg-gradient-to-br from-teal-300 to-cyan-400', icon: '🌊' },
  { id: 'content', name: 'Content', category: 'calm', color: '#7FDBFF', bgColor: 'bg-gradient-to-br from-cyan-300 to-blue-400', icon: '😌' },
  { id: 'grateful', name: 'Grateful', category: 'calm', color: '#B4A7D6', bgColor: 'bg-gradient-to-br from-purple-300 to-indigo-400', icon: '🙏' },
  { id: 'serene', name: 'Serene', category: 'calm', color: '#D4B5D4', bgColor: 'bg-gradient-to-br from-purple-300 to-pink-400', icon: '🌸' },
  
  // Challenging emotions (muted tones)
  { id: 'overwhelmed', name: 'Overwhelmed', category: 'challenging', color: '#FF6B9D', bgColor: 'bg-gradient-to-br from-pink-400 to-rose-500', icon: '🌪️' },
  { id: 'anxious', name: 'Anxious', category: 'challenging', color: '#C44569', bgColor: 'bg-gradient-to-br from-rose-400 to-pink-600', icon: '😰' },
  { id: 'frustrated', name: 'Frustrated', category: 'challenging', color: '#F8B500', bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500', icon: '😤' },
  { id: 'melancholy', name: 'Melancholy', category: 'challenging', color: '#778899', bgColor: 'bg-gradient-to-br from-slate-400 to-gray-500', icon: '🌧️' },
  { id: 'restless', name: 'Restless', category: 'challenging', color: '#6C5CE7', bgColor: 'bg-gradient-to-br from-indigo-400 to-purple-500', icon: '🌀' },
  
  // Social emotions (vibrant tones)
  { id: 'connected', name: 'Connected', category: 'social', color: '#00B894', bgColor: 'bg-gradient-to-br from-emerald-400 to-green-500', icon: '🤝' },
  { id: 'loved', name: 'Loved', category: 'social', color: '#E17055', bgColor: 'bg-gradient-to-br from-orange-400 to-red-400', icon: '💕' },
  { id: 'supported', name: 'Supported', category: 'social', color: '#0984E3', bgColor: 'bg-gradient-to-br from-blue-400 to-indigo-500', icon: '🤗' },
  { id: 'understood', name: 'Understood', category: 'social', color: '#A29BFE', bgColor: 'bg-gradient-to-br from-indigo-300 to-purple-400', icon: '👁️' },
  { id: 'lonely', name: 'Lonely', category: 'social', color: '#636E72', bgColor: 'bg-gradient-to-br from-gray-400 to-slate-500', icon: '🌙' },
];

export const getEmotionsByCategory = (category: Emotion['category']) => {
  return emotions.filter(emotion => emotion.category === category);
};

export const getEmotionById = (id: string) => {
  return emotions.find(emotion => emotion.id === id);
};

export const getCategoryColor = (category: Emotion['category']) => {
  switch (category) {
    case 'energized': return 'from-orange-500 to-red-500';
    case 'calm': return 'from-teal-400 to-blue-500';
    case 'challenging': return 'from-gray-500 to-slate-600';
    case 'social': return 'from-purple-500 to-indigo-500';
    default: return 'from-gray-400 to-gray-500';
  }
};