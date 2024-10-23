const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://bfomesiitkrbzrdfamoi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmb21lc2lpdGtyYnpyZGZhbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NzE3ODgsImV4cCI6MjA0NDE0Nzc4OH0.k4q788PHlZDm7TvIorgrSDpIui82eRxH7xEMQmiP3Gk'; 
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };