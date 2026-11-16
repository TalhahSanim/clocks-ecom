// Delete button asking first in accessible dialogue
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./ConfirmDelete.module.css";

export default function ConfirmDelete({ name, onConfirm }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.trigger}>Delete</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Delete {name}</Dialog.Title>
          <Dialog.Description className={styles.description}>
            This Removes Clock and it's Image. It Can't Be Undone
          </Dialog.Description>

          <div className={styles.actions}>
            <Dialog.Close className={styles.cancel}>Cancel</Dialog.Close>
            <Dialog.Close className={styles.confirm} onClick={onConfirm}>
              Delete
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
