import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    navText: "whitesmoke",
    highlight: "#e9d045",
    muted: "#6d6667",
  },
  space: {
    small: "4px",
    medium: "16px",
  },
});
