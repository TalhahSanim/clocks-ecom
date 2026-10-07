import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";
import styles from "./ProtectedRoute.module.css";

function ProtectedRoute({ children }) {
  // const { isLoggedIn } = useAuth();
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <h3 className={styles.loading}>Checking login Status...</h3>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
