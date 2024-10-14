import React from 'react';

const DirectorApplicationsHTML = ({
  applicantInfo, studentsenrolmentInfo, applicantStatus, studentStatus, handleAccept, handleEnrole 
}) => {
  return (
    <div>
      <div>
        <h2>Job Applications Information</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>Prospective Position</th>
              <th>DOB</th>
              <th>Marital Status</th>
              <th>Email</th>
              <th>Accept</th>
            </tr>
          </thead>
          <tbody>
            {applicantInfo.map((staff) => (
              <tr key={staff.Name}>
                <td>{staff.Name}</td>
                <td>{staff.Surname}</td>
                <td>{staff.Gender}</td>
                <td>{staff.pPosition}</td>
                <td>{staff.DOB}</td>
                <td>{staff.Marital_Status}</td>
                <td>{staff.Email}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={applicantStatus[staff.Email] === true}
                      onChange={(e) => handleAccept(staff, e.target.checked)}
                    />
                    <span className={`slider ${applicantStatus[staff.Email] === true ? '' : 'red'}`}></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Student Applications</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Grade Level</th>
              <th>Email</th>
              <th>Address</th>
              <th>Enrole</th>
            </tr>
          </thead>
          <tbody>
            {studentsenrolmentInfo.map((students) => (
              <tr key={students.Email}>
                <td>{students.Name}</td>
                <td>{students.Surname}</td>
                <td>{students.Gender}</td>
                <td>{students.DOB}</td>
                <td>{students.Grade_Level}</td>
                <td>{students.Email}</td>
                <td>{students.Address}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={studentStatus[students.Email] === true}
                      onChange={(e) => handleEnrole(students, e.target.checked)}
                    />
                    <span className={`slider ${studentStatus[students.Email] === true ? '' : 'red'}`}></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectorApplicationsHTML;