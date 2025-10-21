import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './header';

export default function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}
