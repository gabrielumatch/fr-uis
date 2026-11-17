import type { ItemRecord } from "../items/types";

/** Referência: FlyFF wiki (Pet Beads / Buff Bead lists) — normal, precious, sacred, PERM. */
function beadItem(
  id: string,
  name: string,
  grade: "normal" | "precious" | "sacred" | "permanent",
  family: string,
  tier: 1 | 2 | 3 | 4,
  effectSummary: string,
  durationLabel: string,
  requiresBeadIds?: string[],
): ItemRecord {
  return {
    id,
    name,
    type: "consumable",
    subtype: "buff-bead",
    category: "pet",
    iconKey:
      grade === "normal"
        ? "beadGradeNormal"
        : grade === "precious"
          ? "beadGradePrecious"
          : grade === "sacred"
            ? "beadGradeSacred"
            : "beadGradePermanent",
    typeLabel: "Buff Bead",
    buffBead: {
      grade,
      family,
      tier,
      effectSummary,
      durationLabel,
      requiresBeadIds,
    },
  };
}

const NORMAL_DURATION = "3 days";
const PRECIOUS_DURATION = "7 days";
const SACRED_DURATION = "7 days";

/** Par normal → precious (precious exige normal equipado para ativar sacred chain). */
function preciousPair(
  family: string,
  normalName: string,
  preciousName: string,
  normalFx: string,
  preciousFx: string,
): ItemRecord[] {
  const normalId = `bead-${family}`;
  const preciousId = `bead-${family}-precious`;
  return [
    beadItem(normalId, normalName, "normal", family, 1, normalFx, NORMAL_DURATION),
    beadItem(
      preciousId,
      preciousName,
      "precious",
      family,
      2,
      preciousFx,
      PRECIOUS_DURATION,
      [normalId],
    ),
  ];
}

export const BUFF_BEAD_ITEM_RECORDS: readonly ItemRecord[] = [
  ...preciousPair("tiger", "Bead of the Tiger", "Precious Bead of the Tiger", "STR +3", "STR +7"),
  ...preciousPair("rabbit", "Bead of the Rabbit", "Precious Bead of the Rabbit", "DEX +3", "DEX +7"),
  ...preciousPair("fox", "Bead of the Fox", "Precious Bead of the Fox", "INT +3", "INT +7"),
  ...preciousPair("lion", "Bead of the Lion", "Precious Bead of the Lion", "STA +3", "STA +7"),
  ...preciousPair(
    "relentless-power",
    "Bead of Relentless Power",
    "Precious Bead of Relentless Power",
    "Additional Damage +50",
    "Additional Damage +150",
  ),
  ...preciousPair(
    "clarity",
    "Bead of Clarity",
    "Precious Bead of Clarity",
    "Decreased Casting Time +3%",
    "Decreased Casting Time +7%",
  ),
  ...preciousPair(
    "focused-power",
    "Bead of Focused Power",
    "Precious Bead of Focused Power",
    "Magical Power +10; Casting Time +2%",
    "Magical Power +30; Casting Time +4%",
  ),
  ...preciousPair(
    "steadfast-defender",
    "Bead of the Steadfast Defender",
    "Precious Bead of the Steadfast Defender",
    "Soul Leeching +1",
    "Soul Leeching +3",
  ),
  ...preciousPair(
    "ardent-defender",
    "Bead of the Ardent Defender",
    "Precious Bead of the Ardent Defender",
    "PvP Damage +1%",
    "PvP Damage +2%",
  ),
  ...preciousPair(
    "reckless",
    "Bead of the Reckless",
    "Precious Bead of the Reckless",
    "Critical Chance +3%",
    "Critical Chance +7%",
  ),
  ...preciousPair(
    "winds",
    "Bead of the Winds",
    "Precious Bead of the Winds",
    "Speed +13%",
    "Speed +17%",
  ),
  ...preciousPair(
    "accuracy",
    "Bead of Accuracy",
    "Precious Bead of Accuracy",
    "Hit +3%",
    "Hit +7%",
  ),
  ...preciousPair(
    "swiftness",
    "Bead of Swiftness",
    "Precious Bead of Swiftness",
    "Attack Speed +7%",
    "Attack Speed +11%",
  ),
  ...preciousPair(
    "power",
    "Bead of Power",
    "Precious Bead of Power",
    "Attack +20",
    "Attack +60",
  ),
  ...preciousPair(
    "protector",
    "Bead of the Protector",
    "Precious Bead of the Protector",
    "DEF +20",
    "DEF +60",
  ),
  ...preciousPair(
    "sorceror",
    "Bead of the Sorceror",
    "Precious Bead of the Sorceror",
    "Magical Power +20",
    "Magical Power +60",
  ),
  ...preciousPair(
    "evasion",
    "Bead of Evasion",
    "Precious Bead of Evasion",
    "Parry +1",
    "Parry +5",
  ),
  ...preciousPair(
    "fortitude",
    "Bead of Fortitude",
    "Precious Bead of Fortitude",
    "Max. HP +50",
    "Max. HP +10%",
  ),
  ...preciousPair(
    "soul-reaving",
    "Bead of Soul Reaving",
    "Precious Bead of Soul Reaving",
    "HP Recovery on kill +30",
    "HP Recovery on kill +70",
  ),
  beadItem(
    "bead-profuse-bleeding-precious",
    "Precious Bead of Profuse Bleeding",
    "precious",
    "profuse-bleeding",
    2,
    "ADOCH +7%",
    PRECIOUS_DURATION,
  ),
  beadItem(
    "bead-malice-precious",
    "Precious Bead of Malice",
    "precious",
    "malice",
    2,
    "PvE Damage +3%",
    PRECIOUS_DURATION,
  ),
  beadItem(
    "bead-gladiator-sacred",
    "Sacred Bead of the Gladiator",
    "sacred",
    "gladiator",
    3,
    "Attack +3%; Attack Speed +9%",
    SACRED_DURATION,
    ["bead-power", "bead-power-precious"],
  ),
  beadItem(
    "bead-guardian-sacred",
    "Sacred Bead of the Guardian",
    "sacred",
    "guardian",
    3,
    "DEF +5%; Max. HP +8%",
    SACRED_DURATION,
    ["bead-protector", "bead-protector-precious"],
  ),
  beadItem(
    "bead-shades-torment-sacred",
    "Sacred Bead of Shade's Torment",
    "sacred",
    "shades-torment",
    3,
    "Hit +5%; Attack Speed +9%",
    SACRED_DURATION,
    ["bead-winds", "bead-winds-precious"],
  ),
  beadItem(
    "bead-iblis-sacred",
    "Sacred Bead of Iblis",
    "sacred",
    "iblis",
    3,
    "Critical Damage +5%; Critical Chance +5%",
    SACRED_DURATION,
    ["bead-fortitude", "bead-fortitude-precious"],
  ),
  beadItem(
    "bead-bubble-sacred",
    "Sacred Bead of Bubble",
    "sacred",
    "bubble",
    3,
    "Attack +2%; DEF +2%",
    SACRED_DURATION,
    ["bead-malice-precious"],
  ),
  beadItem(
    "bead-grizzled-warrior-perm",
    "Bead of the Grizzled Warrior (PERM)",
    "permanent",
    "grizzled-warrior",
    4,
    "Attack +1%; Attack Speed +3%",
    "Permanent",
  ),
];