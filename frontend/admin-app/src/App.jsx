import React from 'react';
import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from './context/AuthContext';
import Layout from "./pages/Admin_app/AdminBase";
import NOtFound from './pages/Admin_app/NotFound';
import AuthPage from './pages/Admin_app/AdminSignup';

function App() {
  return (
    <StrictMode>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="*" element={<NOtFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </StrictMode>

  );
}

export default App;