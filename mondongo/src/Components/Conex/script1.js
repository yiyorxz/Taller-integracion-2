import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qxhnxazctehqtaxkoeji.supabase.co'; // Aquí puedes colocar la URL de tu proyecto Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aG54YXpjdGVocXRheGtvZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNjY1MDEsImV4cCI6MjA0NTc0MjUwMX0.5UmjT7a-q9Ekmzu_NCUiSpGat2HffLibTtz1TAq1Dfo';

export const supabase = createClient(supabaseUrl, supabaseKey)
