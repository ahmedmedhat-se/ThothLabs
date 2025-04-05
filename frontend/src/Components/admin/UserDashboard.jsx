import React, { useEffect, useState } from 'react';
import './styles/user-dashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
    }, [userId]);

    const fetchUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}`);
            if (!response.ok) throw new Error('Failed to fetch user data');
            
            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
        }
    };
    return (
        <div className="container-fluid user-dashboard">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-light mb-4">User Dashboard</h2>

                {loading ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden text-light">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h4 className='text-light text-center'>User Information</h4>
                        <p className='fw-bold fs-5 text-light'>Name: {user.name}</p>
                        <p className='fw-bold fs-5 text-light'>Email: {user.email}</p>
                        <p className='fw-bold fs-5 text-light'>Phone: {user.phone}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;