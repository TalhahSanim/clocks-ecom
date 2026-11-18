// Dark Mode button in header
import { useEffect, useState } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { TbMoon, TbSun } from "react-icons/tb";
import styles from "./ThemeToggle.module.css";
export default function ThemeToggle() {
  // Begin from saved selection light or dark
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <Toggle.Root pressed={dark} onPressedChange={setDark} className={styles.toggle} aria-label="Dark Mode">
      {dark ? <TbSun size={20} /> : <TbMoon size={20} />}
    </Toggle.Root>
  );
}
