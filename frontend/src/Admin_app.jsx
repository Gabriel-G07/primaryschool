import React from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext';
import Layout from "./pages/Admin_app/AdminBase";
import NOtFound from './pages/Admin_app/NotFound';
import AuthPage from './pages/Admin_app/AdminSignup';

function MyApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="*" element={<NOtFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default MyApp;