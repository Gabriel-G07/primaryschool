import React from 'react';

const StudentLoginHTML = ({
  logoutStudent,
  isLogin,
  setIsLogin,
  handleSubmitLogin,
  handleSubmitRegister,
  formData,
  setFormData,
  handleChange,
  errors,
}) => {
  return (
    <div className="form-container">
    <div className="image-card">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" alt="login form" style={{ width: '100%', borderRadius: '1rem' }}/>
    </div>
    <div className="form-card">
      {isLogin ? (
        <form onSubmit={handleSubmitLogin}>
          <h1>Mount Sunset Group Of Schools</h1>
          <h3>Students Signup Page</h3>
          <a className="navbar-brand" href="#">
            <img className="image-card" src="https://i.imgur.com/juL1aAc.png" style={{ width: '50%', position: 'center', borderRadius: 'rem' }} />
          </a>
          <div className="form-input">
            <div><label htmlFor="form2Example17">Reg Number</label></div>
            <input type="text" id="form2Example17" className="form-input" name='username' placeholder="RegNumber"/>
            
            <div><label htmlFor="form2Example27">Password</label></div> 
            <input type="password" id="form2Example27" className="form-input" name='password' placeholder="Password"/>
          </div>

          <div>
            <button className="form-button" type="submit">Login</button>
          </div>
          <div>
            <a href="#!" className="small text-muted">Forgot password?</a>
          </div>
          <div>
            Don't have an account? <a href="#!" className="small text-muted" onClick={() => setIsLogin(false)}>Register Now</a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitRegister}>
          <h1>Mount Sunset Group Of Schools</h1>
          <h3>Students Signup Page</h3>
          <div className="form-input">
            {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
            <input type="text" id="usernameInput" name="username" placeholder="Reg Number" 
            value={formData.username} onChange={handleChange}/>
            <label htmlFor="usernameInput">Reg Number</label>
          </div>
          
          <div className="form-input">
            {errors.first_name && <div style={{ color: 'red' }}>{errors.first_name}</div>}
            <input type="text" id="firstNameInput" name="first_name" placeholder="Name(s)" 
            value={formData.first_name} onChange={handleChange}/>
            <label htmlFor="firstNameInput">Name(s)</label>
          </div>

          <div className="form-input">
            {errors.last_name && <div style={{ color: 'red' }}>{errors.last_name}</div>}
            <input type="text" id="lastNameInput" name="last_name" placeholder="Surname"
              value={formData.last_name} onChange={handleChange}/>
            <label htmlFor="lastNameInput">Surname</label>
          </div>

          <div className="form-input">
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            <input type="email" id="emailInput" name="email" placeholder="Email Address"
              value={formData.email} onChange={handleChange}/>
            <label htmlFor="emailInput">Email Address</label>
          </div>

          <div className="form-input">
            {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
            <input type="password" id="passwordInput" name="password" placeholder="Password"
              value={formData.password} onChange={handleChange}/>
            <label htmlFor="passwordInput">Password</label>
          </div>

          <div className="form-input">
            {errors.password2 && <div style={{ color: 'red' }}>{errors.password2}</div>}
            <input type="password" id="confirmPasswordInput" name="password2" placeholder="Confirm Password"
              value={formData.password2} onChange={handleChange}/>
            <label htmlFor="confirmPasswordInput">Confirm Password</label>
          </div>

        
          <button className="form-button" type="submit">Register</button>
          <div><a href="#!" className="small text-muted">Forgot password?</a></div>
          <div>
          Already have an account? <a href="#!" className="small text-muted" onClick={() => setIsLogin(true)}>Login Now</a>
          </div>
        </form>
      )}
    </div>
  </div>
  );
};

export default StudentLoginHTML;