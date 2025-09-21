import React, { useEffect } from 'react';
import StatsCards from './dashboard/StatsCards';
import DuplicationChart from './dashboard/DuplicationChart';
import RecentAlerts from './dashboard/RecentAlerts';
import SystemHealth from './dashboard/SystemHealth';
import TopDuplicatedTables from './dashboard/TopDuplicatedTables';
import { useTimeAgo } from '../hooks/useTimeAgo';
import { useNotification } from '../contexts/NotificationContext';

const Dashboard = () => {
  const timeAgo = useTimeAgo();
  const { addNotification, notifications } = useNotification();

  useEffect(() => {
    // Simulate a duplication alert only if no notifications exist
    if (notifications.length === 0) {
      const timer = setTimeout(() => {
        addNotification({ 
          title: 'High Duplication Detected', 
          message: 'Over 85% duplication found in `customer_transactions` table.', 
          type: 'critical' 
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [addNotification, notifications.length]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Data Duplication Dashboard</h1>
          <p className="text-slate-400 mt-1">Monitor and manage data duplications across your systems</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
            System Online
          </span>
          <span className="text-sm text-slate-500">Last updated: {timeAgo}</span>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DuplicationChart />
        <SystemHealth />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlerts />
        <TopDuplicatedTables />
      </div>
    </div>
  );
};

export default Dashboard;
