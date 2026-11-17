export type UpgradeSub = "level" | "jewels";
export type PiercingSub = "pierce" | "cards";
export type ElementSub = "upgrade" | "change";
export type SkinsSub = "apply" | "remove";

export type WorkshopRoute = {
  tabId: string;
  upgradeSub: UpgradeSub;
  piercingSub: PiercingSub;
  elementSub: ElementSub;
  skinsSub: SkinsSub;
};