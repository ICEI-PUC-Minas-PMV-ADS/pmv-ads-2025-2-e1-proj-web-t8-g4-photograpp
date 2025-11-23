import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import photograppSymbol from '../../assets/avatar-placeholder.svg';
import camera from '../../assets/camera.svg';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { statesList } from '../../utils/constants/statesList.js';
import { isValidCNPJ, isValidCPF } from '../../utils/helpers/helpers.js';
import {
  applyCEPMask,
  applyCNPJMask,
  applyCPFMask,
  applyPhoneMask,
} from '../../utils/helpers/masks';
import './styles.css';

export default function Register() {
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    primeiroNome: '',
    sobrenome: '',
    telefone: '',
    cpf: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    razaoSocial: '',
    cnpj: '',
    emailEmpresa: '',
    telefoneEmpresa: '',
    cepEmpresa: '',
    ruaEmpresa: '',
    numeroEmpresa: '',
    complementoEmpresa: '',
    bairroEmpresa: '',
    cidadeEmpresa: '',
    ufEmpresa: '',
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({
        ...prev,
        email: location.state.email,
      }));
    }
  }, [location.state]);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCNPJ, setIsCNPJ] = useState(true);

  const navigate = useNavigate();

  const fetchAddressByCep = async (cep, isCompany = false) => {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      if (cleanCep.length !== 8) return;

      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) return;

      setFormData((prev) => ({
        ...prev,
        [isCompany ? 'ruaEmpresa' : 'rua']: data.logradouro || '',
        [isCompany ? 'bairroEmpresa' : 'bairro']: data.bairro || '',
        [isCompany ? 'cidadeEmpresa' : 'cidade']: data.localidade || '',
        [isCompany ? 'ufEmpresa' : 'uf']: data.uf || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    // Aplicar máscaras
    if (name === 'telefone' || name === 'telefoneEmpresa') {
      maskedValue = applyPhoneMask(value);
    } else if (name === 'cpf') {
      maskedValue = applyCPFMask(value);
    } else if (name === 'cnpj') {
      maskedValue = applyCNPJMask(value);
    } else if (name === 'cep' || name === 'cepEmpresa') {
      maskedValue = applyCEPMask(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));

    if (error) setError('');

    if (name === 'cpf') {
      const digits = maskedValue.replace(/\D/g, '');

      if (digits.length === 11) {
        if (!isValidCPF(digits)) {
          setCpfError('CPF inválido.');
        } else {
          setCpfError('');
        }
      } else {
        setCpfError('Informe os 11 dígitos do CPF.');
      }
    }

    if (name === 'cnpj') {
      const digits = maskedValue.replace(/\D/g, '');

      if (digits.length === 14) {
        if (!isValidCNPJ(digits)) {
          setCnpjError('CNPJ inválido.');
        } else {
          setCnpjError('');
        }
      } else {
        setCnpjError('Informe os 14 dígitos do CNPJ.');
      }
    }

    if (name === 'cep' && maskedValue.replace(/\D/g, '').length === 8) {
      fetchAddressByCep(maskedValue);
    }

    if (name === 'cepEmpresa' && maskedValue.replace(/\D/g, '').length === 8) {
      fetchAddressByCep(maskedValue, true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      setIsLoading(false);
      return;
    }

    if (!formData.primeiroNome || !formData.sobrenome || !formData.email) {
      setError('Preencha todos os campos obrigatórios.');
      setIsLoading(false);
      return;
    }

    try {
      const userData = {
        name: `${formData.primeiroNome.trim()} ${formData.sobrenome.trim()}`,
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        avatar: avatar,
        telefone: formData.telefone,
        cpf: formData.cpf,
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.uf,
        },
        ...(isCNPJ && {
          empresa: {
            razaoSocial: formData.razaoSocial,
            cnpj: formData.cnpj,
            email: formData.emailEmpresa,
            telefone: formData.telefoneEmpresa,
            endereco: {
              cep: formData.cepEmpresa,
              rua: formData.ruaEmpresa,
              numero: formData.numeroEmpresa,
              complemento: formData.complementoEmpresa,
              bairro: formData.bairroEmpresa,
              cidade: formData.cidadeEmpresa,
              uf: formData.ufEmpresa,
            },
          },
        }),
      };

      const res = register(userData);
      if (res.ok) {
        navigate('/login', {
          state: { email: userData.email, avatar: userData.avatar },
        });
      } else {
        setError(res.error);
      }
    } catch (err) {
      console.error(err);
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const [cpfError, setCpfError] = useState('');
  const [cnpjError, setCnpjError] = useState('');

  return (
    <section className="register-center">
      <div className="register-container">
        <div className="email-checker">
          <div className="personal-image">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <figure className="avatar-figure">
              <button
                type="button"
                className="input-foto"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <img src={camera} alt="Carregar foto" />
              </button>
              <img
                className="avatar"
                src={avatar ? avatar : photograppSymbol}
                alt="Avatar do usuário"
              />
            </figure>
          </div>
          <h1>Vamos começar!</h1>
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
        <form
          className="register-form"
          onSubmit={handleSubmit}
          style={{ display: 'grid', gap: 12 }}
        >
          <div className="form-row">
            <div className="form-column">
              <div className="radio-options">
                <div className="radio">
                  <input
                    type="radio"
                    id="pessoa-fisica"
                    name="profile"
                    value="pessoa-fisica"
                    disabled={isLoading}
                    checked={!isCNPJ}
                    onChange={() => setIsCNPJ(false)}
                  />
                  <label htmlFor="pessoa-fisica" className="radio-label">
                    Pessoa física
                  </label>
                </div>
                <div className="radio">
                  <input
                    type="radio"
                    id="pessoa-juridica"
                    name="profile"
                    value="pessoa-juridica"
                    disabled={isLoading}
                    checked={isCNPJ}
                    onChange={() => setIsCNPJ(true)}
                  />
                  <label htmlFor="pessoa-juridica" className="radio-label">
                    Pessoa jurídica
                  </label>
                </div>
              </div>
            </div>
          </div>
          <section className="info-pessoal">
            <div className="section-title">
              <h2>Sobre você</h2>
            </div>
            <div className="form-row">
              <div className="form-column full-width">
                <label>Qual o seu nome completo?</label>
                <div className="group-inputs">
                  <div className="group-line">
                    <input
                      className="c50"
                      type="text"
                      name="primeiroNome"
                      placeholder="Primeiro nome"
                      value={formData.primeiroNome}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <input
                      className="c50"
                      type="text"
                      name="sobrenome"
                      placeholder="Sobrenome"
                      value={formData.sobrenome}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-column col50">
                <label>Qual o seu telefone?</label>
                <input
                  type="text"
                  name="telefone"
                  placeholder="(00) 0 0000-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <p className="info-text">
                  Utilize o número do WhatsApp para integrar as mensagens.
                </p>
              </div>
              <div className="form-column col50">
                <label>Qual é o seu CPF?</label>
                <input
                  type="text"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                {cpfError && <p className="errorField">{cpfError}</p>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-column full-width">
                <label>Qual é o seu endereço?</label>
                <div className="group-inputs">
                  <div className="group-line">
                    <input
                      className="c25"
                      type="text"
                      name="cep"
                      placeholder="CEP"
                      value={formData.cep}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <input
                      className="c75"
                      type="text"
                      name="rua"
                      placeholder="Rua, avenida..."
                      value={formData.rua}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <input
                      className="c25"
                      type="text"
                      name="numero"
                      placeholder="Número"
                      value={formData.numero}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="group-line">
                    <input
                      className="c25"
                      type="text"
                      name="complemento"
                      placeholder="Complemento"
                      value={formData.complemento}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <input
                      className="c25"
                      type="text"
                      name="bairro"
                      placeholder="Bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <input
                      className="c37"
                      type="text"
                      name="cidade"
                      placeholder="Cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <select
                      className="uf c12"
                      name="uf"
                      value={formData.uf}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    >
                      <option value="">UF</option>
                      {statesList.map((uf) => (
                        <option key={uf} value={uf}>
                          {uf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {isCNPJ && (
            <section className="info-juridica">
              <div className="section-title">
                <h2>Sobre sua empresa</h2>
              </div>
              <div className="form-row">
                <div className="form-column col50">
                  <label>Qual é a Razão Social da sua empresa?</label>
                  <input
                    type="text"
                    name="razaoSocial"
                    placeholder="Minha Empresa LTDA"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    disabled={isLoading}
                    required={isCNPJ}
                  />
                </div>
                <div className="form-column col50">
                  <label>Qual é o CNPJ?</label>
                  <input
                    type="text"
                    name="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={handleChange}
                    disabled={isLoading}
                    required={isCNPJ}
                  />
                  {cnpjError && <p className="errorField">{cnpjError}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-column col50">
                  <label>Qual é o e-mail público da sua empresa?</label>
                  <input
                    type="email"
                    name="emailEmpresa"
                    placeholder="seunome@empresa.com"
                    value={formData.emailEmpresa}
                    onChange={handleChange}
                    disabled={isLoading}
                    required={isCNPJ}
                  />
                </div>
                <div className="form-column col50">
                  <label>Qual o telefone comercial da empresa?</label>
                  <input
                    type="text"
                    name="telefoneEmpresa"
                    placeholder="(00) 0 0000-0000"
                    value={formData.telefoneEmpresa}
                    onChange={handleChange}
                    disabled={isLoading}
                    required={isCNPJ}
                  />
                  <p className="info-text">
                    Utilize o número do WhatsApp para integrar as mensagens.
                  </p>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column full-width">
                  <label>Qual é o endereço da empresa?</label>
                  <div className="group-inputs">
                    <div className="group-line">
                      <input
                        className="c25"
                        type="text"
                        name="cepEmpresa"
                        placeholder="CEP"
                        value={formData.cepEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      />
                      <input
                        className="c75"
                        type="text"
                        name="ruaEmpresa"
                        placeholder="Rua, avenida..."
                        value={formData.ruaEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      />
                      <input
                        className="c25"
                        type="text"
                        name="numeroEmpresa"
                        placeholder="Número"
                        value={formData.numeroEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      />
                    </div>
                    <div className="group-line">
                      <input
                        className="c25"
                        type="text"
                        name="complementoEmpresa"
                        placeholder="Complemento"
                        value={formData.complementoEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <input
                        className="c25"
                        type="text"
                        name="bairroEmpresa"
                        placeholder="Bairro"
                        value={formData.bairroEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      />
                      <input
                        className="c37"
                        type="text"
                        name="cidadeEmpresa"
                        placeholder="Cidade"
                        value={formData.cidadeEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      />
                      <select
                        className="uf c12"
                        name="ufEmpresa"
                        value={formData.ufEmpresa}
                        onChange={handleChange}
                        disabled={isLoading}
                        required={isCNPJ}
                      >
                        <option value="">UF</option>
                        {statesList.map((uf) => (
                          <option key={uf} value={uf}>
                            {uf}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="acesso">
            <div className="section-title">
              <h2>Dados de acesso</h2>
            </div>
            <div className="form-row">
              <div className="form-column col50">
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
              <div className="form-column col50">
                <label>Repita a senha:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  minLength={6}
                  required
                />
              </div>
            </div>
          </section>
          {error && <p className="errorField">{error}</p>}
          <div className="form-row">
            <div className="form-column">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Criando conta...' : 'Registrar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
