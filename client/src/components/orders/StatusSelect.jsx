// Admin order Status Radix Select styled pills
import * as Select from "@radix-ui/react-select";
import { TbChevronDown, TbCheck } from "react-icons/tb";
import shared from "../products/CategorySelect.module.css";
import styles from "../../pages/MyOrders.module.css";

const statuses = ["Placed", "Shipped", "Delivered"];

export default function StatusSelect({ value, onChange, label }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      {/* Coloured pill -> Closed */}
      <Select.Trigger className={`${styles.statusSelect} ${styles[value.toLowerCase()]}`} aria-label={label}>
        <Select.Value />
        <Select.Icon>
          <TbChevronDown aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      {/* Open */}
      <Select.Portal>
        <Select.Content className={shared.content} position="popper" sideOffset={4}>
          <Select.Viewport>
            {statuses.map((status) => (
              <Select.Item key={status} value={status} className={shared.item}>
                <Select.ItemText>{status}</Select.ItemText>
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
