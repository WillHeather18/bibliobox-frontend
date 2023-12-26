import React from 'react';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'; import AboutUs from './Aboutus'; import HowItWorks from './Howitworks'; import Ourboxes from './Ourboxes'; import Login from './Login'; import Signup from './Signup'; import ProtectedRoute from './ProtectedRoute'; import Profile from './Profile'; import RootProvider from '../context/RootProvider'; import Dashboard from './Dashboard';

function App() {
  const MainContainer = ({children}) => {
    return (
      <div className="main-container">
        {children}
      </div>
    );
  }

  return (
    <RootProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainContainer><Home /></MainContainer>} />
            <Route path="/aboutus" element={<MainContainer><AboutUs /></MainContainer>} />
            <Route path="/howitworks" element={<MainContainer><HowItWorks /></MainContainer>} />
            <Route path="/ourboxes" element={<MainContainer><Ourboxes /></MainContainer>} />
            <Route path="/login" element={<MainContainer><Login /></MainContainer>} />
            <Route path="/signup" element={<MainContainer><Signup /></MainContainer>} />
            <Route path="/profilet" element={<MainContainer><Profile /></MainContainer>} />
            <Route path="/profile" element={<MainContainer><ProtectedRoute component={Profile} redirectTo='/profile' /></MainContainer>} />
            <Route path="/dashboard" element={<MainContainer><ProtectedRoute component={Dashboard} /></MainContainer>} />     
          </Routes>
        </div>
      </Router>
      </RootProvider>
  );
}



export default App;

