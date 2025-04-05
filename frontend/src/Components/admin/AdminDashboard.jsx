import React, { useEffect, useState } from 'react';
import './styles/admin-dashboard.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newData, setNewData] = useState({ name: '', email: '', phone: '', role: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('http://localhost:5000/api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoadingUsers(false);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                setLoadingUsers(false);
            });
    };

    const openEditModal = (id) => {
        const userToUpdate = users.find(user => user.user_id === id);
        if (userToUpdate) {
            setSelectedUser(userToUpdate);
            setNewData({
                name: userToUpdate.name,
                email: userToUpdate.email,
                phone: userToUpdate.phone,
                role: userToUpdate.role,
                password: '', 
            });
        }
    };

    const handleChange = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const { name, email, phone, role, password } = newData;
        const updatedData = { name, email, phone, role };
        if (password) {
            updatedData.password = password;
        }; 

        fetch(`http://localhost:5000/api/admin/users/${selectedUser.user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin',
            },
            body: JSON.stringify(updatedData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'User updated successfully') {
                    fetchUsers();
                    setSelectedUser(null);
                } else {
                    console.error('Error updating user:', data);
                }
            })
            .catch(error => console.error('Error editing user:', error));
    };

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/api/admin/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-user-role': 'admin',
            },
        })
            .then(() => fetchUsers())
            .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <div className="container-fluid admin-dashboard">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-light mb-4">Admin Dashboard</h2>
                <h3 className="mt-4 text-light">Users</h3>
                {loadingUsers ? (
                    <div className="text-center my-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden text-light">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.user_id}>
                                            <td>{user.user_id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(user.user_id)}>Edit</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.user_id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-light">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit User Modal */}
            {selectedUser && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <h3>Edit User</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" value={newData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input type="email" name="email" value={newData.email} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input type="text" name="phone" value={newData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Role:</label>
                                <input type="text" name="role" value={newData.role} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Password (optional):</label>
                                <input type="password" name="password" value={newData.password} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                            </div>
                        </form>
                        <button className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;