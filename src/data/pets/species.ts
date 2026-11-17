import type { RaisedPetSpecies } from "./types";

export type RaisedPetSpeciesDef = {
  id: RaisedPetSpecies;
  displayName: string;
  bonusStat: string;
};

export const RAISED_PET_SPECIES: Record<RaisedPetSpecies, RaisedPetSpeciesDef> = {
  lion: { id: "lion", displayName: "Babari Lion", bonusStat: "STA" },
  tiger: { id: "tiger", displayName: "White Tiger", bonusStat: "STR" },
  fox: { id: "fox", displayName: "Old Fox", bonusStat: "INT" },
  rabbit: { id: "rabbit", displayName: "Rabbit", bonusStat: "DEX" },
  unicorn: { id: "unicorn", displayName: "Unicorn", bonusStat: "HP" },
  griffin: { id: "griffin", displayName: "Griffin", bonusStat: "DEF" },
  dragon: { id: "dragon", displayName: "Dragon", bonusStat: "ATK" },
};

export function speciesDef(species: RaisedPetSpecies): RaisedPetSpeciesDef {
  return RAISED_PET_SPECIES[species];
}