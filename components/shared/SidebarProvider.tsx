"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile drawer automatically on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toggle: () => setOpen((prev) => !prev),
        close: () => setOpen(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);

  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  return ctx;
}
