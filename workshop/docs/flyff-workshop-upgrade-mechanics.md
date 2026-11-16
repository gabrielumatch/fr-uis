# FlyFF — conceito de upgrades (referência para UI workshop)

**Fontes:** [flyffwiki.com — Upgrading Normal Weapons](https://flyffwiki.com/guides-gameplay/upgrading-normal-weapons-shields-and-armor/), [Flyffipedia — Equipment Upgrade](https://flyffipedia.com/guide/equipment-set-weapon-upgrade-guide), [Piercing](https://flyffipedia.com/guide/piercing-upgrade-guide), [Fandom Upgrading](https://flyff.fandom.com/wiki/Upgrading).

**Contexto do projeto:** mock com Lusaka's, +10/20, Element 19/20, Safe Upgrade com 10 linhas → alinhado a **FlyFF Universe** (NPC Boboko) + legado PC onde aplicável.

## Visão geral (5 abas da UI)

| Aba | O que é | Efeito no item |
|-----|---------|----------------|
| **Upgrade** | Nível `+N` do item (ataque/DEF, glow, set bonus) | Cap comum: +10; Ultimate: até +20 (Shining Oricalkum) |
| **Element** | Elemento no arma/suit (dano vs mobs) | +0 a +20, separado do `+` de upgrade |
| **Piercing & Cards** | **Piercing** = abrir socket; **Cards** = inserir carta | Sockets permanentes; cartas 100% ao inserir |
| **Jewels** | Ultimate Jewels / runas em slots da Ultimate | Slots desbloqueiam com upgrade da Ultimate; jewel pode quebrar |
| **Awake** | 5 linhas extras aleatórias (± stats) | 100% sucesso no roll inicial; reroll via scrolls |

## Upgrade (`+` do equipamento)

### FlyFF Universe (set 4 peças + armas)
- NPC **Boboko** (Central Flarine).
- Por tentativa: **1 Power Dice** (4: +1–5, 6: +6–10, 12: +1–10 melhor taxa) + **Mineral** + **Erons** (quantidade por nível atual).
- **+1 / +2:** não quebram o item no fail (legado: 100%).
- **+3:** pode falhar; item não quebra (só perde materiais).
- **+4+:** sem proteção → item pode **destruir** no fail.
- **Scroll of SProtect:** evita destruição (cash); **Low SProtect:** não destrói mas **-1 nível** no fail.
- **Scroll of Smelting:** +10% chance (Universe/UI clássico: até +7 em sunstone).
- **Pity:** falhas acumulam no **item** (tooltip); chance sobe (Markov).
- **Set bonus:** bônus extra quando as 4 peças do set atingem o mesmo patamar (+3, +4, …); vale o **menor** `+` entre as peças.

### PC / wiki clássica (Sunstone)
- **Sunstone** em arma não-ultimate, armadura, escudo → máx **+10**.
- **Safe Upgrade** no BoBoChan: até **10 tentativas** numa grade; cada linha = material + protect opcional; para se não houver SProtect na linha que exige.

### Ultimate
- **Shining Oricalkum** (+ Scroll **XProtect** no legado) para subir Ultimate.
- Conversão: arma +10 elegível + Oricalkums + orbs/joias (Universe v1.3+).

**UI Safe Upgrade:** grade de 10 linhas = 10 rolls planejados; colunas típicas: material (dice/sunstone/oricalkum), protect (S/X/G), smelting (+10% chance), resultado (Pending/Success/Fail).

## Element

- Track **independente** do `+` de upgrade; máx **+20** em arma e suit.
- Cartas: Flame / River / Generator / Desert / Cyclone → Fire / Water / Electric / Earth / Wind.
- **+1–+2:** não falham; **+3:** pode falhar sem quebrar item; **+4–+20:** fail pode **destruir** sem SProtect.
- **Safe Element Upgrade:** mesma ideia de 10 slots + SProtect obrigatório quando arriscado.
- **Scroll of Smelting (Elements):** +10% chance (até +10 no legado).
- **Scroll of Element Change:** troca tipo mantendo grau.
- Rock-paper-scissors elemental vs mobs (forte/fraco).

## Piercing & Cards

### Piercing (abrir slot)
- **Suit:** até **4** sockets (% cards Volcano/Ocean/etc. no legado).
- **Universe weapon:** 1H/escudo **5** slots; 2H **10** slots (Power Dice 8/10 + **GProtect**).
- **Legado:** Moonstone + **GProtect**; Safe Piercing = 10 tentativas.
- Fail sem proteção → item destruído.

### Cards (preencher socket)
- **Inserir carta = 100%** — nunca perde item/carta no insert.
- **Suit (somente suit):** cartas de **%** — Volcano, Ocean, Lightning, etc. (2%…12%), até 4 slots. **Não** vão em arma/escudo.
- **Arma e escudo:** **Letter cards** por elemento — `Fire Card (D)` … `(R)` (e Baruna SR); Wind não tem R/SR. Stats por grade (ex. Fire D = STR +2, Fire A = STR +7, Crit Dmg +2%). Referência: [Piercing Cards (Weapons, Shields)](https://flyffwiki.com/piercing-cards-for-weapons-shields/).
- **Remover carta (Universe):** escolhe qual linha remover; carta removida se perde.

## Jewels

- **Ultimate weapon:** cada upgrade desbloqueia slot de **Ultimate Jewel / Rune** (Universe: até 10 slots; legado Peach: slots a partir de +6, até 5 em +10).
- Aplicar: double-click jewel no arma (como carta).
- Universe: mesmo tipo repetido possível com chance decrescente; fail **destrói só o jewel**.
- Legado socketing em Peach: fail perde jewel, não a arma.
- Gemas Topaz/Ruby/… também usadas em conversão Green→Ultimate.

## Awake

- NPC **Peach** (legado): Scroll of Awakening → **5 linhas** aleatórias (podem ser **negativas**); **100%** sucesso, não quebra item.
- Pool de stats depende do slot (arma: all stats; luvas: crit/aspd; etc.).
- **Reversion:** zera todas as linhas awake.
- **Awakening Protection:** escolhe ficar no awake antigo ou novo após reroll.
- **Awakening Augmentation:** reroll **uma linha** escolhida.

## Materiais × sistema (cheat sheet)

| Material / Scroll | Uso principal |
|-------------------|---------------|
| Sunstone | + arma/armadura não-ultimate (PC); também Ultimate jewelry (Universe) |
| Power Dice + Mineral + Erons | + set/arma Universe |
| Shining Oricalkum | + Ultimate weapon / conversão |
| Moonstone / Power Dice piercing | Abrir socket |
| Element cards | +nível de elemento |
| SProtect | Protege upgrade **+** e **element** (+4+) |
| GProtect | Protege **piercing** |
| XProtect | Protege **Ultimate** upgrade |
| Smelting | +10% chance upgrade/element |
| Scroll of Awakening (+ proteção/augment/reversion) | Awake |

## Implicações para `workshop/` (este repo)

1. **Upgrade tab:** target level, 10 rows, chance/energy/cost, penya — espelhar Safe Upgrade + pity no tooltip do item.
2. **Sidebar stats:** Attack, Element `n/20`, Upgrade `n/max`, Piercing `slots/max`, Cards = cartas preenchidas, Jewels `n/max`.
3. **Element / Piercing / Jewels / Awake:** painéis separados mas compartilham padrão de materiais + protect + batch de 10 quando “Safe”.
4. Diferenciar **nível de upgrade** vs **nível de elemento** nos dados (`js/data/equipped-item.js`).

*Atualizado: 2026-11-16*