"use client";

import { useState } from "react";
import { Coach, CoachBonus, PlayerAttributes } from "@/types";

const ATTR_OPTIONS: { key: keyof PlayerAttributes; label: string }[] = [
  { key: "logica", label: "LGC – Lógica" },
  { key: "comunicacao", label: "COM – Comunicação" },
  { key: "colaboracao", label: "COL – Colaboração" },
  { key: "inovacao", label: "INV – Inovação" },
  { key: "consistencia", label: "CST – Consistência" },
];

const ATTR_ABBREV: Record<keyof PlayerAttributes, string> = {
  logica: "LGC",
  comunicacao: "COM",
  colaboracao: "COL",
  inovacao: "INV",
  consistencia: "CST",
};

interface Props {
  initial?: Coach;
  onSave: (coach: Omit<Coach, "id"> | Coach) => void;
  onClose: () => void;
}

function makeBonus(attr: keyof PlayerAttributes, value: number): CoachBonus {
  return { attribute: attr, value, description: `${value} ${ATTR_ABBREV[attr]}` };
}

export default function CoachFormModal({ initial, onSave, onClose }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [handle, setHandle] = useState(
    initial?.handle?.replace("@", "") ?? ""
  );
  const [photo, setPhoto] = useState(initial?.photo ?? "");
  const [philosophy, setPhilosophy] = useState(initial?.philosophy ?? "");
  const [bonus1, setBonus1] = useState<CoachBonus>(
    initial?.bonuses[0] ?? makeBonus("logica", 5)
  );
  const [bonus2, setBonus2] = useState<CoachBonus>(
    initial?.bonuses[1] ?? makeBonus("comunicacao", 5)
  );

  const canSubmit =
    name.trim().length > 0 &&
    handle.trim().length > 0 &&
    philosophy.trim().length > 0;

  const updateBonus = (
    setter: (b: CoachBonus) => void,
    current: CoachBonus,
    field: "attribute" | "value",
    val: string | number
  ) => {
    const updated: CoachBonus = { ...current, [field]: val };
    updated.description = `${updated.value} ${ATTR_ABBREV[updated.attribute]}`;
    setter(updated);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const cleanHandle = handle.trim().replace("@", "");
    const coachData: Omit<Coach, "id"> = {
      name: name.trim(),
      handle: `@${cleanHandle}`,
      photo: photo.trim() || `https://unavatar.io/${cleanHandle}`,
      philosophy: philosophy.trim(),
      bonuses: [
        { ...bonus1, description: `${bonus1.value} ${ATTR_ABBREV[bonus1.attribute]}` },
        { ...bonus2, description: `${bonus2.value} ${ATTR_ABBREV[bonus2.attribute]}` },
      ],
    };
    onSave(initial ? { ...coachData, id: initial.id } : coachData);
    onClose();
  };

  const BonusRow = ({
    bonus,
    onChange,
    label,
  }: {
    bonus: CoachBonus;
    onChange: (field: "attribute" | "value", val: string | number) => void;
    label: string;
  }) => (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-xs w-5 shrink-0">{label}</span>
      <select
        value={bonus.attribute}
        onChange={(e) => onChange("attribute", e.target.value)}
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-xs focus:outline-none focus:border-yellow-400/50"
      >
        {ATTR_OPTIONS.map((a) => (
          <option key={a.key} value={a.key} className="bg-[#0d0d1a]">
            {a.label}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-1 shrink-0">
        <span className="text-green-400 text-xs font-bold">+</span>
        <input
          type="number"
          min={1}
          max={15}
          value={bonus.value}
          onChange={(e) => onChange("value", Math.max(1, Math.min(15, Number(e.target.value))))}
          className="w-12 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-xs text-center focus:outline-none"
        />
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0d0d1a] border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <h2 className="text-white font-bold text-sm">
            {initial ? "Editar Técnico" : "Novo Técnico"}
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
                placeholder="Ex: Dev Coach"
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
                  placeholder="devcoach"
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

          {/* Philosophy */}
          <div>
            <label className="text-gray-400 text-xs block mb-1">Filosofia *</label>
            <input
              value={philosophy}
              onChange={(e) => setPhilosophy(e.target.value)}
              placeholder="Ex: Código limpo é responsabilidade"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-xs placeholder-gray-600 focus:outline-none focus:border-yellow-400/50"
            />
          </div>

          {/* Bonuses */}
          <div>
            <label className="text-gray-400 text-xs block mb-2">
              Bônus{" "}
              <span className="text-gray-600">(2 atributos, máx +15 cada)</span>
            </label>
            <div className="space-y-2">
              <BonusRow
                bonus={bonus1}
                label="1."
                onChange={(f, v) => updateBonus(setBonus1, bonus1, f, v)}
              />
              <BonusRow
                bonus={bonus2}
                label="2."
                onChange={(f, v) => updateBonus(setBonus2, bonus2, f, v)}
              />
            </div>
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
