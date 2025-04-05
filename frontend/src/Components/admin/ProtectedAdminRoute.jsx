import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdminRoute = () => {
    const user = localStorage.getItem('user');
    const userRole = localStorage.getItem('role');

    if (!user || userRole !== 'admin') {
        alert('Access Denied: Only admins can view this page.');
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;