// The logged in user's saved clocks loaded from the API
import { createContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getSaved, saveClock, unsaveClock } from "../api/saved";

export const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState([]);

  // Logged in -> load user list & Logout remove it
  useEffect(() => {
    if (!user) {
      setSaved([]);
      return;
    }
    getSaved()
      .then(setSaved)
      .catch(() => setSaved([]));
  }, [user?.id]);

  const isSaved = (id) => saved.some((item) => item.id === id);

  // Saved? -> Remove it and Not saved save it
  async function toggleSaved(clock) {
    if (isSaved(clock.id)) {
      await unsaveClock(clock.id);
      setSaved((prev) => prev.filter((item) => item.id !== clock.id));
    } else {
      const item = await saveClock(clock.id);
      setSaved((prev) => [item, ...prev]);
    }
  }

  return <SavedContext.Provider value={{ saved, isSaved, toggleSaved }}>{children}</SavedContext.Provider>;
}
