import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const LogsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">System Logs</h1>
          <p className="text-slate-400 mt-1">Monitor system events and data duplication alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export Logs</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-slate-600 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </motion.button>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search logs by message or source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
              >
                <option value="all">All Levels</option>
                <option value="INFO">Info</option>
                <option value="WARNING">Warning</option>
                <option value="ERROR">Error</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-slate-100 mb-2">No System Logs</h3>
          <p className="text-slate-400 max-w-sm mx-auto">
            System logs will appear here once you start monitoring databases and configuring alerts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogsPanel;
