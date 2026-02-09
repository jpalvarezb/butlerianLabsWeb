import { Navigate } from 'react-router-dom';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
  product: string;
  children: React.ReactNode;
}

/**
 * Wraps a route that requires:
 *  1. An authenticated user
 *  2. Approved access for the given product
 *
 * Redirects:
 *  - /login   if not signed in
 *  - /pending if signed in but not yet approved
 */
export function ProtectedRoute({ product, children }: ProtectedRouteProps) {
  const { user, loading, hasAccess, accessStatus } = useAuth();

  // Still resolving session — show nothing to avoid flash
  if (loading) return null;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Logged in but hasn't requested this product yet, or request is pending/rejected
  const status = accessStatus(product);

  if (status === 'approved') {
    return <>{children}</>;
  }

  // pending or rejected or never requested — show pending page
  return <Navigate to="/pending" replace />;
}
