"use client";

import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface RowAction {
  label: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

/**
 * A single "more actions" trigger that replaces a row of separate
 * icon buttons (Edit, Delete, View, ...) with one consolidated menu —
 * fewer buttons on screen without losing any functionality.
 */
export default function RowActionsMenu({
  actions,
  ariaLabel = "Row actions",
}: {
  actions: RowAction[];
  ariaLabel?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
      >
        <MoreVertical size={18} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <DropdownMenuItem
              key={action.label}
              variant={action.variant}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {Icon && <Icon size={16} />}
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
