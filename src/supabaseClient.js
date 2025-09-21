import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (typeof url !== 'string' || url.trim() === '' || url === 'YOUR_SUPABASE_URL') {
    return false;
  }
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
  } catch (e) {
    return false;
  }
};

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY') {
  const errorMessage = "Invalid or missing Supabase configuration. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in your .env file. The URL must be a valid HTTP or HTTPS address and the key must not be empty.";
  
  // Display a more user-friendly message on the page itself for better visibility
  document.getElementById('root').innerHTML = `
    <div style="font-family: sans-serif; background-color: #111827; color: #f3f4f6; padding: 2rem; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div style="background-color: #1f2937; border: 1px solid #374151; border-radius: 0.5rem; padding: 2rem; max-width: 600px; text-align: center;">
        <h1 style="font-size: 1.5rem; font-weight: bold; color: #ef4444;">Configuration Error</h1>
        <p style="color: #d1d5db; margin-top: 1rem;">${errorMessage}</p>
        <p style="color: #9ca3b9; margin-top: 0.5rem; font-size: 0.875rem;">Please add your Supabase credentials to the <code style="background-color: #374151; padding: 0.2rem 0.4rem; border-radius: 0.25rem;">.env</code> file and refresh the preview.</p>
      </div>
    </div>
  `;
  
  throw new Error(errorMessage);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
