import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const routeLabels = {
  '': 'Home',
  dashboard: 'Dashboard',
  projetos: 'Projetos',
  tarefas: 'Tarefas',
  pipeline: 'Pipeline',
  clientes: 'Clientes',
  solicitacoes: 'Solicitações',
  agenda: 'Agenda',
  perfil: 'Perfil',
  servicos: 'Serviços',
  financeiro: 'Financeiro',
};

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 1 && pathnames[0] === 'dashboard') {
    return renderBreadcrumb([
      {
        label: 'Dashboard',
        path: '/dashboard',
        active: true,
      },
    ]);
  }

  const items = pathnames.map((path, index) => {
    const url = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = routeLabels[path] || path;
    const isLast = index === pathnames.length - 1;

    return {
      label,
      path: url,
      active: isLast,
    };
  });

  if (
    pathnames.length > 0 &&
    pathnames[0] !== 'login' &&
    pathnames[0] !== 'registrar'
  ) {
    items.unshift({
      label: 'Dashboard',
      path: '/dashboard',
      active: false,
    });
  }

  return renderBreadcrumb(items);
};

const renderBreadcrumb = (items) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="breadcrumb-container">
      {items.map((item, index) => (
        <div key={item.path}>
          {index > 0 && <span className="breadcrumb-separator"> &gt; </span>}
          {item.active ? (
            <span className="breadcrumb-item active">{item.label}</span>
          ) : (
            <Link to={item.path} className="breadcrumb-item">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
