# `src/data`

| Pasta | Conteúdo |
|-------|----------|
| **`items/`** | **`items.json`** — catálogo único (weapon, armor, jewel, fashion, **wing**, **consumable**, **skin**); `types.ts`, `item.ts`, `hydrate-items.ts`, `catalog.ts` |
| **`workshop/`** | Item equipado na UI; URL (`route-url.ts`): `workshop_tab`, `subtab`, `inventory`, **`workshop_item`** (id do gear no painel) |
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

**Max + e sockets em armas** (`gear-upgrade-policy.ts`, `jewel-slot-rules.ts`):

| `category` | Max + | Gemas (diamond/sapphire/ruby) |
|------------|-------|------------------------------|
| normal/green | 10 | nenhum (`weaponJewelSocketRule: none`) |
| ultimate | 10 | +6…+10 → até 5 furos |
| baruna | 20 | +12, +14, +16, +18, +20 → 5 furos |

Testes: `src/data/systems/jewel-slot-rules.test.ts`.

**Fashion** (`type: fashion`, `category: fashion`) → Lightning Stone (só peças CS que aceitam + de fashion). **Wings** (`type: wing`, `category: wing`) — slot costas; **sem** aba Upgrade (`opensWorkshopUpgrade` = false). **Helmet/armor** de set = `type: armor`, `category: normal` → Sunstone + SProtect.

Ex.: `hotter-sword` = `type: weapon`, `subtype: two-handed-sword`, `category: normal` → Sunstone + SProtect. Ultimate (Lusaka, etc.) = `category: ultimate` → Oricalkum + XProtect.

**Armor workshop** (`workshop-capabilities.ts`): elmo/luva/bota/escudo → só Upgrade (+ nível), Awake, Skins. **Suit** → também Element (max 20) e Piercing/Cartas (max 4 cada), sem sub-aba Jewels. Armas = abas completas + jewels.

**Jewelry** (`type: jewel`, ring/necklace/earring): só aba **Accessory Upgrade** — Moonstone + AProtect. Sem Element, Piercing, Awake, Skins nem sub-aba Jewels (sockets de arma).

Ao cadastrar item novo: acerte `category` no JSON; o boot valida bag + coerência `category` ↔ `upgrade`.

### Skins (`isSkin: true`, `type: skin`)

**Não abrem o workshop** (igual wing/pet). Não entram na sidebar **Workshop Item**. Na aba **Skins**, só aparecem skins da bag com `skinSlot` = `subtype` do gear selecionado no workshop. Testes: `npm test` → `ui-rules.test.ts`.