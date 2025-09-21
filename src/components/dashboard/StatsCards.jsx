import React from 'react';
import { Database, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Duplications',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: Database,
      color: 'bg-blue-500',
      description: 'No duplications detected yet',
    },
    {
      title: 'Active Alerts',
      value: '0',
      change: '0%',
      changeType: 'positive',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'No active alerts',
    },
    {
      title: 'Resolved Issues',
      value: '0',
      change: '0%',
      changeType: 'neutral',
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Start monitoring to see resolved issues',
    },
    {
      title: 'System Efficiency',
      value: '100%',
      change: '0%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'bg-purple-500',
      description: 'System operating at optimal efficiency',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-400">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-100 mt-1">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-2">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
