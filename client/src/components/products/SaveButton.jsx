//  toggle: Save For Later  -> ✔️ Saved -> and Logged out users go to login page
import * as Toggle from "@radix-ui/react-toggle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { useSaved } from "../../context/useSaved";
import styles from "./SaveButton.module.css";

export default function SaveButton({ clock }) {
  const { user } = useAuth();
  const { isSaved, toggleSaved } = useSaved();
  const navigate = useNavigate();
  const saved = isSaved(clock.id);

  async function handleClick() {
    if (!user) return navigate("/login");
    try {
      await toggleSaved(clock);
    } catch (err) {
      alert(err.response?.data || "Could Not Update Your Saved Clocks");
    }
  }
  return (
    // Clicked is it saved and radix use onPressedChange per click
    <Toggle.Root className={styles.save} pressed={saved} onPressedChange={handleClick}>
      {saved ? "✔️ Saved" : "Save "}
    </Toggle.Root>
  );
}
