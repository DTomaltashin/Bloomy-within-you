import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flower, Menu, X, Heart, Calendar, Brain, User, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EnhancedNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const navItems = [
    { to: '/chat', icon: Heart, label: 'Chat', gradient: 'from-pink-500 to-rose-500' },
    { to: '/emotion-tracker', icon: Brain, label: 'Check-ins', gradient: 'from-purple-500 to-indigo-500' },
    { to: '/mood-tracker', icon: Calendar, label: 'Calendar', gradient: 'from-blue-500 to-cyan-500' },
    { to: '/friends', icon: Users, label: 'Friends', gradient: 'from-green-500 to-emerald-500' },
  ];

  return (
    <nav 
      className={`
        fixed top-0 w-full z-50 
        transition-all duration-700 ease-out
        ${scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-6'}
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Flower className="h-10 w-10 text-white group-hover:text-purple-200 transition-all duration-500 animate-float" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Bloomy
            </span>
            <span className="text-xs text-purple-300 opacity-0 group-hover:opacity-100 transition-all duration-300 -mt-1">
              Within You
            </span>
          </div>
        </NavLink>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {isAuthenticated ? (
            <>
              {navItems.map((item, index) => (
                <div 
                  key={item.to}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NavLink 
                    to={item.to}
                    className={({ isActive }) => 
                      `nav-link px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-500 btn-interactive flex items-center gap-2 relative overflow-hidden group ${
                        isActive 
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg scale-105` 
                          : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
                  </NavLink>
                </div>
              ))}
              
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `nav-link px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-500 btn-interactive hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Resources
              </NavLink>

              <div className="w-px h-8 bg-white/20 mx-3"></div>

              <button
                onClick={handleAuthClick}
                className="flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-500 btn-interactive text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 group"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.displayName} 
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300">
                    {user?.displayName?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                  </div>
                )}
                <span className="hidden lg:inline">{user?.displayName || 'Profile'}</span>
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `nav-link px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-500 btn-interactive hover:scale-105 ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Resources
              </NavLink>

              <button
                onClick={handleAuthClick}
                className="px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-500 btn-interactive bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <User className="h-4 w-4" />
                Sign In
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 rounded-2xl text-white hover:bg-white/10 transition-all duration-500 btn-interactive group"
        >
          <div className="relative w-6 h-6">
            <Menu 
              className={`h-6 w-6 absolute transition-all duration-500 ${
                isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`} 
            />
            <X 
              className={`h-6 w-6 absolute transition-all duration-500 ${
                isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
              }`} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`
          md:hidden overflow-hidden transition-all duration-700 ease-out
          ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="glass mt-4 mx-6 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {isAuthenticated ? (
              <>
                {navItems.map((item, index) => (
                  <NavLink 
                    key={item.to}
                    to={item.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `px-6 py-4 rounded-2xl text-center font-medium transition-all duration-500 flex items-center justify-center gap-3 animate-fadeInUp group ${
                        isActive 
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg` 
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`
                    }
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </NavLink>
                ))}
                
                <NavLink 
                  to="/resources" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-6 py-4 rounded-2xl text-center font-medium transition-all duration-500 flex items-center justify-center gap-3 ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  Resources
                </NavLink>

                <div className="w-full h-px bg-white/20 my-2"></div>

                <button
                  onClick={() => {
                    handleAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-4 rounded-2xl text-center font-medium transition-all duration-500 flex items-center justify-center gap-3 text-white/80 hover:text-white hover:bg-white/10"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.displayName} 
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                      {user?.displayName?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                  )}
                  Profile
                </button>
              </>
            ) : (
              <>
                <NavLink 
                  to="/resources" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-6 py-4 rounded-2xl text-center font-medium transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  Resources
                </NavLink>

                <button
                  onClick={() => {
                    handleAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-4 rounded-2xl text-center font-medium transition-all duration-500 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-3 shadow-lg"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;