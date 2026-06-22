"use client";

import { useState, FormEvent } from "react";
import { createClient } from "@/lib/supabase";

interface AuthModalProps {
  onClose: () => void;
}

type Mode = "login" | "signup" | "reset";

function errMsg(msg: string): string {
  if (msg.includes("Invalid login credentials")) return "E-mail ou senha incorretos.";
  if (msg.includes("Email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (msg.includes("User already registered")) return "Este e-mail já está cadastrado.";
  if (msg.includes("Password should be at least")) return "A senha deve ter pelo menos 6 caracteres.";
  if (msg.includes("rate limit")) return "Muitas tentativas. Aguarde alguns minutos.";
  return msg;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (mode === "reset") {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (err) throw err;
        setSuccess("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
      } else if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({ email, password });
        if (err) throw err;
        setSuccess("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        onClose();
      }
    } catch (err: unknown) {
      setError(errMsg((err as { message: string }).message ?? "Erro desconhecido."));
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = async (provider: "google" | "github") => {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-white font-bold text-sm">
            {mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Recuperar senha"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Mode tabs (login / signup) */}
          {mode !== "reset" && (
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
              <button
                onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  mode === "login" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  mode === "signup" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
                }`}
              >
                Criar conta
              </button>
            </div>
          )}

          {/* OAuth */}
          {mode !== "reset" && (
            <div className="flex gap-2">
              <button
                onClick={() => oauthLogin("google")}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button
                onClick={() => oauthLogin("github")}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
              </button>
            </div>
          )}

          {/* Divider */}
          {mode !== "reset" && (
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-gray-600 text-[10px]">ou</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
              />
            </div>

            {mode !== "reset" && (
              <div>
                <label className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide block mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    minLength={6}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-9 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs transition-colors"
                  >
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
            )}

            {/* Error / Success */}
            {error && (
              <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-400 text-xs bg-green-400/10 border border-green-400/20 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-bold py-2.5 rounded-xl transition-all"
            >
              {loading
                ? "Aguarde…"
                : mode === "login"
                ? "Entrar"
                : mode === "signup"
                ? "Criar conta"
                : "Enviar link de recuperação"}
            </button>
          </form>

          {/* Reset password link */}
          {mode === "login" && (
            <button
              onClick={() => { setMode("reset"); setError(""); setSuccess(""); }}
              className="w-full text-center text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              Esqueci minha senha
            </button>
          )}
          {mode === "reset" && (
            <button
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              className="w-full text-center text-gray-500 hover:text-gray-300 text-xs transition-colors"
            >
              ← Voltar ao login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
