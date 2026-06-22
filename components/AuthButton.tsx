"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import AuthModal from "./AuthModal";

export default function AuthButton() {
  const { user, loading, signOut } = useAuthStore();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="w-16 h-7 bg-white/5 rounded-lg animate-pulse" />
    );
  }

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="text-xs font-semibold text-black bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded-lg transition-all"
        >
          Entrar
        </button>
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      </>
    );
  }

  const initials = (user.email ?? "?")
    .split("@")[0]
    .slice(0, 2)
    .toUpperCase();
  const displayEmail = (user.email ?? "").split("@")[0];

  return (
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-yellow-400 text-black text-[10px] font-black flex items-center justify-center shrink-0">
        {initials}
      </div>
      <span className="text-gray-400 text-xs max-w-24 truncate hidden sm:block">
        {displayEmail}
      </span>
      <button
        onClick={signOut}
        className="text-xs text-gray-500 hover:text-red-400 border border-white/10 hover:border-red-400/30 px-2 py-1 rounded-lg transition-all"
      >
        Sair
      </button>
    </div>
  );
}
