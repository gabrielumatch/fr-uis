export function SectionHeader({
  title,
  subtitle = "",
  headingLevel = "h2",
  id,
}: {
  title: string;
  subtitle?: string;
  headingLevel?: "h1" | "h2";
  id?: string;
}) {
  const Heading = headingLevel === "h1" ? "h1" : "h2";
  return (
    <header className="ws-header">
      <Heading className="ws-header__title" id={id}>
        <span className="dim">◇</span> {title} <span className="dim">◇</span>
      </Heading>
      {subtitle ? <p className="ws-header__sub">{subtitle}</p> : null}
    </header>
  );
}

export function WorkshopHeader({
  subtitle = "Upgrade, customize and manage your equipment.",
}: {
  subtitle?: string;
} = {}) {
  return (
    <SectionHeader
      id="equipment-workshop-title"
      title="EQUIPMENT WORKSHOP"
      subtitle={subtitle}
      headingLevel="h1"
    />
  );
}