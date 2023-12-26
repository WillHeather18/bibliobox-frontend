import React from 'react';
import { UserContext } from './UserContext';
import { AuthContext } from './Authcontext';
import UserDetails from '../userDetails';

function RootProvider({ children }) {
  const [userDetails, setUserDetails] = React.useState(new UserDetails());
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default RootProvider;