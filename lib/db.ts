import { createClient } from "./supabase";
import type { Squad, Player, Coach } from "@/types";

export interface CustomData {
  customPlayers: Player[];
  customCoaches: Coach[];
  deletedPlayerIds: string[];
  deletedCoachIds: string[];
}

export async function loadUserSquad(): Promise<Squad | null> {
  const { data } = await createClient()
    .from("squads")
    .select("squad_data")
    .maybeSingle();
  return (data?.squad_data as Squad) ?? null;
}

export async function saveUserSquad(userId: string, squad: Squad): Promise<void> {
  await createClient().from("squads").upsert({
    user_id: userId,
    squad_data: squad,
  });
}

export async function loadUserCustomData(): Promise<CustomData | null> {
  const { data } = await createClient()
    .from("user_data")
    .select("custom_data")
    .maybeSingle();
  return (data?.custom_data as CustomData) ?? null;
}

export async function saveUserCustomData(userId: string, data: CustomData): Promise<void> {
  await createClient().from("user_data").upsert({
    user_id: userId,
    custom_data: data,
  });
}
