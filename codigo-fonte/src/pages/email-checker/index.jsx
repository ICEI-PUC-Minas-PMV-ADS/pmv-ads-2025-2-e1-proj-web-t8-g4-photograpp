import "./styles.css";
import photograppSymbol from "../../assets/avatar-placeholder.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailChecker() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleCheckEmail() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = users.some(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim()
    );

    if (emailExists) {
      navigate("/login", { state: { email } });
    } else {
      navigate("/registrar", { state: { email } });
    }
  }

  return (
    <section className="body-center">
      <div className="email-checker">
        <div className="personal-image">
          <figure className="avatar-figure">
            <img 
              className="avatar" 
              src={photograppSymbol} 
              alt="Logo do Photograpp" 
            />
          </figure>
        </div>

        <h1>Vamos começar!</h1>

        <label>Por favor insira seu email:</label>

        <input
          className="input-center"
          type="email"
          placeholder="seuemail@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleCheckEmail}>Entrar</button>
      </div>
    </section>
  );
}
