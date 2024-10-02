import React from 'react';

const DirectorInfoHTML = ({ staffInfo, error }) => {
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Staff Information</h2>
        <p>Username: {staffInfo.Username}</p>
        <p>Name: {staffInfo.Name}</p>
        <p>Surname: {staffInfo.Surname}</p>
        <p>Gender: {staffInfo.Gender}</p>
        <p>Position: {staffInfo.Position}</p>
        <p>DOB: {staffInfo.DOB}</p>
        <p>Marital Status: {staffInfo.Marital_Status}</p>
        <p>Email: {staffInfo.Email}</p>
      </div>
    </div>
  );
};

export default DirectorInfoHTML;