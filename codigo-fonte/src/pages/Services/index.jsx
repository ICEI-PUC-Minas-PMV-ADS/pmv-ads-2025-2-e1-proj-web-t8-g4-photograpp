import Breadcrumb from "../../components/Breadcrumb";
import Search from "../../assets/search.svg";
import "./styles.css";

export default function Services() {
  return (
    <div>
      <h1>Serviços</h1>
      <div className="searchLabel">
      <input type="text" placeholder="Digite o termo..." />
     <a href=""><img src={Search} alt="Buscar" /></a>
      </div>
      <a href=""><button>Novo serviço</button></a>
      <Breadcrumb />
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