"use client";

import { forwardRef } from "react";
import { Squad } from "@/types";

interface ShareCardProps {
  squad: Squad;
  photoMap?: Record<string, string>;
}

const positionOrder = ["GO","ZA","LD","LE","VOL","MLG","MLE","MLD","MAT","SA","PTE","PTD","CA"];

const roleLabels: Record<string, string> = {
  capitao: "C",
  cobPenalti: "P",
  cobFalta: "F",
  cobEscanteio: "E",
};

const ShareCardBroadcast = forwardRef<HTMLDivElement, ShareCardProps>(({ squad, photoMap = {} }, ref) => {
  const filledSlots = squad.slots.filter((s) => s.player);

  const captainId = squad.roles.capitao;
  const captainSlot = captainId ? squad.slots.find((s) => s.player?.id === captainId) : null;
  const featuredSlot =
    captainSlot ??
    [...filledSlots].sort((a, b) => (b.player?.overall ?? 0) - (a.player?.overall ?? 0))[0] ??
    null;

  const sortedSlots = [...filledSlots].sort(
    (a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  const avgAttributes =
    filledSlots.length > 0
      ? (["logica", "comunicacao", "colaboracao", "inovacao", "consistencia"] as const).map((key) => {
          const base = filledSlots.reduce((sum, s) => sum + s.player!.attributes[key], 0) / filledSlots.length;
          const bonus = squad.coach?.bonuses.find((b) => b.attribute === key)?.value ?? 0;
          return { key, value: Math.min(99, Math.round(base + bonus)) };
        })
      : [];

  const overall =
    avgAttributes.length > 0
      ? Math.round(avgAttributes.reduce((s, a) => s + a.value, 0) / avgAttributes.length)
      : 0;

  return (
    <div
      ref={ref}
      style={{
        width: "1080px",
        height: "608px",
        background: "linear-gradient(135deg, #0d0d1a 0%, #0f1f0f 60%, #0d0d1a 100%)",
        fontFamily: "'Barlow Condensed', Arial Narrow, sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Brazilian gradient — bottom left */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "400px", height: "400px", pointerEvents: "none",
        background: "radial-gradient(ellipse at bottom left, rgba(255,213,0,0.18) 0%, rgba(0,156,59,0.13) 38%, rgba(0,39,118,0.10) 65%, transparent 100%)",
      }} />

      {/* Top accent bar */}
      <div style={{ height: "4px", background: "linear-gradient(90deg, #fbbf24, #22c55e, #3b82f6)", flexShrink: 0 }} />

      {/* Header — grid layout keeps MEU TIME centered and prevents wrapping */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "12px 36px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        flexShrink: 0,
        gap: "16px",
      }}>
        {/* Left */}
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Dev Squad Builder
        </div>

        {/* Center — single line guaranteed */}
        <div style={{ fontSize: "42px", fontFamily: "'Bebas Neue', Impact, sans-serif", color: "#fff", letterSpacing: "4px", lineHeight: 1, whiteSpace: "nowrap", textAlign: "center" }}>
          MEU TIME
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", justifyContent: "flex-end" }}>
          {squad.formation && (
            <div style={{ background: "#fbbf24", color: "#000", padding: "5px 14px", borderRadius: "6px", fontSize: "22px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "2px", whiteSpace: "nowrap", flexShrink: 0 }}>
              {squad.formation.name}
            </div>
          )}
          {overall > 0 && (
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ color: "#6b7280", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase" }}>Overall</div>
              <div style={{ color: "#fbbf24", fontSize: "28px", fontFamily: "'Bebas Neue', Impact, sans-serif", lineHeight: 1 }}>{overall}</div>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* Left — mini field + coach */}
        <div style={{
          width: "210px", flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "14px",
          display: "flex", flexDirection: "column", gap: "10px",
        }}>
          {/* Mini field */}
          <div style={{
            flex: 1, background: "rgba(255,255,255,0.02)", borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden",
          }}>
            <svg viewBox="0 0 100 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
              <rect x="3" y="3" width="94" height="144" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <line x1="3" y1="75" x2="97" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <circle cx="50" cy="75" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <rect x="22" y="3" width="56" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              <rect x="22" y="123" width="56" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              {Array.from({ length: 7 }).map((_, i) => (
                <rect key={i} x="3" y={3 + i * 21} width="94" height="10.5"
                  fill={i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"} />
              ))}
            </svg>
            {squad.slots.map((slot, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${slot.x}%`, top: `${slot.y}%`,
                transform: "translate(-50%, -50%)",
              }}>
                {slot.player ? (
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%", overflow: "hidden",
                    border: slot.player.id === featuredSlot?.player?.id ? "2px solid #fbbf24" : "1.5px solid rgba(255,255,255,0.4)",
                    flexShrink: 0,
                  }}>
                    <img
                      src={photoMap[slot.player.id] ?? slot.player.photo}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                ) : (
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.15)" }} />
                )}
              </div>
            ))}
          </div>

          {/* Coach with photo */}
          {squad.coach && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={photoMap[squad.coach.id] ?? squad.coach.photo}
                alt={squad.coach.name}
                style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1.5px solid rgba(251,191,36,0.5)" }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ color: "#6b7280", fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase" }}>Técnico</div>
                <div style={{ color: "#ffffff", fontSize: "15px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "1px", lineHeight: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {squad.coach.name}
                </div>
                <div style={{ color: "#fbbf24", fontSize: "10px", marginTop: "2px", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
                  "{squad.coach.philosophy}"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Center — player list with photos */}
        <div style={{
          flex: 1, padding: "10px 16px",
          display: "flex", flexDirection: "column", gap: "2px",
          overflow: "hidden",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}>
          {sortedSlots.map((slot, i) => {
            if (!slot.player) return null;
            const roleEntry = Object.entries(squad.roles).find(([, id]) => id === slot.player?.id);
            const roleBadge = roleEntry ? roleLabels[roleEntry[0]] : null;
            const isFeatured = slot.player.id === featuredSlot?.player?.id;

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "4px 8px", borderRadius: "5px",
                background: isFeatured ? "rgba(251,191,36,0.10)" : i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
                borderLeft: isFeatured ? "3px solid #fbbf24" : "3px solid transparent",
              }}>
                {/* Player photo */}
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: isFeatured ? "1.5px solid #fbbf24" : "1.5px solid rgba(255,255,255,0.12)" }}>
                  <img
                    src={photoMap[slot.player.id] ?? slot.player.photo}
                    alt={slot.player.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>

                {/* OVR */}
                <div style={{
                  width: "30px", textAlign: "center", flexShrink: 0,
                  color: isFeatured ? "#fbbf24" : "rgba(255,255,255,0.45)",
                  fontSize: "18px", fontFamily: "'Bebas Neue', Impact, sans-serif",
                }}>
                  {slot.player.overall}
                </div>

                {/* Role badge or spacer */}
                {roleBadge ? (
                  <div style={{
                    width: "16px", height: "16px", borderRadius: "50%", flexShrink: 0,
                    background: "#fbbf24", color: "#000",
                    fontSize: "8px", fontWeight: 900,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {roleBadge}
                  </div>
                ) : (
                  <div style={{ width: "16px", flexShrink: 0 }} />
                )}

                {/* Name */}
                <div style={{
                  flex: 1,
                  color: isFeatured ? "#ffffff" : "rgba(255,255,255,0.82)",
                  fontSize: "16px",
                  fontWeight: isFeatured ? 700 : 400,
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {slot.player.name.toUpperCase()}
                </div>

                {/* Position */}
                <div style={{
                  flexShrink: 0, color: "#6b7280",
                  fontSize: "11px", letterSpacing: "1px",
                }}>
                  {slot.position}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — featured player photo */}
        {featuredSlot?.player && (
          <div style={{ width: "256px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <img
              src={photoMap[featuredSlot.player.id] ?? featuredSlot.player.photo}
              alt={featuredSlot.player.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
            />
            {/* Gradient overlays */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(13,13,26,0.55) 0%, transparent 35%), linear-gradient(to bottom, transparent 45%, rgba(13,13,26,0.95) 100%)",
            }} />
            {/* Player info */}
            <div style={{ position: "absolute", bottom: "16px", left: "14px", right: "14px" }}>
              <div style={{ color: "#fbbf24", fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase" }}>
                {featuredSlot.position}
              </div>
              <div style={{ color: "#ffffff", fontSize: "20px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "2px", lineHeight: 1, marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {featuredSlot.player.name}
              </div>
              <div style={{ color: "#fbbf24", fontSize: "36px", fontFamily: "'Bebas Neue', Impact, sans-serif", lineHeight: 1 }}>
                {featuredSlot.player.overall}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "8px 36px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center",
        flexShrink: 0,
        gap: "12px",
      }}>
        <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(255,255,255,0.22)", fontSize: "10px", letterSpacing: "0.3px" }}>
          #DevSquadBuilder · #BolhaDev · #CopaDoMundo2026 · #UltimateTeam · #Gamification
        </div>
        <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "10px", flexShrink: 0 }}>
          devsquadbuilder.vercel.app
        </div>
      </div>
    </div>
  );
});

ShareCardBroadcast.displayName = "ShareCardBroadcast";
export default ShareCardBroadcast;
