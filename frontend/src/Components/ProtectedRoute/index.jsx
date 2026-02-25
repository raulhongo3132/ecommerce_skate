import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';

const ProtectedRoute = ({ children }) => {
  const { signOut, hasAnAccount } = useContext(ShoppingCartContext);
  const { hasUserAnAccount } = hasAnAccount();

  if (!hasUserAnAccount || signOut) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
