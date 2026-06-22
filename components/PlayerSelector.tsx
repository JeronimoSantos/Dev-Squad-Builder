"use client";

import { useState } from "react";
import { Player } from "@/types";
import { useSquadStore } from "@/store/squadStore";
import { useCustomDataStore } from "@/store/customDataStore";
import PlayerCard from "./PlayerCard";
import PlayerFormModal from "./PlayerFormModal";
import playersData from "@/data/players.json";

const staticPlayers = playersData as Player[];
const PAGE_SIZE = 6;

export default function PlayerSelector() {
  const { squad, activeSlotIndex, assignPlayer } = useSquadStore();
  const {
    customPlayers,
    deletedPlayerIds,
    addPlayer,
    updatePlayer,
    removePlayer,
  } = useCustomDataStore();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const allPlayers: Player[] = [
    ...staticPlayers.filter((p) => !deletedPlayerIds.includes(p.id)),
    ...customPlayers,
  ];

  const squadPlayerIds = new Set(
    squad.slots.filter((s) => s.player).map((s) => s.player!.id)
  );

  const filtered = allPlayers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.handle.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages || 1);
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSelect = (player: Player) => {
    if (activeSlotIndex !== null) {
      assignPlayer(player);
    }
  };

  const handleDelete = (player: Player) => {
    if (!window.confirm(`Remover "${player.name}" da lista?`)) return;
    removePlayer(player.id);
  };

  const handleSave = (data: Omit<Player, "id"> | Player) => {
    if ("id" in data) {
      updatePlayer(data as Player);
    } else {
      addPlayer(data);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 space-y-2">
        <p className="text-xs text-gray-400">
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
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
        />
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-1.5 rounded-lg border border-dashed border-white/20 text-gray-500 hover:text-yellow-400 hover:border-yellow-400/40 text-xs transition-all"
        >
          + Novo Jogador
        </button>
      </div>

      <div className="flex-1 space-y-1.5 pr-1">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            Nenhum jogador encontrado
          </p>
        ) : (
          paginated.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onSelect={handleSelect}
              isInSquad={squadPlayerIds.has(player.id)}
              isSelected={false}
              onEdit={() => setEditingPlayer(player)}
              onDelete={() => handleDelete(player)}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10 shrink-0">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Anterior
          </button>
          <span className="text-xs text-gray-500">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Próxima →
          </button>
        </div>
      )}

      {showAddModal && (
        <PlayerFormModal
          onSave={handleSave}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingPlayer && (
        <PlayerFormModal
          initial={editingPlayer}
          onSave={handleSave}
          onClose={() => setEditingPlayer(null)}
        />
      )}
    </div>
  );
}
