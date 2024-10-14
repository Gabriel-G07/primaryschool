import React, { useState, useEffect, useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentsLayoutHTML = ({ 
  content,
  handleNavClick,
  activeButton,
  logoutStudent }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const [error, setError] = useState(null);
  const isMounted = React.useRef(false);
  const [loading, setLoading] = useState(true);

  const fetchStudentInfo = async () => {
    if (user && isMounted.current) {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/Student/details/', {
          params: {
            timestamp: new Date().getTime()
          }
        });
        setStudentInfo(response.data);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
          logoutStudent();
        } else {
          console.error(error);
          setError('Failed to fetch student information. Please try again later.');
          logoutStudent();
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      isMounted.current = true;
      fetchStudentInfo();
      const intervalId = setInterval(fetchStudentInfo, 5000);
      return () => {
        isMounted.current = false;
        clearInterval(intervalId);
      };
    }
  }, [user]);

  return (
    <div className="container">
      <link rel="stylesheet" type="text/css" href="src/styles/home.css"></link>
    <div className="navbar">
      <a className="navbar-brand" href="#">
        <img src="https://i.imgur.com/juL1aAc.png" alt="" />
      </a>
      <div><br></br></div>
      <button className={`nav-button ${activeButton === 'student_dashboard' ? 'active' : ''}`} id="student_dashboard" onClick={handleNavClick}>
        Dashboard
      </button>
      <button className={`nav-button ${activeButton === 'student_personal_info' ? 'active' : ''}`} id="student_personal_info" onClick={handleNavClick}>
        My Profile
      </button>
      <button className={`nav-button ${activeButton === 'student_settings' ? 'active' : ''}`} id="student_settings" onClick={handleNavClick}>
        Settings
      </button>
      <button className={`nav-button ${activeButton === 'student_classes' ? 'active' : ''}`} id="student_classes" onClick={handleNavClick}>
        Classes
      </button>
      <button className={`nav-button ${activeButton === 'student_library' ? 'active' : ''}`} id="student_library" onClick={handleNavClick}>
        Library
      </button>
      <button className={`nav-button ${activeButton === 'student_notices' ? 'active' : ''}`} id="student_notices" onClick={handleNavClick}>
        Notices
      </button>
      <button className={`nav-button ${activeButton === 'student_timetables' ? 'active' : ''}`} id="student_timetables" onClick={handleNavClick}>
        Timetables
      </button>
      <button className={`nav-button ${activeButton === 'student_results' ? 'active' : ''}`} id="student_results" onClick={handleNavClick}>
        Results
      </button>
      <button className="nav-button" id="student_log_out" onClick={logoutStudent}>
        Log Out
      </button>
    </div>
    <div className="header">
      <h1>Mount Sunset Group Of Schools Students Portal</h1>
    </div>
    <div className="content">{content}</div>
    <div className="footer">
      <p> copyright &copy; Powered By Double G Technologies</p>
    </div>
  </div>
  );
};

export default StudentsLayoutHTML;