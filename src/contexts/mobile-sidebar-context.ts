import { createContext, useContext } from 'react';

type MobileSidebarContextType = {
  isSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  sidebarId: string;
};

const MobileSidebarContext = createContext<MobileSidebarContextType | null>(
  null
);

export const MobileSidebarProvider = MobileSidebarContext.Provider;

export function useMobileSidebar() {
  return useContext(MobileSidebarContext) as MobileSidebarContextType;
}
