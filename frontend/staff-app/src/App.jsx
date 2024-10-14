import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import StaffApp from './Staff_app.jsx'

import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          
          <Route path="/staff/*" element={<StaffApp />} />
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;