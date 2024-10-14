import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );



  const loginStudentUser = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      });
      const data = await response.json();
  
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
  
        // Token refresh logic
        const refreshToken = data.refresh;
        const interval = setInterval(async () => {
          const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              refresh: refreshToken
            })
          });
          const newData = await response.json();
          setAuthTokens(newData);
          setUser(jwtDecode(newData.access));
          localStorage.setItem("authTokens", JSON.stringify(newData));
        }, 36000);
        
        navigate("/students/");
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 700,
          position: 'center',
          showConfirmButton: false,
        });
      } else {
        setError("Username or password does not exist");
        Swal.fire({
          title: "Username or password does not exist",
          icon: "error",
          toast: true,
          timer: 1000,
          position: 'center',
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setError("An error occurred while logging in");
      Swal.fire({
        title: "An error occurred while logging in",
        icon: "error",
        toast: true,
        timer: 1200,
        position: 'center',
        showConfirmButton: false,
      });
    }
  };

  const registerStudentUser = async (email, username, first_name, last_name, password, password2) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register/student/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, username, first_name, last_name, password, password2
        })
      });
  
      if (response.status === 201) {
        setIsLogin(true);
        setFormData({
          email: '',
          username: '',
          first_name: '',
          last_name: '',
          password: '',
          password2: '',
        });
        Swal.fire({
          title: "Registration Successful, Login Now",
          icon: "success",
          toast: true,
          timer: 1000,
          position: 'center',
          timerProgressBar: false,
          showConfirmButton: false,
        });
      } else {
        const errorData = await response.json();
        setError(errorData);
        Swal.fire({
          title: "Registration Failed",
          icon: "error",
          toast: true,
          timer: 1500,
          position: 'center',
          timerProgressBar: false,
          showConfirmButton: true,
          text: Object.keys(errorData).map((key) => {
            return `${key}: ${errorData[key]}`;
          }).join("\n"),
        });
      }
    } catch (error) {
      setError("An error occurred while registering");
      Swal.fire({
        title: "An error occurred while registering",
        icon: "error",
        toast: true,
        timer: 1500,
        position: 'center',
        timerProgressBar: false,
        showConfirmButton: true,
      });
    }
  };

  const logoutStudent = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.clear();
    navigate("/students/signup");
    Swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 1500,
      position: 'center',
      timerProgressBar: false,
      showConfirmButton: false,
    });
  };

  

  const loginAdminUser = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/admin_token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      });
      const data = await response.json();
  
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
  
        // Token refresh logic
        const refreshToken = data.refresh;
        const interval = setInterval(async () => {
          const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              refresh: refreshToken
            })
          });
          const newData = await response.json();
          setAuthTokens(newData);
          setUser(jwtDecode(newData.access));
          localStorage.setItem("authTokens", JSON.stringify(newData));
        }, 36000);
        
        navigate("/");
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 700,
          position: 'center',
          showConfirmButton: false,
        });
      } else {
        setError("Username or password does not exist");
        Swal.fire({
          title: "Username or password does not exist",
          icon: "error",
          toast: true,
          timer: 1000,
          position: 'center',
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setError("An error occurred while logging in");
      Swal.fire({
        title: "An error occurred while logging in",
        icon: "error",
        toast: true,
        timer: 1200,
        position: 'center',
        showConfirmButton: false,
      });
    }
  };

  const loginStaffUser = async (username, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, password
        })
      });
      const data = await response.json();
  
      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
  
        // Token refresh logic
        const refreshToken = data.refresh;
        const interval = setInterval(async () => {
          const response = await fetch("http://127.0.0.1:8000/token/refresh/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              refresh: refreshToken
            })
          });
          const newData = await response.json();
          setAuthTokens(newData);
          setUser(jwtDecode(newData.access));
          localStorage.setItem("authTokens", JSON.stringify(newData));
        }, 36000);
        
        navigate("/staff/");
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          toast: true,
          timer: 700,
          position: 'center',
          showConfirmButton: false,
        });
      } else {
        setError("Username or password does not exist");
        Swal.fire({
          title: "Username or password does not exist",
          icon: "error",
          toast: true,
          timer: 1000,
          position: 'center',
          showConfirmButton: false,
        });
      }
    } catch (error) {
      setError("An error occurred while logging in");
      Swal.fire({
        title: "An error occurred while logging in",
        icon: "error",
        toast: true,
        timer: 1200,
        position: 'center',
        showConfirmButton: false,
      });
    }
  };

  const registerStaffUser = async (email, username, first_name, last_name, password, password2) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/register/staff/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, username, first_name, last_name, password, password2
        })
      });
  
      if (response.status === 201) {
        setIsLogin(true);
        setFormData({
          email: '',
          username: '',
          first_name: '',
          last_name: '',
          password: '',
          password2: '',
        });
        Swal.fire({
          title: "Registration Successful, Login Now",
          icon: "success",
          toast: true,
          timer: 1000,
          position: 'center',
          timerProgressBar: false,
          showConfirmButton: false,
        });
      } else {
        const errorData = await response.json();
        setError(errorData);
        Swal.fire({
          title: "Registration Failed",
          icon: "error",
          toast: true,
          timer: 1500,
          position: 'center',
          timerProgressBar: false,
          showConfirmButton: true,
          text: Object.keys(errorData).map((key) => {
            return `${key}: ${errorData[key]}`;
          }).join("\n"),
        });
      }
    } catch (error) {
      setError("An error occurred while registering");
      Swal.fire({
        title: "An error occurred while registering",
        icon: "error",
        toast: true,
        timer: 1500,
        position: 'center',
        timerProgressBar: false,
        showConfirmButton: true,
      });
    }
  };



  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.clear();
    navigate("/admin/signup");
    Swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 1500,
      position: 'center',
      timerProgressBar: false,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (authTokens) {
      try {
        const decodedUser = jwtDecode(authTokens.access);
        setUser(decodedUser);
      } catch (error) {
        setError("Invalid token");
      }
    }
    setLoading(false);
  }, [authTokens, loading]);

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerStaffUser,
    registerStudentUser,
    loginAdminUser,
    loginStaffUser,
    loginStudentUser,
    logoutUser,
    logoutStudent,
    error,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContext;
