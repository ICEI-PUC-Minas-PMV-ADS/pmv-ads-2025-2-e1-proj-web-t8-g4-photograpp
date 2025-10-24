import Breadcrumb from "../../components/Breadcrumb";

export default function Clientes() {
  return (
    <div>
      <h1>Clientes</h1>
      <Breadcrumb />
      <fieldset>
      <input type="text" placeholder="Digite o termo..." />
      <button>Buscar</button>
      </fieldset>
        <button>Filtrar</button>
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
          <td>joao.silva@example.com</td>
          <td>(11) 91234-5678</td>
          <td>
            <button>Excluir</button>
            <button>Editar</button>
            <button>Visualizar</button>
          </td>
        </tr>
      </tbody>
     </table>
    </div>
  );
}