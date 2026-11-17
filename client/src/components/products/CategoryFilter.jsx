// Category tags above catalogue
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { CATEGORIES } from "./CategorySelect";
import styles from "./CategoryFilter.module.css";

export default function CategoryFilter({ value, onChange }) {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      // Clicking the pill that already selected sends "" . we ignore it so one tag is active
      onValueChange={(val) => val && onChange(val)}
      className={styles.group}
      aria-label="Category"
    >
      {["all", ...CATEGORIES].map((cat) => (
        <ToggleGroup.Item key={cat} value={cat} className={styles.tags}>
          {cat}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
