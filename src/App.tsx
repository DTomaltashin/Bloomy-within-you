import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import EnhancedNavbar from './components/EnhancedNavbar';
import ParticleBackground from './components/ParticleBackground';
import ProtectedRoute from './components/ProtectedRoute';
import InstallPrompt from './components/InstallPrompt';
import PWAUpdater from './components/PWAUpdater';
import NotificationSetup from './components/NotificationSetup';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import EmotionTracker from './pages/EmotionTracker';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import { MoodProvider } from './context/MoodContext';
import { EmotionProvider } from './context/EmotionContext';
import { AuthProvider } from './context/AuthContext';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [showNotificationSetup, setShowNotificationSetup] = useState(false);
  const { permission, isSupported } = useNotifications();

  // Show notification setup after user is authenticated and hasn't granted permission
  useEffect(() => {
    const hasSeenNotificationPrompt = localStorage.getItem('hasSeenNotificationPrompt');
    
    if (isSupported && !permission.granted && !permission.denied && !hasSeenNotificationPrompt) {
      const timer = setTimeout(() => {
        setShowNotificationSetup(true);
        localStorage.setItem('hasSeenNotificationPrompt', 'true');
      }, 5000); // Show after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isSupported, permission]);

  return (
    <AuthProvider>
      <MoodProvider>
        <EmotionProvider>
          <div className="min-h-screen relative">
            <ParticleBackground />
            {showNavbar && <EnhancedNavbar />}
            <main>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home setShowNavbar={setShowNavbar} />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/chat" element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  } />
                  <Route path="/mood-tracker" element={
                    <ProtectedRoute>
                      <MoodTracker />
                    </ProtectedRoute>
                  } />
                  <Route path="/emotion-tracker" element={
                    <ProtectedRoute>
                      <EmotionTracker />
                    </ProtectedRoute>
                  } />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/friends" element={
                    <ProtectedRoute>
                      <Friends />
                    </ProtectedRoute>
                  } />
                </Routes>
              </PageTransition>
            </main>
            
            {/* PWA Components */}
            <InstallPrompt />
            <PWAUpdater />
            <NotificationSetup 
              isOpen={showNotificationSetup} 
              onClose={() => setShowNotificationSetup(false)} 
            />
          </div>
        </EmotionProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;