
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jpofggfpaqgbaofvcavh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwb2ZnZ2ZwYXFnYmFvZnZjYXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMjM2NzIsImV4cCI6MjA1NTc5OTY3Mn0.kJ1-oh3FEw-CbI3G6Ua0LO-x8fG01Ei-ctF349BlJlc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
