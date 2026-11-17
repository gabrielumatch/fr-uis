# Raised pets (status)

Tipagem alinhada à [wiki BR Pets](https://flyff-wiki.gpotato.com.br/wiki/Pets).

| `subtype` | Workshop | Abas |
|-----------|----------|------|
| `raised` | Sim (`WorkshopRaisedPetItem`) | Feed, Growth, Awake |
| `pickup` | Não (só bag) | — |

**Feed:** craft no Pet Tamer (quest drops) + give (HP / rank EXP convocado).  
**Growth:** advance stat level (99,99% EXP, rola tier D–S) + reroll (Blessing/Chance/Reversion).  
**Awake:** scroll na Peach (compartilha UI Awake; sem upgrade/pierce/jewel).

Dados: `items.json` → `raisedPet{}`; runtime `workshopPet.inventory`; lógica em `systems/raised-pet-workshop.ts`.