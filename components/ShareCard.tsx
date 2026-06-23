"use client";

import { forwardRef } from "react";
import { Squad } from "@/types";

interface ShareCardProps {
  squad: Squad;
  photoMap?: Record<string, string>;
}

const attributeLabels: Record<string, string> = {
  logica: "Lógica",
  comunicacao: "Comunicação",
  colaboracao: "Colaboração",
  inovacao: "Inovação",
  consistencia: "Consistência",
};

const attributeColors: Record<string, string> = {
  logica: "#3b82f6",
  comunicacao: "#22c55e",
  colaboracao: "#eab308",
  inovacao: "#a855f7",
  consistencia: "#ef4444",
};

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ squad, photoMap = {} }, ref) => {
  const filledSlots = squad.slots.filter((s) => s.player);

  const avgAttributes = filledSlots.length > 0
    ? (["logica", "comunicacao", "colaboracao", "inovacao", "consistencia"] as const).map((key) => {
        const base = filledSlots.reduce((sum, s) => sum + s.player!.attributes[key], 0) / filledSlots.length;
        const bonus = squad.coach?.bonuses.find((b) => b.attribute === key)?.value ?? 0;
        return { key, value: Math.min(99, Math.round(base + bonus)) };
      })
    : [];

  const overall = avgAttributes.length > 0
    ? Math.round(avgAttributes.reduce((s, a) => s + a.value, 0) / avgAttributes.length)
    : 0;

  const roleLabels: Record<string, string> = {
    capitao: "C",
    cobPenalti: "P",
    cobFalta: "F",
    cobEscanteio: "E",
  };

  return (
    <div
      ref={ref}
      style={{
        width: "1080px",
        height: "1080px",
        background: "linear-gradient(135deg, #0d0d1a 0%, #0f1f0f 50%, #0d0d1a 100%)",
        fontFamily: "'Barlow Condensed', Arial Narrow, sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Brazilian gradient — bottom left accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: "520px", height: "520px", pointerEvents: "none",
        background: "radial-gradient(ellipse at bottom left, rgba(255,213,0,0.18) 0%, rgba(0,156,59,0.13) 38%, rgba(0,39,118,0.10) 65%, transparent 100%)",
      }} />


      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", position: "relative" }}>
        <div>
          <div style={{ fontSize: "13px", letterSpacing: "5px", color: "#fbbf24", fontWeight: 700, textTransform: "uppercase", marginBottom: "2px", fontFamily: "'Barlow Condensed', sans-serif", whiteSpace: "nowrap" }}>
            Dev Squad Builder
          </div>
          <div style={{ fontSize: "58px", fontWeight: 400, color: "#ffffff", lineHeight: 1, letterSpacing: "3px", fontFamily: "'Bebas Neue', Impact, sans-serif", whiteSpace: "nowrap" }}>
            MEU TIME
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {squad.formation && (
            <div style={{ background: "#fbbf24", color: "#000", padding: "8px 18px", borderRadius: "8px", fontSize: "30px", fontWeight: 400, display: "inline-block", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "2px", whiteSpace: "nowrap" }}>
              {squad.formation.name}
            </div>
          )}
          {overall > 0 && (
            <div style={{ marginTop: "6px", color: "#ffffff", fontSize: "13px", opacity: 0.6, fontFamily: "'Barlow Condensed', sans-serif", whiteSpace: "nowrap" }}>
              Overall médio: <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "22px", fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "1px" }}>{overall}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", gap: "40px", flex: 1, position: "relative" }}>
        {/* Field */}
        <div style={{
          flex: "0 0 460px",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Field SVG */}
          <svg viewBox="0 0 100 150" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="none">
            <rect x="3" y="3" width="94" height="144" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <line x1="3" y1="75" x2="97" y2="75" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="50" cy="75" r="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <circle cx="50" cy="75" r="1" fill="rgba(255,255,255,0.2)" />
            <rect x="22" y="3" width="56" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <rect x="36" y="3" width="28" height="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <rect x="22" y="123" width="56" height="24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <rect x="36" y="137" width="28" height="10" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x="3" y={3 + i * 21} width="94" height="10.5"
                fill={i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"} />
            ))}
          </svg>

          {/* Players */}
          {squad.slots.map((slot, i) => {
            const roleEntry = Object.entries(squad.roles).find(([, id]) => id === slot.player?.id);
            const roleBadge = roleEntry ? roleLabels[roleEntry[0]] : null;

            return (
              <div key={i} style={{
                position: "absolute",
                left: `${slot.x}%`,
                top: `${slot.y}%`,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}>
                {slot.player ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      border: "2.5px solid rgba(251,191,36,0.9)",
                      position: "relative",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.7)",
                      overflow: "visible",
                    }}>
                      {/* Photo */}
                      <img
                        src={photoMap[slot.player.id] ?? slot.player.photo}
                        alt={slot.player.name}
                        style={{
                          width: "52px", height: "52px", borderRadius: "50%",
                          objectFit: "cover", display: "block",
                        }}
                      />
                      {/* Overall badge */}
                      <div style={{
                        position: "absolute", bottom: "-5px", left: "-5px",
                        width: "22px", height: "22px", borderRadius: "50%",
                        background: "#0d0d1a", border: "1.5px solid #fbbf24",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ color: "#fbbf24", fontSize: "9px", fontWeight: 900 }}>
                          {slot.player.overall}
                        </span>
                      </div>
                      {/* Role badge */}
                      {roleBadge && (
                        <div style={{
                          position: "absolute", top: "-5px", right: "-5px",
                          width: "20px", height: "20px", borderRadius: "50%",
                          background: "#fbbf24", color: "#000",
                          fontSize: "9px", fontWeight: 900,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          {roleBadge}
                        </div>
                      )}
                    </div>
                    <div style={{
                      background: "rgba(0,0,0,0.80)", backdropFilter: "blur(4px)",
                      padding: "3px 8px", borderRadius: "5px",
                      maxWidth: "84px",
                    }}>
                      <div style={{ color: "#ffffff", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {slot.player.name.split(" ")[0]}
                      </div>
                      <div style={{ color: "#fbbf24", fontSize: "9px" }}>{slot.position}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "50%",
                    border: "1.5px dashed rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "8px" }}>{slot.position}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Coach */}
          {squad.coach && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "22px",
            }}>
              <div style={{ color: "#9ca3af", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px" }}>
                Técnico
              </div>
              <div style={{ color: "#ffffff", fontSize: "30px", fontWeight: 400, fontFamily: "'Bebas Neue', Impact, sans-serif", letterSpacing: "2px" }}>
                {squad.coach.name}
              </div>
              <div style={{ color: "#fbbf24", fontSize: "14px", marginTop: "5px" }}>
                "{squad.coach.philosophy}"
              </div>
            </div>
          )}

          {/* Stats */}
          {avgAttributes.length > 0 && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "22px", flex: 1,
            }}>
              <div style={{ color: "#9ca3af", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "18px" }}>
                Atributos
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {avgAttributes.map(({ key, value }) => (
                  <div key={key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                      <span style={{ color: "#d1d5db", fontSize: "14px" }}>{attributeLabels[key]}</span>
                      <span style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700 }}>{value}</span>
                    </div>
                    <div style={{ height: "8px", background: "rgba(255,255,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: "4px",
                        width: `${value}%`,
                        background: attributeColors[key],
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roles */}
          {Object.values(squad.roles).some(Boolean) && (
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px", padding: "22px",
            }}>
              <div style={{ color: "#9ca3af", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "14px" }}>
                Funções
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(["capitao", "cobPenalti", "cobFalta", "cobEscanteio"] as const).map((key) => {
                  const id = squad.roles[key];
                  const player = squad.slots.find((s) => s.player?.id === id)?.player;
                  if (!player) return null;
                  const labels: Record<string, string> = {
                    capitao: "Capitão",
                    cobPenalti: "Pênalti",
                    cobFalta: "Falta",
                    cobEscanteio: "Escanteio",
                  };
                  return (
                    <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#6b7280", fontSize: "13px" }}>{labels[key]}</span>
                      <span style={{ color: "#fbbf24", fontSize: "13px", fontWeight: 700 }}>{player.name.split(" ")[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "24px", paddingTop: "16px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative",
      }}>
        <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", letterSpacing: "0.5px" }}>
          #DevSquadBuilder · #BolhaDev · #CopaDoMundo2026 · #UltimateTeam · #Gamification
        </div>
        <div style={{ color: "rgba(255,255,255,0.15)", fontSize: "12px", flexShrink: 0, marginLeft: "16px" }}>
          devsquadbuilder.vercel.app
        </div>
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
export default ShareCard;
