import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://lkqlhnzcobqyqtvumbxc.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcWxobnpjb2JxeXF0dnVtYnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTM3NzksImV4cCI6MjA5NzM4OTc3OX0.gACIbIhd3GIH6yTfiypdyEvkwYIibuU0N3EA5nPqbbA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)