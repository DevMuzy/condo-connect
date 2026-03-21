import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
