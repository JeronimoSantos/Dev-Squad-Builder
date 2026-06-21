"use client";

import { useSquadStore } from "@/store/squadStore";
import { Player, SquadRoleKey } from "@/types";

const ROLES: { key: SquadRoleKey; label: string; icon: string; description: string }[] = [
  { key: "capitao",     label: "Capitão",              icon: "©",  description: "Líder do time, inspira todos" },
  { key: "cobPenalti",  label: "Cobrador de Pênalti",  icon: "🎯", description: "Frieza total sob pressão" },
  { key: "cobFalta",    label: "Cobrador de Falta",    icon: "⚡", description: "Precisão e criatividade" },
  { key: "cobEscanteio",label: "Cobrador de Escanteio",icon: "📐", description: "Visão de jogo e estratégia" },
];

function RoleRow({
  roleKey,
  label,
  icon,
  description,
  assignedPlayer,
  squadPlayers,
}: {
  roleKey: SquadRoleKey;
  label: string;
  icon: string;
  description: string;
  assignedPlayer: Player | null;
  squadPlayers: Player[];
}) {
  const { setRole, clearRole } = useSquadStore();

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <div>
            <p className="text-white text-xs font-bold">{label}</p>
            <p className="text-gray-500 text-[10px]">{description}</p>
          </div>
        </div>
        {assignedPlayer && (
          <button
            onClick={() => clearRole(roleKey)}
            className="text-gray-600 hover:text-red-400 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {assignedPlayer ? (
        <div className="flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-2 py-1.5">
          <img
            src={assignedPlayer.photo}
            alt={assignedPlayer.name}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedPlayer.name)}&background=1a1a2e&color=fff&size=24`;
            }}
          />
          <span className="text-yellow-400 text-xs font-semibold truncate">
            {assignedPlayer.name}
          </span>
        </div>
      ) : (
        <select
          onChange={(e) => {
            if (e.target.value) setRole(roleKey, e.target.value);
            e.target.value = "";
          }}
          defaultValue=""
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-gray-400 text-xs focus:outline-none focus:border-yellow-400/50 cursor-pointer"
        >
          <option value="" disabled>Selecionar jogador…</option>
          {squadPlayers.map((p) => (
            <option key={p.id} value={p.id} className="bg-[#1a1a2e] text-white">
              {p.name} ({p.positions[0]})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default function SquadRolesPanel() {
  const { squad } = useSquadStore();

  const squadPlayers = squad.slots
    .filter((s) => s.player !== null)
    .map((s) => s.player as Player);

  if (squadPlayers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">
          Adicione jogadores ao campo primeiro
        </p>
      </div>
    );
  }

  const getAssigned = (key: SquadRoleKey): Player | null => {
    const id = squad.roles[key];
    return squadPlayers.find((p) => p.id === id) ?? null;
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-400 text-xs">
        Atribua funções especiais aos jogadores do seu elenco:
      </p>
      {ROLES.map((r) => (
        <RoleRow
          key={r.key}
          roleKey={r.key}
          label={r.label}
          icon={r.icon}
          description={r.description}
          assignedPlayer={getAssigned(r.key)}
          squadPlayers={squadPlayers}
        />
      ))}
    </div>
  );
}
