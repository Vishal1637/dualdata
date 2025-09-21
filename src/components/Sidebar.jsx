import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Bell, 
  Settings, 
  FileText, 
  Database,
  AlertTriangle,
  History
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { id: 'alerts', label: 'Alert Management', icon: Bell, path: '/alerts' },
    { id: 'history', label: 'Data History', icon: History, path: '/history' },
    { id: 'logs', label: 'System Logs', icon: FileText, path: '/logs' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <motion.aside 
      className={`fixed left-0 top-0 h-full bg-slate-800/50 backdrop-blur-lg border-r border-slate-700 z-30 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
    >
      <div className="p-6 border-b border-slate-700 h-[73px] flex items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-lg font-bold text-slate-100">DataGuard</h1>
              <p className="text-xs text-slate-400">Duplication Monitor</p>
            </motion.div>
          )}
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-6 py-3 text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400 border-r-2 border-blue-400' 
                    : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  {isOpen && (
                    <motion.span 
                      className="ml-3 font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {isOpen && (
        <motion.div 
          className="absolute bottom-6 left-6 right-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-blue-300 text-sm">System Status</span>
            </div>
            <p className="text-xs text-blue-400">
              Ready to monitor data duplications
            </p>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
