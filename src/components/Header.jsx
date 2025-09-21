import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search, LogOut, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const Header = ({ setSidebarOpen, sidebarOpen }) => {
  const { user, logout } = useAuth();
  const { notifications, removeNotification, clearNotifications } = useNotification();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 px-6 py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
          >
            <Menu className="h-5 w-5 text-slate-300" />
          </button>
          
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search databases, tables..."
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 text-slate-200 placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="h-5 w-5 text-slate-300" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse">
                  {notifications.length}
                </span>
              )}
            </motion.button>
            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-slate-700 flex justify-between items-center">
                    <h4 className="font-semibold text-slate-100">Notifications</h4>
                    {notifications.length > 0 && (
                      <button onClick={clearNotifications} className="text-xs text-blue-400 hover:text-blue-300">Clear All</button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notif => (
                        <div key={notif.id} className="p-3 border-b border-slate-700/50 flex space-x-3 hover:bg-slate-700/30">
                          <AlertTriangle className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-200">{notif.title}</p>
                            <p className="text-xs text-slate-400">{notif.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{formatTime(notif.timestamp)}</p>
                          </div>
                          <button onClick={() => removeNotification(notif.id)} className="p-1 rounded-full hover:bg-slate-600">
                            <X className="h-3 w-3 text-slate-400" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-400">No new notifications</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-200 hidden sm:block">{user?.name || 'Admin'}</span>
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <div className="p-2">
                    <div className="px-2 py-2">
                      <p className="text-sm font-semibold text-slate-100">{user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <div className="border-t border-slate-700 my-1"></div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700/50 rounded-md transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <div className="border-t border-slate-700 my-1"></div>
                    <button
                      onClick={logout}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
