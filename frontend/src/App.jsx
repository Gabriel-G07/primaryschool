import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MyApp from './Admin_app.jsx'
import StaffApp from './Staff_app.jsx'
import StudentsApp from './Students_app.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<MyApp />} />
          <Route path="/staff/*" element={<StaffApp />} />
          <Route path="/students/*" element={<StudentsApp />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </StrictMode>
  );
}

export default App;