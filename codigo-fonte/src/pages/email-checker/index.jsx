import "./styles.css";
import photograppSymbol from "../../assets/avatar-placeholder.svg";

export default function EmailChecker() {
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
        />
        <button>Entrar</button>
      </div>
    </section>
  );
}
