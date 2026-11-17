export type UpgradeSub = "level" | "jewels";
export type PiercingSub = "pierce" | "cards";
export type ElementSub = "upgrade" | "change";
export type SkinsSub = "apply" | "remove";
export type FeedSub = "craft" | "give";
export type GrowthSub = "advance" | "reroll";

export type WorkshopRoute = {
  tabId: string;
  upgradeSub: UpgradeSub;
  piercingSub: PiercingSub;
  elementSub: ElementSub;
  skinsSub: SkinsSub;
  feedSub: FeedSub;
  growthSub: GrowthSub;
};

export const DEFAULT_ROUTE: WorkshopRoute = {
  tabId: "upgrade",
  upgradeSub: "level",
  piercingSub: "pierce",
  elementSub: "upgrade",
  skinsSub: "apply",
  feedSub: "give",
  growthSub: "advance",
};