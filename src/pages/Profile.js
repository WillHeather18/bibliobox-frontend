import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { UserContext } from '../context/UserContext';
import '../styles/Profile.css';
import AppBar from "../Components/AppBar";


const Profile = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { userDetails } = useContext(UserContext);
  const [selectedTab, setSelectedTab] = useState('Account Information');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <>
    <AppBar transparent={false} />
    <div className="profile-page">
    <div className="profile-container">
    <h1>Account Settings</h1>
      <div className="menu-container">
        <button className="menu-button" onClick={() => setSelectedTab('Account Information')}>Account Information</button>
        <button className="menu-button" onClick={() => setSelectedTab('Subscription details')}>Subscription details</button>
        <button className="menu-button" onClick={() => setSelectedTab('Payment/Delivery details')}>Payment/Delivery details</button>
        <button className="menu-button" onClick={() => setSelectedTab('Support and Help')}>Support and Help</button>
        <button className="menu-button" onClick={() => setSelectedTab('Terms and Conditions')}>Terms and Conditions</button>
      </div>
      <div className="profile-content">
        {selectedTab === 'Account Information' && (
          <>
            <h2 className="tab-title">Account Information</h2>
            <p className="tab-content">Email: {userDetails.email}</p>
            <p className="tab-content">Account Created: {userDetails.creationDate}</p>
            <p className="tab-content">Last Login: {userDetails.lastLogin}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <p className="uuid">uuid: {userDetails.uuid}</p>
          </>
        )}
        {selectedTab === 'Subscription details' && <p className="tab-content">Subscription details content goes here</p>}
        {selectedTab === 'Payment/Delivery details' && <p className="tab-content">Payment/Delivery details content goes here</p>}
        {selectedTab === 'Support and Help' && <p className="tab-content">Support and Help content goes here</p>}
        {selectedTab === 'Terms and Conditions' && <p className="tab-content">Terms and Conditions content goes here</p>}
      </div>
    </div>
    </div>
    </>
  );
}

export default Profile;