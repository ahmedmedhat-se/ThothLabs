import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import "../css/CosmicExplorer.css";

function CosmicExplorer() {
    return (
        <div className='cosmic-container'>
            <div className="cosmic-explorer embed-responsive embed-responsive-16by9">
                <h2>Cosmic <span>Explorer</span></h2>
                <iframe
                    className="embed-responsive-item w-100 d-block"
                    src="https://ahmedmedhat-se.github.io/3D-Interactive-Solar-System/ "
                    allowFullScreen
                    title="Cosmic Explorer Video"
                ></iframe>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ahmedmedhat-se.github.io/3D-Interactive-Solar-System/"
                    className="btn"
                >
                    <FontAwesomeIcon icon={faGlobe} /> Full View
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://drive.google.com/drive/folders/1u81rvEv_bqf_JpodCSZwJkmrzIQF0YtH"
                    className="btn"
                >
                    <FontAwesomeIcon icon={faGoogleDrive} /> Research
                </a>
            </div>
        </div>
    )
};

export default CosmicExplorer;