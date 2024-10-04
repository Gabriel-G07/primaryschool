import React from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../pages/Admin_app/AdminBase";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
const [loading, setLoading] = React.useState(true);                 

  React.useEffect(() => {
    if (!user ) {
      const from = rest.location?.state?.from || '/admin/';
      navigate("/admin/signup", { state: { from } });
    } else {
      setLoading(false);
    }
  }, [user, navigate, rest.location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Layout>{children}</Layout>;
};

export default PrivateRoute;