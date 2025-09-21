import React, { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const AlertConfiguration = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mb-6">
          <Settings className="h-10 w-10 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-100 mb-4">No Alert Rules Configured</h3>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Create alert rules to monitor data duplications and receive notifications when thresholds are exceeded.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Your First Alert Rule</span>
        </motion.button>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h4 className="text-lg font-medium text-blue-300 mb-2">Getting Started with Alerts</h4>
        <ul className="text-sm text-blue-400 space-y-2">
          <li>• Set duplication thresholds for your databases</li>
          <li>• Choose notification methods (email, push, system logs)</li>
          <li>• Configure severity levels for different scenarios</li>
          <li>• Enable or disable rules as needed</li>
        </ul>
      </div>
    </div>
  );
};

export default AlertConfiguration;
