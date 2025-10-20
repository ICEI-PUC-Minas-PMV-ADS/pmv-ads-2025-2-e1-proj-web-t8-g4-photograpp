import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/photograpp-logo.svg';
import { useAuth } from '../contexts/AuthContext.jsx';
import './components.css';

export default function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfile = (e) => {
    e.stopPropagation();
    setProfileOpen(!profileOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <header>
        <div className="header-container">
          <NavLink to="/" className="logo">
            <img className="logo" src={logo} alt="Photograpp"/>
          </NavLink>
          <div className="login">
            <nav>
              <ul>
                <li>
                  <NavLink to="/registrar">Registrar</NavLink>
                </li>
                <li className="nav-button">
                  <NavLink to="/login">Login</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="menu-header">
      <div className="header-container">
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <NavLink to="/" className="menu-logo">
          <img className="logo" src={logo} alt="Photograpp" />
        </NavLink>

        <nav className={`menu-nav ${menuOpen ? 'menu-active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/projetos" onClick={() => setMenuOpen(false)}>
                Projetos
              </NavLink>
            </li>
            <li>
              <NavLink to="/pipeline" onClick={() => setMenuOpen(false)}>
                Pipeline
              </NavLink>
            </li>
            <li>
              <NavLink to="/clientes" onClick={() => setMenuOpen(false)}>
                Clientes
              </NavLink>
            </li>
            <li>
              <NavLink to="/agenda" onClick={() => setMenuOpen(false)}>
                Agenda
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil" onClick={() => setMenuOpen(false)}>
                Perfil
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicos" onClick={() => setMenuOpen(false)}>
                Serviços
              </NavLink>
            </li>
            <li>
              <NavLink to="/financeiro" onClick={() => setMenuOpen(false)}>
                Financeiro
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="menu-avatar" ref={profileRef}>
          <button
            className="avatar-button"
            onClick={toggleProfile}
            aria-label="Menu do perfil"
          >
            <img src="https://placehold.co/36x36" alt="Avatar" />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <span className="user-name">{user?.name || user?.email}</span>
              </div>
              <div className="profile-divider"></div>
              <button className="logout-button" onClick={logout}>
                Sair
              </button>
            </div>
          )}
        </div>
      </div>

      {menuOpen && <button className="overlay" onClick={toggleMenu}></button>}
    </header>
  );
}
