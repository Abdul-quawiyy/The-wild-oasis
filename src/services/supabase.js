import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://vcuykfwgxepocbjwekme.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjdXlrZndneGVwb2Niandla21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODQ3NjEsImV4cCI6MjA3Nzg2MDc2MX0.MAiejkhzyxo1KrSObkx8ds41PHldC-VxzVWSmyHRfb8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
