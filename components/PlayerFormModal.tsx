"use client";

import { useState } from "react";
import { Player, Position, Role, PlayerAttributes } from "@/types";

const POSITIONS: Position[] = [
  "GO","ZA","LE","LD","VOL","MLG","MLE","MLD","MAT","SA","PTE","PTD","CA",
];

const ROLES: Role[] = [
  "Backend Dev","Frontend Dev","Fullstack Dev","DevRel",
  "Open Source Contributor","Tech Lead","Arquiteto de Software",
  "Influencer Dev","YouTuber Dev","Pesquisador","CTO",
];

const ATTR_LABELS: Record<keyof PlayerAttributes, string> = {
  logica: "LGC",
  comunicacao: "COM",
  colaboracao: "COL",
  inovacao: "INV",
  consistencia: "CST",
};

interface Props {
  initial?: Player;
  onSave: (player: Omit<Player, "id"> | Player) => void;
  onClose: () => void;
}

function calcOverall(attrs: PlayerAttributes): number {
  const vals = Object.values(attrs);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

const DEFAULT_ATTRS: PlayerAttributes = {
  logica: 70,
  comunicacao: 70,
  colaboracao: 70,
  inovacao: 70,
  consistencia: 70,
};

export default function PlayerFormModal({ initial, onSave, onClose }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [handle, setHandle] = useState(
    initial?.handle?.replace("@", "") ?? ""
  );
  const [photo, setPhoto] = useState(initial?.photo ?? "");
  const [role, setRole] = useState<Role>(initial?.role ?? "Fullstack Dev");
  const [positions, setPositions] = useState<Position[]>(
    initial?.positions ?? []
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [attrs, setAttrs] = useState<PlayerAttributes>(
    initial?.attributes ?? DEFAULT_ATTRS
  );

  const overall = calcOverall(attrs);
  const canSubmit = name.trim().length > 0 && handle.trim().length > 0 && positions.length > 0;

  const togglePosition = (pos: Position) => {
    setPositions((prev) =>
      prev.includes(pos) ? prev.filter((p) => p !== pos) : [...prev, pos]
    );
  };

  const setAttr = (key: keyof PlayerAttributes, val: number) => {
    setAttrs((prev) => ({ ...prev, [key]: Math.max(1, Math.min(99, val)) }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const cleanHandle = handle.trim().replace("@", "");
    const playerData: Omit<Player, "id"> = {
      name: name.trim(),
      handle: `@${cleanHandle}`,
      photo: photo.trim() || `https://unavatar.io/${cleanHandle}`,
      role,
      positions,
      nationality: "BR",
      attributes: attrs,
      overall,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSave(initial ? { ...playerData, id: initial.id } : playerData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <h2 className="text-white font-bold text-sm">
            {initial ? "Editar Jogador" : "Novo Jogador"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Name + Handle */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs block mb-1">Nome *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1">Handle *</label>
              <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden focus-within:border-yellow-400/50">
                <span className="pl-3 text-gray-500 text-xs">@</span>
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace("@", ""))}
                  placeholder="joaosilva"
                  className="flex-1 bg-transparent py-2 px-2 text-white text-xs placeholder-gray-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-gray-400 text-xs block mb-1">
              URL da Foto{" "}
              <span className="text-gray-600">(opcional — usa o handle se vazio)</span>
            </label>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-gray-400 text-xs block mb-1">Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-yellow-400/50"
            >
              {ROLES.map((r) => (
                <option key={r} value={r} className="bg-[#0d0d1a]">
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Positions */}
          <div>
            <label className="text-gray-400 text-xs block mb-2">
              Posições *{" "}
              <span className="text-gray-600">(selecione ao menos uma)</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => togglePosition(pos)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-all ${
                    positions.includes(pos)
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Attributes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-400 text-xs">Atributos</label>
              <span className="text-yellow-400 text-xs font-black">OVR {overall}</span>
            </div>
            <div className="space-y-2.5">
              {(Object.entries(attrs) as [keyof PlayerAttributes, number][]).map(
                ([key, val]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-gray-400 text-[10px] w-7 shrink-0">
                      {ATTR_LABELS[key]}
                    </span>
                    <input
                      type="range"
                      min={1}
                      max={99}
                      value={val}
                      onChange={(e) => setAttr(key, Number(e.target.value))}
                      className="flex-1 accent-yellow-400 h-1"
                    />
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={val}
                      onChange={(e) => setAttr(key, Number(e.target.value))}
                      className="w-11 bg-white/5 border border-white/10 rounded px-1 py-1 text-white text-[11px] text-center focus:outline-none"
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-gray-400 text-xs block mb-1">
              Tags{" "}
              <span className="text-gray-600">(separadas por vírgula)</span>
            </label>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, YouTube"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 py-4 border-t border-white/10 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-semibold py-2.5 rounded-xl border border-white/10 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-30 disabled:cursor-not-allowed text-black text-sm font-bold py-2.5 rounded-xl transition-all"
          >
            {initial ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
}
