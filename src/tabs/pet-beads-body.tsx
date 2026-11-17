import { useEffect, useState } from "react";
import { BUFF_BEAD_CATALOG } from "../data/pets/bead-catalog";
import { useWorkshop } from "../context/WorkshopContext";
import {
  canEquipBeadFromHand,
  equipBeadInSlot,
  getEquippedPickupPet,
  isBeadActiveInPet,
} from "../data/systems/pickup-pet-workshop";
import { ActionButtons } from "../components/upgrade/action-buttons";

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

  return (
    <>
      <p className="upgrade-sub-hint muted">
        Select a slot, then click an available bead below. Locked slots need a{" "}
        <strong>Bead Slot Key</strong>.
      </p>

      <div className="pet-bead-slots">
        <div className="pet-bead-slots__head">
          <span>
            Open slots <strong>{pet.unlockedBeadSlots}</strong> / 9
          </span>
          <span className="muted">
            Bead Slot Keys: <strong>{inv.beadSlotKeys}</strong>
          </span>
        </div>
        <div className="pet-bead-slots__grid" role="list" aria-label="Bead slots">
          {Array.from({ length: 9 }, (_, i) => {
            const locked = i >= pet.unlockedBeadSlots;
            const equipped = pet.beadSlots[i];
            const selected = selectedSlot === i;
            const active = equipped ? isBeadActiveInPet(pet, equipped.beadId) : false;

            return (
              <button
                key={i}
                type="button"
                role="listitem"
                className={[
                  "pet-bead-slot",
                  locked ? "pet-bead-slot--locked" : "",
                  equipped ? "pet-bead-slot--filled" : "pet-bead-slot--empty",
                  selected && !locked ? "is-selected" : "",
                  equipped && !active ? "pet-bead-slot--inactive" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={locked}
                aria-pressed={selected}
                aria-label={
                  locked
                    ? `Slot ${i + 1} locked`
                    : equipped
                      ? `Slot ${i + 1}, ${equipped.name}`
                      : `Slot ${i + 1}, empty`
                }
                onClick={() => {
                  if (locked) return;
                  setSelectedSlot(i);
                }}
              >
                {locked ? (
                  <span className="pet-bead-slot__lock" aria-hidden>
                    🔒
                  </span>
                ) : equipped ? (
                  <>
                    <span className="pet-bead-slot__orb" aria-hidden>
                      🔮
                    </span>
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

      <h3 className="pet-bead-catalog__title">All beads</h3>
      <ul className="pet-bead-catalog">
        {BUFF_BEAD_CATALOG.map((def) => {
          const onHand = inv.beadsOnHand[def.id] ?? 0;
          const available = canEquipBeadFromHand(pet, def.id);
          const inSlots = pet._beadSlotIds.filter((id) => id === def.id).length;

          return (
            <li key={def.id}>
              <button
                type="button"
                className={[
                  "pet-bead-catalog__row",
                  available ? "is-available" : "",
                  onHand < 1 ? "is-missing" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={!available}
                onClick={() => {
                  if (!available) return;
                  let slot = selectedSlot;
                  if (slot === null || slot >= pet.unlockedBeadSlots) {
                    slot = firstEmptyUnlockedSlot(pet);
                  }
                  if (slot === null) {
                    slot = pet._beadSlotIds.findIndex(
                      (_, i) => i < pet.unlockedBeadSlots,
                    );
                    if (slot < 0) return;
                  }
                  equipToSlot(slot, def.id);
                  setSelectedSlot(slot);
                }}
              >
                <span className="pet-bead-catalog__orb" aria-hidden>
                  🔮
                </span>
                <span className="pet-bead-catalog__meta">
                  <span className="pet-bead-catalog__name">{def.name}</span>
                  <span className="pet-bead-catalog__effect muted">
                    {def.effectSummary} · {def.durationLabel}
                    {def.requiresBeadIds?.length
                      ? ` · needs lower tiers`
                      : ""}
                  </span>
                </span>
                <span className="pet-bead-catalog__qty">
                  {onHand > 0 ? (
                    <>
                      <span className="pet-bead-catalog__on-hand">×{onHand}</span>
                      {inSlots > 0 ? (
                        <span className="pet-bead-catalog__equipped muted">
                          {" "}
                          ({inSlots} equipped)
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </span>
                {available ? <span className="pet-bead-catalog__badge">Tap to equip</span> : null}
              </button>
            </li>
          );
        })}
      </ul>

      <ActionButtons
        primary="Unlock Bead Slot"
        secondary={[]}
        primaryDisabled={pet.unlockedBeadSlots >= 9 || inv.beadSlotKeys < 1}
      />
    </>
  );
}