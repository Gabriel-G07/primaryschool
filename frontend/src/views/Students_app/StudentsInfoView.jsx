import React from 'react';

const StudentInfoHTML = ({ studentInfo, error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Student Information</h2>
        <p>Username: {studentInfo.RegNumber}</p>
        <p>Name: {studentInfo.Name}</p>
        <p>Surname: {studentInfo.Surname}</p>
        <p>Gender: {studentInfo.Gender}</p>
        <p>DOB: {studentInfo.DOB}</p>
        <p>Email: {studentInfo.Email}</p>
        <p>Level: {studentInfo.Grade_Level}</p>
        <p>Address: {studentInfo.Address}</p>
      </div>
    </div>
  );
};

export default StudentInfoHTML;