import { createClient } from "@supabase/supabase-js";

// Supabase config
const supabaseUrl = "https://lkqlhnzcobqyqtvumbxc.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrcWxobnpjb2JxeXF0dnVtYnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTM3NzksImV4cCI6MjA5NzM4OTc3OX0.gACIbIhd3GIH6yTfiypdyEvkwYIibuU0N3EA5nPqbbA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

type ProfileData = {
  bio?: string;
  goals?: string;
  platform?: string;
  photoUrl?: string;
  socials?: { label: string; url: string }[];
  displayName?: string;
};

//
// 📸 IMAGE UPLOAD (NEW)
//
export async function uploadAvatar(file: File, userId: string) {
  const filePath = `${userId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.log("UPLOAD ERROR:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

//
// 🔐 LOGIN (USERNAME SYSTEM)
//
export async function apiLogin(id: string, password: string) {
  const profile = await apiGetProfile(id);

  if (!profile) {
    throw new Error("User not found. Make sure 'profiles.id' contains: " + id);
  }

  if (password !== id.toLowerCase()) {
    throw new Error("Invalid login credentials");
  }

  return {
    token: "mock-token-" + id,
    id,
  };
}

//
// 🚪 LOGOUT
//
export async function apiLogout() {
  return true;
}

//
// 👤 GET PROFILE
//
export async function apiGetProfile(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.log("GET PROFILE ERROR:", error);
    return null;
  }

  return data;
}

//
// ✏️ UPDATE PROFILE
//
export async function apiUpdateProfile(
  id: string,
  _token: string,
  data: ProfileData
) {
  const { data: result, error } = await supabase
    .from("profiles")
    .upsert({
      id,
      ...data,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.log("UPDATE ERROR:", error);
    throw error;
  }

  return {
    success: true,
    profile: result,
  };
}

//
// 🔑 CHANGE PASSWORD (mock)
//
export async function apiChangePassword() {
  return { success: true };
}