import React, { useState } from 'react';
import { Bell, BellOff, Settings, X, Check } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

interface NotificationSetupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationSetup: React.FC<NotificationSetupProps> = ({ isOpen, onClose }) => {
  const { permission, isSupported, requestPermission } = useNotifications();
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    await requestPermission();
    setIsRequesting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="dark-card rounded-3xl p-8 max-w-md w-full animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-serif font-light text-white">Stay Connected</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {!isSupported ? (
          <div className="text-center py-6">
            <BellOff className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Notifications Not Supported</h3>
            <p className="text-gray-400">
              Your browser doesn't support push notifications. You can still use all of Bloomy's features!
            </p>
          </div>
        ) : permission.granted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Notifications Enabled</h3>
            <p className="text-gray-400 mb-6">
              You'll receive gentle reminders to check in with your emotions and motivational messages to support your wellness journey.
            </p>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Daily wellness check-ins</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Mood tracking reminders</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Motivational messages</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Breathing exercise reminders</span>
              </div>
            </div>
          </div>
        ) : permission.denied ? (
          <div className="text-center py-6">
            <BellOff className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Notifications Blocked</h3>
            <p className="text-gray-400 mb-6">
              Notifications are currently blocked. To enable them, please:
            </p>
            
            <div className="text-left space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">1</span>
                Click the lock icon in your browser's address bar
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">2</span>
                Change notifications to "Allow"
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">3</span>
                Refresh the page
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Enable Gentle Reminders</h3>
            <p className="text-gray-400 mb-6">
              Get thoughtful notifications to support your wellness journey. We'll send you:
            </p>
            
            <div className="space-y-3 text-left mb-8">
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Daily check-in reminders (9 AM)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Mood tracking prompts</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Uplifting motivational messages</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Breathing exercise reminders</span>
              </div>
            </div>

            <button
              onClick={handleRequestPermission}
              disabled={isRequesting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-2xl font-medium transition-all duration-300 btn-interactive disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isRequesting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Requesting...
                </>
              ) : (
                <>
                  <Bell className="h-5 w-5" />
                  Enable Notifications
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-800/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Privacy Note</span>
          </div>
          <p className="text-xs text-gray-400">
            Notifications are sent locally from your device. We never store or track your notification preferences on our servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetup;