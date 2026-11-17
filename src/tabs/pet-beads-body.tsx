import { useEffect, useState } from "react";
import { listBuffBeadDefinitions } from "../data/pets/bead-catalog";
import type { BuffBeadGrade } from "../data/items/types";
import type { BuffBeadDefinition } from "../data/pets/pickup-types";
import { useWorkshop } from "../context/WorkshopContext";
import {
  canEquipBeadFromHand,
  equipBeadInSlot,
  getEquippedPickupPet,
  isBeadActiveInPet,
} from "../data/systems/pickup-pet-workshop";
import { ItemIcon } from "../utils/item-icon";
import { unlockBeadSlot } from "../data/systems/pickup-pet-workshop";

type BeadGradeTab = BuffBeadGrade;

const BEAD_TABS: { id: BeadGradeTab; label: string; short: string }[] = [
  { id: "normal", label: "Blue", short: "Normal" },
  { id: "precious", label: "Yellow", short: "Precious" },
  { id: "sacred", label: "Red", short: "Sacred" },
  { id: "permanent", label: "Perm", short: "Permanent" },
];

function firstEmptyUnlockedSlot(pet: ReturnType<typeof getEquippedPickupPet>): number | null {
  if (!pet) return null;
  for (let i = 0; i < pet.unlockedBeadSlots; i++) {
    if (!pet._beadSlotIds[i]) return i;
  }
  return null;
}

export function PetBeadsBody() {
  const workshop = useWorkshop();
  const pet = getEquippedPickupPet();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [gradeTab, setGradeTab] = useState<BeadGradeTab>("normal");
  const [filterOwned, setFilterOwned] = useState(false);
  const [filterEquipable, setFilterEquipable] = useState(false);

  const allBeads = listBuffBeadDefinitions();

  useEffect(() => {
    if (!pet) return;
    setSelectedSlot((prev) => {
      if (prev !== null && prev < pet.unlockedBeadSlots) return prev;
      return firstEmptyUnlockedSlot(pet);
    });
  }, [pet?.unlockedBeadSlots]);

  if (!pet || pet.mode !== "buff") return null;
  const inv = pet.workshopPickup.inventory;

  const equipToSlot = (slotIndex: number, beadId: string) => {
    if (equipBeadInSlot(pet, slotIndex, beadId).ok) workshop.bump();
  };

  const handleEquip = (beadId: string) => {
    if (!canEquipBeadFromHand(pet, beadId)) return;
    let slot = selectedSlot;
    if (slot === null || slot >= pet.unlockedBeadSlots) {
      slot = firstEmptyUnlockedSlot(pet);
    }
    if (slot === null) {
      slot = pet._beadSlotIds.findIndex((_, i) => i < pet.unlockedBeadSlots);
      if (slot < 0) return;
    }
    equipToSlot(slot, beadId);
    setSelectedSlot(slot);
  };

  const beadsInTab = allBeads.filter((b) => b.grade === gradeTab);

  const visibleBeads = beadsInTab.filter((def) => {
    const onHand = inv.beadsOnHand[def.id] ?? 0;
    if (filterOwned && onHand < 1) return false;
    if (filterEquipable && !canEquipBeadFromHand(pet, def.id)) return false;
    return true;
  });

  const ownedInTab = beadsInTab.filter((d) => (inv.beadsOnHand[d.id] ?? 0) > 0).length;

  const tabBadge = (tab: BeadGradeTab) => {
    const n = allBeads.filter((b) => b.grade === tab && (inv.beadsOnHand[b.id] ?? 0) > 0).length;
    return n > 0 ? n : null;
  };

  const renderBeadTile = (def: BuffBeadDefinition) => {
    const onHand = inv.beadsOnHand[def.id] ?? 0;
    const available = canEquipBeadFromHand(pet, def.id);

    return (
      <li key={def.id}>
        <button
          type="button"
          className={[
            "pet-bead-inv__tile",
            onHand > 0 ? "has-stock" : "is-missing",
            available ? "is-available" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={!available}
          title={`${def.name}\n${def.effectSummary}\n${def.durationLabel}`}
          onClick={() => handleEquip(def.id)}
        >
          <ItemIcon
            icon={def.icon}
            wrapperClass="pet-bead-inv__icon"
            imgClass="pet-bead-inv__icon-img"
            alt=""
          />
          <span className="pet-bead-inv__qty">{onHand > 0 ? onHand : ""}</span>
        </button>
      </li>
    );
  };

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Pick a slot, choose a color tab, tap an orb with stock (green outline = ready).
      </p>

      <div className="pet-bead-slots">
        <div className="pet-bead-slots__head">
          <span>
            Open slots <strong>{pet.unlockedBeadSlots}</strong> / 9
          </span>
          <span className="muted">
            Keys <strong>{inv.beadSlotKeys}</strong>
          </span>
        </div>
        <div className="pet-bead-slots__grid" role="list" aria-label="Bead slots">
          {Array.from({ length: 9 }, (_, i) => {
            const locked = i >= pet.unlockedBeadSlots;
            const equipped = pet.beadSlots[i];
            const selected = selectedSlot === i;
            const active = equipped ? isBeadActiveInPet(pet, equipped.beadId) : false;
            const isNextLocked = locked && i === pet.unlockedBeadSlots;

            if (locked) {
              return (
                <div
                  key={i}
                  role="listitem"
                  className={[
                    "pet-bead-slot",
                    "pet-bead-slot--locked",
                    isNextLocked ? "pet-bead-slot--unlock-ready" : "pet-bead-slot--locked-later",
                  ].join(" ")}
                  aria-label={`Slot ${i + 1} locked`}
                >
                  <span className="pet-bead-slot__idx muted">{i + 1}</span>
                  <span className="pet-bead-slot__lock" aria-hidden>
                    🔒
                  </span>
                  {isNextLocked && pet.unlockedBeadSlots < 9 ? (
                    <button
                      type="button"
                      className="pet-bead-slot__unlock btn btn--secondary"
                      data-action="Unlock Bead Slot"
                      disabled={inv.beadSlotKeys < 1}
                      title="Uses 1 Bead Slot Key"
                      onClick={() => {
                        if (unlockBeadSlot(pet).ok) workshop.bump();
                      }}
                    >
                      Unlock
                    </button>
                  ) : (
                    <span className="pet-bead-slot__locked-hint muted">Locked</span>
                  )}
                </div>
              );
            }

            return (
              <button
                key={i}
                type="button"
                role="listitem"
                className={[
                  "pet-bead-slot",
                  equipped ? "pet-bead-slot--filled" : "pet-bead-slot--empty",
                  equipped ? `pet-bead-slot--grade-${equipped.grade}` : "",
                  selected ? "is-selected" : "",
                  equipped && !active ? "pet-bead-slot--inactive" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={selected}
                onClick={() => setSelectedSlot(i)}
              >
                <span className="pet-bead-slot__idx muted">{i + 1}</span>
                {equipped ? (
                  <>
                    <ItemIcon
                      icon={equipped.icon}
                      wrapperClass="pet-bead-slot__icon"
                      imgClass="pet-bead-slot__icon-img"
                      alt={equipped.name}
                    />
                    <span className="pet-bead-slot__timer">{equipped.durationLabel}</span>
                    {!active ? (
                      <span className="pet-bead-slot__warn" title="Needs lower-tier beads equipped">
                        !
                      </span>
                    ) : null}
                  </>
                ) : (
                  <span className="pet-bead-slot__placeholder muted">+</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`pet-bead-panel pet-bead-panel--orb-picker pet-bead-panel--grade-${gradeTab}`}
      >
        <div className="sub-tab-bar pet-bead-tabs" role="tablist" aria-label="Bead color">
          {BEAD_TABS.map((tab) => {
            const badge = tabBadge(tab.id);
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={gradeTab === tab.id}
                className={[
                  "sub-tab-bar__btn",
                  "pet-bead-tabs__btn",
                  `pet-bead-tabs__btn--${tab.id}`,
                  gradeTab === tab.id ? "is-active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setGradeTab(tab.id)}
              >
                {tab.label}
                {badge !== null ? <span className="pet-bead-tabs__badge">{badge}</span> : null}
              </button>
            );
          })}
        </div>

        <div className="pet-bead-filters">
          <label className="pet-bead-filters__chip">
            <input
              type="checkbox"
              checked={filterOwned}
              onChange={(e) => setFilterOwned(e.target.checked)}
            />
            On hand
          </label>
          <label className="pet-bead-filters__chip">
            <input
              type="checkbox"
              checked={filterEquipable}
              onChange={(e) => setFilterEquipable(e.target.checked)}
            />
            Ready to equip
          </label>
          <span className="pet-bead-filters__meta muted">
            {visibleBeads.length} / {beadsInTab.length}
            {ownedInTab > 0 ? ` · ${ownedInTab} owned` : ""}
          </span>
        </div>

        <ul className="pet-bead-inv" role="tabpanel">
          {visibleBeads.length > 0 ? (
            visibleBeads.map(renderBeadTile)
          ) : (
            <li className="pet-bead-inv__empty muted">
              No beads in this tab match filters — try another color or turn off &quot;On hand&quot;.
            </li>
          )}
        </ul>
      </div>

    </>
  );
}