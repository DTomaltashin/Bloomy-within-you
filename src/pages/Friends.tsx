import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, UserPlus, Check, X, Users, Heart, MessageCircle, Calendar, Sparkles } from 'lucide-react';

const Friends: React.FC = () => {
  const { 
    friends, 
    friendRequests, 
    sendFriendRequest, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    removeFriend,
    searchUsers,
    isLoading 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'search'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    
    setSearchLoading(true);
    const results = await searchUsers(query);
    setSearchResults(results);
    setSearchLoading(false);
  };

  const handleSendRequest = async (username: string) => {
    const success = await sendFriendRequest(username);
    if (success) {
      // Remove from search results
      setSearchResults(prev => prev.filter(user => user.username !== username));
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-10 w-10 text-purple-400" />
            <h1 className="text-4xl font-serif font-light text-white">Friends & Connections</h1>
          </div>
          <p className="text-gray-400 text-lg">Build meaningful connections on your wellness journey</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="dark-card rounded-2xl p-2 flex gap-2">
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'friends'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Users className="h-4 w-4" />
              Friends ({friends.length})
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'requests'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Heart className="h-4 w-4" />
              Requests ({friendRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'search'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Search className="h-4 w-4" />
              Find Friends
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="dark-card rounded-3xl p-8">
          {activeTab === 'friends' && (
            <div>
              <h2 className="text-2xl font-serif font-light text-white mb-6 flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-400" />
                Your Friends
              </h2>
              
              {friends.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No friends yet</h3>
                  <p className="text-gray-400 mb-6">Start building your support network by connecting with others</p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 btn-interactive"
                  >
                    Find Friends
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {friends.map((friend) => (
                    <div key={friend.id} className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-700/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white overflow-hidden">
                            {friend.user.avatar ? (
                              <img src={friend.user.avatar} alt={friend.user.displayName} className="w-full h-full object-cover" />
                            ) : (
                              friend.user.displayName.charAt(0).toUpperCase()
                            )}
                          </div>
                          {friend.user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-gray-800"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{friend.user.displayName}</h3>
                          <p className="text-purple-400 text-sm mb-2">@{friend.user.username}</p>
                          {friend.user.bio && (
                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{friend.user.bio}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Connected {formatDate(friend.connectedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {friend.sharedEmotions || 0} shared
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFriend(friend.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-xl transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'requests' && (
            <div>
              <h2 className="text-2xl font-serif font-light text-white mb-6 flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-400" />
                Friend Requests
              </h2>
              
              {friendRequests.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No pending requests</h3>
                  <p className="text-gray-400">When someone sends you a friend request, it will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="bg-gray-800/50 rounded-2xl p-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white overflow-hidden">
                        {request.user.avatar ? (
                          <img src={request.user.avatar} alt={request.user.displayName} className="w-full h-full object-cover" />
                        ) : (
                          request.user.displayName.charAt(0).toUpperCase()
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{request.user.displayName}</h3>
                        <p className="text-purple-400 text-sm mb-1">@{request.user.username}</p>
                        {request.user.bio && (
                          <p className="text-gray-400 text-sm">{request.user.bio}</p>
                        )}
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => acceptFriendRequest(request.id)}
                          disabled={isLoading}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => rejectFriendRequest(request.id)}
                          disabled={isLoading}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <h2 className="text-2xl font-serif font-light text-white mb-6 flex items-center gap-3">
                <Search className="h-6 w-6 text-blue-400" />
                Find Friends
              </h2>
              
              {/* Search Input */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by username or display name..."
                  className="w-full dark-input pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              
              {/* Search Results */}
              {searchLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Searching...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((user) => (
                    <div key={user.id} className="bg-gray-800/50 rounded-2xl p-6 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold text-white overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.displayName} className="w-full h-full object-cover" />
                        ) : (
                          user.displayName.charAt(0).toUpperCase()
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{user.displayName}</h3>
                        <p className="text-purple-400 text-sm mb-1">@{user.username}</p>
                        {user.bio && (
                          <p className="text-gray-400 text-sm">{user.bio}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          Joined {formatDate(user.joinedAt)}
                          {user.isOnline && (
                            <>
                              <span>•</span>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>Online</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleSendRequest(user.username)}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300 btn-interactive disabled:opacity-50 flex items-center gap-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        Add Friend
                      </button>
                    </div>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">No users found</h3>
                  <p className="text-gray-400">Try searching with a different username or display name</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <UserPlus className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">Find your wellness community</h3>
                  <p className="text-gray-400">Search for friends by their username or display name</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;