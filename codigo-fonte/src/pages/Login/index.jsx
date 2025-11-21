import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import avatarDemo from '../../assets/avatar-placeholder.svg';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './styles.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [avatar, setAvatar] = useState(avatarDemo);

  const getUsers = () => {
    const usersData = localStorage.getItem('users');
    return usersData ? JSON.parse(usersData) : [];
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
    if (location.state?.avatar) {
      setAvatar(location.state.avatar);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError('');
  };

  const handleBlur = () => {
    const email = formData.email.toLowerCase().trim();
    if (!email) {
      setAvatar(avatarDemo);
      return;
    }
    const users = getUsers();
    const user = users.find((u) => u.email === email);
    if (user && user.avatar) {
      setAvatar(user.avatar);
    } else {
      setAvatar(avatarDemo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = login(formData.email, formData.password);
      if (res.ok) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Falha no login');
      }
    } catch (err) {
      console.log(err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-center">
      <div className="login-container">
        <figure>
          <img
            className="avatar"
            src={avatar}
            alt="Foto do usuário"
            width="150"
          />
        </figure>
        <h1>Vamos começar!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-column login-width">
              <label>Por favor insira seu email:</label>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column login-width">
              <label>Insira sua senha:</label>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
              {error && <p className="errorField">{error}</p>}
              <p className="nova-senha">
                <Link to="/reset-password">Esqueci minha senha</Link>
              </p>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
