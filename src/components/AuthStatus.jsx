import { useAuth } from "../context/UseAuth";
import styles from "./AuthStatus.module.css";

function AuthStatus() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <h3 className={styles.loading}>Checking Login Status...</h3>;
  }

  if (!isLoggedIn) {
    return <span className={styles.authStatus}>You are not Logged In!</span>;
  }

  return (
    <>
      <h3 className={styles.authStatus}>Welcome, {user.name}</h3>
      <button onClick={logout} className={styles.logoutButton}>
        Logout
      </button>
    </>
  );
}
export default AuthStatus;
