/** Icons hosted on the gPotato FlyFF Wiki (flyff-wiki.gpotato.com.br). */

export const FLYFF_WIKI_ORIGIN = "https://flyff-wiki.gpotato.com.br";

/** @param {string} path Wiki-relative path, e.g. `images/4/48/Lusaka%27s_Axe.png` */
export function wikiImg(path) {
  return `${FLYFF_WIKI_ORIGIN}/${path}`;
}

/** @type {Record<string, string>} */
export const WIKI = {
  // —— Ultimate weapons (player gear) ——
  lusakaHeavyAxe: wikiImg("images/e/e8/Lusaka%27s_Heavy_Axe.png"),
  lusakaHeavySword: wikiImg("images/3/3f/Lusaka%27s_Heavy_Sword.png"),
  lusakaBow: wikiImg("images/9/97/Lusaka%27s_Bow.png"),

  // —— 2H axe skin donors ——
  spectreAxe: wikiImg("images/6/6e/Spectre%27s_Axe.png"),
  nautilusAxe: wikiImg("images/7/79/Nautilus.png"),
  bishopAxe: wikiImg("images/f/f0/Bishop.png"),
  lasternition: wikiImg("images/3/30/Lasternition.gif"),
  piecenition: wikiImg("images/f/f1/Piecenition.gif"),
  gladiatorGold2hAxe: wikiImg("images/7/73/Gladiator%27s_Gold_1H_Axe.png"),

  // —— 2H sword skin donors ——
  lusakaCrystalSword: wikiImg("images/5/52/Lusaka%27s_Heavy_Crystal_Sword.png"),
  gladiatorGold2hSword: wikiImg("images/0/03/Gladiator%27s_Gold_2H_Sword.png"),
  hotterSword: wikiImg("images/8/8c/Hotter.gif"),
  smiterSword: wikiImg("images/2/2e/Smiter_Sword.png"),

  // —— Bow skin donors ——
  bowOfEchoes: wikiImg("images/4/40/Bow_of_Echoes.png"),
  nemosFury: wikiImg("images/4/42/Nemo%27s_Fury.png"),
  baronessBow: wikiImg("images/9/9a/Baroness.png"),
  gladiatorGoldBow: wikiImg("images/d/d8/Gladiator%27s_Gold_Bow.png"),

  // —— Knight Bilari set (Lv 125) ——
  bilariHelmetF: wikiImg("images/3/33/Bilari_HelmetF.png"),
  bilariSuitF: wikiImg("images/d/d3/Bilari_SuitF.png"),
  bilariGauntletF: wikiImg("images/c/c5/Bilari_GauntletF.png"),
  bilariBootsF: wikiImg("images/9/9f/Bilari_BootsF.png"),
  bileireHelmetM: wikiImg("images/c/cf/BileireHelmM.png"),
  bileireSuitM: wikiImg("images/1/1b/BileireSuitM.png"),

  // —— Cruentus CS / rare (fashion donors) ——
  cruentusHelmetM: wikiImg("images/4/46/CruentusHelmetM.gif"),
  cruentusHelmetF: wikiImg("images/d/d8/CruentusHelmetF.gif"),
  cruentusSuitM: wikiImg("images/b/bc/(M)_Cruentusset.gif"),

  // —— Suit skin donors ——
  vigRoenierHelm: wikiImg("images/c/cf/BileireHelmM.png"),
  yggForceMasterSuit: wikiImg("images/d/d3/Bilari_SuitF.png"),

  // —— Fashion back (wings) / cape slots on doll ——
  /** CS back slot (wings); wiki asset TBD — thumb used so the slot does not 404 */
  fashionWings: wikiImg("images/thumb/8/85/Pet_Dragon.PNG/70px-Pet_Dragon.png"),

  // —— Pets & consumables ——
  petLion: wikiImg("images/thumb/4/40/Pet_Lion.PNG/70px-Pet_Lion.png"),
  petDragon: wikiImg("images/thumb/8/85/Pet_Dragon.PNG/70px-Pet_Dragon.png"),
  petUnicorn: wikiImg("images/thumb/1/10/Pet_Unicorn.PNG/70px-Pet_Unicorn.png"),
  petFeed: wikiImg("images/8/89/Pet_PetFeed.png"),
  scrollSProtect: wikiImg("images/b/b7/ScrollofSprotect.png"),
  petHelper: wikiImg("images/thumb/5/51/Pet_Helper.PNG/250px-Pet_Helper.png"),
};