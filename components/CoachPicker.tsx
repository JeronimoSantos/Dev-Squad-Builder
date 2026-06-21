"use client";

import { Coach } from "@/types";
import { useSquadStore } from "@/store/squadStore";
import coachesData from "@/data/coaches.json";

const coaches = coachesData as Coach[];

export default function CoachPicker() {
  const { squad, setCoach } = useSquadStore();

  return (
    <div className="grid grid-cols-1 gap-2">
      {coaches.map((coach) => {
        const isSelected = squad.coach?.id === coach.id;
        return (
          <button
            key={coach.id}
            onClick={() => setCoach(coach)}
            className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
              isSelected
                ? "border-yellow-400 bg-yellow-400/10"
                : "border-white/10 bg-white/5 hover:border-white/30"
            }`}
          >
            <img
              src={coach.photo}
              alt={coach.name}
              className="w-8 h-8 rounded-full object-cover shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  coach.name
                )}&background=1a1a2e&color=fff&size=32`;
              }}
            />
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">
                {coach.name}
              </p>
              <p className="text-gray-400 text-[10px] truncate">
                {coach.philosophy}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
