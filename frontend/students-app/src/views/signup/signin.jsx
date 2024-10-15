import React, { useState } from 'react';

const Signup = ({
    handleSubmitRegister,
    formData,
    isLogin,
    setIsLogin,
    setFormData,
    handleChange,
    errors,
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        digit: false,
        specialChar: false,
    });
    const [isFormValid, setIsFormValid] = useState(false);

    React.useEffect(() => {
        const errors = {
          length: formData.password.length < 8,
          uppercase: !/[A-Z]/.test(formData.password),
          lowercase: !/[a-z]/.test(formData.password),
          digit: !/[0-9]/.test(formData.password),
          specialChar: !/[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/.test(formData.password),
        };
      
        setPasswordError(errors);
    }, [formData.password]);
      
      
    React.useEffect(() => {
        if (
          formData.username &&
          formData.first_name &&
          formData.last_name &&
          formData.email &&
          formData.password &&
          formData.password2 &&
          !passwordError.length &&
          !passwordError.uppercase &&
          !passwordError.lowercase &&
          !passwordError.digit &&
          !passwordError.specialChar &&
          formData.password === formData.password2
        ) {
          setIsFormValid(true);
        } else {
          setIsFormValid(false);
        }
      }, [
        formData,
        passwordError,
        formData.password2,
      ]);
    
      const handleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
      };
    
      return (
        <form onSubmit={handleSubmitRegister}>
          <h1>Student Signup</h1>
          <div className="form-input">
            {errors.username && <div className="error-message">{errors.username}</div>}
            <label htmlFor="usernameInput">Reg Number</label>
            <input 
              type="text" 
              id="usernameInput" 
              name="username" 
              placeholder="Reg Number" 
              value={formData.username} 
              onChange={handleChange}
            />
          </div>
          
          <div className="form-input">
            {errors.first_name && <div className="error-message">{errors.first_name}</div>}
            <label htmlFor="firstNameInput">Name(s)</label>
            <input 
              type="text" 
              id="firstNameInput" 
              name="first_name" 
              placeholder="Name(s)" 
              value={formData.first_name} 
              onChange={handleChange}
            />
          </div>
      
          <div className="form-input">
            {errors.last_name && <div className="error-message">{errors.last_name}</div>}
            <input 
              type="text" 
              id="lastNameInput" 
              name="last_name"
              placeholder="Surname" 
              value={formData.last_name} 
              onChange={handleChange}
            />
            <label htmlFor="lastNameInput">Surname</label>
          </div>
      
          <div className="form-input">
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input 
              type="email" 
              id="emailInput" 
              name="email" 
              placeholder="Email Address" 
              value={formData.email} 
              onChange={handleChange}
            />
            <label htmlFor="emailInput">Email Address</label>
          </div>
      
          <div className="form-input password-input">
            {errors.password && <div className="error-message">{errors.password}</div>}
            <input 
              type={showPassword ? "text" : "password"} 
              id="passwordInput" 
              name="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={handleChange}
            />
            <i 
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`} 
              onClick={handleShowPassword}
            />
            <label htmlFor="passwordInput">Password</label>
            {formData.password && (
              <ul>
                <li>
                  <span className={passwordError.length ? 'error' : 'success'}>
                    {passwordError.length ? 
                      <i className="fas fa-times"></i> 
                      : 
                      <i className="fas fa-check"></i>
                    } 
                    At least 8 characters long
                  </span>
                </li>
                <li>
                  <span className={passwordError.uppercase ? 'error' : 'success'}>
                    {passwordError.uppercase ? 
                      <i className="fas fa-times"></i> 
                      : 
                      <i className="fas fa-check"></i>
                    } 
                    At least one uppercase letter
                  </span>
                </li>
                <li>
                  <span className={passwordError.lowercase ? 'error' : 'success'}>
                    {passwordError.lowercase ? 
                      <i className="fas fa-times"></i> 
                      : 
                      <i className="fas fa-check"></i>
                    } 
                    At least one lowercase letter
                  </span>
                </li>
                <li>
                  <span className={passwordError.digit ? 'error' : 'success'}>
                    {passwordError.digit ? 
                      <i className="fas fa-times"></i> 
                      : 
                      <i className="fas fa-check"></i>
                    } 
                    At least one digit
                  </span>
                </li>
                <li>
                  <span className={passwordError.specialChar ? 'error' : 'success'}>
                    {passwordError.specialChar ? 
                      <i className="fas fa-times"></i> 
                      : 
                      <i className="fas fa-check"></i>
                    } 
                    At least one special character
                  </span>
                </li>
              </ul>
            )}
          </div>
      
          <div className="form-input password-input">
            {errors.password2 && <div className="error-message">{errors.password2}</div>}
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              id="confirmPasswordInput" 
              name="password2" 
              placeholder="Confirm Password" 
              value={formData.password2} 
              onChange={handleChange}
            />
      <i 
        className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`} 
        onClick={handleShowConfirmPassword}
      />
      <label htmlFor="confirmPasswordInput">Confirm Password</label>
      {formData.password2 && formData.password !== formData.password2 && (
        <span className='error-message'> 
          <i className="fas fa-times"></i> Passwords do not match
        </span>
      )}
    </div>

    <button 
      className={`form-button ${isFormValid ? 'valid' : 'disabled'}`} 
      type="submit" 
      disabled={!isFormValid}
    >
      Register
    </button>
    
    <div>
      Already have an account? 
      <a 
        className="small text-muted" 
        onClick={() => setIsLogin(true)}
      >
        Login Now
      </a>
    </div>
  </form>
);
};

export default Signup;