import React from 'react';

const DirectorStudentsHTML = ({ studentsInfo }) => {
  return (
    <div>
      <h2>Students Information</h2>
      <table className="table">
        <thead>
          <tr>
            <th>RegNumber</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Grade Level</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {studentsInfo.map(students => (
            <tr key={students.RegNumber}>
              <td>{students.RegNumber}</td>
              <td>{students.Name}</td>
              <td>{students.Surname}</td>
              <td>{students.Gender}</td>
              <td>{students.DOB}</td>
              <td>{students.Grade_Level}</td>
              <td>{students.Email}</td>
              <td>{students.Address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectorStudentsHTML;