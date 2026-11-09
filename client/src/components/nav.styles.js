import { style } from "@vanilla-extract/css";
import { vars } from "../styles/theme.css.js";

export const nav = style({
  display: "flex",
  gap: vars.space.medium,
  padding: vars.space.medium,
  fontSize: "medium",
});

const link = style({
  textDecoration: "none",
  color: vars.color.navText,
  paddingBottom: vars.space.small,
  fontWeight: 700,
});

export const active = style([
  link,
  {
    borderBottom: `3px solid ${vars.color.highlight}`,
  },
]);

export const inactive = style([
  link,
  {
    borderBottom: `1px solid ${vars.color.muted}`,
    ":hover": {
      color: vars.color.highlight,
    },
  },
]);
