"use client";

import { Player } from "@/types";
import { onPhotoError } from "@/lib/photoFallback";

interface PlayerCardProps {
  player: Player;
  onSelect: (player: Player) => void;
  isSelected?: boolean;
  isInSquad?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const attributeColors: Record<string, string> = {
  logica: "bg-blue-500",
  comunicacao: "bg-green-500",
  colaboracao: "bg-yellow-500",
  inovacao: "bg-purple-500",
  consistencia: "bg-red-500",
};

const attributeLabels: Record<string, string> = {
  logica: "LGC",
  comunicacao: "COM",
  colaboracao: "COL",
  inovacao: "INV",
  consistencia: "CST",
};

export default function PlayerCard({
  player,
  onSelect,
  isSelected,
  isInSquad,
  onEdit,
  onDelete,
}: PlayerCardProps) {
  const hasActions = onEdit || onDelete;

  return (
    <div
      onClick={() => onSelect(player)}
      className={`group relative flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-all ${
        isSelected
          ? "border-yellow-400 bg-yellow-400/10"
          : isInSquad
          ? "border-green-500/50 bg-green-500/10 opacity-75"
          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
      }`}
    >
      {/* Overall badge */}
      <div className="absolute top-1 left-1 bg-black/80 text-yellow-400 text-[10px] font-black w-6 h-6 rounded flex items-center justify-center">
        {player.overall}
      </div>

      {/* Photo */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 ml-5">
        <img
          src={player.photo}
          alt={player.name}
          className="w-full h-full object-cover"
          onError={(e) => onPhotoError(e, player.handle, player.name, 40)}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-xs font-bold truncate">{player.name}</p>
        <p className="text-gray-400 text-[10px] truncate">{player.role}</p>
        <div className="flex gap-1 mt-1">
          {player.positions.map((pos) => (
            <span
              key={pos}
              className="bg-white/10 text-white/70 text-[9px] px-1 rounded"
            >
              {pos}
            </span>
          ))}
        </div>
      </div>

      {/* Mini stats — hidden on hover when actions exist */}
      <div
        className={`flex flex-col gap-0.5 shrink-0 ${
          hasActions ? "group-hover:invisible" : ""
        }`}
      >
        {Object.entries(player.attributes)
          .slice(0, 3)
          .map(([key, val]) => (
            <div key={key} className="flex items-center gap-1">
              <span className="text-gray-400 text-[8px] w-6">
                {attributeLabels[key]}
              </span>
              <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${attributeColors[key]}`}
                  style={{ width: `${val}%` }}
                />
              </div>
              <span className="text-white/60 text-[8px] w-4">{val}</span>
            </div>
          ))}
      </div>

      {/* Action buttons — revealed on hover */}
      {hasActions && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-blue-500/30 border border-white/10 hover:border-blue-400/50 text-gray-400 hover:text-blue-400 text-xs flex items-center justify-center transition-all"
              title="Editar"
            >
              ✎
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/30 border border-white/10 hover:border-red-400/50 text-gray-400 hover:text-red-400 text-xs flex items-center justify-center transition-all"
              title="Remover"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {isInSquad && !hasActions && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full" />
      )}
    </div>
  );
}
