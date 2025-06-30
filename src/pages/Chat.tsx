import React, { useState, useEffect } from 'react';
import { RefreshCw, Heart, Lightbulb, ArrowLeft, Shield, Zap, Clock, MessageCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SmoothTransition from '../components/SmoothTransition';
import LoadingSpinner from '../components/LoadingSpinner';

const Chat: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setChatbotLoaded(true);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setChatbotLoaded(false);
    
    // Refresh the iframe by reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const features = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Personalized Support",
      description: "Tailored responses based on your emotional needs"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Private & Secure",
      description: "Your conversations are completely confidential"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Response",
      description: "Get immediate support whenever you need it"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "24/7 Availability",
      description: "Always here when you need someone to talk to"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto h-screen flex flex-col">
        {/* Enhanced Header */}
        <SmoothTransition>
          <div className="px-8 pt-24 pb-8 border-b border-gray-800/50 flex-shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                    <MessageCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-3">
                    Chat with Bloomy
                  </h1>
                  <p className="text-gray-400 text-lg mb-4">
                    Your trained AI companion for emotional wellness and mental health support
                  </p>
                  {user && (
                    <div className="flex items-center gap-2 text-purple-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Welcome back, {user.displayName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className={`glass text-white hover:bg-white/10 flex items-center gap-2 text-sm px-6 py-3 rounded-2xl transition-all duration-500 btn-interactive ${
                    showInfo ? 'bg-white/10 scale-105' : ''
                  }`}
                >
                  <Lightbulb className="h-5 w-5" />
                  <span className="hidden sm:inline">About AI</span>
                </button>
                
                <button 
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="glass text-white hover:bg-white/10 flex items-center gap-2 text-sm px-6 py-3 rounded-2xl transition-all duration-500 btn-interactive disabled:opacity-50"
                >
                  <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* Enhanced Info Panel */}
            {showInfo && (
              <SmoothTransition delay={200}>
                <div className="mt-8 animate-fadeInUp">
                  <div className="glass-card rounded-3xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                        <Lightbulb className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">About Your AI Companion</h3>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                      This is your personalized Bloomy AI, specifically trained for emotional wellness and mental health support. 
                      It understands your unique needs and provides compassionate, thoughtful responses tailored to your emotional state.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-800/30 rounded-2xl hover:bg-gray-800/50 transition-all duration-300"
                        >
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
                            {feature.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SmoothTransition>
            )}
          </div>
        </SmoothTransition>
        
        {/* Enhanced Chat Interface */}
        <div className="flex-grow flex flex-col p-8">
          <div className="flex-grow bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl backdrop-blur-sm relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center">
                  <LoadingSpinner size="lg" text="Connecting to Bloomy..." />
                  <p className="text-gray-400 mt-4 text-sm">
                    Preparing your personalized AI companion...
                  </p>
                </div>
              </div>
            )}
            
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/Ysy9Eo2teU_aDM9RJE9N6"
              width="100%"
              style={{ height: "100%", minHeight: "700px", border: "none" }}
              frameBorder="0"
              title="Bloomy AI Companion"
              allow="microphone; camera"
              loading="lazy"
              className="w-full h-full"
              onLoad={() => {
                if (!isLoading) {
                  setChatbotLoaded(true);
                }
              }}
            />
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <SmoothTransition>
          <div className="px-8 pb-8 border-t border-gray-800/50 flex-shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-center py-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium">Your conversations are private and secure</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    chatbotLoaded ? 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50' : 'bg-gray-500'
                  }`}></div>
                  <span className="font-medium">
                    {chatbotLoaded ? 'Bloomy AI Online' : 'Connecting...'}
                  </span>
                </div>
                
                {chatbotLoaded && (
                  <div className="flex items-center gap-2 text-purple-400 text-sm">
                    <Heart className="h-4 w-4 animate-pulse" />
                    <span>Ready to help</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SmoothTransition>
      </div>
    </div>
  );
};

export default Chat;