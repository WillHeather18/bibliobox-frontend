import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? <Component/> : <Navigate to="/login"/>
}

export default ProtectedRoute;