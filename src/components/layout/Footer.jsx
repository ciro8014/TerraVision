import { Github, Linkedin, Mail, Satellite, ExternalLink, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <Satellite size={40} />
              <span>TerraVision</span>
            </Link>
            <p className="footer-tagline">
              Multi-sensor Earth observation system integrating 25 years of NASA Terra satellite data 
              for environmental monitoring and climate prediction in Cusco, Peru.
            </p>
            <div className="footer-stats">
              <div className="footer-stat-item">
                <span className="stat-number">25</span>
                <span className="stat-text">Años</span>
              </div>
              <div className="footer-stat-item">
                <span className="stat-number">92%</span>
                <span className="stat-text">Precisión</span>
              </div>
              <div className="footer-stat-item">
                <span className="stat-number">150+</span>
                <span className="stat-text">Datasets</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/predictions">Predictions</Link></li>
              <li><Link to="/sensors">Terra Sensors</Link></li>
              <li><Link to="/data">Open Data</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3 className="footer-title">Recursos</h3>
            <ul className="footer-links">
              <li>
                <a href="https://www.spaceappschallenge.org" target="_blank" rel="noopener noreferrer">
                  NASA Space Apps <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="https://modis.gsfc.nasa.gov" target="_blank" rel="noopener noreferrer">
                  NASA MODIS <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>API Documentation</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>ML Methodology</a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()}>Research Paper</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="footer-text">
              Questions about TerraVision? Get in touch
            </p>
            <div className="social-icons">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={22} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={22} />
              </a>
              <a href="mailto:contact@cuscoclimate.com" className="social-link">
                <Mail size={22} />
              </a>
            </div>
            <button onClick={scrollToTop} className="back-to-top">
              <ArrowUp size={20} />
              Back to top
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              © 2025 TerraVision. Developed for 
              <a href="https://www.spaceappschallenge.org" target="_blank" rel="noopener noreferrer"> NASA Space Apps Challenge</a>
            </p>
            <div className="footer-bottom-links">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
              <span>·</span>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
              <span>·</span>
              <a href="#" onClick={(e) => e.preventDefault()}>License</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;