import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const DuplicationChart = () => {
  const emptyData = [
    { day: 'Mon', duplications: 0, resolved: 0 },
    { day: 'Tue', duplications: 0, resolved: 0 },
    { day: 'Wed', duplications: 0, resolved: 0 },
    { day: 'Thu', duplications: 0, resolved: 0 },
    { day: 'Fri', duplications: 0, resolved: 0 },
    { day: 'Sat', duplications: 0, resolved: 0 },
    { day: 'Sun', duplications: 0, resolved: 0 },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-100">Duplication Trends</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-slate-400">Detected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-400">Resolved</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={emptyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8' }}
            className="text-slate-400"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8' }}
            className="text-slate-400"
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#cbd5e1'
            }}
            cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
          />
          <Line 
            type="monotone" 
            dataKey="duplications" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="resolved" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 bg-slate-700/30 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-8 w-8 text-slate-500 mx-auto mb-2" />
          <p className="text-sm text-slate-400">No duplication data available yet</p>
          <p className="text-xs text-slate-500">Start monitoring databases to see trends</p>
        </div>
      </div>
    </div>
  );
};

export default DuplicationChart;
