import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './TMCreate.css';

const TMEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ title: '', description: '', status: '' });

  useEffect(() => {
    listAPI();
  }, [])

  async function listAPI() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/tasksby/${id}`);
      console.log(response);
      setFormData({
        title: response?.data?.tasks[0].title,
        description: response?.data?.tasks[0].description,
        status: response?.data?.tasks[0].status,
      });
    } catch (err) {
      console.log("err.response.data?.message", err.response.data?.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/user/update-task/${id}`,
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
      <h2>Upadte Task</h2>
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
        <button type="submit">Update Task</button>
        <button type="button" onClick={() => navigate('/home')}>Cancel</button>
      </form>
    </div>
  );
};

export default TMEdit;
