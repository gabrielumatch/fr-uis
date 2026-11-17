# `src/data`

| Pasta | Conteúdo |
|-------|----------|
| **`items/`** | Tipos, JSON de catálogo (`equipment.json`, `consumables.json`), hydrate, `catalog.ts` |
| **`workshop/`** | Item equipado na workshop, seleção, inventário ativo |
| **`upgrade/`** | Receitas `+`, regras por `type`/`category`, UI de materiais |
| **`inventory/`** | Grid do personagem / abas do bag (mock) |
| **`assets/`** | Ícones wiki (`wiki-icons.ts`) |
| **`systems/`** | Estado volátil de abas (element, piercing, skins, awake, plans) |

**Catálogo:** todo item (equip ou consumível) vive em JSON. Consumíveis de upgrade são `type: "consumable"`, `category: "upgrade"` — mesmo modelo conceitual que uma arma, outra categoria.