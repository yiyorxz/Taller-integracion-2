// src/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

// Reemplaza con tu URL y API Key de Supabase
const supabaseUrl = 'https://xnshewhsuzhwozxeaocb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuc2hld2hzdXpod296eGVhb2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5NTgzMDgsImV4cCI6MjA0NDUzNDMwOH0.vtVxn7xN5uRiA9fLUz-nls0Ot2Bz_OZ0EFzcr-aagcY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
