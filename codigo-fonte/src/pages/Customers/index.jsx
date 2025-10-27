import Breadcrumb from "../../components/Breadcrumb";
import "./styles.css";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
    <section className="customers__top">
      <div>
        <h1>Clientes</h1>
        <Breadcrumb />
      </div>
      <div className="customers__actions">
        <div className="customers__search-wrapper">
          <input
            type="text"
            className="customers__search"
            placeholder="Digite o termo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="customers__search-icon" />
        </div>
        <button className="customers-filter">
          <FiFilter className="customers__filter-icon" />
        </button>
        <button className="customers__button customers__button--primary">
          Novo cliente
        </button>
      </div>
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
          <th className="tableHeaderCenter">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>001</td>
          <td>João Silva</td>
          <td>joao.silva@gmail.com</td>
          <td>(11) 91234-5678</td>
          <td>
            <div className="action-buttons">
              <button className="action-button"><FiTrash2 title="Excluir" /></button>
              <button className="action-button"><FaRegEdit title="Editar" /></button>
              <button className="action-button"><FiEye title="Visualizar" /></button>
            </div>
          </td>
        </tr>
          <tr>
          <td>002</td>
          <td>Marta Silva</td>
          <td>marta.silva@outlook.com</td>
          <td>(21) 94834-5588</td>
          <td>
            <div className="action-buttons">
              <button className="action-button"><FiTrash2 title="Excluir" /></button>
              <button className="action-button"><FaRegEdit title="Editar" /></button>
              <button className="action-button"><FiEye title="Visualizar" /></button>
            </div>
          </td>
        </tr>
         <tr>
          <td>003</td>
          <td>Marcos Santos</td>
          <td>marcos.santos@gmail.com</td>
          <td>(81) 98563-5678</td>
          <td>
            <div className="action-buttons">
              <button className="action-button"><FiTrash2 title="Excluir" /></button>
              <button className="action-button"><FaRegEdit title="Editar" /></button>
              <button className="action-button"><FiEye title="Visualizar" /></button>
            </div>
          </td>
        </tr>
      </tbody>
     </table>
    </section>
    </>
  );
}