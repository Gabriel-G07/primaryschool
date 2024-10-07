import React from 'react';
import { Routes, Route } from "react-router-dom";
import StudentsPrivateRoute from "./utils/Students_app/StudentsPrivateRoute";
import { AuthProvider } from './context/AuthContext';
import StudentsLayout from "./pages/Students_app/StudentsBase";
import NotFound from './pages/Students_app/NotFound';

function StudentsApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<StudentsPrivateRoute><StudentsLayout/></StudentsPrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default StudentsApp;