# Pets no workshop

| `subtype` | `pickupPet.mode` | Workshop hosts | Abas |
|-----------|------------------|----------------|------|
| `raised` | — | Sim | Feed, Growth, Awake |
| `pickup` | `pickup` | Sim | Convert, Awake, Pickup |
| `pickup` | `buff` | Sim | Beads, Awake, Pickup |

**Raised:** `items.json` → `raisedPet{}`; runtime `workshopPet.inventory`; `systems/raised-pet-workshop.ts`.

**Pick-up / Buff:** `items.json` → `pickupPet{}`; runtime `workshopPickup.inventory`; beads em `bead-catalog.ts`; `systems/pickup-pet-workshop.ts`.

Aba **Awake** (pick-up/buff) — mesmo layout que gear awake (Start / Previous / highlight), scroll **Pet Blessing (Pick-up)**; sem Reversion. Raised continua com Awake na Peach + Reversion.