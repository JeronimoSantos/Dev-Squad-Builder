"use client";

import { useState, useEffect, useCallback } from "react";
import TacticalField from "@/components/TacticalField";
import PlayerSelector from "@/components/PlayerSelector";
import FormationPicker from "@/components/FormationPicker";
import CoachPicker from "@/components/CoachPicker";
import SquadStats from "@/components/SquadStats";
import SquadRolesPanel from "@/components/SquadRolesPanel";
import ShareModal from "@/components/ShareModal";
import { useSquadStore } from "@/store/squadStore";
import { encodeSquad, decodeSquad } from "@/lib/shareUrl";
import { onPhotoError } from "@/lib/photoFallback";
import AuthButton from "@/components/AuthButton";
import ThemeButton from "@/components/ThemeButton";
import type { Squad } from "@/types";

type Panel = "players" | "formation" | "coach" | "funcoes" | "stats";

const TABS: { id: Panel; label: string; short: string; desktopOnly?: boolean }[] = [
  { id: "formation", label: "Formação", short: "Form." },
  { id: "coach",     label: "Técnico",  short: "Téc."  },
  { id: "players",   label: "Jogadores", short: "Jog." },
  { id: "funcoes",   label: "Funções",  short: "Fun."  },
  { id: "stats",     label: "Stats",    short: "Stats", desktopOnly: true },
];

export default function Home() {
  const [activePanel, setActivePanel] = useState<Panel>("formation");
  const [showShare, setShowShare] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [importCandidate, setImportCandidate] = useState<Squad | null>(null);
  const { reset, squad } = useSquadStore();

  const filledCount = squad.slots.filter((s) => s.player).length;
  const totalSlots = squad.slots.length;

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const decoded = decodeSquad(hash);
    window.history.replaceState(null, "", window.location.pathname);
    if (decoded) setImportCandidate(decoded);
  }, []);

  const applyImport = () => {
    if (!importCandidate) return;
    useSquadStore.setState({ squad: importCandidate, activeSlotIndex: null });
    setImportCandidate(null);
  };

  const copyLink = useCallback(() => {
    const encoded = encodeSquad(squad);
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [squad]);

  const CoachStats = () =>
    squad.coach ? (
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h3 className="text-white font-bold text-xs mb-2">Técnico</h3>
        <div className="flex items-center gap-2">
          <img
            src={squad.coach.photo}
            alt={squad.coach.name}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => onPhotoError(e, squad.coach!.handle, squad.coach!.name, 40)}
          />
          <div>
            <p className="text-white text-xs font-bold">{squad.coach.name}</p>
            <p className="text-yellow-400 text-[10px]">{squad.coach.philosophy}</p>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <main className="h-dvh bg-(--c-bg) text-white flex flex-col overflow-hidden">
      {/* Import confirmation banner */}
      {importCandidate && (
        <div className="animate-slide-down bg-yellow-400/10 border-b border-yellow-400/20 px-3 py-2 flex items-center gap-2 shrink-0">
          <span className="text-yellow-400 text-[10px] truncate">
            Squad recebido
            {importCandidate.formation && (
              <span className="font-bold"> · {importCandidate.formation.name}</span>
            )}
            {" · "}{importCandidate.slots.filter((s) => s.player).length} jog.
          </span>
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            <button
              onClick={applyImport}
              className="text-[10px] font-semibold text-black bg-yellow-400 hover:bg-yellow-300 px-2 py-1 rounded-lg transition-all"
            >
              Importar
            </button>
            <button onClick={() => setImportCandidate(null)} className="text-gray-400 hover:text-white text-xs">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
        <div className="shrink-0">
          <h1 className="text-sm font-black text-white tracking-tight leading-tight">
            <span className="text-yellow-400">DEV</span> SQUAD<span className="hidden sm:inline"> BUILDER</span>
          </h1>
          <p className="text-gray-500 text-[9px] leading-none hidden sm:block">
            Monte seu time dos sonhos da bolha dev
          </p>
        </div>

        <div className="flex items-center gap-1.5 min-w-0">
          {totalSlots > 0 && (
            <span className="text-gray-500 text-[10px] hidden sm:block shrink-0">
              {filledCount}/{totalSlots}
            </span>
          )}
          {filledCount > 0 && (
            <button
              onClick={copyLink}
              className={`hidden md:block text-[10px] font-semibold px-2 py-1 rounded-lg border transition-all shrink-0 ${
                linkCopied
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {linkCopied ? "✓" : "Link"}
            </button>
          )}
          {filledCount > 0 && (
            <button
              onClick={() => setShowShare(true)}
              className="text-[10px] font-semibold text-black bg-yellow-400 hover:bg-yellow-300 px-2 py-1 rounded-lg transition-all shrink-0"
            >
              <span className="hidden sm:inline">Compartilhar</span>
              <span className="sm:hidden">Card</span>
            </button>
          )}
          <button
            onClick={reset}
            className="text-[10px] text-gray-500 hover:text-red-400 border border-white/10 hover:border-red-400/30 px-2 py-1 rounded-lg transition-all shrink-0"
          >
            <span className="hidden sm:inline">Resetar</span>
            <span className="sm:hidden">↺</span>
          </button>
          <div className="w-px h-4 bg-white/10 shrink-0" />
          <ThemeButton />
          <div className="shrink-0">
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main — stacked on mobile, 3-column on desktop (lg+) */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden min-h-0">

        {/* Tactical field — top on mobile (order-1), center on desktop (order-2) */}
        <div
          className="order-1 lg:order-2 shrink-0 lg:shrink lg:flex-1
                     flex items-center justify-center
                     h-[46vh] lg:h-auto
                     overflow-hidden lg:overflow-auto
                     p-2 lg:p-6
                     border-b border-white/10 lg:border-b-0"
        >
          <TacticalField />
        </div>

        {/* Left / bottom panel — order-2 on mobile, order-1 on desktop */}
        <div
          className="order-2 lg:order-1 lg:w-80
                     border-r-0 lg:border-r border-white/10
                     flex flex-col flex-1 lg:flex-none
                     overflow-hidden min-h-0"
        >
          {/* Tabs */}
          <div className="flex border-b border-white/10 shrink-0 overflow-x-auto">
            {TABS.filter((t) => !t.desktopOnly).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={`shrink-0 flex-1 lg:flex-none px-3 py-2.5 text-[10px] lg:text-xs font-semibold border-b-2 transition-all ${
                  activePanel === tab.id
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <span className="lg:hidden">{tab.short}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
            {/* Stats tab — mobile only */}
            <button
              onClick={() => setActivePanel("stats")}
              className={`shrink-0 flex-1 lg:hidden px-3 py-2.5 text-[10px] font-semibold border-b-2 transition-all ${
                activePanel === "stats"
                  ? "border-yellow-400 text-yellow-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Stats
            </button>
          </div>

          {/* Panel content */}
          <div key={activePanel} className="animate-fade-up flex-1 overflow-y-auto p-3 lg:p-4 min-h-0">

            {activePanel === "formation" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs">Escolha a formação tática do seu time:</p>
                <FormationPicker />
                {squad.formation && (
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white text-xs font-semibold mb-1">Formação selecionada</p>
                    <p className="text-yellow-400 text-2xl font-black">{squad.formation.name}</p>
                    <p className="text-gray-400 text-[10px] mt-1">
                      Vá em "Jog." para montar o elenco →
                    </p>
                  </div>
                )}
              </div>
            )}

            {activePanel === "coach" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs">Escolha o técnico e sua filosofia:</p>
                <CoachPicker />
                {squad.coach && (
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white text-xs font-semibold mb-2">Bônus ativos:</p>
                    <ul className="space-y-1">
                      {squad.coach.bonuses.map((bonus, i) => (
                        <li key={i} className="text-green-400 text-[11px] flex items-center gap-1">
                          <span>+</span>{bonus.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activePanel === "players" && (
              <div className="h-full flex flex-col">
                {!squad.formation ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">Escolha uma formação primeiro</p>
                    <button
                      onClick={() => setActivePanel("formation")}
                      className="mt-2 text-yellow-400 text-xs hover:underline"
                    >
                      Ir para Formação →
                    </button>
                  </div>
                ) : (
                  <PlayerSelector />
                )}
              </div>
            )}

            {activePanel === "funcoes" && <SquadRolesPanel />}

            {/* Stats — mobile-only tab */}
            {activePanel === "stats" && (
              <div className="space-y-4">
                <SquadStats />
                <CoachStats />
                {filledCount === 0 && (
                  <p className="text-gray-600 text-xs text-center mt-4">
                    Monte seu time para ver as estatísticas
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right stats panel — desktop only (order-3) */}
        <div className="order-3 hidden lg:flex flex-col lg:w-64 border-l border-white/10 p-4 overflow-y-auto">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Estatísticas
          </h2>
          <SquadStats />
          <div className="mt-4">
            <CoachStats />
          </div>
          {filledCount === 0 && (
            <p className="text-gray-600 text-xs text-center mt-8">
              Monte seu time para ver as estatísticas
            </p>
          )}
        </div>
      </div>

      {showShare && <ShareModal squad={squad} onClose={() => setShowShare(false)} />}
    </main>
  );
}