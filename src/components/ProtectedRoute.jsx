// components/ProtectedRoute.js
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return children;
  }

  return null;
};

export default ProtectedRoute;
