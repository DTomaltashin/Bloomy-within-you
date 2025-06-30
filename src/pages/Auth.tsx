import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Flower, Mail, Lock, User, Eye, EyeOff, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.username || !formData.displayName) {
        setError('Please fill in all fields');
        return;
      }
      
      const success = await signup(formData.email, formData.password, formData.username, formData.displayName);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('User already exists or invalid data');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="relative">
              <Flower className="h-12 w-12 text-white group-hover:text-purple-200 transition-colors duration-300 animate-float" />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-purple-200/30 transition-all duration-300"></div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Bloomy
            </span>
          </Link>
          <p className="text-gray-400 mt-2">Your compassionate wellness companion</p>
        </div>

        {/* Auth Form */}
        <div className="dark-card rounded-3xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif font-light text-white mb-2">
              {isLogin ? 'Welcome back' : 'Join Bloomy'}
            </h1>
            <p className="text-gray-400">
              {isLogin ? 'Continue your wellness journey' : 'Start your wellness journey today'}
            </p>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500/50 rounded-2xl p-4 mb-6 text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full dark-input pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Username (signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-gray-300 font-medium mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className="w-full dark-input pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Display Name (signup only) */}
            {!isLogin && (
              <div>
                <label htmlFor="displayName" className="block text-gray-300 font-medium mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Your display name"
                    className="w-full dark-input pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full dark-input pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-2xl font-medium transition-all duration-300 btn-interactive disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" />
                  {isLogin ? 'Sign In' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ email: '', password: '', username: '', displayName: '' });
                }}
                className="text-purple-400 hover:text-purple-300 font-medium ml-2 transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          {isLogin && (
            <div className="mt-6 p-4 bg-gray-800/50 rounded-2xl border border-gray-700">
              <p className="text-sm text-gray-400 mb-2">Demo credentials:</p>
              <p className="text-sm text-gray-300">Email: alice@example.com</p>
              <p className="text-sm text-gray-300">Password: password</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;