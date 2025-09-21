import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { isSupabaseConfigured } from '../supabaseClient';
import { Database, Mail, Lock, LogIn, CheckCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.signupSuccess) {
      setSuccess('Account created successfully! Please log in.');
      // Clear the state so the message doesn't reappear on navigation
      window.history.replaceState({}, document.title)
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please set up your Supabase credentials.');
      return;
    }
    
    setLoading(true);
    try {
      await login(email, password);
      // Navigation is handled inside the login function on success
    } catch (err) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-100">Setup Required</h1>
              <p className="text-slate-400 mt-2">Supabase configuration is missing.</p>
            </div>

            <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 text-sm p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Configuration Steps:</h3>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">supabase.com</a></li>
                <li>Go to Settings → API in your Supabase dashboard</li>
                <li>Copy your Project URL and anon public key</li>
                <li>Update the .env file with your credentials</li>
                <li>Restart the development server</li>
              </ol>
            </div>

            <div className="bg-slate-700/50 p-4 rounded-lg">
              <p className="text-xs text-slate-400 mb-2">Required .env variables:</p>
              <code className="text-xs text-slate-300 block">
                VITE_SUPABASE_URL=https://your-project.supabase.co<br/>
                VITE_SUPABASE_ANON_KEY=your-anon-key
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
              <Database className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-100">Welcome Back</h1>
            <p className="text-slate-400 mt-2">Log in to your DataGuard account.</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-300 text-sm p-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-sm p-3 rounded-lg mb-6 text-center flex items-center justify-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>{success}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogIn className="h-5 w-5" />
              )}
              <span>{loading ? 'Logging In...' : 'Log In'}</span>
            </motion.button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300 transition">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;