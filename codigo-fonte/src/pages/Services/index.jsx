import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import ServiceCard from './components/ServiceCard';
import ServiceModal from './components/ServiceModal';
import { useServices } from './hooks/useServices';
import './styles.css';

export default function Services() {
  const { services, addService, updateService, deleteService, isInitialized } =
    useServices();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  if (!isInitialized) {
    return <div className="services__loading">Carregando serviços...</div>;
  }

  const filtered = services.filter(
    (s) =>
      s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.descricao || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleNew() {
    setSelectedService(null);
    setIsModalOpen(true);
  }

  function handleCardClick(service) {
    setSelectedService(service);
    setIsModalOpen(true);
  }

  function handleSave(data) {
    if (services.some((s) => s.id === data.id)) {
      updateService(data.id, data);
    } else {
      addService(data);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedService(null);
  }

  return (
    <div className="services">
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
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch className="services__search-icon" />
          </div>
          <button
            type="button"
            className="services__add-btn"
            onClick={handleNew}
          >
            Novo serviço
          </button>
        </div>
      </section>

      <section className="services__cards-grid">
        {filtered.map((s) => (
          <ServiceCard key={s.id} {...s} onClick={() => handleCardClick(s)} />
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px 0',
            }}
          >
            Nenhum serviço encontrado.
          </div>
        )}
      </section>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onDelete={deleteService}
        service={selectedService}
      />
    </div>
  );
}
