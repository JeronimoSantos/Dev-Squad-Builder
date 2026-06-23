"use client";

import { useRef, useState, useCallback } from "react";
import { Squad } from "@/types";
import ShareCard from "./ShareCard";
import ShareCardBroadcast from "./ShareCardBroadcast";

type CardStyle = "social" | "broadcast";

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
  const b64 = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/gi, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
  return `data:image/svg+xml;base64,${b64}`;
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function tryFetch(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return null;
    return blobToBase64(await res.blob());
  } catch {
    return null;
  }
}

async function fetchBase64(url: string, handle: string, name: string): Promise<string> {
  const primary = await tryFetch(url);
  if (primary) return primary;

  const cleanHandle = handle.replace("@", "");
  const githubUrl = `https://github.com/${cleanHandle}.png`;
  if (url !== githubUrl) {
    const github = await tryFetch(githubUrl);
    if (github) return github;
  }

  return initialsDataUri(name);
}

const STYLES: { key: CardStyle; label: string; sub: string; aspect: string }[] = [
  {
    key: "social",
    label: "Social",
    sub: "1080×1080 · Instagram / Twitter",
    aspect: "aspect-square",
  },
  {
    key: "broadcast",
    label: "Transmissão",
    sub: "1080×608 · YouTube / Banner",
    aspect: "aspect-video",
  },
];

export default function ShareModal({ squad, onClose }: ShareModalProps) {
  const socialRef = useRef<HTMLDivElement>(null);
  const broadcastRef = useRef<HTMLDivElement>(null);

  const [cardStyle, setCardStyle] = useState<CardStyle>("social");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({});

  const activeRef = cardStyle === "social" ? socialRef : broadcastRef;

  const generate = useCallback(async () => {
    if (!activeRef.current) return;
    setIsGenerating(true);
    try {
      const players = squad.slots
        .filter((s) => s.player !== null)
        .map((s) => s.player!);

      const playerEntries = await Promise.all(
        players.map(async (p) => {
          const base64 = await fetchBase64(p.photo, p.handle, p.name);
          return [p.id, base64] as [string, string];
        })
      );

      // Also fetch coach photo so broadcast card can display it
      const coachEntries: [string, string][] = [];
      if (squad.coach) {
        const base64 = await fetchBase64(squad.coach.photo, squad.coach.handle, squad.coach.name);
        coachEntries.push([squad.coach.id, base64]);
      }

      const map = Object.fromEntries([...playerEntries, ...coachEntries]);
      setPhotoMap(map);

      await new Promise((r) => requestAnimationFrame(r));
      await new Promise((r) => requestAnimationFrame(r));

      const { toPng } = await import("html-to-image");
      const url = await toPng(activeRef.current, {
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
  }, [squad.slots, squad.coach, activeRef]);

  const download = useCallback(() => {
    if (!previewUrl) return;
    const formation = squad.formation?.name ?? "squad";
    const suffix = cardStyle === "broadcast" ? "-broadcast" : "";
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `dev-squad-${formation}${suffix}.png`;
    a.click();
  }, [previewUrl, squad.formation, cardStyle]);

  const handleStyleChange = (style: CardStyle) => {
    if (style === cardStyle) return;
    setCardStyle(style);
    setPreviewUrl(null);
  };

  const active = STYLES.find((s) => s.key === cardStyle)!;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="animate-modal-appear bg-(--c-modal) border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-white font-bold text-sm">Gerar Card para Compartilhar</h2>
            <p className="text-gray-500 text-xs mt-0.5">{active.sub}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-lg transition-colors">
            ✕
          </button>
        </div>

        {/* Style toggle */}
        <div className="flex gap-2 px-5 pt-4 shrink-0">
          {STYLES.map((s) => (
            <button
              key={s.key}
              onClick={() => handleStyleChange(s.key)}
              className={[
                "flex-1 py-2 px-3 rounded-xl border text-sm font-semibold transition-all",
                cardStyle === s.key
                  ? "bg-yellow-400/15 border-yellow-400/60 text-yellow-300"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col items-center gap-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview do card"
              className={`w-full max-w-md rounded-xl border border-white/10 shadow-xl ${active.aspect}`}
              style={{ objectFit: "contain" }}
            />
          ) : (
            <div className={`w-full max-w-md ${active.aspect} bg-white/5 border border-white/10 rounded-xl flex items-center justify-center`}>
              <p className="text-gray-500 text-sm">Clique em &quot;Gerar Prévia&quot; para visualizar</p>
            </div>
          )}

          {/* Off-screen cards for capture */}
          <div className="overflow-hidden absolute left-[9999px] top-[9999px] pointer-events-none">
            <ShareCard ref={socialRef} squad={squad} photoMap={photoMap} />
            <ShareCardBroadcast ref={broadcastRef} squad={squad} photoMap={photoMap} />
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
