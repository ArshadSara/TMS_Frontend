// src/components/DataTable.js
import React, { useEffect, useState } from 'react';
import './Dashboard.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../common/modelPopUp/ConfirmationModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const userId = localStorage.getItem("userId");
  const naviagtion = useNavigate();
  const [model, setModel] = useState(false);
  const [id, setId] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    listAPI();
  }, [])

  async function listAPI() {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/tasks/${userId}`);
      console.log(response);
      setTaskList(response?.data?.tasks)
    } catch (err) {
      toast.error(err.response.data?.message);
    }
  };

  const handleCreate = (e) => {
    naviagtion("/create");
    e.preventDefault();
  }

  const handleView = (id) => {
    naviagtion(`/view/${id}`)
  };

  const handleEdit = (id) => {
    naviagtion(`/edit/${id}`)
  };

  const handleDelete = (id) => {
    setId(id)
    setModel(true);
  }

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/user/delete-task/${id}`,
      );
      toast.success(response.data.message);
      listAPI();
      setModel(false);
      setId();
    } catch (err) {
      toast.error(err.response.data?.message);
    }
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h2 className="table-title">TMS List</h2>
        <button className="create-button" onClick={(e) => handleCreate(e)}>Create</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {taskList.length > 0 ? taskList.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => handleView(item._id)} title="View">
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button onClick={() => handleEdit(item._id)} title="Edit">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(item._id)} title="Delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          )) : <tr>
            <td colSpan="5" style={{ textAlign: "center" }}>No data found</td>
          </tr>}
        </tbody>
        <ConfirmationModal
          isOpen={model}
          onRequestClose={() => setModel(false)}
          onConfirm={confirmDelete}
          message="Are you sure you want to Delete?"
        />
      </table>
    </div>
  );
};

export default Dashboard;
