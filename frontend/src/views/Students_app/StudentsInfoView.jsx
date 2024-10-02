import React from 'react';

const StudentInfoHTML = ({ studentInfo, error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Student Information</h2>
        <p>Username: {studentInfo.Username}</p>
        <p>Name: {studentInfo.Name}</p>
        <p>Surname: {studentInfo.Surname}</p>
        <p>Gender: {studentInfo.Gender}</p>
        <p>Position: {studentInfo.Position}</p>
        <p>DOB: {studentInfo.DOB}</p>
        <p>Marital Status: {studentInfo.Marital_Status}</p>
        <p>Email: {studentInfo.Email}</p>
      </div>
    </div>
  );
};

export default StudentInfoHTML;