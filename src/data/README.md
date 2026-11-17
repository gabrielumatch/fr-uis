# `src/data`

| Pasta | Conteúdo |
|-------|----------|
| **`items/`** | **`items.json`** — catálogo único (weapon, armor, jewel, fashion, **consumable**, **skin**); `types.ts`, `item.ts`, `hydrate-items.ts`, `catalog.ts` |
| **`workshop/`** | Item equipado na UI |
| **`upgrade/`** | Receitas `+` e painel de materiais |
| **`inventory/`** | Grid do bag |
| **`assets/`** | Ícones wiki |
| **`systems/`** | Estado das abas |

Todo item no JSON tem os mesmos campos raiz: `id`, `name`, `type`, `subtype`, `category`, `typeLabel`, ícone, etc. Skins e consumíveis são linhas no mesmo arquivo; o equip referencia skins via `skinPoolIds`.

### Gear weapon/armor: `type` + `category` → materiais de `+`

Não inferir por nome ou ícone. No hydrate, `category` vira `item.upgrade` via `gearCategoryToRecipeId` + `UPGRADE_RECIPE_PAIRS` (`upgrade/rules.ts`, `upgrade/recipes.ts`):

| `category` (weapon/armor) | Material | Protect |
|---------------------------|----------|---------|
| `normal`, `green` | Sunstone | SProtect |
| `ultimate` | Oricalkum | XProtect |
| `baruna` | Stone of Balance | Blessing of Baruna |

Ex.: `hotter-sword` = `type: weapon`, `subtype: two-handed-sword`, `category: normal` → Sunstone + SProtect. Ultimate (Lusaka, etc.) = `category: ultimate` → Oricalkum + XProtect.

Ao cadastrar item novo: acerte `category` no JSON; o boot valida bag + coerência `category` ↔ `upgrade`.