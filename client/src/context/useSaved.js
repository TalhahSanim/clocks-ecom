// Any component -> const {isSaved,toggleSaved} = useSaved()
import { useContext } from "react";
import { SavedContext } from "./SavedContext";

export function useSaved() {
  return useContext(SavedContext);
}
