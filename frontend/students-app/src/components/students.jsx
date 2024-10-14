import React, { useRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useAxios from '../hooks/useAxios';
import StudentInfoHTML from '../views/StudentsInfoView';
import StudentDashboardHTML from '../views/StudentsDashboardView';
import StudentNoticesHTML from '../views/StudentsNoticesView';
import StudentResultsHTML from '../views/StudentsResultsView';
import StudentTimeTablesHTML from '../views/StudentsTimetablesView';
import StudentSettingsHTML from '../views/StudentsSettingsView';
import StudentLibraryHTML from '../views/StudentsLibraryView';
import StudentClassesHTML from '../views/StudentsClassesView';

const StudentDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [dashboardInfo, setDashboardInfo] = useState({});
  const isMounted = useRef(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardInfo = async () => {
    if (user && isMounted.current) {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/Student/dashboard/', {
          params: {
            timestamp: new Date().getTime()
          }
        });
        setDashboardInfo(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDashboardInfo();
    const intervalId = setInterval(fetchDashboardInfo, 5000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, []);

  return <StudentDashboardHTML user={user} dashboardInfo={dashboardInfo} loading={loading} error={error}/>;
};
  
const StudentInformationPage = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const [error, setError] = useState(null);
  const isMounted = useRef(false);
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
        } else {
          console.error(error);
          setError('Failed to fetch student information. Please try again later.');
          
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    isMounted.current = true;
    fetchStudentInfo();
    const intervalId = setInterval(fetchStudentInfo, 5000);
    return () => {
      isMounted.current = false;
      clearInterval(intervalId);
    };
  }, []);

  return <StudentInfoHTML user={user} studentInfo={studentInfo} loading={loading} error={error}/>;
};

const StudentSettingsPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const errors = {};

    if (!currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!newPassword) {
      errors.newPassword = 'New password is required';
    } else if (!passwordRegex.test(newPassword)) {
      errors.newPassword = 'Password must be at least 8 characters, contain at least one letter and one number';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const payload = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    axiosInstance.post('/user/settings/', payload)
      .then((response) => {
        alert('Password changed successfully');
        navigate('/Student/dashboard');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to change password');
      });
  };

  return <StudentSettingsHTML 
    currentPassword={currentPassword} 
    newPassword={newPassword} 
    confirmPassword={confirmPassword} 
    handleSubmit={handleSubmit} 
    setCurrentPassword={setCurrentPassword} 
    setNewPassword={setNewPassword} 
    setConfirmPassword={setConfirmPassword} 
    errors={errors} 
  />;
};

const StudentNoticesPage = () => {
  const [noticesInfo, setNoticesInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const fetchNoticesInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Student/notices/', {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setNoticesInfo(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticesInfo();
    const intervalId = setInterval(fetchNoticesInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <StudentNoticesHTML user={user} noticesInfo={noticesInfo} loading={loading} error={error} 
  />;
};

const StudentClassesPage = () => {
  const [classesInfo, setClassesInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const fetchClassesInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Student/classes/', {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setClassesInfo(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesInfo();
    const intervalId = setInterval(fetchClassesInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <StudentClassesHTML user={user} classesInfo={classesInfo} loading={loading} error={error} 
  />;
};

const StudentLibraryPage = () => {
  const [libraryInfo, setLibraryInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const fetchLibraryInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Student/library/', {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setLibraryInfo(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibraryInfo();
    const intervalId = setInterval(fetchLibraryInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <StudentLibraryHTML user={user} libraryInfo={libraryInfo} loading={loading} error={error} 
  />;
};

const StudentResultsPage = () => {
  const [resultsInfo, setResultsInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const fetchResultsInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Student/results/', {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setResultsInfo(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResultsInfo();
    const intervalId = setInterval(fetchResultsInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <StudentResultsHTML user={user} resultsInfo={resultsInfo} loading={loading} error={error}/>;
};

const StudentTimeTablesPage = () => {
  const [timeTablesInfo, setTimeTablesInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const fetchTimeTablesInfo = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/Student/timetables/', {
        params: {
          timestamp: new Date().getTime()
        }
      });
      setTimeTablesInfo(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeTablesInfo();
    const intervalId = setInterval(fetchTimeTablesInfo, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return <StudentTimeTablesHTML user={user} timeTablesInfo={timeTablesInfo} loading={loading} error={error}/>;
};

export { 
  StudentDashboardPage, 
  StudentInformationPage, 
  StudentSettingsPage, 
  StudentNoticesPage, 
  StudentResultsPage, 
  StudentTimeTablesPage,
  StudentLibraryPage,
  StudentClassesPage,
};
export default { 
  StudentDashboardPage, 
  StudentInformationPage, 
  StudentSettingsPage, 
  StudentNoticesPage, 
  StudentResultsPage, 
  StudentTimeTablesPage 
};