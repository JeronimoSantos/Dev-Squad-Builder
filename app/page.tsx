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

type Panel = "players" | "formation" | "coach" | "funcoes";

export default function Home() {
  const [activePanel, setActivePanel] = useState<Panel>("formation");
  const [showShare, setShowShare] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { reset, squad } = useSquadStore();

  const filledCount = squad.slots.filter((s) => s.player).length;
  const totalSlots = squad.slots.length;

  // Ao carregar, verifica se há um squad codificado no hash da URL
  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove o "#"
    if (!hash) return;

    const decoded = decodeSquad(hash);
    if (!decoded) return;

    // Hidrata o store com o squad da URL e limpa o hash
    useSquadStore.setState({ squad: decoded, activeSlotIndex: null });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const copyLink = useCallback(() => {
    const encoded = encodeSquad(squad);
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [squad]);

  return (
    <main className="min-h-screen bg-[#0d0d1a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-black text-white tracking-tight">
            <span className="text-yellow-400">DEV</span> SQUAD BUILDER
          </h1>
          <p className="text-gray-500 text-[10px] leading-none">
            Monte seu time dos sonhos da bolha dev
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalSlots > 0 && (
            <span className="text-gray-400 text-xs mr-1">
              {filledCount}/{totalSlots} jogadores
            </span>
          )}
          {filledCount > 0 && (
            <button
              onClick={copyLink}
              className={`text-xs font-semibold px-3 py-1 rounded-lg border transition-all ${
                linkCopied
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
              }`}
            >
              {linkCopied ? "Link copiado!" : "Copiar Link"}
            </button>
          )}
          {filledCount > 0 && (
            <button
              onClick={() => setShowShare(true)}
              className="text-xs font-semibold text-black bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded-lg transition-all"
            >
              Compartilhar
            </button>
          )}
          <button
            onClick={reset}
            className="text-xs text-gray-500 hover:text-red-400 border border-white/10 hover:border-red-400/30 px-3 py-1 rounded-lg transition-all"
          >
            Resetar
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Left panel */}
        <div className="w-80 border-r border-white/10 flex flex-col overflow-hidden">
          {/* Panel tabs */}
          <div className="flex border-b border-white/10 shrink-0">
            {(
              [
                { id: "formation", label: "Formação" },
                { id: "coach", label: "Técnico" },
                { id: "players", label: "Jogadores" },
                { id: "funcoes", label: "Funções" },
              ] as { id: Panel; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={`flex-1 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                  activePanel === tab.id
                    ? "border-yellow-400 text-yellow-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activePanel === "formation" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs">
                  Escolha a formação tática do seu time:
                </p>
                <FormationPicker />
                {squad.formation && (
                  <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white text-xs font-semibold mb-1">
                      Formação selecionada
                    </p>
                    <p className="text-yellow-400 text-2xl font-black">
                      {squad.formation.name}
                    </p>
                    <p className="text-gray-400 text-[10px] mt-1">
                      Clique em "Jogadores" para montar o elenco →
                    </p>
                  </div>
                )}
              </div>
            )}

            {activePanel === "coach" && (
              <div className="space-y-3">
                <p className="text-gray-400 text-xs">
                  Escolha o técnico e sua filosofia:
                </p>
                <CoachPicker />
                {squad.coach && (
                  <div className="mt-3 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white text-xs font-semibold mb-2">
                      Bônus ativos:
                    </p>
                    <ul className="space-y-1">
                      {squad.coach.bonuses.map((bonus, i) => (
                        <li
                          key={i}
                          className="text-green-400 text-[11px] flex items-center gap-1"
                        >
                          <span>+</span>
                          {bonus.description}
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
                    <p className="text-gray-500 text-sm">
                      Escolha uma formação primeiro
                    </p>
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
          </div>
        </div>

        {/* Center: tactical field */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
          <TacticalField />
        </div>

        {/* Right panel: stats */}
        <div className="w-64 border-l border-white/10 p-4 overflow-y-auto">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Estatísticas
          </h2>
          <SquadStats />

          {squad.coach && (
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white font-bold text-xs mb-2">Técnico</h3>
              <div className="flex items-center gap-2">
                <img
                  src={squad.coach.photo}
                  alt={squad.coach.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      squad.coach!.name
                    )}&background=1a1a2e&color=fff&size=40`;
                  }}
                />
                <div>
                  <p className="text-white text-xs font-bold">
                    {squad.coach.name}
                  </p>
                  <p className="text-yellow-400 text-[10px]">
                    {squad.coach.philosophy}
                  </p>
                </div>
              </div>
            </div>
          )}

          {filledCount === 0 && (
            <p className="text-gray-600 text-xs text-center mt-8">
              Monte seu time para ver as estatísticas
            </p>
          )}
        </div>
      </div>

      {showShare && (
        <ShareModal squad={squad} onClose={() => setShowShare(false)} />
      )}
    </main>
  );
}
