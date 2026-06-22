"use client";

import { useState } from "react";
import { Coach } from "@/types";
import { useSquadStore } from "@/store/squadStore";
import { useCustomDataStore } from "@/store/customDataStore";
import CoachFormModal from "./CoachFormModal";
import coachesData from "@/data/coaches.json";
import { onPhotoError } from "@/lib/photoFallback";

const staticCoaches = coachesData as Coach[];

export default function CoachPicker() {
  const { squad, setCoach } = useSquadStore();
  const {
    customCoaches,
    deletedCoachIds,
    addCoach,
    updateCoach,
    removeCoach,
  } = useCustomDataStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);

  const allCoaches: Coach[] = [
    ...staticCoaches.filter((c) => !deletedCoachIds.includes(c.id)),
    ...customCoaches,
  ];

  const handleDelete = (coach: Coach) => {
    if (!window.confirm(`Remover "${coach.name}" da lista?`)) return;
    if (squad.coach?.id === coach.id) {
      useSquadStore.setState((s) => ({
        squad: { ...s.squad, coach: null },
      }));
    }
    removeCoach(coach.id);
  };

  const handleSave = (data: Omit<Coach, "id"> | Coach) => {
    if ("id" in data) {
      updateCoach(data as Coach);
    } else {
      addCoach(data);
    }
  };

  return (
    <div className="space-y-2">
      {allCoaches.map((coach) => {
        const isSelected = squad.coach?.id === coach.id;
        return (
          <div key={coach.id} className="relative group">
            <button
              onClick={() => setCoach(coach)}
              className={`flex items-center gap-2 p-2 rounded-lg border text-left w-full transition-all ${
                isSelected
                  ? "border-yellow-400 bg-yellow-400/10"
                  : "border-white/10 bg-white/5 hover:border-white/30"
              }`}
            >
              <img
                src={coach.photo}
                alt={coach.name}
                className="w-8 h-8 rounded-full object-cover shrink-0"
                onError={(e) => onPhotoError(e, coach.handle, coach.name, 32)}
              />
              <div className="min-w-0 flex-1">
                <p className="text-white text-xs font-bold truncate">
                  {coach.name}
                </p>
                <p className="text-gray-400 text-[10px] truncate">
                  {coach.philosophy}
                </p>
              </div>
            </button>

            {/* Edit / Delete — appear on hover */}
            <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:flex gap-1">
              <button
                onClick={() => setEditingCoach(coach)}
                className="w-6 h-6 rounded bg-white/10 hover:bg-blue-500/30 border border-white/10 hover:border-blue-400/50 text-gray-400 hover:text-blue-400 text-[10px] flex items-center justify-center transition-all"
                title="Editar"
              >
                ✎
              </button>
              <button
                onClick={() => handleDelete(coach)}
                className="w-6 h-6 rounded bg-white/10 hover:bg-red-500/30 border border-white/10 hover:border-red-400/50 text-gray-400 hover:text-red-400 text-[10px] flex items-center justify-center transition-all"
                title="Remover"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={() => setShowAddModal(true)}
        className="w-full py-2 rounded-lg border border-dashed border-white/20 text-gray-500 hover:text-yellow-400 hover:border-yellow-400/40 text-xs transition-all"
      >
        + Novo Técnico
      </button>

      {showAddModal && (
        <CoachFormModal
          onSave={handleSave}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingCoach && (
        <CoachFormModal
          initial={editingCoach}
          onSave={handleSave}
          onClose={() => setEditingCoach(null)}
        />
      )}
    </div>
  );
}
