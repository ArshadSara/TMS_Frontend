
import React from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/SideBar';
import './Layout.css'; 

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
