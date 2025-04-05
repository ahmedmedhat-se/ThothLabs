import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../css/News.css";

function News() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(3);

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/create-research');
            if (!response.ok) {
                console.error(`Error: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            setArticles(data.research || []);
        } catch (error) {
            console.error("Error fetching articles:", error);
        }
    };    

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

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchArticles();
        updateUser();
    }, [location]);

    const filteredArticles = (articles || []).filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0); // Scroll to the top when a page is clicked
    };

    return (
        <div className="news-container">
            <div className="news-section">
                <h2 className="mb-4 text-center text-light">Research Articles</h2>
                <div className="d-flex justify-content-center mb-4">
                    <input
                        type="text"
                        placeholder="Search Research..."
                        className="form-control search-bar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="d-flex justify-content-center mb-4">
                    {user && user.role === "admin" && (
                        <Link className="btn btn-primary text-dark" to="/create-research">
                            Create a Research
                        </Link>
                    )}
                </div>
                <div className="container">
                    <div className="row">
                        {currentArticles.map((article) => (
                            <div className="col-lg-4 col-md-6 mb-4" key={article.research_id}>
                                <div className="card h-100">
                                    <div className="card-header">
                                        <img
                                            src={article.image_url}
                                            className="card-img-top"
                                            alt={article.title}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h2 className="card-title text-light">{article.title}</h2>
                                        <h4 className="card-subtitle text-light mt-2">{article.author}</h4>
                                        <p className="card-text text-light">Published on: {article.published_date}</p>
                                    </div>
                                    <div className="card-footer">
                                        <Link
                                            to={article.file_url}
                                            className="btn btn-success w-100 d-block text-dark"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <FontAwesomeIcon icon={faGoogleDrive} /> View Document
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default News;