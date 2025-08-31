import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('error');

  const submitHandler = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!name || !email || !password || !confirmPassword) {
      setMessage('All fields are required.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
    } else {
      setMessage(null);
      setMessageType('error');
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.post(
          '/api/users/register',
          { name, email, password },
          config
        );

        setMessage('Registration successful! You can now log in.');
        setMessageType('success');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred. Please try again.');
        }
        setMessageType('error');
        console.error(error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {message && <div className={`message ${messageType}`}>{message}</div>}
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
