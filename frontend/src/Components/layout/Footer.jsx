import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import data from '../env/teamData.json';
import { Link, useLocation } from 'react-router-dom';
import "./styles/Footer.css";

function Footer() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <footer className="footer text-center text-lg-start p-5">
            <div className="row p-4 justify-content-center">
                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                    <div className="text-center text-md-start">
                        <Link to="/">
                            <img
                                src="/logo.jpg"
                                alt="Logo"
                                className="img-fluid mb-3"
                                style={{ maxWidth: '100px' }}
                            />
                        </Link>
                        <p className="text-light">{data.company.description}</p>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center">
                    <h5 className="text-uppercase text-light mb-4">Services</h5>
                    <ul className="list-unstyled">
                        {Object.keys(data.services).map((serviceKey) => (
                            <li className='mb-3' key={serviceKey}>
                                <Link to={`/${serviceKey}`}>{data.services[serviceKey]}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0 text-center">
                    <h5 className="text-uppercase text-light mb-4">Contact</h5>
                    <p className="text-light mb-2">
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        {data.company.contact.address}
                    </p>
                    <p className="text-light mb-2">
                        <FontAwesomeIcon icon={faPhone} className="me-2" />
                        {data.company.contact.phone}
                    </p>
                    <div className="links">
                        {Object.keys(data.authors).map((authorKey) => (
                            <a
                                key={authorKey}
                                href="#"
                                className="text-light me-4"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin} className="me-2" />
                                {data.authors[authorKey]}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center mt-5 border-top p-2 text-light">
                <p>
                    © {new Date().getFullYear()} {data.company.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;