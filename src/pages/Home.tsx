import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower, MessageCircle, BarChart2, BookOpen, Heart, Brain, ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import { getRandomQuote } from '../utils/quotes';
import ParticleBackground from '../components/ParticleBackground';
import SmoothTransition from '../components/SmoothTransition';

interface HomeProps {
  setShowNavbar: (show: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setShowNavbar }) => {
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    setShowNavbar(false);
    return () => setShowNavbar(true);
  }, [setShowNavbar]);

  // Rotate quotes every 30 seconds (less frequent)
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI Companion",
      description: "Chat with your personalized AI for emotional support and guidance",
      color: "from-purple-500 to-pink-500",
      link: "/chat"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Emotion Tracking",
      description: "Track your feelings and reflect on your emotional patterns",
      color: "from-blue-500 to-cyan-500",
      link: "/emotion-tracker"
    },
    {
      icon: <BarChart2 className="h-6 w-6" />,
      title: "Mood Calendar",
      description: "Visualize your emotional journey over time",
      color: "from-green-500 to-emerald-500",
      link: "/mood-tracker"
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Wellness Resources",
      description: "Access tools and exercises for mental wellbeing",
      color: "from-orange-500 to-red-500",
      link: "/resources"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <div className="max-w-4xl text-center">
          
          {/* Logo and Title */}
          <div className="mb-12">
            <div className="relative inline-block mb-6">
              <Flower className="h-20 w-20 text-white mx-auto" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                Bloomy
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-white/90 mb-4">
              Within You.
            </p>
            <p className="text-lg md:text-xl text-purple-200 mb-8">
              Your AI companion for mental wellness
            </p>
          </div>
          
          {/* Quote Card */}
          <div className="glass-card rounded-2xl p-6 mb-12 max-w-2xl mx-auto">
            <blockquote className="text-lg md:text-xl text-gray-200 italic mb-4 leading-relaxed">
              "{quote.text}"
            </blockquote>
            <cite className="text-purple-300 font-medium">— {quote.author}</cite>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/emotion-tracker" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
            >
              <Brain className="h-5 w-5" />
              Start Check-in
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              to="/chat" 
              className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
            >
              <Heart className="h-5 w-5" />
              Talk to Bloomy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Simple Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-purple-300 text-sm">Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-purple-300 text-sm">Private</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">AI</div>
              <div className="text-purple-300 text-sm">Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Bloomy Helps
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Simple tools designed to support your mental wellbeing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="glass-card rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="font-medium mr-2">Learn more</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card rounded-2xl p-12">
            <Brain className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Begin?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              Take the first step towards better mental wellness. Bloomy is here to support you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/emotion-tracker" 
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300"
              >
                <Brain className="h-5 w-5" />
                Start Check-in
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/chat" 
                className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with Bloomy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Disclaimer */}
      <footer className="text-center pb-12 px-6">
        <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6">
          <p className="text-white/80 text-sm leading-relaxed">
            Bloomy supports your mental wellness journey and is not a replacement 
            for professional mental health care. If you're experiencing a crisis, 
            please reach out to a mental health professional or crisis helpline.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;