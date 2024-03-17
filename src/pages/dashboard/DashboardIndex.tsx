import React from 'react';
import backgroundImage from '../../assets/images/nc05.png';
import profileImage from '../../assets/images/NC.jpg';
type Props = {};

const DashboardIndex = (props: Props) => {
  var userName = localStorage.getItem("userName");
  var projects = localStorage.getItem("userName");
  return (
    <>
    <h1>
    <span style={{ textAlign: 'center' }}>My Profile</span>
     
  </h1>
    <div className="d-flex justify-content-center align-items-center">

      <div className="card">

        <div className="upper">

          <img src={backgroundImage} className="img-fluid">

          </img></div>

        <div className="user text-center">

          <div className="profile">

            <img src={profileImage} className="rounded-circle" width="80">

            </img></div>

        </div>


        <div className="mt-5 text-center">

          {/* <h4 className="mb-0">Benjamin Tims</h4>
          <span className="text-muted d-block mb-2">Los Angles</span>

          <button className="btn btn-primary btn-sm follow">Follow</button>
 */}

          <div className="d-flex justify-content-between align-items-center mt-4 px-4">

            <div className="stats">
              <h4 className="mb-0">Logged In</h4>
              <span>{userName}</span>
            </div>
            <div className="stats">
              <h4 className="mb-0">Project</h4>
              <span>{projects}</span>
              </div><br></br>
              </div>
            <div className="stats">
              <h4 className="mb-0">Total Servers</h4>
              <span>{projects}</span>
             
{/* 
            <div className="stats">
              <h6 className="mb-0">Ranks</h6>
              <span>129</span>

            </div> */}

          </div>

        </div>

      </div>

    </div></>
  );
};

export default DashboardIndex;