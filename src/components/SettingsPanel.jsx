import React, { useState } from 'react';
import { Save, Database, Bell, Shield, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    duplicateThreshold: 25,
    scanFrequency: 'hourly',
    autoResolve: false,
    emailAlerts: true,
    pushNotifications: true,
    systemLogs: true,
    retentionPeriod: 90,
    maxConnections: 100,
    timeoutDuration: 30,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const settingSections = [
    {
      title: 'Detection Settings',
      icon: Database,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      settings: [
        {
          key: 'duplicateThreshold',
          label: 'Duplicate Threshold (%)',
          type: 'number',
          min: 1,
          max: 100,
          description: 'Trigger alerts when duplication exceeds this percentage',
        },
        {
          key: 'scanFrequency',
          label: 'Scan Frequency',
          type: 'select',
          options: [
            { value: 'realtime', label: 'Real-time' },
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
          ],
          description: 'How often to scan for duplicates',
        },
        {
          key: 'autoResolve',
          label: 'Auto-resolve Minor Duplicates',
          type: 'boolean',
          description: 'Automatically resolve duplicates below 10% threshold',
        },
      ],
    },
    {
      title: 'Alert Settings',
      icon: Bell,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      settings: [
        {
          key: 'emailAlerts',
          label: 'Email Alerts',
          type: 'boolean',
          description: 'Send notifications via email',
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          type: 'boolean',
          description: 'Send push notifications to mobile devices',
        },
        {
          key: 'systemLogs',
          label: 'System Logging',
          type: 'boolean',
          description: 'Write alerts to system log files',
        },
      ],
    },
    {
      title: 'System Settings',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      settings: [
        {
          key: 'retentionPeriod',
          label: 'Data Retention (days)',
          type: 'number',
          min: 1,
          max: 365,
          description: 'How long to keep historical duplication data',
        },
        {
          key: 'maxConnections',
          label: 'Max Database Connections',
          type: 'number',
          min: 10,
          max: 1000,
          description: 'Maximum concurrent database connections',
        },
        {
          key: 'timeoutDuration',
          label: 'Query Timeout (seconds)',
          type: 'number',
          min: 5,
          max: 300,
          description: 'Maximum time to wait for database queries',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Settings</h1>
          <p className="text-slate-400 mt-1">Configure system behaviour and preferences</p>
        </div>
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all ${
            isSaved 
              ? 'bg-green-600 text-white' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <Save className="h-4 w-4" />
          <span>{isSaved ? 'Settings Saved!' : 'Save Changes'}</span>
        </motion.button>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`${section.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${section.color}`} />
                </div>
                <h2 className="text-lg font-semibold text-slate-100">{section.title}</h2>
              </div>

              <div className="space-y-6 divide-y divide-slate-700/50">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between pt-6 first:pt-0">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-200">
                        {setting.label}
                      </label>
                      <p className="text-sm text-slate-400 mt-1">{setting.description}</p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'boolean' && (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings[setting.key]}
                            onChange={(e) => updateSetting(setting.key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      )}

                      {setting.type === 'number' && (
                        <input
                          type="number"
                          value={settings[setting.key]}
                          onChange={(e) => updateSetting(setting.key, parseInt(e.target.value))}
                          min={setting.min}
                          max={setting.max}
                          className="w-24 px-3 py-1 text-sm bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                        />
                      )}

                      {setting.type === 'select' && (
                        <select
                          value={settings[setting.key]}
                          onChange={(e) => updateSetting(setting.key, e.target.value)}
                          className="px-3 py-1 text-sm bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
                        >
                          {setting.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SettingsPanel;
