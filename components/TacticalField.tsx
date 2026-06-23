"use client";

import { useSquadStore } from "@/store/squadStore";
import { SquadSlot } from "@/types";
import { onPhotoError } from "@/lib/photoFallback";

function PlayerSlot({
  slot,
  index,
  isActive,
}: {
  slot: SquadSlot;
  index: number;
  isActive: boolean;
}) {
  const { setActiveSlot, removePlayer } = useSquadStore();

  const handleClick = () => {
    if (slot.player) {
      setActiveSlot(index);
    } else {
      setActiveSlot(isActive ? null : index);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removePlayer(index);
  };

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transition: "left 0.45s ease, top 0.45s ease" }}
      onClick={handleClick}
    >
      {slot.player ? (
        <div key={slot.player.id} className="animate-slot-enter flex flex-col items-center gap-0.5">
          <div
            className={`relative w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 overflow-hidden shadow-lg transition-all ${
              isActive
                ? "border-yellow-400 scale-110 ring-2 ring-yellow-400"
                : "border-white hover:border-yellow-400 hover:scale-105"
            }`}
          >
            <img
              src={slot.player.photo}
              alt={slot.player.name}
              className="w-full h-full object-cover"
              onError={(e) => onPhotoError(e, slot.player!.handle, slot.player!.name, 48)}
            />
            <button
              onClick={handleRemove}
              className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity"
            >
              ✕
            </button>
          </div>
          <div className="bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-center max-w-72px">
            <p className="text-[white] text-[10px] font-bold truncate leading-tight">
              {slot.player.name.split(" ")[0]}
            </p>
            <p className="text-yellow-400 text-[9px] leading-tight">
              {slot.player.overall}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
            isActive
              ? "border-yellow-400 bg-yellow-400/20 scale-110 animate-pulse"
              : "border-white/50 bg-white/10 hover:border-white hover:bg-white/20"
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/70 text-[8px] font-bold">
              {slot.position}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TacticalField() {
  const { squad, activeSlotIndex } = useSquadStore();

  if (!squad.formation) {
    return (
      <div className="relative w-full aspect-2/3 max-w-55 sm:max-w-xs lg:max-w-sm mx-auto bg-green-800 rounded-xl border-2 border-green-600 flex items-center justify-center">
        <p className="text-green-300/70 text-xs lg:text-sm text-center px-4">
          Selecione uma formação para começar
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-2/3 max-w-55 sm:max-w-xs lg:max-w-sm mx-auto select-none">
      {/* Field background */}
      <div className="absolute inset-0 bg-green-700 rounded-xl overflow-hidden border-2 border-green-500 shadow-2xl">
        {/* Field lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 150"
          preserveAspectRatio="none"
        >
          {/* Outer border */}
          <rect
            x="3"
            y="3"
            width="94"
            height="144"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Center line */}
          <line
            x1="3"
            y1="75"
            x2="97"
            y2="75"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Center circle */}
          <circle
            cx="50"
            cy="75"
            r="12"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Center dot */}
          <circle cx="50" cy="75" r="1" fill="rgba(255,255,255,0.3)" />
          {/* Top penalty area */}
          <rect
            x="22"
            y="3"
            width="56"
            height="24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Top goal area */}
          <rect
            x="36"
            y="3"
            width="28"
            height="10"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Bottom penalty area */}
          <rect
            x="22"
            y="123"
            width="56"
            height="24"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Bottom goal area */}
          <rect
            x="36"
            y="137"
            width="28"
            height="10"
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          {/* Grass stripes */}
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x="3"
              y={3 + i * 21}
              width="94"
              height="10.5"
              fill={i % 2 === 0 ? "rgba(0,0,0,0.05)" : "transparent"}
            />
          ))}
        </svg>
      </div>

      {/* Player slots */}
      {squad.slots.map((slot, index) => (
        <PlayerSlot
          key={index}
          slot={slot}
          index={index}
          isActive={activeSlotIndex === index}
        />
      ))}

      {/* Formation label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <span className="bg-black/60 text-white/80 text-xs px-2 py-0.5 rounded-full">
          {squad.formation.name}
        </span>
      </div>
    </div>
  );
}
