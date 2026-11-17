# Pets no workshop

| `subtype` | `pickupPet.mode` | Workshop hosts | Abas |
|-----------|------------------|----------------|------|
| `raised` | — | Sim | Feed, Growth, Awake |
| `pickup` | `pickup` | Sim | Convert, Blessing, Pickup |
| `pickup` | `buff` | Sim | Beads, Blessing, Pickup |

**Raised:** `items.json` → `raisedPet{}`; runtime `workshopPet.inventory`; `systems/raised-pet-workshop.ts`.

**Pick-up / Buff:** `items.json` → `pickupPet{}`; runtime `workshopPickup.inventory`; beads em `bead-catalog.ts`; `systems/pickup-pet-workshop.ts`.

Blessing de pick-up usa **Scroll of Pet Blessing (Pick-up Pets)** — não confundir com Scroll of Pet Awakening (raised / Peach).