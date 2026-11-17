import type { WorkshopRaisedPetItem } from "../items/item";
import {
  PET_EXP_PER_MINUTE,
  PET_HP_BY_RANK,
  formatPetBonusTotal,
  nextRank,
  rollStatTier,
  statBonusForLevel,
} from "../pets/rank-tables";
import { speciesDef } from "../pets/species";
import type { PetRank, PetStatTier } from "../pets/types";
import { equippedItem } from "../workshop/inventory";
import { isRaisedPetItem } from "../items/item";

const FEED_HP = 2;
const CRAFT_FEED_YIELD = 50;
const CRAFT_HEART_COST = 5;
const CRAFT_STEM_COST = 3;
const ADVANCE_EXP_REQUIRED = 99.99;
const MAX_STAT_LEVEL = 9;

export function getEquippedRaisedPet(): WorkshopRaisedPetItem | undefined {
  return isRaisedPetItem(equippedItem) ? equippedItem : undefined;
}

function assertRaisedPet(pet: WorkshopRaisedPetItem): void {
  if (pet.statLevel < 1 || pet.statLevel > MAX_STAT_LEVEL) {
    throw new Error(`Pet "${pet.id}": statLevel inválido`);
  }
}

export function syncRaisedPetStats(pet: WorkshopRaisedPetItem): void {
  assertRaisedPet(pet);
  const def = speciesDef(pet.species);
  const tierLines = pet.statTiers.map((tier, i) => {
    const val = statBonusForLevel(pet.species, i + 1, tier);
    return `Lv${i + 1} (${tier}): +${val} ${def.bonusStat}`;
  });
  pet.hpMax = PET_HP_BY_RANK[pet.rank];
  pet.upgradeBadge = `${pet.rank} · Lv${pet.statLevel}`;
  pet.stats = [
    { label: "Species", value: def.displayName },
    { label: "Rank", value: pet.rank },
    { label: "Stat level", value: `${pet.statLevel} / ${MAX_STAT_LEVEL}` },
    {
      label: "Rank EXP",
      value: pet.rank === "S" ? "—" : `${pet.rankExpPercent.toFixed(2)}%`,
    },
    { label: "HP", value: `${pet.hp} / ${pet.hpMax}` },
    { label: "Lives", value: String(pet.lives) },
    { label: "Total bonus", value: formatPetBonusTotal(pet.species, pet.statTiers) },
    {
      label: "Stat rolls",
      value: "",
      values: tierLines.length ? tierLines : ["—"],
    },
    { label: "Summoned", value: pet.summoned ? "Yes" : "No" },
  ];
}

export function craftPetFeed(pet: WorkshopRaisedPetItem, batches = 1): { ok: boolean; message: string } {
  const inv = pet.workshopPet.inventory;
  const heartCost = CRAFT_HEART_COST * batches;
  const stemCost = CRAFT_STEM_COST * batches;
  if (inv.questDrops.monsterHeart < heartCost || inv.questDrops.stem < stemCost) {
    return { ok: false, message: "Not enough quest drops at Pet Tamer." };
  }
  inv.questDrops.monsterHeart -= heartCost;
  inv.questDrops.stem -= stemCost;
  inv.petFeed += CRAFT_FEED_YIELD * batches;
  return { ok: true, message: `Crafted ${CRAFT_FEED_YIELD * batches} Pet Feed.` };
}

export function givePetFeed(
  pet: WorkshopRaisedPetItem,
  count = 1,
): { ok: boolean; message: string } {
  const inv = pet.workshopPet.inventory;
  if (inv.petFeed < count) {
    return { ok: false, message: "No Pet Feed in inventory." };
  }
  inv.petFeed -= count;
  pet.hp = Math.min(pet.hpMax, pet.hp + count * FEED_HP);

  if (pet.summoned && pet.rank !== "S") {
    const rate = PET_EXP_PER_MINUTE[pet.rank as Exclude<PetRank, "S">];
    pet.rankExpPercent = Math.min(
      ADVANCE_EXP_REQUIRED,
      pet.rankExpPercent + rate * count * 0.4,
    );
  }

  syncRaisedPetStats(pet);
  return { ok: true, message: `Fed ${count}× Pet Feed (+${count * FEED_HP} HP).` };
}

export function advancePetStatLevel(
  pet: WorkshopRaisedPetItem,
): { ok: boolean; message: string } {
  if (pet.statLevel >= MAX_STAT_LEVEL) {
    return { ok: false, message: "Stat level already max (9)." };
  }
  if (pet.rankExpPercent < ADVANCE_EXP_REQUIRED) {
    return {
      ok: false,
      message: `Needs ${ADVANCE_EXP_REQUIRED}% rank EXP (Pet Tamer quest).`,
    };
  }

  const newLevel = pet.statLevel + 1;
  const tier = rollStatTier(newLevel, pet.rank);
  pet.statLevel = newLevel;
  pet.statTiers = [...pet.statTiers, tier];
  pet.rankExpPercent = 0;

  syncRaisedPetStats(pet);
  const def = speciesDef(pet.species);
  const val = statBonusForLevel(pet.species, newLevel, tier);
  return {
    ok: true,
    message: `Stat level ${newLevel}: rolled ${tier} → +${val} ${def.bonusStat}.`,
  };
}

export function promotePetRank(pet: WorkshopRaisedPetItem): { ok: boolean; message: string } {
  if (pet.rank === "S") {
    return { ok: false, message: "Already rank S." };
  }
  if (pet.rankExpPercent < ADVANCE_EXP_REQUIRED) {
    return { ok: false, message: `Needs ${ADVANCE_EXP_REQUIRED}% EXP to promote rank.` };
  }
  const n = nextRank(pet.rank);
  if (!n) return { ok: false, message: "Cannot promote." };
  pet.rank = n;
  pet.rankExpPercent = 0;
  pet.hp = Math.min(pet.hp, PET_HP_BY_RANK[n]);
  syncRaisedPetStats(pet);
  return { ok: true, message: `Rank promoted to ${n}.` };
}

export function rerollLastStatTier(
  pet: WorkshopRaisedPetItem,
  mode: "blessing" | "chance",
): { ok: boolean; message: string } {
  const inv = pet.workshopPet.inventory;
  if (mode === "blessing") {
    if (inv.blessingOfTamer < 1) return { ok: false, message: "No Blessing of the Pet Tamer." };
    inv.blessingOfTamer -= 1;
    if (pet.statTiers.length === 0) return { ok: false, message: "No stat rolls yet." };
    const level = pet.statTiers.length;
    const tier = rollStatTier(level, pet.rank);
    pet.statTiers = [...pet.statTiers.slice(0, -1), tier];
  } else {
    if (inv.chanceOfTamer < 1) return { ok: false, message: "No Chance of the Pet Tamer." };
    inv.chanceOfTamer -= 1;
    if (pet.statTiers.length < 2) return { ok: false, message: "Need at least 2 stat levels." };
    const lastIdx = pet.statTiers.length - 1;
    const prevIdx = lastIdx - 1;
    const tiers: PetStatTier[] = [...pet.statTiers];
    tiers[prevIdx] = rollStatTier(prevIdx + 1, pet.rank);
    tiers[lastIdx] = rollStatTier(lastIdx + 1, pet.rank);
    pet.statTiers = tiers;
  }
  syncRaisedPetStats(pet);
  return { ok: true, message: "Stat roll updated." };
}

export function revertLastStatLevel(
  pet: WorkshopRaisedPetItem,
): { ok: boolean; message: string } {
  const inv = pet.workshopPet.inventory;
  if (inv.reversionScroll < 1) {
    return { ok: false, message: "No Scroll of Pet Reversion." };
  }
  if (pet.statLevel <= 1 || pet.statTiers.length <= 1) {
    return { ok: false, message: "Nothing to revert." };
  }
  inv.reversionScroll -= 1;
  pet.statLevel -= 1;
  pet.statTiers = pet.statTiers.slice(0, -1);
  syncRaisedPetStats(pet);
  return { ok: true, message: "Reverted last stat level (scroll consumed)." };
}

export function togglePetSummoned(pet: WorkshopRaisedPetItem): void {
  pet.summoned = !pet.summoned;
  syncRaisedPetStats(pet);
}