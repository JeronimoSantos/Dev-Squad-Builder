import formationsData from "@/data/formations.json";
import coachesData from "@/data/coaches.json";
import playersData from "@/data/players.json";
import { Coach, Formation, Player, Squad, SquadRoles } from "@/types";

// Formato compacto salvo na URL — usa IDs, não os objetos completos
interface CompactSquad {
  f: string | null;                                          // formation id
  c: string | null;                                          // coach id
  p: (string | null)[];                                      // player id por slot
  r: [string | null, string | null, string | null, string | null]; // [capitao, cobPenalti, cobFalta, cobEscanteio]
}

function toUrlBase64(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromUrlBase64(str: string): string {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  return atob(padded + padding);
}

export function encodeSquad(squad: Squad): string {
  const compact: CompactSquad = {
    f: squad.formation?.id ?? null,
    c: squad.coach?.id ?? null,
    p: squad.slots.map((s) => s.player?.id ?? null),
    r: [
      squad.roles.capitao,
      squad.roles.cobPenalti,
      squad.roles.cobFalta,
      squad.roles.cobEscanteio,
    ],
  };
  return toUrlBase64(JSON.stringify(compact));
}

export function decodeSquad(encoded: string): Squad | null {
  try {
    const compact: CompactSquad = JSON.parse(fromUrlBase64(encoded));

    const formations = formationsData as Formation[];
    const coaches = coachesData as Coach[];
    const players = playersData as Player[];

    const formation = formations.find((f) => f.id === compact.f) ?? null;
    const coach = coaches.find((c) => c.id === compact.c) ?? null;

    const slots = formation
      ? formation.slots.map((slot, i) => ({
          position: slot.position,
          x: slot.x,
          y: slot.y,
          player: players.find((p) => p.id === (compact.p[i] ?? "")) ?? null,
        }))
      : [];

    const roles: SquadRoles = {
      capitao: compact.r[0] ?? null,
      cobPenalti: compact.r[1] ?? null,
      cobFalta: compact.r[2] ?? null,
      cobEscanteio: compact.r[3] ?? null,
    };

    return { formation, coach, slots, roles };
  } catch {
    return null;
  }
}
