import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../../components/Breadcrumb';
import ProjectCard from './components/ProjectCard';
import './styles.css';

export default function Projects() {
  const [items, setItems] = useState([
    {
      titulo: 'Book Infantil Ana Clara',
      dataSessao: '05/09/2025',
      pacote: 'Book infantil',
      cliente: 'Ana Clara Lima',
      status: 'Lead',
    },
    {
      titulo: 'Casamento Pedro & Luiza',
      dataSessao: '22/09/2025',
      pacote: 'Cobertura de evento',
      cliente: 'Pedro Martins',
      status: 'Contratação',
    },
    {
      titulo: 'Ensaio Corporativo TechCorp',
      dataSessao: '30/09/2025',
      pacote: 'Ensaio empresarial',
      cliente: 'TechCorp Ltda',
      status: 'Assinatura de contrato',
    },
    {
      titulo: 'Ensaio Família Oliveira',
      dataSessao: '12/10/2025',
      pacote: 'Ensaio família',
      cliente: 'Fernanda Oliveira',
      status: 'Lead',
    },
    {
      titulo: 'Ensaio Produto Café BomDia',
      dataSessao: '18/10/2025',
      pacote: 'Ensaio de produto',
      cliente: 'Café BomDia',
      status: 'Contratação',
    },
  ]);

  function handleStatusChange(index, next) {
    setItems((prev) =>
      prev.map((it, i) => (i === index ? { ...it, status: next } : it))
    );
  }

  return (
    <div className="projects">
      <div className="projects__top">
        <div>
          <h1>Projetos</h1>
          <Breadcrumb />
        </div>
        <div className="projects__actions">
          <div className="projects__search-wrapper">
            <input
              type="text"
              className="projects__search"
              placeholder="Nome do projeto..."
            />
            <FiSearch className="projects__search-icon" />
          </div>
          <button className="projects__button projects__button--primary">
            Novo projeto
          </button>
        </div>
      </div>

      <section className="projects__cards-grid">
        {items.map((c, i) => (
          <ProjectCard
            key={c.titulo}
            {...c}
            onStatusChange={(next) => handleStatusChange(i, next)}
          />
        ))}
      </section>
    </div>
  );
}
