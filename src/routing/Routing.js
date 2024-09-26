// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/login/Login';
import Registration from '../components/registration/Registration';
import Dashboard from '../components/dashborad/Dashboard';
import TMCreate from '../components/taskManagement/TMCreate';
import TMView from '../components/taskManagement/TMView';
import TMEdit from '../components/taskManagement/TMEdit';
import Layout from '../components/common/layout/Layout';
import ProfileInfo from '../components/profile/ProfileInfo';


const Routing = () => {

  const PrivateRoute = ({ children }) => {
    const userId = localStorage.getItem("userId");

    return userId ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <Layout>
                <TMCreate />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoute>
              <Layout>
                <TMView />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <Layout>
                <TMEdit />
              </Layout>
            </PrivateRoute>
          }
        />
         <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <ProfileInfo />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default Routing;
