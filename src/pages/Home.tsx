import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Flower, MessageCircle, BarChart2, BookOpen, Sparkles, Heart, Brain, Calendar, ArrowRight, Zap, Shield, Users, Clock } from 'lucide-react';
import { getRandomQuote } from '../utils/quotes';
import ParticleBackground from '../components/ParticleBackground';
import SmoothTransition from '../components/SmoothTransition';
import AnimatedCounter from '../components/AnimatedCounter';

interface HomeProps {
  setShowNavbar: (show: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setShowNavbar }) => {
  const [quote, setQuote] = useState(getRandomQuote());
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setShowNavbar(false);
    setIsVisible(true);
    return () => setShowNavbar(true);
  }, [setShowNavbar]);

  // Rotate quotes every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI Companion Chat",
      description: "Connect with your personalized Bloomy AI, trained specifically for emotional wellness and mental health support",
      color: "from-purple-500 to-pink-500",
      link: "/chat",
      highlight: "AI-Powered",
      benefits: ["24/7 availability", "Personalized responses", "Emotional understanding"]
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Emotion Check-ins",
      description: "Express your feelings through intuitive emotion tracking and thoughtful journaling in a safe space",
      color: "from-blue-500 to-cyan-500",
      link: "/emotion-tracker",
      highlight: "Self-Awareness",
      benefits: ["Emotion recognition", "Pattern insights", "Mindful reflection"]
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: "Wellness Calendar",
      description: "Visualize your emotional journey and discover meaningful patterns to understand your mental health",
      color: "from-green-500 to-emerald-500",
      link: "/mood-tracker",
      highlight: "Progress Tracking",
      benefits: ["Visual patterns", "Mood trends", "Growth insights"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Wellness Resources",
      description: "Access curated tools, guided exercises, and evidence-based practices for your mental health journey",
      color: "from-orange-500 to-red-500",
      link: "/resources",
      highlight: "Expert Guidance",
      benefits: ["Breathing exercises", "Meditation guides", "Wellness tips"]
    }
  ];

  const stats = [
    { 
      number: 24, 
      suffix: "/7", 
      label: "Available Support", 
      icon: <Clock className="h-6 w-6" />,
      description: "Round-the-clock emotional support"
    },
    { 
      number: 100, 
      suffix: "%", 
      label: "Private & Secure", 
      icon: <Shield className="h-6 w-6" />,
      description: "Your conversations stay confidential"
    },
    { 
      number: 1000, 
      suffix: "+", 
      label: "Lives Touched", 
      icon: <Heart className="h-6 w-6" />,
      description: "People finding peace with Bloomy"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        <SmoothTransition delay={200}>
          <div className="max-w-6xl text-center">
            
            {/* Main Logo and Title */}
            <div className="mb-16 animate-float">
              <div className="relative inline-block mb-8">
                <Flower className="h-32 w-32 text-white mx-auto drop-shadow-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-breathe"></div>
                <Sparkles className="absolute -top-4 -right-4 h-8 w-8 text-yellow-300 animate-pulse" />
                <Heart className="absolute -bottom-2 -left-2 h-6 w-6 text-pink-400 animate-bounce" />
              </div>
              
              <h1 className="text-7xl md:text-8xl font-bold mb-6 drop-shadow-lg">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Bloomy
                </span>
              </h1>
              
              <div className="relative mb-8">
                <p className="text-3xl md:text-4xl font-light text-white/90 mb-4">
                  Within You.
                </p>
                <p className="text-xl md:text-2xl text-purple-200 font-medium mb-6">
                  Your Compassionate AI Companion for Mental Wellness
                </p>
                <div className="flex items-center justify-center gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">AI-Powered Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm">100% Private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quote Card */}
            <SmoothTransition delay={600}>
              <div className="glass-card rounded-3xl p-8 mb-16 max-w-3xl mx-auto animate-fadeInUp group hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6 text-purple-400 mr-3 animate-spin-slow" />
                  <span className="text-sm font-medium text-purple-300 uppercase tracking-wide">
                    Daily Inspiration
                  </span>
                  <Sparkles className="h-6 w-6 text-purple-400 ml-3 animate-spin-slow" />
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-200 italic mb-6 leading-relaxed">
                  "{quote.text}"
                </blockquote>
                <cite className="text-purple-300 font-medium text-lg">— {quote.author}</cite>
              </div>
            </SmoothTransition>
            
            {/* CTA Buttons */}
            <SmoothTransition delay={800}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link 
                  to="/emotion-tracker" 
                  className="group inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-5 px-10 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 btn-interactive text-lg"
                >
                  <Brain className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/chat" 
                  className="group inline-flex items-center gap-4 bg-white/20 hover:bg-white/30 text-white font-semibold py-5 px-10 rounded-full shadow-2xl backdrop-blur-sm transition-all duration-500 btn-interactive text-lg border border-white/20 hover:border-white/40"
                >
                  <Heart className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  Talk to Bloomy
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </SmoothTransition>

            {/* Stats */}
            <SmoothTransition delay={1000}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="glass-card rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-500"
                    style={{ animationDelay: `${1000 + index * 200}ms` }}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-purple-300 font-medium mb-2">{stat.label}</div>
                    <div className="text-gray-400 text-sm">{stat.description}</div>
                  </div>
                ))}
              </div>
            </SmoothTransition>
          </div>
        </SmoothTransition>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SmoothTransition>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                How Bloomy
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Supports </span>
                You
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Discover the tools and features designed to nurture your mental wellbeing and emotional growth
              </p>
            </div>
          </SmoothTransition>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <SmoothTransition key={index} delay={index * 200}>
                <Link
                  to={feature.link}
                  className={`glass-card rounded-3xl p-10 text-left mood-card animate-fadeInUp group relative overflow-hidden ${
                    currentFeature === index ? 'ring-2 ring-purple-400 scale-105' : ''
                  }`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                  
                  {/* Highlight badge */}
                  <div className="absolute top-6 right-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${feature.color} text-white shadow-lg`}>
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} text-white mb-8 shadow-2xl group-hover:scale-110 transition-all duration-500 relative`}>
                    {feature.icon}
                    <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    {feature.description}
                  </p>
                  
                  {/* Benefits list */}
                  <div className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-3 text-gray-400">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                      <span className="font-medium mr-2">Explore Feature</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </SmoothTransition>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <SmoothTransition>
            <div className="glass-card rounded-3xl p-16">
              <div className="relative mb-8">
                <Brain className="h-20 w-20 text-purple-400 mx-auto mb-6" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-2xl"></div>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Begin Your
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Wellness Journey?</span>
              </h3>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards better mental wellness. Bloomy is here to listen, 
                understand, and support you every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  to="/emotion-tracker" 
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-500 btn-interactive text-lg"
                >
                  <Brain className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Start Check-in
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link 
                  to="/chat" 
                  className="group inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all duration-500 btn-interactive backdrop-blur-sm border border-white/20 hover:border-white/40 text-lg"
                >
                  <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Begin Conversation
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </SmoothTransition>
        </div>
      </section>
      
      {/* Disclaimer */}
      <footer className="text-center pb-12 px-6">
        <SmoothTransition>
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-purple-400 mr-2" />
              <span className="text-lg font-medium text-purple-300">Important Note</span>
              <Heart className="h-6 w-6 text-purple-400 ml-2" />
            </div>
            <p className="text-white/80 leading-relaxed">
              Bloomy is designed to support your mental wellness journey and is not a replacement 
              for professional mental health care. If you're experiencing a crisis, please reach 
              out to a mental health professional or crisis helpline immediately.
            </p>
            <div className="mt-6 flex items-center justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Made with Care</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </SmoothTransition>
      </footer>
    </div>
  );
};

export default Home;