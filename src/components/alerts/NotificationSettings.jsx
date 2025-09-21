import React, { useState } from 'react';
import { Mail, Smartphone, FileText, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      address: 'admin@company.com',
      frequency: 'immediate',
    },
    push: {
      enabled: true,
      device: 'All devices',
      sound: 'default',
    },
    systemLog: {
      enabled: true,
      level: 'warning',
      retention: '30',
    },
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateSetting = (type, key, value) => {
    setSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value,
      },
    }));
  };

  const notificationTypes = [
    {
      id: 'email',
      title: 'Email Notifications',
      description: 'Receive alerts via email',
      icon: Mail,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'push',
      title: 'Push Notifications',
      description: 'Mobile and desktop push notifications',
      icon: Smartphone,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      id: 'systemLog',
      title: 'System Logs',
      description: 'Log alerts to system files',
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {notificationTypes.map((type) => {
        const Icon = type.icon;
        const typeSetting = settings[type.id];
        
        return (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-700 rounded-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${type.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${type.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-100">{type.title}</h3>
                <p className="text-sm text-slate-400">{type.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={typeSetting.enabled}
                  onChange={(e) => updateSetting(type.id, 'enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {typeSetting.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pl-12"
              >
                {type.id === 'email' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={typeSetting.address}
                        onChange={(e) => updateSetting('email', 'address', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Frequency
                      </label>
                      <select
                        value={typeSetting.frequency}
                        onChange={(e) => updateSetting('email', 'frequency', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="hourly">Hourly Digest</option>
                        <option value="daily">Daily Digest</option>
                      </select>
                    </div>
                  </>
                )}

                {type.id === 'push' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Target Device
                      </label>
                      <select
                        value={typeSetting.device}
                        onChange={(e) => updateSetting('push', 'device', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                      >
                        <option value="All devices">All devices</option>
                        <option value="Mobile only">Mobile only</option>
                        <option value="Desktop only">Desktop only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Sound
                      </label>
                      <select
                        value={typeSetting.sound}
                        onChange={(e) => updateSetting('push', 'sound', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                      >
                        <option value="default">Default</option>
                        <option value="alert">Alert</option>
                        <option value="critical">Critical</option>
                        <option value="silent">Silent</option>
                      </select>
                    </div>
                  </>
                )}

                {type.id === 'systemLog' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Log Level
                      </label>
                      <select
                        value={typeSetting.level}
                        onChange={(e) => updateSetting('systemLog', 'level', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                      >
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">
                        Retention (days)
                      </label>
                      <input
                        type="number"
                        value={typeSetting.retention}
                        onChange={(e) => updateSetting('systemLog', 'retention', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                        min="1"
                        max="365"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      })}

      <motion.button
        onClick={handleSave}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
          isSaved 
            ? 'bg-green-600 text-white' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Save className="h-4 w-4" />
        <span>{isSaved ? 'Settings Saved!' : 'Save Settings'}</span>
      </motion.button>
    </div>
  );
};

export default NotificationSettings;
