import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import "./styles.css";
import avatarDemo from "../../assets/avatar-demo.png";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "demo@teste.com",
    password: "123456",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = login(formData.email, formData.password);
      if (res.ok) {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError(res.error || "Falha no login");
      }
    } catch (err) {
      console.log(err);
      setError("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="login-center">
      <div className="login-container">
        <figure className="avatar">
          <img src={avatarDemo} alt="Logo do Photograpp" width="150" />
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
              {error && (
                <p style={{ color: "crimson", fontSize: 14, margin: 0 }}>
                  {error}
                </p>
              )}
              <p className="nova-senha">
                <Link to="/reset-password">Esqueci minha senha</Link>
              </p>
            </div>
          </div>
          <div className="form-row">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
