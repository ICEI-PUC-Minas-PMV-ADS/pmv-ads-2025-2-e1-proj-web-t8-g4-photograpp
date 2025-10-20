import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';
import Customers from './pages/Customers';
import Dashboard from './pages/Dashboard';
import Finance from './pages/Finance';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Pipeline from './pages/Pipeline';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import Register from './pages/Register';
import Services from './pages/Services';
import Tasks from './pages/Tasks';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Públicas */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
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
