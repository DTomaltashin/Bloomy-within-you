import { useState, useEffect } from 'react';
import { notificationService, NotificationPermission } from '../utils/notifications';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>({
    granted: false,
    denied: false,
    default: true
  });
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkSupport = async () => {
      const supported = 'Notification' in window && 'serviceWorker' in navigator;
      setIsSupported(supported);
      
      if (supported) {
        const initialized = await notificationService.initialize();
        if (initialized) {
          const currentPermission = notificationService.getPermissionStatus();
          setPermission(currentPermission);
          
          // If permission is granted, schedule wellness reminders
          if (currentPermission.granted) {
            await notificationService.scheduleWellnessReminders();
          }
        }
      }
    };

    checkSupport();
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;
    
    const newPermission = await notificationService.requestPermission();
    setPermission(newPermission);
    
    if (newPermission.granted) {
      await notificationService.scheduleWellnessReminders();
    }
    
    return newPermission.granted;
  };

  const showNotification = async (title: string, options?: NotificationOptions): Promise<boolean> => {
    if (!permission.granted) return false;
    return await notificationService.showNotification(title, options);
  };

  const showWellnessReminder = async (): Promise<boolean> => {
    if (!permission.granted) return false;
    
    const messages = [
      'How are you feeling today? 🌸',
      'Time for a gentle check-in with yourself 💙',
      'Your emotional wellbeing matters ✨',
      'Take a moment to notice how you\'re feeling 🌱'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    return await showNotification('Bloomy Check-in', {
      body: randomMessage,
      tag: 'wellness-reminder'
    });
  };

  const showMotivationalMessage = async (): Promise<boolean> => {
    if (!permission.granted) return false;
    return await notificationService.showMotivationalNotification();
  };

  const showBreathingReminder = async (): Promise<boolean> => {
    if (!permission.granted) return false;
    return await notificationService.showBreathingReminder();
  };

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification,
    showWellnessReminder,
    showMotivationalMessage,
    showBreathingReminder
  };
};