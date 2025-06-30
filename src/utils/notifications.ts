export interface NotificationPermission {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

export class NotificationService {
  private static instance: NotificationService;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) {
      console.warn('Service Worker or Notifications not supported');
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.ready;
      return true;
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      return false;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return { granted: false, denied: true, default: false };
    }

    let permission = Notification.permission;

    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    return {
      granted: permission === 'granted',
      denied: permission === 'denied',
      default: permission === 'default'
    };
  }

  getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return { granted: false, denied: true, default: false };
    }

    const permission = Notification.permission;
    return {
      granted: permission === 'granted',
      denied: permission === 'denied',
      default: permission === 'default'
    };
  }

  async showNotification(title: string, options: NotificationOptions = {}): Promise<boolean> {
    const permission = this.getPermissionStatus();
    
    if (!permission.granted) {
      console.warn('Notification permission not granted');
      return false;
    }

    try {
      if (this.registration) {
        await this.registration.showNotification(title, {
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-72x72.png',
          vibrate: [200, 100, 200],
          ...options
        });
      } else {
        new Notification(title, {
          icon: '/icons/icon-192x192.png',
          ...options
        });
      }
      return true;
    } catch (error) {
      console.error('Failed to show notification:', error);
      return false;
    }
  }

  // Wellness check-in notifications
  async scheduleWellnessReminders(): Promise<void> {
    const permission = this.getPermissionStatus();
    if (!permission.granted) return;

    // Schedule daily check-in reminder
    this.scheduleDailyReminder();
    
    // Schedule mood tracking reminders
    this.scheduleMoodReminders();
  }

  private scheduleDailyReminder(): void {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(9, 0, 0, 0); // 9 AM

    // If it's already past 9 AM today, schedule for tomorrow
    if (now > reminderTime) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      this.showNotification('Good morning! 🌸', {
        body: 'How are you feeling today? Take a moment to check in with yourself.',
        tag: 'daily-checkin',
        actions: [
          {
            action: 'checkin',
            title: 'Check-in Now'
          },
          {
            action: 'later',
            title: 'Remind Later'
          }
        ]
      });

      // Schedule the next day's reminder
      this.scheduleDailyReminder();
    }, timeUntilReminder);
  }

  private scheduleMoodReminders(): void {
    // Schedule reminders every 4 hours during waking hours (8 AM - 8 PM)
    const reminderTimes = [12, 16, 20]; // 12 PM, 4 PM, 8 PM

    reminderTimes.forEach(hour => {
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(hour, 0, 0, 0);

      // If it's already past this time today, schedule for tomorrow
      if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      const timeUntilReminder = reminderTime.getTime() - now.getTime();

      setTimeout(() => {
        this.showMoodReminder();
        
        // Schedule the next day's reminder
        setInterval(() => {
          this.showMoodReminder();
        }, 24 * 60 * 60 * 1000); // Every 24 hours
      }, timeUntilReminder);
    });
  }

  private async showMoodReminder(): Promise<void> {
    const messages = [
      'How are you feeling right now? 💙',
      'Take a moment to check in with your emotions 🌱',
      'Your feelings matter - how are you doing today? ✨',
      'Time for a gentle emotional check-in 🌸',
      'How is your heart feeling today? 💜',
      'What emotions are present for you right now? 🌊'
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    await this.showNotification('Bloomy Check-in', {
      body: randomMessage,
      tag: 'mood-reminder',
      actions: [
        {
          action: 'track-mood',
          title: 'Track Mood'
        },
        {
          action: 'chat',
          title: 'Chat with Bloomy'
        }
      ]
    });
  }

  // Motivational notifications
  async showMotivationalNotification(): Promise<void> {
    const quotes = [
      {
        text: 'You are stronger than you know 💪',
        body: 'Every challenge you face is an opportunity to grow and discover your inner strength.'
      },
      {
        text: 'Progress, not perfection ✨',
        body: 'Small steps forward are still progress. Be gentle with yourself today.'
      },
      {
        text: 'You matter 💜',
        body: 'Your feelings are valid, your experiences matter, and you deserve compassion.'
      },
      {
        text: 'This too shall pass 🌅',
        body: 'Difficult emotions are temporary. You have the strength to get through this.'
      },
      {
        text: 'Be kind to yourself 🌸',
        body: 'Treat yourself with the same compassion you would show a dear friend.'
      }
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    await this.showNotification(randomQuote.text, {
      body: randomQuote.body,
      tag: 'motivation',
      actions: [
        {
          action: 'reflect',
          title: 'Reflect'
        },
        {
          action: 'journal',
          title: 'Journal'
        }
      ]
    });
  }

  // Breathing exercise reminders
  async showBreathingReminder(): Promise<void> {
    await this.showNotification('Take a Deep Breath 🌬️', {
      body: 'Feeling stressed? Try a quick breathing exercise to center yourself.',
      tag: 'breathing',
      actions: [
        {
          action: 'breathe',
          title: 'Start Breathing'
        },
        {
          action: 'resources',
          title: 'View Resources'
        }
      ]
    });
  }

  // Friend activity notifications
  async showFriendNotification(friendName: string, activity: string): Promise<void> {
    await this.showNotification(`${friendName} shared an update`, {
      body: `${friendName} ${activity}. Send them some support! 💙`,
      tag: 'friend-activity',
      actions: [
        {
          action: 'view-friend',
          title: 'View Update'
        },
        {
          action: 'send-support',
          title: 'Send Support'
        }
      ]
    });
  }

  // Achievement notifications
  async showAchievementNotification(achievement: string): Promise<void> {
    await this.showNotification('Achievement Unlocked! 🏆', {
      body: achievement,
      tag: 'achievement',
      actions: [
        {
          action: 'view-achievements',
          title: 'View All'
        },
        {
          action: 'share',
          title: 'Share'
        }
      ]
    });
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();

// Notification action handlers
export const handleNotificationAction = (action: string, data?: any) => {
  switch (action) {
    case 'checkin':
    case 'track-mood':
      window.location.href = '/emotion-tracker';
      break;
    case 'chat':
      window.location.href = '/chat';
      break;
    case 'breathe':
    case 'resources':
      window.location.href = '/resources';
      break;
    case 'journal':
      window.location.href = '/mood-tracker';
      break;
    case 'view-friend':
      window.location.href = '/friends';
      break;
    case 'view-achievements':
      window.location.href = '/profile';
      break;
    default:
      window.location.href = '/';
  }
};