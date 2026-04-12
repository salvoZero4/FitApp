import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useContext(AuthContext)!;

  // Se non c'è una sessione attiva (utente non loggato), mandalo al login!
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Altrimenti, lascialo passare mostrandogli la pagina richiesta (children)
  return <>{children}</>;
}
