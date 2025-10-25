import Breadcrumb from "../../components/Breadcrumb";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
import Eye from "../../assets/eye.svg";
import Search from "../../assets/search.svg";
import Filtrar from "../../assets/filter.svg";
import "./styles.css";

export default function Clientes() {
  return (
    <div>
      <h1>Clientes</h1>
      <Breadcrumb />
      <fieldset>
      <input type="text" placeholder="Digite o termo..." />
     <a href=""><img src={Search} alt="Buscar" /></a>
      </fieldset>
      <a href=""><img src={Filtrar} alt="Filtrar" /></a>
          <button>Novo Cliente</button>
     <table id="customersTable">
      <thead>
        <tr>
          <th onclick="sortTable(0)">ID</th>
          <th onclick="sortTable(1)">Cliente</th>
          <th onclick="sortTable(2)">E-mail</th>
          <th onclick="sortTable(3)">Contato</th>
          <th onclick="sortTable(4)">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
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
          <td>2</td>
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
          <td>3</td>
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
    </div>
  );
}