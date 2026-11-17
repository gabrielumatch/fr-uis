/** Icons hosted on the gPotato FlyFF Wiki (flyff-wiki.gpotato.com.br). */

export const FLYFF_WIKI_ORIGIN = "https://flyff-wiki.gpotato.com.br";

export function wikiImg(path: string): string {
  return `${FLYFF_WIKI_ORIGIN}/${path}`;
}

export const WIKI = {
  lusakaHeavyAxe: wikiImg("images/e/e8/Lusaka%27s_Heavy_Axe.png"),
  lusakaHeavySword: wikiImg("images/3/3f/Lusaka%27s_Heavy_Sword.png"),
  lusakaBow: wikiImg("images/9/97/Lusaka%27s_Bow.png"),
  spectreAxe: wikiImg("images/6/6e/Spectre%27s_Axe.png"),
  nautilusAxe: wikiImg("images/7/79/Nautilus.png"),
  bishopAxe: wikiImg("images/f/f0/Bishop.png"),
  lasternition: wikiImg("images/3/30/Lasternition.gif"),
  piecenition: wikiImg("images/f/f1/Piecenition.gif"),
  gladiatorGold2hAxe: wikiImg("images/7/73/Gladiator%27s_Gold_1H_Axe.png"),
  lusakaCrystalSword: wikiImg("images/5/52/Lusaka%27s_Heavy_Crystal_Sword.png"),
  gladiatorGold2hSword: wikiImg("images/0/03/Gladiator%27s_Gold_2H_Sword.png"),
  hotterSword: wikiImg("images/8/8c/Hotter.gif"),
  smiterSword: wikiImg("images/2/2e/Smiter_Sword.png"),
  bowOfEchoes: wikiImg("images/4/40/Bow_of_Echoes.png"),
  nemosFury: wikiImg("images/4/42/Nemo%27s_Fury.png"),
  baronessBow: wikiImg("images/9/9a/Baroness.png"),
  gladiatorGoldBow: wikiImg("images/d/d8/Gladiator%27s_Gold_Bow.png"),
  roikasStave: wikiImg("images/3/30/Roikas_Stave.png"),
  bilariHelmetF: wikiImg("images/3/33/Bilari_HelmetF.png"),
  bilariSuitF: wikiImg("images/d/d3/Bilari_SuitF.png"),
  bilariGauntletF: wikiImg("images/c/c5/Bilari_GauntletF.png"),
  bilariBootsF: wikiImg("images/9/9f/Bilari_BootsF.png"),
  bileireHelmetM: wikiImg("images/c/cf/BileireHelmM.png"),
  bileireSuitM: wikiImg("images/1/1b/BileireSuitM.png"),
  cruentusHelmetM: wikiImg("images/4/46/CruentusHelmetM.gif"),
  cruentusHelmetF: wikiImg("images/d/d8/CruentusHelmetF.gif"),
  cruentusSuitM: wikiImg("images/b/bc/(M)_Cruentusset.gif"),
  vigRoenierHelm: wikiImg("images/c/cf/BileireHelmM.png"),
  yggForceMasterSuit: wikiImg("images/d/d3/Bilari_SuitF.png"),
  jewelryRing: wikiImg("images/2/2c/Intelli_Ring.gif"),
  jewelryEarring: wikiImg("images/0/03/PlugEarring.gif"),
  jewelryNecklace: wikiImg("images/6/62/GoreNecklace.gif"),
  jewelryEarringRight: wikiImg("images/6/6b/DemolEarring.gif"),
  fashionWings: wikiImg("images/thumb/8/85/Pet_Dragon.PNG/70px-Pet_Dragon.png"),
  petLion: wikiImg("images/thumb/4/40/Pet_Lion.PNG/70px-Pet_Lion.png"),
  petDragon: wikiImg("images/thumb/8/85/Pet_Dragon.PNG/70px-Pet_Dragon.png"),
  petUnicorn: wikiImg("images/thumb/1/10/Pet_Unicorn.PNG/70px-Pet_Unicorn.png"),
  petBabyLuia: wikiImg("images/e/e0/Babyluia.png"),
  petMocomochi: wikiImg("images/d/d0/Mocomochi.png"),
  petFeed: wikiImg("images/8/89/Pet_PetFeed.png"),
  scrollSProtect: wikiImg("images/b/b7/ScrollofSprotect.png"),
  scrollAProtect: wikiImg("images/a/a9/ScrollofAprotect.png"),
  scrollXProtect: wikiImg("images/f/fa/ScrollofXprotect.png"),
  moonstone: wikiImg("images/2/2a/Moonstone.gif"),
  sunstone: wikiImg("images/4/4e/Sunstone.gif"),
  shiningOricalkum: wikiImg("images/2/27/ShiningOrichalcum.gif"),
  petHelper: wikiImg("images/thumb/5/51/Pet_Helper.PNG/250px-Pet_Helper.png"),
  /** Buff pet beads by tier (wiki genéricos por duração/cor). */
  beadGradeNormal: wikiImg("images/c/c2/1hourBuffBead.png"),
  beadGradePrecious: wikiImg("images/7/79/3dayBuffBead.png"),
  beadGradeSacred: wikiImg("images/f/fd/7dayBuffBead.png"),
  beadGradePermanent: wikiImg("images/8/81/Bead_of_Soul_Leeching_Permanent.png"),
} as const satisfies Record<string, string>;

export const BUFF_BEAD_GRADE_ICON_KEY = {
  normal: "beadGradeNormal",
  precious: "beadGradePrecious",
  sacred: "beadGradeSacred",
  permanent: "beadGradePermanent",
} as const satisfies Record<
  import("../items/types").BuffBeadGrade,
  keyof typeof WIKI
>;