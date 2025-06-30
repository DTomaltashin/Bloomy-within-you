import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Flower, Menu, X, Heart, Calendar, Brain, User, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Flower className="h-8 w-8 text-white group-hover:text-purple-200 transition-colors duration-300 animate-float" />
            <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-purple-200/30 transition-all duration-300"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">Bloomy</span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <NavLink 
                to="/chat" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Heart className="h-4 w-4" />
                Chat
              </NavLink>
              
              <NavLink 
                to="/emotion-tracker" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Brain className="h-4 w-4" />
                Check-ins
              </NavLink>
              
              <NavLink 
                to="/mood-tracker" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </NavLink>
              
              <NavLink 
                to="/friends" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Users className="h-4 w-4" />
                Friends
              </NavLink>
              
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Resources
              </NavLink>

              {/* User Profile Button */}
              <button
                onClick={handleAuthClick}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive text-white/80 hover:text-white hover:bg-white/10 ml-2"
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
                <span className="hidden lg:inline">{user?.displayName || 'Profile'}</span>
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive ${
                    isActive 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                Resources
              </NavLink>

              <button
                onClick={handleAuthClick}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 btn-interactive bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center gap-2"
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
          className="md:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 animate-fadeInUp">
          <div className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <NavLink 
                  to="/chat" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Heart className="h-4 w-4" />
                  Chat
                </NavLink>
                
                <NavLink 
                  to="/emotion-tracker" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Brain className="h-4 w-4" />
                  Check-ins
                </NavLink>
                
                <NavLink 
                  to="/mood-tracker" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Calendar className="h-4 w-4" />
                  Calendar
                </NavLink>
                
                <NavLink 
                  to="/friends" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <Users className="h-4 w-4" />
                  Friends
                </NavLink>
                
                <NavLink 
                  to="/resources" 
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => 
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
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
                  className="px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 flex items-center justify-center gap-2 text-white/80 hover:text-white hover:bg-white/10"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.displayName} 
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                      {user?.displayName?.charAt(0).toUpperCase() || <User className="h-3 w-3" />}
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
                    `px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
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
                  className="px-4 py-3 rounded-xl text-center font-medium transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;