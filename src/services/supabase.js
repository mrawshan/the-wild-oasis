// Conecting the supabase database with our app
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://plkuwzknejrnsmzxqeni.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsa3V3emtuZWpybnNtenhxZW5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjIxMjMsImV4cCI6MjA5MjY5ODEyM30.HVuXFLh2kXWElbU85bXHmBT7UGbb4VwbZcCTdfgthNI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
