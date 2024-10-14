import React, { useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/Admin_app/home.css"
import LayoutHTML from '../../views/Admin_app/Admin/AdminHomeView';
import { 
  AdminDashboardPage, 
  AdminInformationPage, 
  AdminStaffPage, 
  AdminStudentsPage, 
  AdminApplicationsPage, 
  AdminSettingsPage, 
  AdminFeesPage, 
  AdminNoticesPage, 
  AdminResultsPage, 
  AdminTimeTablesPage 
} from '../../components/Admin_app/admin';

function Layout() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem('authTokens');
  const [content, setContent] = useState(<AdminDashboardPage />);
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
        setContent(<AdminDashboardPage />);
        break;
      case 'admin_personal_info':
        setContent(<AdminInformationPage />);
        break;
      case 'admin_settings':
        setContent(<AdminSettingsPage />);
        break;
      case 'admin_staff':
        setContent(<AdminStaffPage/>);
        break;
      case 'admin_students':
        setContent(<AdminStudentsPage/>);
        break;
      case 'admin_notices':
        setContent(<AdminNoticesPage/>);
        break;
      case 'admin_timetables':
        setContent(<AdminTimeTablesPage/>);
        break;
      case 'admin_reports':
        setContent(<AdminResultsPage/>);
        break;
      case 'admin_fees':
        setContent(<AdminFeesPage/>);
        break;
      case 'admin_applications':
        setContent(<AdminApplicationsPage/>);
        break;
      case 'log_out':
        logoutUser();
        break;
    }
  };

  return <LayoutHTML
    content={content}
    handleNavClick={handleNavClick}
    activeButton={activeButton}
    logoutUser={logoutUser}
  />;
};
export default Layout;