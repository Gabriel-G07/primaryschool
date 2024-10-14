import React from 'react';

const DirectorLayoutHTML = ({
  content,
  handleNavClick,
  activeButton,
  logoutUser
}) => {
  return (
    <div className="container">
      <div className="navbar">
        <a className="navbar-brand" href="#">
          <img src="https://i.imgur.com/juL1aAc.png" alt="" />
        </a>
        <div><br></br></div>
        <button className={`nav-button ${activeButton === 'admin_dashboard' ? 'active' : ''}`} id="admin_dashboard" onClick={handleNavClick}>
          <span data-feather="home"></span>
          Home
        </button>
        <button className={`nav-button ${activeButton === 'admin_personal_info' ? 'active' : ''}`} id="admin_personal_info" onClick={handleNavClick}>
          Personal Details
        </button>
        <button className={`nav-button ${activeButton === 'admin_settings' ? 'active' : ''}`} id="admin_settings" onClick={handleNavClick}>
          Settings
        </button>
        <button className={`nav-button ${activeButton === 'admin_staff' ? 'active' : ''}`} id="admin_staff" onClick={handleNavClick}>
          Staff
        </button>
        <button className={`nav-button ${activeButton === 'admin_students' ? 'active' : ''}`} id="admin_students" onClick={handleNavClick}>
          Students
        </button>
        <button className={`nav-button ${activeButton === 'admin_notices' ? 'active' : ''}`} id="admin_notices" onClick={handleNavClick}>
          Notices
        </button>
        <button className={`nav-button ${activeButton === 'admin_timetables' ? 'active' : ''}`} id="admin_timetables" onClick={handleNavClick}>
          Timetables
        </button>
        <button className={`nav-button ${activeButton === 'admin_reports' ? 'active' : ''}`} id="admin_reports" onClick={handleNavClick}>
          Results
        </button>
        <button className={`nav-button ${activeButton === 'admin_fees' ? 'active' : ''}`} id="admin_fees" onClick={handleNavClick}>
          Fees
        </button>
        <button className={`nav-button ${activeButton === 'admin_applications' ? 'active' : ''}`} id="admin_applications" onClick={handleNavClick}>
          Applications
        </button>
        <button className="nav-button" id="log_out" onClick={logoutUser}>
          Log Out
        </button>
      </div>
      <div className="header">
        <h1>Mount Sunset Group Of Schools</h1>
      </div>
      <div className="content">{content}</div>
      <div className="footer">
        <p>&copy; Powered By Double G Technologies</p>
      </div>
    </div>
  );
};

export default DirectorLayoutHTML;