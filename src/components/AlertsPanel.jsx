import React, { useState } from 'react';
import { Plus, Mail, Smartphone, FileText, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import AlertConfiguration from './alerts/AlertConfiguration';
import NotificationSettings from './alerts/NotificationSettings';

const AlertsPanel = () => {
  const [activeTab, setActiveTab] = useState('configuration');

  const tabs = [
    { id: 'configuration', label: 'Alert Configuration', icon: Settings },
    { id: 'notifications', label: 'Notification Settings', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Alert Management</h1>
          <p className="text-slate-400 mt-1">Configure and manage your data duplication alerts</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Alert Rule</span>
        </motion.button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700">
        <div className="border-b border-slate-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'configuration' && <AlertConfiguration />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
