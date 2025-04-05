import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import data from '../env/homepageData.json';
import { Link } from 'react-router-dom';
import "./styles/Homepage.css";

const iconMap = {
    faGoogleDrive: faGoogleDrive,
    faRocket: faRocket,
    faUserAstronaut: faUserAstronaut
};

function Homepage() {
    return (
        <>
            <header>
                <h1>WELCOME</h1>
                <h4>To Our Universe <span>ThothLabs</span></h4>
                <Link className='btn btn-outline-primary' to="/news">Check Latest News!</Link>
            </header>
            <div className="homepage-section">
                <div className="container">
                    <h2>{data.homepage.title}</h2>
                    <div className="row mb-4">
                        {data.homepage.sections.map((section, index) => (
                            <div className="col-lg-4 mt-4" key={index}>
                                <div className="card h-100">
                                    <div className="card-header">
                                        <img
                                            height={"300"}
                                            src={section.card.footer.link.image}
                                            className="card-img-top"
                                            alt={section.card.title}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">{section.card.title}</h3>
                                        <p className="card-text">{section.card.text}</p>
                                    </div>
                                    <div className="card-footer">
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={section.card.footer.link.url}
                                            className="btn"
                                        >
                                            {iconMap[section.card.footer.link.icon] && (
                                                <FontAwesomeIcon className='me-2' icon={iconMap[section.card.footer.link.icon]} />
                                            )} 
                                            {section.card.footer.link.text}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;