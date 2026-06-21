export type Position =
  | "GO"
  | "ZA"
  | "LE"
  | "LD"
  | "VOL"
  | "MLG"
  | "MLE"
  | "MLD"
  | "MAT"
  | "SA"
  | "PTE"
  | "PTD"
  | "CA";

export type Role =
  | "Backend Dev"
  | "Frontend Dev"
  | "Fullstack Dev"
  | "DevRel"
  | "Open Source Contributor"
  | "Tech Lead"
  | "Arquiteto de Software"
  | "Influencer Dev"
  | "YouTuber Dev"
  | "Pesquisador"
  | "CTO";

export interface PlayerAttributes {
  logica: number;
  comunicacao: number;
  colaboracao: number;
  inovacao: number;
  consistencia: number;
}

export interface Player {
  id: string;
  name: string;
  handle: string;
  photo: string;
  role: Role;
  positions: Position[];
  nationality: string;
  attributes: PlayerAttributes;
  overall: number;
  tags: string[];
}

export interface FormationSlot {
  position: Position;
  x: number;
  y: number;
}

export interface Formation {
  id: string;
  name: string;
  slots: FormationSlot[];
}

export interface CoachBonus {
  attribute: keyof PlayerAttributes;
  value: number;
  description: string;
}

export interface Coach {
  id: string;
  name: string;
  handle: string;
  photo: string;
  philosophy: string;
  bonuses: CoachBonus[];
}

export interface SquadSlot {
  position: Position;
  x: number;
  y: number;
  player: Player | null;
}

export interface SquadRoles {
  capitao: string | null;
  cobPenalti: string | null;
  cobFalta: string | null;
  cobEscanteio: string | null;
}

export type SquadRoleKey = keyof SquadRoles;

export interface Squad {
  formation: Formation | null;
  coach: Coach | null;
  slots: SquadSlot[];
  roles: SquadRoles;
}
