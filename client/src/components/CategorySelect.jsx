// Category Selector for the product form
import * as Select from "@radix-ui/react-select";
import styles from "./CategorySelect.module.css";

export const CATEGORIES = ["wall", "mantel", "alarm", "floor", "desk", "watch", "hourglass"];

export default function CategorySelect({ value, onChange, id }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger id={id} className={styles.trigger} aria-label="Category">
        <Select.Value placeholder="Select a Category" />
        <Select.Icon className={styles.icon}>🔻</Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content} position="popper" sideOffset={4}>
          <Select.Viewport>
            {CATEGORIES.map((cat) => (
              <Select.Item key={cat} value={cat} className={styles.item}>
                <Select.ItemText>{cat}</Select.ItemText>
                <Select.ItemIndicator className={styles.check}>✔️</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
