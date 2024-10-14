import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import StudentsLayoutHTML from '../views/StudentsHomeView';
import StudentLoginHTML from '../views/StudentLoginView';
import { 
  StudentDashboardPage, 
  StudentInformationPage,  
  StudentSettingsPage, 
  StudentClassesPage,
  StudentLibraryPage,
  StudentNoticesPage, 
  StudentResultsPage, 
  StudentTimeTablesPage 
} from '../components/students';



const StudentLayout = () => {
  const { user, logoutStudent, loginStudentUser, registerStudentUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [content, setContent] = useState(<StudentDashboardPage />);
  const [activeButton, setActiveButton] = useState('student_dashboard');
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setErrors({ ...errors, username: "Username and password are required" });
      return;
    }
    loginStudentUser(formData.username, formData.password).then(() => {
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
      });
    });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.password2
    ) {
      setErrors({ ...errors, username: "All fields are required" });
      return;
    }
    registerStudentUser(
      formData.email,
      formData.username,
      formData.first_name,
      formData.last_name,
      formData.password,
      formData.password2
    ).then(() => {
      setFormData({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
      });
    });
  };

  return (
    <div>
      {user ? (
        <StudentsLayoutHTML 
        user={user} 
        content={content}
        handleNavClick={handleNavClick}
        activeButton={activeButton}
        logoutStudent={logoutStudent} />
      ) : (
        <StudentLoginHTML
          logoutStudent={logoutStudent}
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
    </div>
  );
};

export default StudentLayout;