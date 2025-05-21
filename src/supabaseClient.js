import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dtesfqdjuyswabcjrwlo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZXNmcWRqdXlzd2FiY2pyd2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4Njk3OTEsImV4cCI6MjA2MzQ0NTc5MX0.UNiREoYoY7fPnFwsxH7FBQq02ZNJqZP9YCSG6JkIce8';

export const supabase = createClient(supabaseUrl, supabaseKey);
