import React from 'react';

const StudentDashboardHTML = ({ user }) => {
  
  return (
    <div>
      <h1>Hello, {user?.first_name} {user?.last_name}!</h1>
      <p>Your email is {user?.email}</p>
      <p>Already There part <br></br>
        Below is he new code
      </p>
    </div>
  );
};

export default StudentDashboardHTML;




