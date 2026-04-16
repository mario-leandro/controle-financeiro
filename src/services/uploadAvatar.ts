import { createClient } from "@/lib/supabase/client";

export async function uploadAvatar(file: File, userId: string) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return data.publicUrl;
}

export async function updateAvatar(userId: string, url: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: url })
    .eq("id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
