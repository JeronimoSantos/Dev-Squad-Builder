"use client";

import { useRef, useState, useCallback } from "react";
import { Squad } from "@/types";
import ShareCard from "./ShareCard";

interface ShareModalProps {
  squad: Squad;
  onClose: () => void;
}

function initialsDataUri(name: string): string {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="#1a1a2e"/><text x="20" y="26" text-anchor="middle" fill="#fbbf24" font-size="15" font-weight="bold" font-family="Arial">${initials}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

async function fetchBase64(url: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return initialsDataUri(fallback);
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return initialsDataUri(fallback);
  }
}

export default function ShareModal({ squad, onClose }: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});

  const generate = useCallback(async () => {
    if (!cardRef.current) return;
    setIsGenerating(true);
    try {
      // 1. Collect all players currently in the squad
      const players = squad.slots
        .filter((s) => s.player !== null)
        .map((s) => s.player!);

      // 2. Convert each photo to base64 to avoid CORS issues in canvas
      const entries = await Promise.all(
        players.map(async (p) => {
          const base64 = await fetchBase64(p.photo, p.name);
          return [p.id, base64] as [string, string];
        })
      );
      const map = Object.fromEntries(entries);
      setPhotoMap(map);

      // 3. Wait one frame so React re-renders the card with base64 photos
      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      // 4. Capture
      const { toPng } = await import("html-to-image");
      const url = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 1,
        skipFonts: true,
      });
      setPreviewUrl(url);
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [squad.slots]);

  const download = useCallback(() => {
    if (!previewUrl) return;
    const formation = squad.formation?.name ?? "squad";
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `dev-squad-${formation}.png`;
    a.click();
  }, [previewUrl, squad.formation]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-white font-bold text-sm">Gerar Card para Redes Sociais</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Imagem 1080×1080px — ideal para Instagram, Twitter e LinkedIn
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg transition-colors">
            ✕
          </button>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center gap-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview do card"
              className="w-full max-w-md rounded-xl border border-white/10 shadow-xl"
            />
          ) : (
            <div className="w-full max-w-md aspect-square bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
              <p className="text-gray-500 text-sm">Clique em "Gerar Prévia" para visualizar</p>
            </div>
          )}

          {/* Hidden full-res card for capture */}
          <div className="overflow-hidden absolute left-[9999px] top-[9999px] pointer-events-none">
            <ShareCard ref={cardRef} squad={squad} photoMap={photoMap} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={generate}
            disabled={isGenerating}
            className="flex-1 bg-white/10 hover:bg-white/15 disabled:opacity-50 text-white text-sm font-semibold py-2.5 rounded-xl border border-white/10 transition-all"
          >
            {isGenerating ? "Buscando fotos e gerando…" : "Gerar Prévia"}
          </button>
          <button
            onClick={download}
            disabled={!previewUrl}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed text-black text-sm font-bold py-2.5 rounded-xl transition-all"
          >
            Baixar PNG
          </button>
        </div>
      </div>
    </div>
  );
}
