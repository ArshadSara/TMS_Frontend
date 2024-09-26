// src/components/common/Layout.js
import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/SideBar';
import './Layout.css'; // CSS file for layout styling

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
