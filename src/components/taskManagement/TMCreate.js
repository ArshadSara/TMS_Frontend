import React, { useState } from 'react';
import './TMCreate.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TMCreate = ({ addTask }) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', status: 'Pending', userId:  userId});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/user/create-task',
        formData,
      );
      toast.success(response.data.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.response.data?.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={() => navigate('/home')}>Cancel</button>
      </form>
    </div>
  );
};

export default TMCreate;
