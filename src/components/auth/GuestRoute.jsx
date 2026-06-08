import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function GuestRoute({ children, redirectIfAuth = false }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0B1120]">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (redirectIfAuth && session) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
