import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  // 1️⃣ Still checking auth → block UI
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user == null) {
    return <Navigate to="/login" replace />;
  }

  //  "unauthorized" page
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  // authorize
  return children;
}

export default ProtectedRoute;
