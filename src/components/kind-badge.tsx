import React from "react";

export type EntryKind = "post" | "til";

const kindStyles: Record<EntryKind, { label: string; className: string }> = {
  post: { label: "Post", className: "bg-blue-100 text-blue-800" },
  til: { label: "TIL", className: "bg-teal-100 text-teal-800" },
};

interface KindBadgeProps {
  kind: EntryKind;
}

export const KindBadge: React.FC<KindBadgeProps> = ({ kind }) => {
  const { label, className } = kindStyles[kind];
  return (
    <span
      className={`inline-block mr-2 px-2 py-0.5 align-middle font-sans text-xs font-medium rounded-sm ${className}`}
    >
      {label}
    </span>
  );
};
