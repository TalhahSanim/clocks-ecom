// ADMINS ONLY -> Server checks with requireAdmin and this component hides the page
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  // Wait for Firebase saying whether we're logged in
  if (isLoading) return <p>Checking Login Status...</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.admin) return <Navigate to="/" replace />;
  return children;
}
