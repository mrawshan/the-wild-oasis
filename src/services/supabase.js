// Conecting the supabase database with our app
import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://akvdlbsrieoffwhjgihc.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdmRsYnNyaWVvZmZ3aGpnaWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2MTkxMTEsImV4cCI6MjA0NjE5NTExMX0.6WaTKOHmihLL2R2JvH8GZttONzDQ_jI-ak8jb6iPdg4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
