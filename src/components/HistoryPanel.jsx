import React, { useState } from 'react';
import { Search, Download, Upload, Calendar, Database, FileText, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const HistoryPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Sample data to show structure - in real app this would come from API
  const [historyData] = useState([
    {
      id: 1,
      type: 'import',
      source: 'customer_database.csv',
      size: '2.4 MB',
      records: 15000,
      timestamp: new Date('2025-01-20T10:30:00'),
      status: 'completed',
      duplicates: 127,
      destination: 'Customer Database'
    },
    {
      id: 2,
      type: 'export',
      source: 'Product Database',
      size: '5.8 MB',
      records: 8500,
      timestamp: new Date('2025-01-20T09:15:00'),
      status: 'completed',
      duplicates: 0,
      destination: 'product_export.xlsx'
    },
    {
      id: 3,
      type: 'import',
      source: 'inventory_data.json',
      size: '1.2 MB',
      records: 3200,
      timestamp: new Date('2025-01-19T16:45:00'),
      status: 'processing',
      duplicates: 45,
      destination: 'Inventory Database'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'processing':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'import' ? Upload : Download;
  };

  const filteredData = historyData.filter(item => {
    const matchesSearch = item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Data Transfer History</h1>
          <p className="text-slate-400 mt-1">Track all data imports, exports, and system transfers</p>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Import Data</span>
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Transfers</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">{historyData.length}</p>
            </div>
            <Database className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Data Processed</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">
                {(historyData.reduce((acc, item) => acc + parseFloat(item.size), 0)).toFixed(1)} MB
              </p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Records Transferred</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">
                {historyData.reduce((acc, item) => acc + item.records, 0).toLocaleString()}
              </p>
            </div>
            <Upload className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Duplicates Found</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">
                {historyData.reduce((acc, item) => acc + item.duplicates, 0)}
              </p>
            </div>
            <Database className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700">
        {/* Filters */}
        <div className="p-6 border-b border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by source or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder:text-slate-400"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
            >
              <option value="all">All Operations</option>
              <option value="import">Imports Only</option>
              <option value="export">Exports Only</option>
            </select>
            
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div className="divide-y divide-slate-700">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const TypeIcon = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'import' ? 'bg-green-500/10' : 'bg-blue-500/10'
                      }`}>
                        <TypeIcon className={`h-5 w-5 ${
                          item.type === 'import' ? 'text-green-400' : 'text-blue-400'
                        }`} />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-slate-200">
                          {item.type === 'import' ? 'Import' : 'Export'}: {item.source}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {item.type === 'import' ? 'to' : 'from'} {item.destination}
                        </p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                          <span>{item.size}</span>
                          <span>{item.records.toLocaleString()} records</span>
                          {item.duplicates > 0 && (
                            <span className="text-orange-400">{item.duplicates} duplicates</span>
                          )}
                          <span>{item.timestamp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-100 mb-2">No Transfer History</h3>
              <p className="text-slate-400 max-w-sm mx-auto">
                {searchTerm || filterType !== 'all' 
                  ? 'No transfers match your current filters.' 
                  : 'Start importing or exporting data to see transfer history here.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;
