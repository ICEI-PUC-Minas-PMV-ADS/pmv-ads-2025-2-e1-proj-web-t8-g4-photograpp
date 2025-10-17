import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="src/assets/photograpp-logo.svg" alt="Photograpp" />
        </Link>
        <div className="login">
          <nav>
            <ul>
              <li>
                <Link to="/registrar">Registrar</Link>
              </li>
              <li className="nav-button">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
