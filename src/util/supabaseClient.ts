import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './supabaseTypes';

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
