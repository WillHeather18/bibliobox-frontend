import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Authcontext'; // Import the AuthContext
import { UserContext } from '../context/UserContext';
import UserDetails from '../userDetails';
import AppBar from "../Components/AppBar";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated } = React.useContext(AuthContext); // Get setIsAuthenticated from the context
  const { setUserDetails } = React.useContext(UserContext);
  const navigate = useNavigate();


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const basicDetails = await APILogin(email, password);
      const uuid = basicDetails.uuid;
      const recommendations = await APIRecommendations(uuid);
      const userDetails = UserDetails.loginFromJSON(basicDetails);
      userDetails.currentRecommendations = UserDetails.recommendationsFromJSON(recommendations);
      setUserDetails(userDetails);
      console.log(recommendations);
      navigate('/dashboard');
      }
    catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  function APILogin(email, password) {
    return fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        return data.user;
      } else if (data.status === 'failure') {
      } else {
      }
    }).catch(error => {
  console.log('In catch callback'); // Log that we're in the catch callback
});
  }

  function APIRecommendations(uuid){
    const url = `http://localhost:5000/recommendations/${uuid}`;
    return fetch(url , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.status === 'success') {
        return data.recommendations;
      }
    }).catch(error => {
  })};

  return (
    <div>
      <AppBar transparent={false} />
      <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="email" name="email" onChange={handleInputChange} />
        <input type="password" name="password" onChange={handleInputChange} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
    </div>
  );
};

export default Login;
