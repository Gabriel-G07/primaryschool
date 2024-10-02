import React, { useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Admin_app/home.css"
import HeadLayoutHTML from '../../views/Admin_app/Head/HeadHomeView';
import { 
  HeadDashboardPage, 
  HeadInformationPage, 
  HeadStaffPage, 
  HeadStudentsPage, 
  HeadApplicationsPage, 
  HeadSettingsPage, 
  HeadFeesPage, 
  HeadNoticesPage, 
  HeadResultsPage, 
  HeadTimeTablesPage 
} from '../../components/Head_app/admin';

function HeadLayout() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('authTokens');
  const [content, setContent] = useState(<HeadDashboardPage />);
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
        setContent(<HeadDashboardPage />);
        break;
      case 'admin_personal_info':
        setContent(<HeadInformationPage />);
        break;
      case 'admin_settings':
        setContent(<HeadSettingsPage />);
        break;
      case 'admin_staff':
        setContent(<HeadStaffPage/>);
        break;
      case 'admin_students':
        setContent(<HeadStudentsPage/>);
        break;
      case 'admin_notices':
        setContent(<HeadNoticesPage/>);
        break;
      case 'admin_timetables':
        setContent(<HeadTimeTablesPage/>);
        break;
      case 'admin_reports':
        setContent(<HeadResultsPage/>);
        break;
      case 'admin_fees':
        setContent(<HeadFeesPage/>);
        break;
      case 'admin_applications':
        setContent(<HeadApplicationsPage/>);
        break;
      case 'log_out':
        logoutUser();
        break;
    }
  };

  return <HeadLayoutHTML
    content={content}
    handleNavClick={handleNavClick}
    activeButton={activeButton}
    logoutUser={logoutUser}
  />;
};
export default HeadLayout;