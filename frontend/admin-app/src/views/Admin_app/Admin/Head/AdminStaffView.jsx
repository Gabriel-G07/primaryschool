import React from 'react';

const AdminStaffHTML = ({ staffInfo }) => {
  return (
    <div>
      <h2>Staff Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th>
            <th>Position</th>
            <th>DOB</th>
            <th>Marital Status</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {staffInfo.map(staff => (
            <tr key={staff.Username}>
              <td>{staff.Username}</td>
              <td>{staff.Name}</td>
              <td>{staff.Surname}</td>
              <td>{staff.Gender}</td>
              <td>{staff.Position}</td>
              <td>{staff.DOB}</td>
              <td>{staff.Marital_Status}</td>
              <td>{staff.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminStaffHTML;