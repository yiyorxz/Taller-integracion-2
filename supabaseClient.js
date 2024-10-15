// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mozrmdmubqlfhpnsmyoj.supabase.co'; // Aquí puedes colocar la URL de tu proyecto Supabase
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1venJtZG11YnFsZmhwbnNteW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTI1ODUsImV4cCI6MjA0NDU4ODU4NX0.kIgJ_ndTqKbe3OrC-lWiFd_YRpQAX3snIApleqBLMvs'; // Llave pública (anon)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
