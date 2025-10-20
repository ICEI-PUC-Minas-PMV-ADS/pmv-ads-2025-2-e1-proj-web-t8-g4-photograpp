import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 24px',
      maxWidth: '600px',
      margin: '0 auto' 
    }}>
      <h1 style={{ fontSize: '72px', marginBottom: '16px' }}>404</h1>
      <h2 style={{ marginBottom: '24px' }}>Página não encontrada</h2>
      <p style={{ 
        marginBottom: '32px', 
        color: '#cccccc',
        fontSize: '18px'
      }}>
        A página que você está procurando não existe ou foi movida.
      </p>
      
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/">
          <button>Ir para Home</button>
        </Link>
        
        {isAuthenticated && (
          <Link to="/dashboard">
            <button>Ir para Dashboard</button>
          </Link>
        )}
      </div>
    </div>
  );
}