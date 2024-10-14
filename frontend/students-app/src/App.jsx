import React from 'react';
import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentsPrivateRoute from "./utils/StudentsPrivateRoute";
import { AuthProvider } from './context/AuthContext';
import StudentsLayout from "./pages/StudentsBase";
import NotFound from './pages/NotFound';


function App() {
  return (
    <StrictMode>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<StudentsPrivateRoute><StudentsLayout/></StudentsPrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </StrictMode>
  );
}

export default App;