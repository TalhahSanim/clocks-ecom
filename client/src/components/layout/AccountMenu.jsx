// Account Menu in the Nav -> who is logged in , admin Link and logout
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import styles from "./AccountMenu.module.css";

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={styles.trigger}>{user.name || user.email} 🔻</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} align="end" sideOffset={6}>
          <DropdownMenu.Label className={styles.label}>{user.email}</DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.separator} />

          <DropdownMenu.Item className={styles.item} onSelect={() => navigate("/catalogue")}>
            Store
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.item} onSelect={() => navigate("/saved")}>
            Saved For Later
          </DropdownMenu.Item>
          <DropdownMenu.Item className={styles.item} onSelect={() => navigate("/orders")}>
            Orders
          </DropdownMenu.Item>

          {user.admin && (
            <DropdownMenu.Item className={styles.item} onSelect={() => navigate("/inventory")}>
              Inventory
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Separator className={styles.separator} />
          <DropdownMenu.Item className={`${styles.item} ${styles.danger}`} onSelect={logout}>
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
