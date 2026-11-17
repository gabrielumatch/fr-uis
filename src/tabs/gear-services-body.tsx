import { requireEquippedGear } from "../data/workshop/equipped";
import { gearServiceCapabilities, transyItemForRequiredLevel } from "../data/gear/gear-service-rules";
import {
  canUnbindGearTrade,
  isGearTradeRestricted,
  tradeStatusLabel,
} from "../data/gear/gear-functional-sync";
import { gearServiceInventory } from "../data/systems/gear-workshop";
import { getConsumableById } from "../data/items/catalog";

function serviceMaterialQty(id: string, qty: number) {
  const item = getConsumableById(id);
  return {
    icon: item?.icon ?? "📜",
    name: item?.name ?? id,
    quantity: qty,
  };
}

export function gearServicesMaterials() {
  const item = requireEquippedGear();
  const cap = gearServiceCapabilities(item);
  const g = item.workshopGear;
  const inv = gearServiceInventory;
  const rows = [];

  if (cap.levelReduction) {
    rows.push(
      serviceMaterialQty("scroll-reduction-a", inv.scrollReductionA),
      serviceMaterialQty("scroll-reduction-b", inv.scrollReductionB),
    );
  }
  if (cap.genderTransy && g.requiredGender) {
    const transyId = transyItemForRequiredLevel(g.requiredLevel);
    rows.push(
      serviceMaterialQty(
        transyId,
        transyId === "item-transy-a" ? inv.itemTransyA : inv.itemTransyB,
      ),
    );
  }
  if (canUnbindGearTrade(cap, g)) {
    rows.push(serviceMaterialQty("scroll-unbinding", inv.scrollUnbinding));
  }

  return rows;
}

function ServiceBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="gear-service-block">
      <h3 className="gear-service-block__title">{title}</h3>
      {children}
    </section>
  );
}

export function GearServicesBody() {
  const item = requireEquippedGear();
  const cap = gearServiceCapabilities(item);
  const g = item.workshopGear;
  const transyId = transyItemForRequiredLevel(g.requiredLevel);
  const transyLabel = transyId === "item-transy-a" ? "Item Transy A (Lv 1–60)" : "Item Transy B (Lv 61+)";

  const reductionDone = Boolean(g.levelReduction);
  const canReduce = cap.levelReduction && !reductionDone;
  const canTransy = cap.genderTransy && Boolean(g.requiredGender);
  const canUnbind = canUnbindGearTrade(cap, g);
  const canPeachRemove = cap.peachRemoval && reductionDone;
  const showGender = cap.genderTransy && Boolean(g.requiredGender);
  const showTrade = cap.scrollUnbinding && isGearTradeRestricted(g);

  return (
    <>
      <p className="muted upgrade-sub-hint">
        One reduction per item (locks trade). Unbinding is temporary until you equip again. Soul-linked
        Baruna cannot unbind or use reduction.
      </p>

      <ServiceBlock title="Required level">
        <p className="gear-service-block__stat">
          Base req. <strong>{g.requiredLevel}</strong>
          {g.levelReduction ? (
            <>
              {" "}
              → effective <strong>{g.effectiveRequiredLevel}</strong> (−{g.levelReduction.delta} via{" "}
              {g.levelReduction.scrollId === "scroll-reduction-a" ? "Reduction A" : "Reduction B"})
            </>
          ) : null}
        </p>
        <div className="btn-row">
          <button
            type="button"
            className={`btn${!canReduce || gearServiceInventory.scrollReductionA < 1 ? " is-disabled" : ""}`}
            data-action="gear-reduction-a"
            disabled={!canReduce || gearServiceInventory.scrollReductionA < 1}
          >
            Apply Reduction A (−10)
          </button>
          <button
            type="button"
            className={`btn btn--secondary${!canReduce || gearServiceInventory.scrollReductionB < 1 ? " is-disabled" : ""}`}
            data-action="gear-reduction-b"
            disabled={!canReduce || gearServiceInventory.scrollReductionB < 1}
          >
            Apply Reduction B (−5)
          </button>
        </div>
        {canPeachRemove ? (
          <div className="btn-row">
            <button type="button" className="btn" data-action="gear-peach-remove">
              Remove reduction (Peach)
            </button>
          </div>
        ) : null}
        {!cap.levelReduction ? (
          <p className="muted gear-service-block__note">Not available on this gear tier.</p>
        ) : null}
      </ServiceBlock>

      {showGender ? (
        <ServiceBlock title="Gender (Transy)">
          <p className="gear-service-block__stat">
            Required gender: <strong>{g.requiredGender === "F" ? "Female" : "Male"}</strong> — uses{" "}
            {transyLabel}
          </p>
          <div className="btn-row">
            <button
              type="button"
              className={`btn${!canTransy ? " is-disabled" : ""}`}
              data-action="gear-transy"
              disabled={!canTransy}
            >
              Swap gender requirement
            </button>
          </div>
        </ServiceBlock>
      ) : null}

      {showTrade ? (
        <ServiceBlock title="Trade / bind">
          <p className="gear-service-block__stat">
            Status: <strong>{tradeStatusLabel(g.trade, g.tempUnbound)}</strong>
          </p>
          {canUnbind ? (
            <div className="btn-row">
              <button
                type="button"
                className={`btn${gearServiceInventory.scrollUnbinding < 1 ? " is-disabled" : ""}`}
                data-action="gear-unbind"
                disabled={gearServiceInventory.scrollUnbinding < 1}
              >
                Scroll of Unbinding
              </button>
            </div>
          ) : null}
          {g.trade === "soul-linked" ? (
            <p className="muted gear-service-block__note">Soul-linked — permanent bind (Baruna).</p>
          ) : null}
          {g.trade === "reduction-locked" ? (
            <p className="muted gear-service-block__note">Remove level reduction at Peach before trading.</p>
          ) : null}
        </ServiceBlock>
      ) : null}
    </>
  );
}