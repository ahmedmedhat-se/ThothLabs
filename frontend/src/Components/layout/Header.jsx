import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./styles/Homepage.css";

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [user, setUser] = useState(null);

    const routes = [
        { path: '/news', name: 'News' },
        { path: '/cosmic-explorer', name: 'Cosmic Explorer' },
        { path: '/workspace', name: 'Workspace' }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        updateUser();
    }, [location]);

    const updateUser = () => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data:", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    };

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredResults([]);
            setSelectedIndex(-1);
        } else {
            setFilteredResults(routes.filter(route => route.name.toLowerCase().includes(searchTerm.toLowerCase())));
            setSelectedIndex(-1);
        }
    }, [searchTerm]);

    const handleSearchSelect = (path) => {
        setSearchTerm('');
        setFilteredResults([]);
        setSelectedIndex(-1);
        navigate(path);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < filteredResults.length) {
            handleSearchSelect(filteredResults[selectedIndex].path);
        } else if (e.key === 'ArrowDown' && selectedIndex < filteredResults.length - 1) {
            setSelectedIndex(prevIndex => prevIndex + 1);
        } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
            setSelectedIndex(prevIndex => prevIndex - 1);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark p-4">
            <div className="container">
                <Link className='navbar-brand text-light' to='/'>
                    <strong>ThothLabs</strong>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="offcanvas offcanvas-end text-light" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Thoth</h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                            {routes.map((route, index) => (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link text-light text-uppercase" to={route.path}>
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                            {user ? (
                                <>
                                    {user.role === "admin" ? (
                                        <li className="nav-item">
                                            <Link className="nav-link text-light text-uppercase" to="/admin-dashboard">
                                                {user.name}
                                            </Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <Link className="nav-link text-light text-uppercase" to="/user-dashboard">
                                                {user.name}
                                            </Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button
                                            className="nav-link text-light text-uppercase btn btn-link"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link text-light text-uppercase" to="/auth">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>

                        {/* Search Bar */}
                        <div className="position-relative">
                            <input
                                className="form-control bg-light text-dark"
                                type="search"
                                placeholder="Search..."
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {searchTerm && (
                                <ul className="list-group position-absolute bg-white shadow w-100 rounded" style={{ top: '100%', left: 0, zIndex: 1050 }}>
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((result, index) => (
                                            <li
                                                className={`list-group-item list-group-item-action ${selectedIndex === index ? 'bg-primary text-light' : ''}`}
                                                key={index}
                                                onClick={() => handleSearchSelect(result.path)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {result.name}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="list-group-item list-group-item-action text-muted" style={{ cursor: 'pointer' }}>
                                            No results found
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;