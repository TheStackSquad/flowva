// src/components/layout/sidebar.jsx
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, Map, BookOpen, Box, CreditCard, Gift, Settings 
} from 'lucide-react';
import { useProfile } from '../../features/profile/hooks/userProfile';

const Sidebar = () => {
  const location = useLocation();
  const { profile, user, loading } = useProfile();

  const navLinks = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Discover', icon: Map, path: '/discover' },
    { name: 'Library', icon: BookOpen, path: '/library' },
    { name: 'Tech Stack', icon: Box, path: '/techstack' },
    { name: 'Subscriptions', icon: CreditCard, path: '/subscriptions' },
    { name: 'Rewards Hub', icon: Gift, path: '/dashboard' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getUserInitials = () => {
    return profile?.username?.substring(0, 2) || user?.email?.substring(0, 2) || 'FL';
  };

  const FlowvaLogo = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-8 w-8 text-purple-600" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label="Flowva Logo"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white flex flex-col shadow-lg border-r border-gray-100">
      <div className="p-6 pb-4 flex items-center">
        <FlowvaLogo />
        <span className="text-xl font-bold ml-2 text-gray-900">Flowva</span>
      </div>

      <nav className="flex-grow pt-4 px-4 space-y-1" aria-label="Main navigation">
        {navLinks.map(({ name, icon: Icon, path }) => (
          <NavLink
            key={name}
            to={path}
            className={({ isActive }) => `
              flex items-center py-3 px-4 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-purple-50 text-purple-700 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-purple-600'
              }
            `}
            aria-current={location.pathname === path ? 'page' : undefined}
          >
            <Icon className="h-5 w-5 mr-3" aria-hidden="true" />
            <span className="font-medium">{name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt={profile?.username || 'User profile'} 
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="text-purple-600 font-bold text-xs uppercase" aria-hidden="true">
                {getUserInitials()}
              </span>
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            {loading ? (
              <div className="space-y-2" aria-label="Loading user information">
                <div className="h-3 w-20 bg-gray-200 animate-pulse rounded" />
                <div className="h-2 w-28 bg-gray-200 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <p className="font-bold text-gray-900 text-sm truncate">
                  {profile?.username || 'User'}
                </p>
                <p className="text-[10px] text-gray-500 truncate font-medium">
                  {user?.email}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;