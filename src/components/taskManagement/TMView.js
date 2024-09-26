import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TMView.css';
import axios from 'axios';

const TMView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskInfo, setTaskInfo] = useState({});

  useEffect(() => {
    listAPI();
  }, [])

  async function listAPI() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/tasksby/${id}`);
      console.log(response);
      setTaskInfo(response?.data?.tasks[0])
    } catch (err) {
      console.log("err.response.data?.message", err.response.data?.message)
    }
  };

  return (
    <div className="task-view-container">
      <h2>Task Details</h2>
      <div className="form-group">
        <label>Title : {taskInfo.title}</label>
      </div>
      <div className="form-group">
        <label>Description : {taskInfo.description}</label>
      </div>
      <div className="form-group">
        <label>Status : {taskInfo.status}</label>
      </div>
      <button onClick={() => navigate('/home')} className="back-button">Back to List</button>
    </div>
  );
};

export default TMView;
