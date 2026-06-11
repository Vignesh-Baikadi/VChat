import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // Redirect logged-in users away from auth pages
  if (token) {
    return <Navigate to="/chat" />;
  }

  return children;
}

export default PublicRoute;