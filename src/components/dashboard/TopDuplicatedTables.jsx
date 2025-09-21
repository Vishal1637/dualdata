import React from 'react';
import { Table, Database } from 'lucide-react';

const TopDuplicatedTables = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Top Duplicated Tables</h3>
        <Table className="h-5 w-5 text-slate-500" />
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
          <Database className="h-8 w-8 text-slate-500" />
        </div>
        <h4 className="text-lg font-medium text-slate-100 mb-2">No Tables Monitored</h4>
        <p className="text-slate-400 text-center max-w-sm">
          Connect your databases to start monitoring table duplications and see detailed analytics.
        </p>
      </div>
    </div>
  );
};

export default TopDuplicatedTables;
