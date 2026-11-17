// Sort Selector on the Catalogue
import * as Select from "@radix-ui/react-select";
import { TbChevronDown, TbCheck } from "react-icons/tb";
import shared from "./CategorySelect.module.css";
import styles from "./SortSelect.module.css";

// value -> what api expecting and label is what users browse through
export const SORTS = [
  { value: "name", label: "Name: A-Z" },
  { value: "price", label: "Price: Low To High" },
  { value: "price-desc", label: "Price: High To Low" },
  { value: "newest", label: "Newest" },
];

export default function SortSelect({ value, onChange }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={styles.trigger} aria-label="Sort">
        <span>
          Sort: <Select.Value />
        </span>
        <Select.Icon>
          <TbChevronDown aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={shared.content} position="popper" sideOffset={4} align="end">
          <Select.Viewport>
            {SORTS.map((s) => (
              <Select.Item key={s} value={s.value} className={shared.item}>
                <Select.ItemText>{s.label}</Select.ItemText>
                <Select.ItemIndicator className={shared.check}>
                  <TbCheck aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
