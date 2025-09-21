import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-transparent text-slate-300 flex flex-col relative z-10">
      <div className="flex flex-1">
        <Sidebar 
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
          
          <main className="flex-1 p-6 overflow-y-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Layout;
