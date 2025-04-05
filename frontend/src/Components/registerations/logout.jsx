import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        alert('You have been logged out.');
        navigate('/');
    };

    return (
        <div className="container-fluid logout-container bg-dark shadow p-5">
            <h3 className='fw-bold fs-2 text-light'>Logout From Your Account</h3>
            <button onClick={handleLogout} className="btn btn-danger w-100 d-block">
                Logout
            </button>
        </div>
    );
};

export default Logout;