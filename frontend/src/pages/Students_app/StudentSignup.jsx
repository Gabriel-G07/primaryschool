import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../styles/Students_app/signup.css';

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const { loginStudentUser, registerStudentUser } = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username.length === 0 || password.length === 0) {
      alert("Please fill in both Registration Number and Password");
      return;
    }

    try {
      loginStudentUser(username, password);
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerStudentUser(
        formData.email,
        formData.username,
        formData.first_name,
        formData.last_name,
        formData.password,
        formData.password2
      );
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              <input type="text" id="usernameInput" name="username" placeholder="Username" 
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
}

export default AuthPage;