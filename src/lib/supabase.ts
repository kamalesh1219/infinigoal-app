import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://batgrmzpshvlvajjnzmh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdGdybXpwc2h2bHZhampuem1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NjU4NzcsImV4cCI6MjA4MDE0MTg3N30.HP5XjGYJ7NUyctbj5Mfb2NysTjfw5zplZ5liEqSk9w0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{
    auth: {
    storage: AsyncStorage,          // ⭐ stores session safely
    autoRefreshToken: true,         // ⭐ refreshes token automatically
    persistSession: true,           // ⭐ SAVES session across reloads
    detectSessionInUrl: false,      // ⭐ required for React Native
  },
});
