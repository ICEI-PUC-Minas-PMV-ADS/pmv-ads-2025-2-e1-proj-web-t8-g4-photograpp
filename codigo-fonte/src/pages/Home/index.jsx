import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <section className="banner">
        <div className="banner-left">
          <h1>Sistema de gestão para fotógrafos</h1>
          <p>
            Sua operação simplificada e em um só lugar: Organize agenda, projetos,
            clientes, aprovações e muito mais.
          </p>
          <button onClick={() => navigate('/email-checker')}>Começar</button>
        </div>
        <div className="banner-right">
          <img src="/src/assets/banner.png" alt="Fotógrafo trablhando no escritório" width="100%" />
        </div>
      </section>
      <section className="features">
        <h2>
          Mantenha sua operação em foco
        </h2>
        <div className="feature-items">
          <div className="feature">
            <img src="/src/assets/icon-agenda.png" alt="Gestão de agenda e tarefas"/>
            <p>
              Agenda e tarefas sempre sob controle.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icon-pipeline.png" alt="Controle de produção"/>
            <p>
              Pipeline do orçamento à entrega em um só lugar.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icon-finance.png" alt="Gestão financeira"/>
            <p>
              Gestão financeira básica para não perder de vista seus números.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icon-pictures.png" alt="Seleção e aprovação de fotos"/>
            <p>
              Seleção e aprovação de fotos fácil e profissional.
            </p>
          </div>
          <div className="feature">
            <img src="/src/assets/icon-clients.png" alt="Gestão de clientes e contratos"/>
            <p>
              Clientes e contratos centralizados e acessíveis.
            </p>
          </div>
        </div>
        <p>
          Seja um fotógrafo independente ou dono de um pequeno estúdio, o Photograpp coloca sua operação em ordem para que você possa se concentrar no que realmente importa: a arte de fotografar e encantar seus clientes.
        </p>
        <button onClick={() => navigate('/email-checker')}>Experimentar</button>
      </section>
    </main>
  );
}
