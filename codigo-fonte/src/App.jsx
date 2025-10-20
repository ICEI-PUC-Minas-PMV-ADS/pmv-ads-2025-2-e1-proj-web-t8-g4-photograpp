import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/home';
import Calendar from './pages/calendar';
import Customers from './pages/customers';
import Dashboard from './pages/dashboard';
import Finance from './pages/finance';
import Login from './pages/login';
import Register from './pages/register';
import NotFound from './pages/notFound';
import Pipeline from './pages/pipeline';
import Profile from './pages/profile';
import Projects from './pages/projects';
import Services from './pages/services';
import Tasks from './pages/tasks';
import PrivateRoute from './routes/PrivateRoute';
import EmailChecker from './pages/email-checker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Públicas */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="email-checker" element={<EmailChecker />} />
          <Route path="registrar" element={<Register />} />

          {/* Privadas */}
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projetos" element={<Projects />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="clientes" element={<Customers />} />
            <Route path="agenda" element={<Calendar />} />
            <Route path="perfil" element={<Profile />} />
            <Route path="servicos" element={<Services />} />
            <Route path="financeiro" element={<Finance />} />
            <Route path="tarefas" element={<Tasks />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
