"use client";

import { Formation } from "@/types";
import { useSquadStore } from "@/store/squadStore";
import formationsData from "@/data/formations.json";

const formations = formationsData as Formation[];

export default function FormationPicker() {
  const { squad, setFormation } = useSquadStore();

  return (
    <div className="flex flex-wrap gap-2">
      {formations.map((f) => (
        <button
          key={f.id}
          onClick={() => setFormation(f)}
          className={`px-3 py-1.5 rounded-lg text-sm font-bold border transition-all ${
            squad.formation?.id === f.id
              ? "bg-yellow-400 text-black border-yellow-400"
              : "bg-white/5 text-white/70 border-white/10 hover:border-white/40 hover:text-white"
          }`}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
}
