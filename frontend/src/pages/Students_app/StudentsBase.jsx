import React, { useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import StudentsLayoutHTML from '../../views/Students_app/StudentsHomeView';
import StudentLoginHTML from '../../views/Students_app/StudentLoginView';
import { 
  StudentDashboardPage, 
  StudentInformationPage,  
  StudentSettingsPage, 
  StudentClassesPage,
  StudentLibraryPage,
  StudentNoticesPage, 
  StudentResultsPage, 
  StudentTimeTablesPage 
} from '../../components/Students_app/students';
import LoadingIndicator from '../../components/LoadingIndicator';

function StudentLayout() {
  const { user, logoutUser, loginStudentUser, registerStudentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('authTokens');
  const [content, setContent] = useState(<StudentDashboardPage />);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [activeButton, setActiveButton] = useState('student_dashboard');
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });

  let user_id;

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  useEffect(() => {
    if (token === null) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleNavClick = (e) => {
    const buttonId = e.target.id;
    setActiveButton(buttonId);
    switch (buttonId) {
      case 'student_dashboard':
        setContent(<StudentDashboardPage />);
        break;
      case 'student_personal_info':
        setContent(<StudentInformationPage />);
        break;
      case 'student_settings':
        setContent(<StudentSettingsPage />);
        break;
      case 'student_classes':
        setContent(<StudentClassesPage/>);
        break;
      case 'student_library':
        setContent(<StudentLibraryPage/>);
        break;
      case 'student_notices':
        setContent(<StudentNoticesPage/>);
        break;
      case 'student_timetables':
        setContent(<StudentTimeTablesPage/>);
        break;
      case 'student_results':
        setContent(<StudentResultsPage/>);
        break;
      case 'student_log_out':
        logoutStudent();
        break;
    }
  };

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

  if (loading) {
    return <LoadingIndicator/>;
  }

  return (
    <>
      {token ? (
        <StudentsLayoutHTML
          content={content}
          handleNavClick={handleNavClick}
          activeButton={activeButton}
          logoutUser={logoutUser}
        />
      ) : (
        <StudentLoginHTML
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleSubmitLogin={handleSubmitLogin}
          handleSubmitRegister={handleSubmitRegister}
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          errors={errors}
        />
      )}
    </>
  );
};

export default StudentLayout;