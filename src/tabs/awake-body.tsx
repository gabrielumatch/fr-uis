import { awakeManagementState } from "../data/systems/awake-management";
import { getEquippedHost } from "../data/workshop/equipped";
import { AwakeTargetItem } from "../components/awake/awake-target-item";
import { AwakeNotice } from "../components/awake/awake-notice";
import { AwakeResults } from "../components/awake/awake-results";
import { AwakeHighlight } from "../components/awake/awake-highlight";
import { AwakeActions } from "../components/awake/awake-actions";

export function AwakeBody() {
  const host = getEquippedHost();
  const s = awakeManagementState;
  return (
    <>
      <AwakeTargetItem name={host.name} />
      <AwakeNotice penyaCost={s.penyaCost} />
      <AwakeResults lines={s.lines} showColored={s.showColoredStats} />
      <AwakeHighlight
        options={s.highlightOptions}
        primary={s.highlightPrimary}
        secondary={s.highlightSecondary}
        showColored={s.showColoredStats}
        summarize={s.summarizeStats}
      />
      <AwakeActions />
    </>
  );
}