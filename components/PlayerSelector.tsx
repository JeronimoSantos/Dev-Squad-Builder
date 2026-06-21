"use client";

import { useState } from "react";
import { Player } from "@/types";
import { useSquadStore } from "@/store/squadStore";
import PlayerCard from "./PlayerCard";
import playersData from "@/data/players.json";

const players = playersData as Player[];

export default function PlayerSelector() {
  const { squad, activeSlotIndex, assignPlayer } = useSquadStore();
  const [search, setSearch] = useState("");

  const squadPlayerIds = new Set(
    squad.slots.filter((s) => s.player).map((s) => s.player!.id)
  );

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (player: Player) => {
    if (activeSlotIndex !== null) {
      assignPlayer(player);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-2">
          {activeSlotIndex !== null ? (
            <span className="text-yellow-400 font-semibold">
              Clique em um jogador para colocar no campo →
            </span>
          ) : (
            "Clique em um slot no campo para selecionar"
          )}
        </p>
        <input
          type="text"
          placeholder="Buscar jogador, role ou tech..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-white/10">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            Nenhum jogador encontrado
          </p>
        ) : (
          filtered.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSelect={handleSelect}
              isInSquad={squadPlayerIds.has(player.id)}
              isSelected={false}
            />
          ))
        )}
      </div>
    </div>
  );
}
