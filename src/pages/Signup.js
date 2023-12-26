import React from "react";
import { Link } from "react-router-dom";
import AppBar from "../Components/AppBar";


class Signup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        signupStatus: ''
      };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleInputChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  
    handleSubmit(event) {
        event.preventDefault();
      
        if (this.state.password !== this.state.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
      
        // Hash the password

            return fetch('http://localhost:5000/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
              }),
            })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'success') {
              this.setState({ loginStatus: 'Signup Successful' });
              localStorage.setItem('token', data.token);
            } else if (data.status === 'failure') {
              this.setState({ loginStatus: data.message });
            }
          })
          .catch((error) => {
            this.setState({ loginStatus: 'Login Failed' });
          });
      }
  
    render() {
      return (
        <div>
          <AppBar transparent={false} />
          <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input type="text" name="email" onChange={this.handleInputChange} />
            </label>
            <label>
              Password:
              <input type="password" name="password" onChange={this.handleInputChange} />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPassword" onChange={this.handleInputChange} />
            </label>
            <button type="submit">Signup</button>
          </form>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      );
    }
  }
  
  export default Signup;