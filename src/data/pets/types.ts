/** Pet de status (ovo / raised) — workshop próprio. Pick-up não entra aqui. */

export type RaisedPetSpecies =
  | "lion"
  | "tiger"
  | "fox"
  | "rabbit"
  | "unicorn"
  | "griffin"
  | "dragon";

export type PetRank = "D" | "C" | "B" | "A" | "S";

export type PetStatTier = PetRank;

export type RaisedPetRecord = {
  species: RaisedPetSpecies;
  rank: PetRank;
  /** Nível de stat 1–9 (quests no Pet Tamer). */
  statLevel: number;
  /** EXP do rank atual (0–99.99) enquanto convocado + feed. */
  rankExpPercent: number;
  hp: number;
  lives: number;
  summoned?: boolean;
  /** Tier rolado por stat level (índice 0 = nível 1). */
  statTiers: PetStatTier[];
};

export type RaisedPetWorkshopInventory = {
  petFeed: number;
  /** Quest drops → Pet Tamer (craft feed). */
  questDrops: { monsterHeart: number; stem: number };
  blessingOfTamer: number;
  chanceOfTamer: number;
  reversionScroll: number;
  awakeningScroll: number;
};

export type RaisedPetRuntime = {
  inventory: RaisedPetWorkshopInventory;
};