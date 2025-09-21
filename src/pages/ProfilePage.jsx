import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Edit, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { requestPasswordReset } from '../services/authService';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [linkSentMessage, setLinkSentMessage] = useState('');

  if (!user) {
    return null; // Or a loading spinner
  }

  const handlePasswordReset = async () => {
    if (isSendingLink) return;

    setIsSendingLink(true);
    setLinkSentMessage('');
    try {
      await requestPasswordReset(user.email);
      setLinkSentMessage('Password reset link sent to your email.');
      setTimeout(() => setLinkSentMessage(''), 5000); // Clear message after 5 seconds
    } catch (error) {
      setLinkSentMessage('Failed to send reset link. Please try again.');
       setTimeout(() => setLinkSentMessage(''), 5000);
    } finally {
      setIsSendingLink(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">My Profile</h1>
        <p className="text-slate-400 mt-1">Manage your personal information and account settings.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-md rounded-lg border border-slate-700 p-8 max-w-2xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute -bottom-1 -right-1 bg-slate-700 p-2 rounded-full border-2 border-slate-800 hover:bg-slate-600"
            >
              <Edit className="h-4 w-4 text-slate-300" />
            </motion.button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-3xl font-bold text-slate-100">{user.name}</h2>
            <p className="text-slate-400 mt-1">{user.email}</p>
            <div className="mt-4 flex items-center justify-center sm:justify-start space-x-2">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-300">
                Administrator
              </span>
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">
                Active User
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 my-8"></div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-200">Account Details</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-slate-500 mr-4" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Full Name</p>
                <p className="text-slate-200">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-slate-500 mr-4" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Email Address</p>
                <p className="text-slate-200">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-slate-500 mr-4" />
              <div className="flex-1">
                <p className="text-sm text-slate-400">Password</p>
                <p className="text-slate-200">••••••••••••</p>
              </div>
              <button
                onClick={handlePasswordReset}
                disabled={isSendingLink}
                className="text-sm font-medium text-blue-400 hover:text-blue-300 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSendingLink ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Change Password</span>
                  </>
                )}
              </button>
            </div>
            <AnimatePresence>
              {linkSentMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-end"
                >
                  <p className="text-xs text-green-400 flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{linkSentMessage}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
