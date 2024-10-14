import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get('uid');
  const tokenParam = urlParams.get('token');

  useEffect(() => {
    setToken(tokenParam);
  }, [tokenParam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      try {
        const response = await axios.post('/password-reset/', {
          email,
        });
        setSuccess('Password reset link sent to your email.');
        setError(null);
      } catch (error) {
        setError(error.response.data.error);
        setSuccess(null);
      }
    } else {
      try {
        const response = await axios.post(`/password-reset-complete/${uid}/${token}/`, {
          password,
          confirmPassword,
        });
        setSuccess('Password reset successfully.');
        setError(null);
      } catch (error) {
        setError(error.response.data.error);
        setSuccess(null);
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleResetPassword = () => {
    setIsForgotPassword(false);
  };

  return (
    <div className="password-reset-container">
      {isForgotPassword ? (
        <div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button className="form-button" type="submit">
              Send Reset Link
            </button>
            <a className="small text-muted" onClick={handleResetPassword}>
              Back to Reset Password
            </a>
          </form>
        </div>
      ) : (
        <div>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-input password-input">
              <input 
                type="password" 
                placeholder="New Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-input password-input">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button className="form-button" type="submit">
              Reset Password
            </button>
            <a className="small text-muted" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;