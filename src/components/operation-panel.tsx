import { OperationHead } from "./operation-head";
import { MaterialFooter, type MaterialDef } from "./material-footer";
import type { ReactNode } from "react";

export function OperationPanel({
  title,
  subtitle,
  meta,
  children,
  materials,
  materialsVariant,
  materialsTitle,
}: {
  title: string;
  subtitle?: string;
  meta?: string;
  children: ReactNode;
  materials?: MaterialDef[];
  materialsVariant?: "grid" | "list";
  materialsTitle?: string;
}) {
  return (
    <section className="frame operation-panel">
      <OperationHead title={title} subtitle={subtitle} meta={meta} />
      <div className="operation-panel__body" data-operation-body>
        {children}
      </div>
      {materials?.length ? (
        <MaterialFooter
          materials={materials}
          variant={materialsVariant ?? "grid"}
          title={materialsTitle}
        />
      ) : null}
    </section>
  );
}