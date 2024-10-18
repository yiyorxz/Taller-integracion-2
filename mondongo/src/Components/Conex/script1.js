import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pbtgsvjgitvdyyzkizoo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBidGdzdmpnaXR2ZHl5emtpem9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxNjgzNzAsImV4cCI6MjA0NDc0NDM3MH0.vFI5gJStJS4I-eNUMqR4ZlbVgxEKiRJyyNvVzCM8m6Y'

export const supabase = createClient(supabaseUrl, supabaseKey)
