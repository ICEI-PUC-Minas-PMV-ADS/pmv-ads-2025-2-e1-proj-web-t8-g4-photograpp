import Breadcrumb from "../../components/Breadcrumb";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
import Eye from "../../assets/eye.svg";
import Search from "../../assets/search.svg";
import Filtrar from "../../assets/filter.svg";
import "./styles.css";

export default function Clientes() {
  return (
    <>
    <section className="cabecalho">
      <div>
        <h1>Clientes</h1>
        <Breadcrumb />
      </div>
      <div className="searchLabel">
        <input type="text" placeholder="Digite o termo..." />
        <a href=""><img src={Search} alt="Buscar" /></a>
      </div>

      <a href=""><img src={Filtrar} alt="Filtrar" /></a>
      <a href=""><button>Novo Cliente</button></a>
    </section>
    <section className="ctable">
      <div className="registros">
        <span>Mostrar</span>
        <select className="caixaRegistros">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
        <span>registros</span>
      </div>
     <table id="customersTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>E-mail</th>
          <th>Contato</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>001</td>
          <td>João Silva</td>
          <td>joao.silva@gmail.com</td>
          <td>(11) 91234-5678</td>
          <td>
            <a href=""><img src={Trash} alt="Excluir" /></a>
            <a href=""><img src={Edit} alt="Editar" /></a>
            <a href=""><img src={Eye} alt="Visualizar" /></a>
          </td>
        </tr>
          <tr>
          <td>002</td>
          <td>Marta Silva</td>
          <td>marta.silva@outlook.com</td>
          <td>(21) 94834-5588</td>
          <td>
            <a href=""><img src={Trash} alt="Excluir" /></a>
            <a href=""><img src={Edit} alt="Editar" /></a>
            <a href=""><img src={Eye} alt="Visualizar" /></a>
          </td>
        </tr>
         <tr>
          <td>003</td>
          <td>Marcos Santos</td>
          <td>marcos.santos@gmail.com</td>
          <td>(81) 98563-5678</td>
          <td>
            <a href=""><img src={Trash} alt="Excluir" /></a>
            <a href=""><img src={Edit} alt="Editar" /></a>
            <a href=""><img src={Eye} alt="Visualizar" /></a>
          </td>
        </tr>
      </tbody>
     </table>
    </section>
    </>
  );
}