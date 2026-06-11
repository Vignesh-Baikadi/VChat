import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Redirect unauthenticated users
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;