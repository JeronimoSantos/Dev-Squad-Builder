import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Coach, Player } from "@/types";

interface CustomDataStore {
  customPlayers: Player[];
  customCoaches: Coach[];
  deletedPlayerIds: string[];
  deletedCoachIds: string[];

  addPlayer: (player: Omit<Player, "id">) => void;
  updatePlayer: (player: Player) => void;
  removePlayer: (id: string) => void;

  addCoach: (coach: Omit<Coach, "id">) => void;
  updateCoach: (coach: Coach) => void;
  removeCoach: (id: string) => void;
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export const useCustomDataStore = create<CustomDataStore>()(
  persist(
    (set, get) => ({
      customPlayers: [],
      customCoaches: [],
      deletedPlayerIds: [],
      deletedCoachIds: [],

      addPlayer: (player) => {
        set((s) => ({
          customPlayers: [...s.customPlayers, { ...player, id: uid("cp") }],
        }));
      },

      updatePlayer: (player) => {
        const isCustom = get().customPlayers.some((p) => p.id === player.id);
        if (isCustom) {
          set((s) => ({
            customPlayers: s.customPlayers.map((p) => (p.id === player.id ? player : p)),
          }));
        } else {
          // Jogador estático: clona para custom com mesmo ID e esconde o original
          set((s) => ({
            customPlayers: [...s.customPlayers, player],
            deletedPlayerIds: [...new Set([...s.deletedPlayerIds, player.id])],
          }));
        }
      },

      removePlayer: (id) => {
        const isCustom = get().customPlayers.some((p) => p.id === id);
        if (isCustom) {
          set((s) => ({ customPlayers: s.customPlayers.filter((p) => p.id !== id) }));
        } else {
          set((s) => ({
            deletedPlayerIds: [...new Set([...s.deletedPlayerIds, id])],
          }));
        }
      },

      addCoach: (coach) => {
        set((s) => ({
          customCoaches: [...s.customCoaches, { ...coach, id: uid("cc") }],
        }));
      },

      updateCoach: (coach) => {
        const isCustom = get().customCoaches.some((c) => c.id === coach.id);
        if (isCustom) {
          set((s) => ({
            customCoaches: s.customCoaches.map((c) => (c.id === coach.id ? coach : c)),
          }));
        } else {
          set((s) => ({
            customCoaches: [...s.customCoaches, coach],
            deletedCoachIds: [...new Set([...s.deletedCoachIds, coach.id])],
          }));
        }
      },

      removeCoach: (id) => {
        const isCustom = get().customCoaches.some((c) => c.id === id);
        if (isCustom) {
          set((s) => ({ customCoaches: s.customCoaches.filter((c) => c.id !== id) }));
        } else {
          set((s) => ({
            deletedCoachIds: [...new Set([...s.deletedCoachIds, id])],
          }));
        }
      },
    }),
    { name: "dev-squad-custom-data" }
  )
);
