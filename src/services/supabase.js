import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zxxqfglxrxfouumjxjps.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4eHFmZ2x4cnhmb3V1bWp4anBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MTAyMTksImV4cCI6MjA3NTM4NjIxOX0.YKN5JarqRfgD_CPR819bvxIRh_psUNUglGNCWnVhwbM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
