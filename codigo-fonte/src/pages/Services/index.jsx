import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import "./styles.css";
import { FiSearch } from "react-icons/fi";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
      <section className="services__top">
        <div>
          <h1>Serviços</h1>
          <Breadcrumb />
        </div>
        <div className="services__actions">
          <div className="services__search-wrapper">
            <input
              type="text"
              className="services__search"
              placeholder="Digite o termo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="services__search-icon" />
          </div>
          <button className="services__button services__button--primary">
            Novo serviço
          </button>
        </div>
      </section>
      <div className="ServicosContainer">
       <h6>Fotografia de produto</h6>
       <span className="tituloServicos">Preços: </span><span className="conteudoServico">R$2000,00</span><br />
       <span className="tituloServicos">Número de fotos: </span><span className="conteudoServico">20 fotos</span>
      </div>

      <div className="ServicosContainer">
       <h6>Fotografia de produto</h6>
       <span className="tituloServicos">Preços: </span><span className="conteudoServico">R$3800,00</span><br />
       <span className="tituloServicos">Número de fotos: </span><span className="conteudoServico">40 fotos</span>
      </div>

      <div className="ServicosContainer">
       <h6>Fotografia de produto</h6>
       <span className="tituloServicos">Preços: </span><span className="conteudoServico">R$5800,00</span><br />
       <span className="tituloServicos">Número de fotos: </span><span className="conteudoServico">60 fotos</span>
      </div>
    </div>
  );
}