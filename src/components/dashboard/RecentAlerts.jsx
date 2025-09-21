import React from 'react';
import { Bell, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const RecentAlerts = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Recent Alerts</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
          Configure Alerts
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
          <Bell className="h-8 w-8 text-slate-500" />
        </div>
        <h4 className="text-lg font-medium text-slate-100 mb-2">No Alerts Yet</h4>
        <p className="text-slate-400 text-center mb-6 max-w-sm">
          Configure alert rules to start monitoring data duplications across your databases.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Alert Rule</span>
        </motion.button>
      </div>
    </div>
  );
};

export default RecentAlerts;
