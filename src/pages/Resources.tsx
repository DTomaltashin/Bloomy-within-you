import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, BookOpen, Pencil, Users, Music, Timer, Play, Pause, RotateCcw } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'meditation' | 'journaling' | 'connection' | 'sounds';
}

const Resources: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingTime, setBreathingTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [phaseTime, setPhaseTime] = useState(0);

  const resources: Resource[] = [
    {
      title: "Mindfulness Meditation Guide",
      description: "Learn the basics of mindfulness meditation with simple, guided practices for beginners.",
      url: "https://www.mindful.org/meditation/mindfulness-getting-started/",
      icon: <Globe className="h-5 w-5" />,
      category: 'meditation'
    },
    {
      title: "Headspace",
      description: "Popular meditation app with guided sessions for stress, sleep, focus, and more.",
      url: "https://www.headspace.com/",
      icon: <Globe className="h-5 w-5" />,
      category: 'meditation'
    },
    {
      title: "Journaling for Mental Health",
      description: "Discover evidence-based journaling techniques to improve emotional wellbeing.",
      url: "https://positivepsychology.com/benefits-of-journaling/",
      icon: <Pencil className="h-5 w-5" />,
      category: 'journaling'
    },
    {
      title: "The Five Minute Journal",
      description: "Simple daily journaling practice focused on gratitude and positive reflection.",
      url: "https://www.intelligentchange.com/products/the-five-minute-journal",
      icon: <BookOpen className="h-5 w-5" />,
      category: 'journaling'
    },
    {
      title: "Building Meaningful Connections",
      description: "Learn how to create and maintain supportive relationships for better mental health.",
      url: "https://www.helpguide.org/articles/relationships-communication/making-good-friends.htm",
      icon: <Users className="h-5 w-5" />,
      category: 'connection'
    },
    {
      title: "Calm Rain Sounds",
      description: "Soothing rain sounds for relaxation, focus, and better sleep quality.",
      url: "https://rainymood.com/",
      icon: <Music className="h-5 w-5" />,
      category: 'sounds'
    },
    {
      title: "Noisli",
      description: "Background noise generator with nature sounds to boost productivity and relaxation.",
      url: "https://www.noisli.com/",
      icon: <Music className="h-5 w-5" />,
      category: 'sounds'
    }
  ];
  
  // Breathing exercise timer
  useEffect(() => {
    let interval: number;
    if (isBreathing && breathingTime < selectedDuration) {
      interval = setInterval(() => {
        setBreathingTime(prev => prev + 1);
        setPhaseTime(prev => {
          const newPhaseTime = prev + 1;
          
          // 4-4-4 breathing pattern (4 seconds each phase)
          if (breathingPhase === 'inhale' && newPhaseTime >= 4) {
            setBreathingPhase('hold');
            return 0;
          } else if (breathingPhase === 'hold' && newPhaseTime >= 4) {
            setBreathingPhase('exhale');
            return 0;
          } else if (breathingPhase === 'exhale' && newPhaseTime >= 4) {
            setBreathingPhase('inhale');
            return 0;
          }
          
          return newPhaseTime;
        });
      }, 1000);
    } else if (breathingTime >= selectedDuration) {
      setIsBreathing(false);
      setBreathingTime(0);
      setPhaseTime(0);
      setBreathingPhase('inhale');
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathingTime, selectedDuration, breathingPhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setBreathingTime(0);
    setPhaseTime(0);
    setBreathingPhase('inhale');
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe in slowly...';
      case 'hold': return 'Hold your breath...';
      case 'exhale': return 'Breathe out gently...';
    }
  };
  
  const renderResourceCategory = (category: Resource['category'], title: string, description: string) => {
    const categoryResources = resources.filter(r => r.category === category);
    
    if (categoryResources.length === 0) return null;
    
    const categoryColors = {
      meditation: 'from-blue-500 to-purple-500',
      journaling: 'from-green-500 to-emerald-500',
      connection: 'from-purple-500 to-pink-500',
      sounds: 'from-indigo-500 to-blue-500'
    };
    
    return (
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-serif font-light text-white mb-2">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryResources.map((resource, index) => (
            <a 
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 mood-card group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${categoryColors[category]} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                  {resource.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                      {resource.title}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">{resource.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-4xl font-serif font-light text-white mb-4">Wellness Resources</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover tools, techniques, and resources to support your mental wellbeing journey
          </p>
        </div>
        
        {/* Breathing Exercise */}
        <div className="dark-card rounded-3xl p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-light text-white mb-6">Guided Breathing Exercise</h2>
            
            <div className="flex flex-col items-center mb-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-1000 ${
                isBreathing 
                  ? breathingPhase === 'inhale' 
                    ? 'bg-gradient-to-r from-blue-400 to-purple-400 scale-110 shadow-2xl' 
                    : breathingPhase === 'hold'
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 scale-110 shadow-2xl'
                      : 'bg-gradient-to-r from-pink-400 to-red-400 scale-90 shadow-lg'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 scale-100 shadow-md'
              }`}>
                <Timer className={`h-12 w-12 text-white ${isBreathing ? 'animate-pulse' : ''}`} />
              </div>
              
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(breathingTime)}
              </div>
              
              {isBreathing && (
                <div className="text-lg text-purple-300 font-medium mb-4 animate-fadeInUp">
                  {getBreathingInstruction()}
                </div>
              )}
              
              <div className="flex gap-3 mb-6">
                {[60, 180, 300].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    disabled={isBreathing}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedDuration === duration 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md'
                    } disabled:opacity-50`}
                  >
                    {duration === 60 ? '1 min' : duration === 180 ? '3 min' : '5 min'}
                  </button>
                ))}
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsBreathing(!isBreathing);
                    if (!isBreathing) {
                      setBreathingTime(0);
                      setPhaseTime(0);
                      setBreathingPhase('inhale');
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 btn-interactive font-medium"
                >
                  {isBreathing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  {isBreathing ? 'Pause' : 'Start'}
                </button>
                
                {breathingTime > 0 && (
                  <button
                    onClick={resetBreathing}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 hover:shadow-md transition-all duration-300 font-medium"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-blue-500/20">
              <p className="text-gray-200 leading-relaxed">
                <strong className="text-blue-300">4-4-4 Breathing:</strong> This technique helps activate your body's relaxation response. 
                Breathe in for 4 seconds, hold for 4 seconds, then exhale for 4 seconds. 
                Focus on the rhythm and let your mind settle with each breath.
              </p>
            </div>
          </div>
        </div>
        
        {/* Resource Categories */}
        {renderResourceCategory(
          'meditation', 
          'Meditation & Mindfulness',
          'Cultivate inner peace and present-moment awareness'
        )}
        
        {renderResourceCategory(
          'journaling', 
          'Journaling & Reflection',
          'Process emotions and gain insights through writing'
        )}
        
        {renderResourceCategory(
          'connection', 
          'Building Connections',
          'Strengthen relationships and build supportive communities'
        )}
        
        {renderResourceCategory(
          'sounds', 
          'Calming Sounds',
          'Create peaceful environments for relaxation and focus'
        )}
        
        {/* Final Message */}
        <div className="dark-card rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-serif font-light text-white mb-4">Remember</h3>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto">
            These resources are here to support your journey toward better mental wellbeing. 
            Take your time exploring them and find what resonates with you. Small, consistent 
            steps often lead to the most meaningful changes. Be patient and gentle with yourself 
            as you grow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;