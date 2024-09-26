import React, { useEffect, useState } from 'react';
import './Header.css';
import profilePic from '../../../assets/images/pic.jpg'; 

import axios from 'axios';
const Header = () => {
  const userId = localStorage.getItem("userId");
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    userInfoAPI();
  }, [])

  async function userInfoAPI() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${userId}`);
      console.log(response);
      setuserInfo(response?.data?.userInfo[0])
    } catch (err) {
      console.log("err.response.data?.message", err.response.data?.message)
    }
  };

  return (
    <header className="header">
      <h1 className="title">Task Management System</h1>
      <nav>
        <ul className="navList">
        <li className="navItem">
            <p>{userInfo.fullName}</p>
          </li>
        <li className="navItem">
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
