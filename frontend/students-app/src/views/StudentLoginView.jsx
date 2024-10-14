import React, { useState, useEffect } from 'react';
import Login from './signup/login';
import Signup from './signup/signin';
import PasswordReset from './signup/password_reset';

const StudentLoginHTML = ({
  isLogin,
  setIsLogin,
  handleSubmitLogin,
  handleSubmitRegister,
  formData,
  setFormData,
  handleChange,
  errors,
  handleForgotPassword,
}) => {
  return (
    <div className="form-container">
      <link rel="stylesheet" type="text/css" href="src/styles/signup.css"></link>
      <div className="image-card">
        <img 
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" 
          alt="login form" 
          style={{ width: '100%', borderRadius: '1rem' }} 
        />
      </div>
      <div className="form-card">
        {isLogin ? (
          <Login 
            handleSubmitLogin={handleSubmitLogin}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            errors={errors}
            handleForgotPassword={handleForgotPassword}
          />
        ) : (
          <Signup 
            handleSubmitRegister={handleSubmitRegister}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export default StudentLoginHTML;