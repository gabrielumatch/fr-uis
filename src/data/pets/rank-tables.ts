import type { PetRank, PetStatTier, RaisedPetSpecies } from "./types";
import { speciesDef } from "./species";

const RANK_ORDER: PetRank[] = ["D", "C", "B", "A", "S"];

/** HP máximo do pet no rank (wiki BR). */
export const PET_HP_BY_RANK: Record<PetRank, number> = {
  D: 180,
  C: 300,
  B: 420,
  A: 600,
  S: 1500,
};

/** % EXP por minuto convocado (antes de S). */
export const PET_EXP_PER_MINUTE: Record<Exclude<PetRank, "S">, number> = {
  D: 0.25,
  C: 0.12,
  B: 0.06,
  A: 0.03,
};

/** Bônus por stat level — valores representativos (Lion/STA, wiki). */
const LION_STA_BY_LEVEL: Record<number, Record<PetStatTier, number>> = {
  1: { D: 1, C: 1, B: 1, A: 1, S: 1 },
  2: { D: 0, C: 3, B: 3, A: 3, S: 3 },
  3: { D: 0, C: 5, B: 5, A: 5, S: 5 },
  4: { D: 0, C: 0, B: 10, A: 10, S: 10 },
  5: { D: 0, C: 0, B: 15, A: 15, S: 15 },
  6: { D: 0, C: 0, B: 0, A: 18, S: 18 },
  7: { D: 0, C: 0, B: 0, A: 29, S: 29 },
  8: { D: 0, C: 0, B: 0, A: 0, S: 35 },
  9: { D: 0, C: 0, B: 0, A: 0, S: 50 },
};

/** Outras espécies usam a mesma escala relativa no mock (só muda o rótulo). */
export function statBonusForLevel(
  species: RaisedPetSpecies,
  statLevel: number,
  tier: PetStatTier,
): number {
  const table = LION_STA_BY_LEVEL[statLevel];
  if (!table) return 0;
  const value = table[tier];
  if (value > 0) return value;
  void species;
  return 0;
}

export function totalRaisedPetBonus(
  species: RaisedPetSpecies,
  statTiers: PetStatTier[],
): number {
  let sum = 0;
  statTiers.forEach((tier, i) => {
    sum += statBonusForLevel(species, i + 1, tier);
  });
  return sum;
}

export function formatPetBonusTotal(species: RaisedPetSpecies, statTiers: PetStatTier[]): string {
  const stat = speciesDef(species).bonusStat;
  const total = totalRaisedPetBonus(species, statTiers);
  return `+${total} ${stat}`;
}

/** Tiers possíveis ao subir stat level N no rank atual (wiki evolution table, simplificado). */
export function allowedTiersForStatLevel(statLevel: number, rank: PetRank): PetStatTier[] {
  const rankIndex = RANK_ORDER.indexOf(rank);
  const minTierIndex = Math.max(0, Math.min(rankIndex, statLevel <= 3 ? 0 : statLevel <= 5 ? 1 : statLevel <= 7 ? 2 : 3));
  return RANK_ORDER.slice(minTierIndex) as PetStatTier[];
}

export function nextRank(rank: PetRank): PetRank | null {
  const i = RANK_ORDER.indexOf(rank);
  if (i < 0 || i >= RANK_ORDER.length - 1) return null;
  return RANK_ORDER[i + 1]!;
}

export function rollStatTier(statLevel: number, rank: PetRank): PetStatTier {
  const allowed = allowedTiersForStatLevel(statLevel, rank);
  return allowed[Math.floor(Math.random() * allowed.length)] ?? "D";
}