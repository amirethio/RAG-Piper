import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
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
    console.log("we are here ");
    console.log(user);
    

    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Authenticated → render page
  return children;
}

export default ProtectedRoute;
