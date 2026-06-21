import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Coach, Formation, Player, Squad, SquadRoleKey, SquadSlot } from "@/types";

interface SquadStore {
  squad: Squad;
  activeSlotIndex: number | null;

  setFormation: (formation: Formation) => void;
  setCoach: (coach: Coach) => void;
  setActiveSlot: (index: number | null) => void;
  assignPlayer: (player: Player) => void;
  removePlayer: (slotIndex: number) => void;
  setRole: (role: SquadRoleKey, playerId: string) => void;
  clearRole: (role: SquadRoleKey) => void;
  reset: () => void;
}

const emptyRoles = {
  capitao: null,
  cobPenalti: null,
  cobFalta: null,
  cobEscanteio: null,
};

const emptySquad: Squad = {
  formation: null,
  coach: null,
  slots: [],
  roles: emptyRoles,
};

export const useSquadStore = create<SquadStore>()(
  persist(
    (set, get) => ({
      squad: emptySquad,
      activeSlotIndex: null,

      setFormation: (formation) => {
        const slots: SquadSlot[] = formation.slots.map((slot) => ({
          position: slot.position,
          x: slot.x,
          y: slot.y,
          player: null,
        }));
        set((state) => ({
          squad: { ...state.squad, formation, slots, roles: emptyRoles },
          activeSlotIndex: null,
        }));
      },

      setCoach: (coach) => {
        set((state) => ({ squad: { ...state.squad, coach } }));
      },

      setActiveSlot: (index) => {
        set({ activeSlotIndex: index });
      },

      assignPlayer: (player) => {
        const { activeSlotIndex, squad } = get();
        if (activeSlotIndex === null) return;

        const slots = squad.slots.map((slot, i) => {
          if (slot.player?.id === player.id) return { ...slot, player: null };
          if (i === activeSlotIndex) return { ...slot, player };
          return slot;
        });

        set({ squad: { ...squad, slots }, activeSlotIndex: null });
      },

      removePlayer: (slotIndex) => {
        const { squad } = get();
        const removedId = squad.slots[slotIndex]?.player?.id;

        const slots = squad.slots.map((slot, i) =>
          i === slotIndex ? { ...slot, player: null } : slot
        );

        const roles = { ...squad.roles };
        if (removedId) {
          (Object.keys(roles) as SquadRoleKey[]).forEach((key) => {
            if (roles[key] === removedId) roles[key] = null;
          });
        }

        set({ squad: { ...squad, slots, roles } });
      },

      setRole: (role, playerId) => {
        const { squad } = get();
        const roles = { ...squad.roles };

        (Object.keys(roles) as SquadRoleKey[]).forEach((key) => {
          if (roles[key] === playerId) roles[key] = null;
        });

        roles[role] = playerId;
        set({ squad: { ...squad, roles } });
      },

      clearRole: (role) => {
        const { squad } = get();
        set({ squad: { ...squad, roles: { ...squad.roles, [role]: null } } });
      },

      reset: () => {
        set({ squad: emptySquad, activeSlotIndex: null });
      },
    }),
    {
      name: "dev-squad-builder",
      // persiste apenas o squad — activeSlotIndex é estado de UI e não deve sobreviver ao reload
      partialize: (state) => ({ squad: state.squad }),
    }
  )
);
