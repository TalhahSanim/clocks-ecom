import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UseAuth";

function ProtectedRoute({ children }) {
  // const { isLoggedIn } = useAuth();
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <h3 style={{ color: "rgb(225, 202, 111)" }}>Checking login Status...</h3>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;
