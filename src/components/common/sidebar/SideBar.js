// src/components/dashboard/Sidebar.js
import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import './Sidebar.css'; 
import ConfirmationModal from '../modelPopUp/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const naviagtion = useNavigate();
  const [model, setModel] = useState(false);

  const handleLogOut = (e) => {
    setModel(true);
    e.preventDefault();
  }
  const confirmLogout=()=>{
    localStorage.removeItem("userId");
    naviagtion("/login");
  }
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/home" className="nav-item active"> {/* Add active class for highlighting */}
              <FaTachometerAlt className="icon" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-item">
              <FaUser className="icon" /> Profile
            </Link>
          </li>
          <li className="logout"> {/* Use a class for styling logout */}
            <Link onClick={(e) => handleLogOut(e)} className="nav-item">
              <FaSignOutAlt className="icon" /> Logout
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <ConfirmationModal
          isOpen={model}
          onRequestClose={() => setModel(false)}
          onConfirm={confirmLogout}
          message="Are you sure you want to logout?"
        />
      </div>
    </aside>

  );
};

export default Sidebar;
