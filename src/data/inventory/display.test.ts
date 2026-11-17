import { describe, expect, it } from "vitest";
import { getItemById } from "../items/catalog";
import { getInventoryGridCells } from "./display";

describe("inventory bag badges", () => {
  it("raised pets show icon only in bag — no level badge", () => {
    const dragon = getItemById("pet-dragon");
    expect(dragon?.type).toBe("pet");
    if (dragon?.type !== "pet" || dragon.subtype !== "raised") {
      throw new Error("expected raised dragon");
    }
    expect("upgradeBadge" in dragon).toBe(false);

    const cells = getInventoryGridCells("pets").filter(Boolean);
    const dragonCell = cells.find((c) => c?.itemId === "pet-dragon");
    expect(dragonCell?.upgradeBadge).toBe("");
  });
});