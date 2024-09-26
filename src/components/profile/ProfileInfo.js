import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProfileInfo.css';
import axios from 'axios';

const ProfileInfo = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
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
    <div className="task-view-container">
      <h2>Profile Details</h2>
      <div className="form-group">
        <label>FullName : {userInfo.fullName}</label>
      </div>
      <div className="form-group">
        <label>Email : {userInfo.email}</label>
      </div>
      <div className="form-group">
        <label>Phone Number : {userInfo.phone}</label>
      </div>
      <button onClick={() => navigate('/home')} className="back-button">Back to Home</button>
    </div>
  );
};

export default ProfileInfo;
