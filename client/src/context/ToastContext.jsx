// Lets components display a short message -> const toast = useToast() toast("saved","success")
import { createContext, useContext, useState, useCallback } from "react";
import * as Toast from "@radix-ui/react-toast";
import { TbX } from "react-icons/tb";
import styles from "./Toast.module.css";

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Add a toast and radix remove it after specific duration

  const display = useCallback((message, type = "info") => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((toast) => toast.id !== id));
  return (
    <ToastContext.Provider value={display}>
      <Toast.Provider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className={`${styles.toast} ${styles[toast.type]}`}
            onOpenChange={(open) => !open && removeToast(toast.id)}
          >
            <Toast.Description>{toast.message}</Toast.Description>
            <Toast.Close className={styles.close} aria-label="Close">
              <TbX aria-hidden="true" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className={styles.viewport} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}

// Any Component -> const toast = useToast()- toast("Saved","success")
export const useToast = () => useContext(ToastContext);
