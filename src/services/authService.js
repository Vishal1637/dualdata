// This service now uses the real Supabase client.
import { supabase, isSupabaseConfigured } from '../supabaseClient';

const checkConfiguration = () => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured. Please set up your Supabase credentials in the .env file.');
  }
};

export const login = async (email, password) => {
  checkConfiguration();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const signup = async (name, email, password) => {
  checkConfiguration();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
  if (error) throw error;
  // Supabase sends a confirmation email. The user is not logged in until they confirm.
  return data.user;
};

export const requestPasswordReset = async (email) => {
  checkConfiguration();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`, // A page you would create for resetting
  });
  if (error) throw error;
  return true;
};

export const logout = async () => {
  checkConfiguration();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const onAuthStateChange = (callback) => {
  if (!isSupabaseConfigured) {
    // Return a mock subscription that immediately calls back with no user
    callback(null);
    return { unsubscribe: () => {} };
  }
  
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    const user = session?.user ? {
      id: session.user.id,
      name: session.user.user_metadata.full_name || session.user.email,
      email: session.user.email,
    } : null;
    callback(user);
  });
  return subscription;
};
