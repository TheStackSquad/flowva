// src/common/layout/header.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, MoreHorizontal, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../../common/modal/modal';

const Header = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 flex justify-between items-start pt-4 pb-4 px-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rewards Hub</h1>
        <p className="text-gray-500 mt-1">Earn points, unlock rewards, and celebrate progress!</p>
      </div>
      
      <div className="relative mt-1">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className={`p-3 rounded-full transition-all relative ${showDropdown ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
        >
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-yellow-400 text-gray-900 text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* 1st Layer: Notification Dropdown */}
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

      {/* 2nd Layer: Welcome Modal */}
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