import { Link, useLocation } from 'react-router-dom';
import { Satellite, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/predictions', label: 'Predictions' },
    { to: '/sensors', label: 'Terra Sensors' },
    { to: '/impact', label: 'Impact' },
    { to: '/data', label: 'Data' },
  ];

  return (
    <header className={scrolled ? 'header-scrolled' : ''}>
      <nav className="container">
        <Link to="/" className="logo">
          <div className="logo-icon-wrapper">
            <Satellite size={32} />
            <div className="logo-orbit"></div>
          </div>
          <span className="logo-text">TerraVision</span>
        </Link>

        <div className="nav-desktop">
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to}
              className={location.pathname === link.to ? 'nav-link-active' : ''}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-cta">
            <Link to="/dashboard" className="nav-btn">
              Launch App
            </Link>
          </div>
        </div>

        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? 'nav-link-active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/dashboard" className="mobile-cta" onClick={() => setIsMenuOpen(false)}>
              Explorar Dashboard
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;