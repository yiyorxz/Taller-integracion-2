// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmjwzjaqzztrfymkzxdu.supabase.co'; // Aquí puedes colocar la URL de tu proyecto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3aGJuYm9oZG9vZXR6b3JjbmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NjE4OTIsImV4cCI6MjA0NTEzNzg5Mn0.7cACD9YWGeBzqqhn7YF5DccTs8WAHXx0K4vQWstnRWM'; // Llave pública (anon)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
