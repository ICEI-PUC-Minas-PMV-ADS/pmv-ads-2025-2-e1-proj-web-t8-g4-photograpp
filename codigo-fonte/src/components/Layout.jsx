import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

function Layout() {
  return (
   // TODO: Adicionar um condicional para mudar para o header logado caso o usuário esteja autenticado
   <div className="app-layout">
      <Header />
      <main>
        <Outlet /> {/* Renderiza o componente da rota aninhada aqui */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
