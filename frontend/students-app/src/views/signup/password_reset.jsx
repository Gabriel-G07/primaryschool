import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordReset = ({ setIsLogin }) => {
  const [step, setStep] = useState(1); 
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const urlParams = new URLSearchParams(window.location.search);
  const uid = urlParams.get('uid');
  const tokenParam = urlParams.get('token');

  useEffect(() => {
    setToken(tokenParam);
  }, [tokenParam]);

  const handleSubmitRegistrationNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/password-reset/', {
        registrationNumber,
      });
      setSuccess('Code sent to your email address.');
      setError(null);
      setStep(2);
    } catch (error) {
      setError(error.response.data.error);
      setSuccess(null);
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/password-reset-verify/', {
        registrationNumber,
        code,
      });
      setSuccess('Code verified successfully.');
      setError(null);
      setStep(3);
    } catch (error) {
      setError(error.response.data.error);
      setSuccess(null);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/password-reset-complete/${uid}/${token}/`, {
        password,
        confirmPassword,
      });
      setSuccess('Password reset successfully.');
      setError(null);
      setStep(4);
    } catch (error) {
      setError(error.response.data.error);
      setSuccess(null);
    }
  };

  return (
    <div className="password-reset-container">
      {step === 1 && (
        <div>
          <h2>Password Reset</h2>
          <p>Please enter your Registration Number to get the verification code sent to your email.</p>
          <form onSubmit={handleSubmitRegistrationNumber}>
            <div className="form-input">
              <label>Reg Number<br></br></label>
              <input 
                type="text" 
                placeholder="Registration Number" 
                value={registrationNumber} 
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button className="form-button" type="submit">
              Get Code
            </button>
            <a className="small text-muted" onClick={() => setIsLogin(true)}><br></br>
              Back to Login
            </a>
          </form>
        </div>
      )}
      
      {step === 2 && (
        <div>
          <h2>Verify Code</h2>
          <p>A code has been sent to your email address.</p>
          <form onSubmit={handleSubmitCode}>
            <div className="form-input">
              <input 
                type="text" 
                placeholder="Verification Code" 
                value={code} 
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <button className="form-button" type="submit">
              Verify Code
            </button>
            <a className="small text-muted" onClick={() => setStep(1)}>
              Back
            </a>
          </form>
        </div>
      )}
      
      {step === 3 && (
        <div>
          <h2>Reset Password</h2>
          <form onSubmit={handleSubmitPassword}>
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
            <a className="small text-muted" onClick={() => setStep(2)}>
              Back
            </a>
          </form>
        </div>
      )}
      
      {step === 4 && (
        <div>
          <h2>Password Reset Successful</h2>
          <p>Your password has been reset successfully.</p>
          <a className="small text-muted" onClick={() => setIsLogin(true)}>
            Back to Login
          </a>
        </div>
      )}
    </div>
  );
};

export default PasswordReset;