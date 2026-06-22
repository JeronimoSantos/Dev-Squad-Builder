"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useSquadStore } from "@/store/squadStore";
import { useCustomDataStore } from "@/store/customDataStore";
import {
  loadUserSquad,
  saveUserSquad,
  loadUserCustomData,
  saveUserCustomData,
} from "@/lib/db";

export default function SyncProvider() {
  const { user } = useAuthStore();
  const squad = useSquadStore((s) => s.squad);
  const customPlayers = useCustomDataStore((s) => s.customPlayers);
  const customCoaches = useCustomDataStore((s) => s.customCoaches);
  const deletedPlayerIds = useCustomDataStore((s) => s.deletedPlayerIds);
  const deletedCoachIds = useCustomDataStore((s) => s.deletedCoachIds);

  const [squadReady, setSquadReady] = useState(false);
  const [customReady, setCustomReady] = useState(false);
  const squadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const customTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On login: load user data from Supabase; on logout: stop syncing
  useEffect(() => {
    if (!user) {
      setSquadReady(false);
      setCustomReady(false);
      return;
    }

    const currentSquad = useSquadStore.getState().squad;
    const currentCustom = useCustomDataStore.getState();

    loadUserSquad().then((cloudSquad) => {
      if (cloudSquad) {
        useSquadStore.setState({ squad: cloudSquad });
      } else {
        saveUserSquad(user.id, currentSquad);
      }
      setSquadReady(true);
    });

    loadUserCustomData().then((cloudData) => {
      if (cloudData) {
        useCustomDataStore.setState(cloudData);
      } else {
        saveUserCustomData(user.id, {
          customPlayers: currentCustom.customPlayers,
          customCoaches: currentCustom.customCoaches,
          deletedPlayerIds: currentCustom.deletedPlayerIds,
          deletedCoachIds: currentCustom.deletedCoachIds,
        });
      }
      setCustomReady(true);
    });
  }, [user?.id]);

  // Debounced squad save (1.5s)
  useEffect(() => {
    if (!user || !squadReady) return;
    if (squadTimer.current) clearTimeout(squadTimer.current);
    squadTimer.current = setTimeout(() => {
      saveUserSquad(user.id, squad);
    }, 1500);
    return () => {
      if (squadTimer.current) clearTimeout(squadTimer.current);
    };
  }, [squad, user, squadReady]);

  // Debounced custom data save (1s)
  useEffect(() => {
    if (!user || !customReady) return;
    if (customTimer.current) clearTimeout(customTimer.current);
    customTimer.current = setTimeout(() => {
      saveUserCustomData(user.id, {
        customPlayers,
        customCoaches,
        deletedPlayerIds,
        deletedCoachIds,
      });
    }, 1000);
    return () => {
      if (customTimer.current) clearTimeout(customTimer.current);
    };
  }, [customPlayers, customCoaches, deletedPlayerIds, deletedCoachIds, user, customReady]);

  return null;
}
