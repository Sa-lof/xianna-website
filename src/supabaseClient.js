// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulafgjbgmgqqjxayohmg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsYWZnamJnbWdxcWp4YXlvaG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDIzNTksImV4cCI6MjAzNjY3ODM1OX0.uFPUFuR3KgXqKrWNB_grGXgS0BH2BGXOXD3KEkglMR0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;