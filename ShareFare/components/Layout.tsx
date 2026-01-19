import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Plus, User as UserIcon, Leaf, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './Button';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, conversations } = useAppContext();

  const totalUnread = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: MessageSquare, label: 'Messages', path: '/messages', badge: totalUnread },
    { icon: Plus, label: 'Add Item', path: '/add', isAction: true },
    { icon: UserIcon, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">ShareFare</h1>
              <p className="text-xs text-gray-500 leading-none">Share food, reduce waste</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer relative" onClick={() => navigate('/messages')}>
               <MessageSquare className="w-5 h-5" />
               {totalUnread > 0 && (
                 <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                   {totalUnread}
                 </span>
               )}
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
               {currentUser?.avatar ? (
                 <img src={currentUser.avatar} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
               ) : (
                 <UserIcon className="w-5 h-5" />
               )}
            </div>
            <Button onClick={() => navigate('/add')} size="sm"><Plus className="w-4 h-4 mr-1"/> Add Item</Button>
            <Button variant="ghost" size="sm" onClick={logout}><LogOut className="w-4 h-4"/></Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {children}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-20">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 p-2 relative ${
              location.pathname === item.path ? 'text-primary-600' : 'text-gray-500'
            }`}
          >
            {item.isAction ? (
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg -mt-6 border-4 border-gray-50">
                <item.icon className="w-6 h-6" />
              </div>
            ) : (
              <>
                <item.icon className="w-6 h-6" />
                {item.badge && item.badge > 0 && (
                   <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                     {item.badge}
                   </span>
                )}
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
