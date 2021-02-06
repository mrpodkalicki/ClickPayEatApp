import { useContext, createContext } from "react";

export const AppContext = createContext(null);

export function useAppContext(strore: any) {
  return useContext(AppContext);
}