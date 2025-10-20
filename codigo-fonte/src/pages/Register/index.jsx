import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro quando o usuário começar a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = register(formData);
      if (res.ok) {
        // Redirecionar para login com mensagem de sucesso
        navigate('/login', {
          state: { message: 'Conta criada com sucesso! Faça login.' },
        });
      } else {
        setError(res.error);
      }
    } catch (err) {
      console.log(err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha (mínimo 6 caracteres)"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          minLength={6}
          required
        />
        {error && (
          <p style={{ color: 'crimson', fontSize: 14, margin: 0 }}>{error}</p>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>
      <p style={{ marginTop: 12, textAlign: 'center', fontSize: 14 }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
