"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { uploadAvatar, updateAvatar } from "@/services/uploadAvatar";

export default function AvatarUpload() {
  const { user, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setLoading(true);

      const url = await uploadAvatar(file, user.id);
      await updateAvatar(user.id, url);
      await refreshProfile();

      alert("Foto atualizada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar foto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {loading && <p>Enviando...</p>}
    </div>
  );
}
