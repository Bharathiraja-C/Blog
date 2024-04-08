import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [profileName, setProfileName] = useState(localStorage.getItem('username'));

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    // Update profile name state
    setProfileName(null);
  };

  return (
    <div className='menu-part'>
      <ul>
        <br />
        <br />
        <li>Certifications</li>
        <li >Skills</li>
        <li>Projects</li>
        <li>Work from Home</li>
        <li>Feedback</li>
        <li>Survey</li>
        <li>Service Desk</li>
        <a href='/' ><li onClick={handleLogout}>Logout &nbsp;&nbsp;<i className="fa fa-right-from-bracket"></i></li></a>
      </ul>
    </div>
  );
};

export default Sidebar;
