import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import StudentsLayout from "../../pages/Students_app/StudentsBase";

const StudentsPrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user ) {
      const from = rest.location?.state?.from || '/students/';
      navigate("/students/signup", { state: { from } });
    } else {
      setLoading(false);
    }
  }, [user, navigate, rest.location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <StudentsLayout>{children}</StudentsLayout>;
};

export default StudentsPrivateRoute;