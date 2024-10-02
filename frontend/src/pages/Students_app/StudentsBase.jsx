import React, { useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Students_app/home.css"
import StudentsLayoutHTML from '../../views/Students_app/StudentsHomeView';
import { 
  StudentDashboardPage, 
  StudentInformationPage,  
  StudentSettingsPage, 
  StudentNoticesPage, 
  StudentResultsPage, 
  StudentTimeTablesPage 
} from '../../components/Students_app/students';

function Layout() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('authTokens');
  const [content, setContent] = useState(<StudentDashboardPage />);
  const [loading, setLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null);
  const [activeButton, setActiveButton] = useState('admin_dashboard');

  let user_id;

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
  }

  useEffect(() => {
    if (token === null) {
      navigate("/admin/signup");
    } else {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleNavClick = (e) => {
    const buttonId = e.target.id;
    setActiveButton(buttonId);
    switch (buttonId) {
      case 'admin_dashboard':
        setContent(<StudentDashboardPage />);
        break;
      case 'admin_personal_info':
        setContent(<StudentInformationPage />);
        break;
      case 'admin_settings':
        setContent(<StudentSettingsPage />);
        break;
      case 'admin_notices':
        setContent(<StudentNoticesPage/>);
        break;
      case 'admin_timetables':
        setContent(<StudentTimeTablesPage/>);
        break;
      case 'admin_reports':
        setContent(<StudentResultsPage/>);
        break;
      case 'admin_applications':
        setContent(<StudentApplicationsPage/>);
        break;
      case 'log_out':
        logoutUser();
        break;
    }
  };

  return <StudentsLayoutHTML
    content={content}
    handleNavClick={handleNavClick}
    activeButton={activeButton}
    logoutUser={logoutUser}
  />;
};
export default Layout;