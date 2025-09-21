import React from 'react';
import { Server, Cpu, HardDrive, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const SystemHealth = () => {
  const healthMetrics = [
    {
      name: 'Database Server',
      status: 'healthy',
      value: '99.9%',
      icon: Server,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'CPU Usage',
      status: 'warning',
      value: '78%',
      icon: Cpu,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      name: 'Storage',
      status: 'healthy',
      value: '45%',
      icon: HardDrive,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Network',
      status: 'healthy',
      value: '100%',
      icon: Wifi,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-md rounded-lg p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-slate-100 mb-6">System Health</h3>
      
      <div className="space-y-4">
        {healthMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center space-x-3">
                <div className={`${metric.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
                <span className="text-sm font-medium text-slate-200">{metric.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-slate-200">{metric.value}</span>
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'healthy' ? 'bg-green-500' : 
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h4 className="text-sm font-medium text-blue-300 mb-2">System Performance</h4>
        <p className="text-sm text-blue-400">
          All monitoring systems are operational. Last health check completed 30 seconds ago.
        </p>
      </div>
    </div>
  );
};

export default SystemHealth;
