import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Camera, Edit3, Save, X, Settings, Users, Heart, Calendar, Sparkles, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, updateProfile, logout, friends, friendRequests } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  const handleSave = async () => {
    const success = await updateProfile(editData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8 pt-16">
          <h1 className="text-4xl font-serif font-light text-white mb-2">Your Profile</h1>
          <p className="text-gray-400 text-lg">Manage your wellness journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="dark-card rounded-3xl p-8">
              {/* Profile Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                    ) : (
                      user.displayName.charAt(0).toUpperCase()
                    )}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 rounded-full p-2 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-900"></div>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData.displayName}
                        onChange={(e) => setEditData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full dark-input p-3 rounded-xl text-xl font-bold"
                        placeholder="Display name"
                      />
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full dark-input p-3 rounded-xl resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-1">{user.displayName}</h2>
                      <p className="text-purple-400 mb-2">@{user.username}</p>
                      <p className="text-gray-300 leading-relaxed">{user.bio || 'No bio yet'}</p>
                    </>
                  )}
                </div>

                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-xl transition-all duration-300 btn-interactive"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditData({
                            displayName: user.displayName,
                            bio: user.bio || '',
                            avatar: user.avatar || ''
                          });
                        }}
                        className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-colors"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">{friends.length}</div>
                  <div className="text-sm text-gray-400">Friends</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">42</div>
                  <div className="text-sm text-gray-400">Check-ins</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">15</div>
                  <div className="text-sm text-gray-400">Days Active</div>
                </div>
              </div>

              {/* Account Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <div className="text-white font-medium">Email</div>
                    <div className="text-gray-400">{user.email}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <div className="text-white font-medium">Member since</div>
                    <div className="text-gray-400">{formatDate(user.joinedAt)}</div>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div>
                    <div className="text-white font-medium">Last seen</div>
                    <div className="text-gray-400">{getTimeAgo(user.lastSeen)}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="dark-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/friends')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors text-left"
                >
                  <Users className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Manage Friends</div>
                    <div className="text-sm text-gray-400">{friendRequests.length} pending requests</div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors text-left"
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">Settings</div>
                    <div className="text-sm text-gray-400">Privacy & preferences</div>
                  </div>
                </button>

                <button
                  onClick={() => navigate('/emotion-tracker')}
                  className="w-full flex items-center gap-3 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl transition-colors text-left"
                >
                  <Heart className="h-5 w-5 text-pink-400" />
                  <div>
                    <div className="text-white font-medium">Check-in</div>
                    <div className="text-sm text-gray-400">Track your emotions</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Friends */}
            <div className="dark-card rounded-3xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Friends</h3>
              
              {friends.length === 0 ? (
                <div className="text-center py-6">
                  <Users className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm">No friends yet</p>
                  <button
                    onClick={() => navigate('/friends')}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-2 transition-colors"
                  >
                    Find friends
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {friends.slice(0, 3).map((friend) => (
                    <div key={friend.id} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
                          {friend.user.avatar ? (
                            <img src={friend.user.avatar} alt={friend.user.displayName} className="w-full h-full object-cover" />
                          ) : (
                            friend.user.displayName.charAt(0).toUpperCase()
                          )}
                        </div>
                        {friend.user.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{friend.user.displayName}</div>
                        <div className="text-xs text-gray-400">@{friend.user.username}</div>
                      </div>
                    </div>
                  ))}
                  
                  {friends.length > 3 && (
                    <button
                      onClick={() => navigate('/friends')}
                      className="w-full text-center text-purple-400 hover:text-purple-300 text-sm font-medium py-2 transition-colors"
                    >
                      View all {friends.length} friends
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full dark-card rounded-3xl p-6 flex items-center justify-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;