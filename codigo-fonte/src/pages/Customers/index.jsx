import { useState } from 'react';
import { FiEdit, FiEye, FiSearch, FiTrash2 } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import CustomerModal from './components/CustomerModal';
import { useCustomers } from './hooks/useCustomers';
import './styles.css';

export default function Clientes() {
  const {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    isInitialized,
  } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'view'

  const filteredCustomers = customers.filter((c) =>
    [c.nome, c.email, c.contato].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  function handleNewCustomer() {
    setSelectedCustomer(null);
    setModalMode('create');
    setIsModalOpen(true);
  }

  function handleEdit(customer) {
    setSelectedCustomer(customer);
    setModalMode('edit');
    setIsModalOpen(true);
  }

  function handleView(customer) {
    setSelectedCustomer(customer);
    setModalMode('view');
    setIsModalOpen(true);
  }

  function handleDelete(customerId) {
    if (window.confirm('Deseja excluir este cliente?')) {
      deleteCustomer(customerId);
    }
  }

  function handleSave(customerData) {
    if (modalMode === 'edit' && selectedCustomer) {
      updateCustomer(customerData.id, customerData);
    } else {
      addCustomer(customerData);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setModalMode('create');
  }

  if (!isInitialized) {
    return <div className="customers__loading">Carregando clientes...</div>;
  }

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
          <button
            type="button"
            className="customers__button customers__button--primary"
            onClick={handleNewCustomer}
          >
            Novo cliente
          </button>
        </div>
      </section>

      <section className="ctable">
        <div className="registros"></div>
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
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>{String(c.id).padStart(3, '0')}</td>
                <td>{c.nome}</td>
                <td>{c.email}</td>
                <td>{c.contato}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-button"
                      onClick={() => handleDelete(c.id)}
                      title="Excluir"
                      type="button"
                    >
                      <FiTrash2 />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleEdit(c)}
                      title="Editar"
                      type="button"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleView(c)}
                      title="Visualizar"
                      type="button"
                    >
                      <FiEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: 'center', padding: '30px' }}
                >
                  Nenhum cliente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onDelete={handleDelete}
        customer={selectedCustomer}
        mode={modalMode}
      />
    </>
  );
}
