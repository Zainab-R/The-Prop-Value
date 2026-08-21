"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print btn-anim inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-semibold text-accent-foreground hover:bg-[#ea580c]"
    >
      <Printer size={18} />
      Print / Save as PDF
    </button>
  );
}
