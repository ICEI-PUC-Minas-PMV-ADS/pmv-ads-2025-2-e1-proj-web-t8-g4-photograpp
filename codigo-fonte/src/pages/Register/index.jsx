import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './styles.css';

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCNPJ, setIsCNPJ] = useState(true);

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
    <section className="register-center">
      <div className='register-container'>
        <figure className="avatar">
            <img className="simbolo" src="/src/assets/photograpp-simbolo.png" alt="Logo do Photograpp" width="150" />
        </figure>
        <h1>Vamos começar!</h1>
        <form className="register-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
          <div className="form-row">
            <div className="form-column full-width">
              <label>Por favor insira seu email:</label>
              <input
                  className="input-center"
                  type="email"
                  name="email"
                  placeholder="seuemail@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-column">
              <div className="radio-options">
                <div className="radio">
                  <input type="radio" id="pessoa-fisica" name="profile" value="pessoa-fisica" disabled={isLoading} required checked={!isCNPJ} onChange={() => setIsCNPJ(false)}/>
                  <label htmlFor="pessoa-fisica" className="radio-label">Pessoa física</label>
                </div>
                <div className="radio">
                  <input type="radio" id="pessoa-juridica" name="profile" value="pessoa-juridica" disabled={isLoading} required checked={isCNPJ} onChange={() => setIsCNPJ(true)}/>
                  <label htmlFor='pessoa-juridica' className="radio-label"> Pessoa jurídica</label>
                </div>
              </div>
            </div>
          </div>          
          <section className='info-pessoal'>
            <div className="section-title">
              <h2>Sobre você</h2>
            </div>
            <div className="form-row">
              <div className="form-column full-width">
                <label>Qual o seu nome completo?</label>
                <div className="group-inputs">
                  <input
                    className="c50"
                    type="text"
                    name="primeiro-nome"
                    placeholder="Primeiro nome"
                    required
                  />
                  <input
                    className="c50"
                    type="text"
                    name="sobrenome"
                    placeholder="Sobrenome"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-column col50">
                <label>Qual o seu telefone?</label>
                <input
                  type="text"
                  name="telefone"
                  placeholder="(00) 0 00000-0000"
                  required
                />
                <p className="info-text">Utilize o número do WhatsApp para integrar as mensagens.</p>
              </div>
              <div className="form-column col50">
                <label>Qual é o seu CPF?</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="000.000.000-00"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-column full-width">
                <label>Qual é o seu endereço?</label>
                <div className="group-inputs">
                  <input
                    className="c25"
                    type="text"
                    name="CEP"
                    placeholder="CEP"
                    required
                  />
                  <input
                    className="c75"
                    type="text"
                    name="rua"
                    placeholder="Rua, avenida..."
                    required
                  />
                  <input
                    className="c25"
                    type="text"
                    name="numero"
                    placeholder="Número"
                    required
                  />
                  <input
                    className="c25"
                    type="text"
                    name="complemento"
                    placeholder="Complemento"
                    required
                  />
                  <input
                    className="c37"
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    required
                  />
                  <input
                    className="c12"
                    type="text"
                    name="uf"
                    placeholder="UF"
                    required
                  />
                </div>
              </div>
            </div>
          </section>
          {isCNPJ && (<section className='info-juridica'>
            <div className="section-title">
            <h2>Sobre sua empresa</h2>
          </div>
          <div className="form-row">
              <div className="form-column col50">
                <label>Qual é a Razão Social da sua empresa?</label>
                <input
                  type="text"
                  name="razao-social"
                  placeholder=""
                  required
                />
              </div>
              <div className="form-column col50">
                <label>Qual é o CNPJ?</label>
                <input
                  type="text"
                  name="cnpj"
                  placeholder="00.000.000/0000-00"
                  required
                />
              </div>
          </div> 
          <div className="form-row">
                <div className="form-column col50">
                  <label>Qual é o e-mail público da sua empresa?</label>
                  <input
                    type="email"
                    name="email-empresa"
                    placeholder="seunome@empresa.com"
                    required
                  />
                </div>
                <div className="form-column col50">
                <label>Qual o telefone comercial da empresa?</label>
                <input
                  type="text"
                  name="telefone"
                  placeholder="(00) 0 00000-0000"
                  required
                />
                <p className="info-text">Utilize o número do WhatsApp para integrar as mensagens.</p>
              </div>
          </div>
          <div className="form-row">
              <div className="form-column full-width">
                <label>Qual é o seu endereço?</label>
                <div className="group-inputs">
                  <input
                    className="c25"
                    type="text"
                    name="CEP"
                    placeholder="CEP"
                    required
                  />
                  <input
                    className="c75"
                    type="text"
                    name="rua"
                    placeholder="Rua, avenida..."
                    required
                  />
                  <input
                    className="c25"
                    type="text"
                    name="numero"
                    placeholder="Número"
                    required
                  />
                  <input
                    className="c25"
                    type="text"
                    name="complemento"
                    placeholder="Complemento"
                    required
                  />
                  <input
                    className="c37"
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    required
                  />
                  <input
                    className="c12"
                    type="text"
                    name="uf"
                    placeholder="UF"
                    required
                  />
                </div>
              </div>
            </div>
          </section>)}
          <section className='acesso'>
            <div className="section-title">
              <h2>Dados de acesso</h2>
            </div>
            <div className="form-row">
              <div className="form-column">
                <label>Crie sua senha de acesso:</label>
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
              </div>
              <div className="form-column">
                <label>Repita a senha:</label>
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
              </div>
            </div>
          </section>
          {error && (
            <p style={{ color: 'crimson', fontSize: 14, margin: 0 }}>{error}</p>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </section>
  );
}
