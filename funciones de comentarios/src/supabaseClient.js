// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmjwzjaqzztrfymkzxdu.supabase.co'; // Aquí puedes colocar la URL de tu proyecto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtand6amFxenp0cmZ5bWt6eGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MjU4OTIsImV4cCI6MjA0NTUwMTg5Mn0.9hBPQFvXRZLIqfI8GlOI_JnZS-v_1cjqC7TWFn2gIqU'; // Llave pública (anon)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
