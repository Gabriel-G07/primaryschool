import React from 'react';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StudentsLayout from "../pages/StudentsBase";

const StudentsPrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);



  return <StudentsLayout>{children}</StudentsLayout>;
};

export default StudentsPrivateRoute;