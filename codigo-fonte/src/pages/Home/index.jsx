import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="banner">
      <div className="banner-left">
        <h1>Sistema de gestão para fotógrafos</h1>
        <p>
          Sua operação simplificada e em um só lugar: Organize agenda, projetos,
          clientes, aprovações e muito mais.
        </p>
        <button onClick={() => navigate('/registrar')}>Começar</button>
      </div>
      <div className="banner-right">
        <img src="/src/assets/banner.png" alt="Hero" width="100%" />
      </div>
    </div>
  );
}
