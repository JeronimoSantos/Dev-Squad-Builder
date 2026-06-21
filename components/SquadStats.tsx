"use client";

import { useSquadStore } from "@/store/squadStore";
import { PlayerAttributes } from "@/types";

const attributeLabels: Record<keyof PlayerAttributes, string> = {
  logica: "Lógica",
  comunicacao: "Comunicação",
  colaboracao: "Colaboração",
  inovacao: "Inovação",
  consistencia: "Consistência",
};

const attributeColors: Record<keyof PlayerAttributes, string> = {
  logica: "bg-blue-500",
  comunicacao: "bg-green-500",
  colaboracao: "bg-yellow-500",
  inovacao: "bg-purple-500",
  consistencia: "bg-red-500",
};

export default function SquadStats() {
  const { squad } = useSquadStore();

  const filledSlots = squad.slots.filter((s) => s.player);
  if (filledSlots.length === 0) return null;

  const coachBonuses: Partial<Record<keyof PlayerAttributes, number>> = {};
  if (squad.coach) {
    for (const bonus of squad.coach.bonuses) {
      coachBonuses[bonus.attribute] = bonus.value;
    }
  }

  const avgAttributes = (
    Object.keys(attributeLabels) as (keyof PlayerAttributes)[]
  ).map((key) => {
    const base =
      filledSlots.reduce((sum, s) => sum + s.player!.attributes[key], 0) /
      filledSlots.length;
    const withBonus = Math.min(99, Math.round(base + (coachBonuses[key] ?? 0)));
    return { key, value: withBonus };
  });

  const overall = Math.round(
    avgAttributes.reduce((sum, a) => sum + a.value, 0) / avgAttributes.length
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm">Estatísticas do Time</h3>
        <div className="bg-yellow-400 text-black text-sm font-black px-2 py-0.5 rounded">
          {overall}
        </div>
      </div>

      <div className="space-y-2">
        {avgAttributes.map(({ key, value }) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-gray-400 text-xs w-24">
              {attributeLabels[key]}
            </span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${attributeColors[key]}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-white/70 text-xs w-6 text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      {squad.coach && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <p className="text-gray-400 text-[10px]">
            Bônus de{" "}
            <span className="text-yellow-400">{squad.coach.name}</span>{" "}
            aplicados
          </p>
        </div>
      )}
    </div>
  );
}
