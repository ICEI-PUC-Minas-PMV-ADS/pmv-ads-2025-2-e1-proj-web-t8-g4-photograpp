import "./styles.css";

export default function EmailChecker() {

  return (
    <section className="body-center" >
      <div className="email-checker">
        <figure className="avatar">
            <img className="simbolo" src="/src/assets/photograpp-simbolo.png" alt="Logo do Photograpp" width="150" />
        </figure>
        <h1>Vamos começar!</h1>
        <label>Por favor insira seu email:</label>
        <input className="input-center" type="email" placeholder="seuemail@email.com" />
        <button>Entrar</button>
      </div>
    </section>
  );
}
