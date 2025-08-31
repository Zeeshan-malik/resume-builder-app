import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('error');

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage(null);
    setMessageType('error');

    if (!email || !password) {
      setMessage('Please enter both email and password.');
      setMessageType('error');
      return;
    }
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      setMessage('Login successful!');
      setMessageType('success');
      
      // Store user data and token in local storage or state
      // We will implement this in the next step
      console.log(data);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
