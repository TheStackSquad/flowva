// src/common/layout/header.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Check, Trash2, MoreHorizontal, Menu } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../../common/modal/modal';
import { navLinks } from '../../components/layout/sidebar';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Get the current page title based on the URL path
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    
    // Special case for home page
    if (currentPath === '/') {
      return 'Home';
    }
    
    // Find matching navigation item
    const currentNavItem = navLinks.find(link => link.path === currentPath);
    
    // Return the nav item name or default title
    return currentNavItem?.name || 'Rewards Hub';
  };

  // Get the current page description based on the URL path
  const getCurrentPageDescription = () => {
    const currentPath = location.pathname;
    
    // You can customize descriptions for each page
    const descriptions = {
      '/': 'Welcome to your personalized dashboard',
      '/discover': 'Explore new features and opportunities',
      '/library': 'Access your saved resources and tools',
      '/techstack': 'Manage your technology preferences',
      '/subscriptions': 'Track and manage your subscriptions',
      '/dashboard': 'Earn points, unlock rewards, and celebrate progress!',
      '/settings': 'Customize your account preferences',
    };
    
    return descriptions[currentPath] || 'Manage your account and preferences';
  };

  const currentTitle = getCurrentPageTitle();
  const currentDescription = getCurrentPageDescription();

  // Fetch and Subscribe to Notifications
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setNotifications(data || []);
    };

    fetchNotifications();

    const channel = supabase.channel(`notifications:${user.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, 
      () => fetchNotifications())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100
    flex justify-between items-start pt-4 pb-4 pl-4 pr-6 md:px-6">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - only visible on mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-700"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            {currentTitle}
          </h1>
          <p className="text-gray-500 mt-1 text-sm hidden sm:block">
            {currentDescription}
          </p>
        </div>
      </div>
      
      <div className="relative mt-1 rounded-full bg-gray-200">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className={`px-3 rounded-full transition-all relative ${showDropdown ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-yellow-400 text-gray-900
            text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {showDropdown && (
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2">
            <div className="bg-purple-700 p-4 flex justify-between items-center text-white">
              <span className="font-bold">Notifications</span>
              <div className="flex gap-3 text-[10px] font-bold">
                <button className="hover:underline opacity-80 uppercase tracking-tighter">Mark all as read</button>
                <button className="hover:underline opacity-80 uppercase tracking-tighter">Delete All</button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.map(notif => (
                <div 
                  key={notif.id}
                  onClick={() => setSelectedNotification(notif)}
                  className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors flex items-start gap-3"
                >
                  <div className="p-2 bg-green-50 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-xs text-gray-900 truncate w-40">{notif.title}</h4>
                      <MoreHorizontal className="h-4 w-4 text-gray-300" />
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">{notif.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[9px] text-gray-400 uppercase font-bold">1d ago</span>
                      <button className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-[9px] font-bold text-gray-600 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Welcome Modal */}
      <Modal 
        isOpen={!!selectedNotification} 
        onClose={() => setSelectedNotification(null)}
        title={selectedNotification?.title}
      >
        <p className="text-gray-600 text-lg">
          {selectedNotification?.message}
        </p>
        <p className="mt-4 font-medium text-purple-600">
          Your journey to smarter productivity starts here.
        </p>
      </Modal>
    </header>
  );
};

export default Header;