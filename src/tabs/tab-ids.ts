/** IDs válidos na URL — sem importar painéis React (evita ciclo com route-url). */
export const WORKSHOP_TAB_IDS = [
  "upgrade",
  "element",
  "piercing",
  "awake",
  "skins",
  "feed",
  "growth",
  "convert",
  "beads",
  "pickup",
] as const;

export type WorkshopTabId = (typeof WORKSHOP_TAB_IDS)[number];

export const TAB_HASH_ALIASES: Record<string, string> = {
  jewels: "upgrade",
  "upgrade-jewels": "upgrade",
  "upgrade-level": "upgrade",
  "piercing-cards": "piercing",
  "piercing-pierce": "piercing",
  "element-change": "element",
  "element-upgrade": "element",
  "skins-apply": "skins",
  "skins-remove": "skins",
  transmutation: "skins",
  "transmutation-apply": "skins",
  "transmutation-revert": "skins",
  blessing: "awake",
};

export function isKnownWorkshopTabId(id: string): id is WorkshopTabId {
  return (WORKSHOP_TAB_IDS as readonly string[]).includes(id);
}

export function resolveTabIdAlias(raw: string): string | undefined {
  const aliased = TAB_HASH_ALIASES[raw] ?? raw;
  return isKnownWorkshopTabId(aliased) ? aliased : undefined;
}