import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  joinedAt: Date;
  isOnline: boolean;
  lastSeen: Date;
  preferences: {
    shareEmotions: boolean;
    allowFriendRequests: boolean;
    showOnlineStatus: boolean;
  };
}

export interface Friend {
  id: string;
  user: User;
  status: 'pending' | 'accepted' | 'blocked';
  connectedAt: Date;
  sharedEmotions?: number;
}

interface AuthContextType {
  user: User | null;
  friends: Friend[];
  friendRequests: Friend[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string, displayName: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  sendFriendRequest: (username: string) => Promise<boolean>;
  acceptFriendRequest: (friendId: string) => Promise<boolean>;
  rejectFriendRequest: (friendId: string) => Promise<boolean>;
  removeFriend: (friendId: string) => Promise<boolean>;
  searchUsers: (query: string) => Promise<User[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'alice@example.com',
    username: 'alice_bloom',
    displayName: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Finding peace in mindfulness and nature 🌸',
    joinedAt: new Date('2024-01-15'),
    isOnline: true,
    lastSeen: new Date(),
    preferences: {
      shareEmotions: true,
      allowFriendRequests: true,
      showOnlineStatus: true
    }
  },
  {
    id: '2',
    email: 'bob@example.com',
    username: 'bob_zen',
    displayName: 'Bob Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Meditation enthusiast and wellness advocate',
    joinedAt: new Date('2024-02-01'),
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    preferences: {
      shareEmotions: true,
      allowFriendRequests: true,
      showOnlineStatus: true
    }
  },
  {
    id: '3',
    email: 'carol@example.com',
    username: 'carol_mindful',
    displayName: 'Carol Williams',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    bio: 'Journaling my way to better mental health ✨',
    joinedAt: new Date('2024-01-20'),
    isOnline: true,
    lastSeen: new Date(),
    preferences: {
      shareEmotions: false,
      allowFriendRequests: true,
      showOnlineStatus: false
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bloomyUser');
    if (saved) {
      const parsedUser = JSON.parse(saved);
      // Convert date strings back to Date objects
      return {
        ...parsedUser,
        joinedAt: new Date(parsedUser.joinedAt),
        lastSeen: new Date(parsedUser.lastSeen)
      };
    }
    return null;
  });
  
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('bloomyFriends');
    return saved ? JSON.parse(saved).map((f: any) => ({
      ...f,
      connectedAt: new Date(f.connectedAt),
      user: {
        ...f.user,
        joinedAt: new Date(f.user.joinedAt),
        lastSeen: new Date(f.user.lastSeen)
      }
    })) : [];
  });
  
  const [friendRequests, setFriendRequests] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('bloomyFriendRequests');
    return saved ? JSON.parse(saved).map((f: any) => ({
      ...f,
      connectedAt: new Date(f.connectedAt),
      user: {
        ...f.user,
        joinedAt: new Date(f.user.joinedAt),
        lastSeen: new Date(f.user.lastSeen)
      }
    })) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('bloomyUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('bloomyUser');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bloomyFriends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('bloomyFriendRequests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would validate against backend
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password') { // Mock password check
      setUser({
        ...foundUser,
        isOnline: true,
        lastSeen: new Date()
      });
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, password: string, username: string, displayName: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email || u.username === username);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      displayName,
      bio: '',
      joinedAt: new Date(),
      isOnline: true,
      lastSeen: new Date(),
      preferences: {
        shareEmotions: true,
        allowFriendRequests: true,
        showOnlineStatus: true
      }
    };
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setFriends([]);
    setFriendRequests([]);
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(prev => prev ? { ...prev, ...updates } : null);
    setIsLoading(false);
    return true;
  };

  const sendFriendRequest = async (username: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const targetUser = mockUsers.find(u => u.username === username);
    if (!targetUser || targetUser.id === user.id) {
      setIsLoading(false);
      return false;
    }
    
    // Check if already friends or request exists
    const alreadyFriends = friends.some(f => f.user.id === targetUser.id);
    const requestExists = friendRequests.some(f => f.user.id === targetUser.id);
    
    if (alreadyFriends || requestExists) {
      setIsLoading(false);
      return false;
    }
    
    // In a real app, this would send a request to the target user
    // For demo, we'll add a mock pending request
    const newRequest: Friend = {
      id: Date.now().toString(),
      user: targetUser,
      status: 'pending',
      connectedAt: new Date(),
      sharedEmotions: 0
    };
    
    setFriendRequests(prev => [...prev, newRequest]);
    setIsLoading(false);
    return true;
  };

  const acceptFriendRequest = async (friendId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const request = friendRequests.find(f => f.id === friendId);
    if (!request) {
      setIsLoading(false);
      return false;
    }
    
    // Move from requests to friends
    setFriendRequests(prev => prev.filter(f => f.id !== friendId));
    setFriends(prev => [...prev, { ...request, status: 'accepted' }]);
    
    setIsLoading(false);
    return true;
  };

  const rejectFriendRequest = async (friendId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFriendRequests(prev => prev.filter(f => f.id !== friendId));
    
    setIsLoading(false);
    return true;
  };

  const removeFriend = async (friendId: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setFriends(prev => prev.filter(f => f.id !== friendId));
    
    setIsLoading(false);
    return true;
  };

  const searchUsers = async (query: string): Promise<User[]> => {
    if (!query.trim()) return [];
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockUsers.filter(u => 
      u.id !== user?.id && 
      (u.username.toLowerCase().includes(query.toLowerCase()) ||
       u.displayName.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return (
    <AuthContext.Provider value={{
      user,
      friends,
      friendRequests,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      sendFriendRequest,
      acceptFriendRequest,
      rejectFriendRequest,
      removeFriend,
      searchUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};