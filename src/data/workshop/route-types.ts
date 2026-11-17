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

export const DEFAULT_ROUTE: WorkshopRoute = {
  tabId: "upgrade",
  upgradeSub: "level",
  piercingSub: "pierce",
  elementSub: "upgrade",
  skinsSub: "apply",
};