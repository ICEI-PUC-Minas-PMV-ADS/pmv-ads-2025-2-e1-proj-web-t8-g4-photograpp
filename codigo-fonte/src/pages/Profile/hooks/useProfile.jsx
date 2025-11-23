import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { applyCEPMask, applyPhoneMask } from '../../../utils/helpers/masks';

export function useProfile() {
  const { user } = useAuth();
  const [logo, setLogo] = useState(null);

  const [formData, setFormData] = useState({
    nomePublico: '',
    urlPagina: '',
    email: '',
    telefone: '',
    whatsapp: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    biografia: '',
  });

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const fullUser = users.find((u) => u.id === user.id);

      if (fullUser) {
        setFormData({
          nomePublico: fullUser.empresa?.razaoSocial || fullUser.name || '',
          urlPagina: fullUser.empresa?.razaoSocial
            ? fullUser.empresa.razaoSocial.toLowerCase().replace(/\s+/g, '-')
            : '',
          email: fullUser.empresa?.email || fullUser.email || '',
          telefone: fullUser.empresa?.telefone || fullUser.telefone || '',
          whatsapp: fullUser.telefone || '',
          cep: fullUser.empresa?.endereco?.cep || fullUser.endereco?.cep || '',
          rua: fullUser.empresa?.endereco?.rua || fullUser.endereco?.rua || '',
          numero:
            fullUser.empresa?.endereco?.numero ||
            fullUser.endereco?.numero ||
            '',
          complemento:
            fullUser.empresa?.endereco?.complemento ||
            fullUser.endereco?.complemento ||
            '',
          bairro:
            fullUser.empresa?.endereco?.bairro ||
            fullUser.endereco?.bairro ||
            '',
          cidade:
            fullUser.empresa?.endereco?.cidade ||
            fullUser.endereco?.cidade ||
            '',
          uf: fullUser.empresa?.endereco?.uf || fullUser.endereco?.uf || '',
          biografia: fullUser.biografia || '',
        });

        if (fullUser.empresa?.logo) {
          setLogo(fullUser.empresa.logo);
        }
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let maskedValue = value;

    if (name === 'telefone' || name === 'whatsapp') {
      maskedValue = applyPhoneMask(value);
    } else if (name === 'cep') {
      maskedValue = applyCEPMask(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: maskedValue,
    }));
  };

  const fetchAddressByCep = async (cep) => {
    try {
      const cleanCep = cep.replace(/\D/g, '');
      if (cleanCep.length !== 8) return;

      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) return;

      setFormData((prev) => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  useEffect(() => {
    if (formData.cep.replace(/\D/g, '').length === 8) {
      fetchAddressByCep(formData.cep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.cep]);

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!user) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }

    // Lê lista de usuários
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u) => u.id === user.id);

    let baseUser = userIndex !== -1 ? users[userIndex] : user;

    // Monta objeto atualizado
    const updatedUser = {
      ...baseUser,
      biografia: formData.biografia,
    };

    if (updatedUser.empresa) {
      updatedUser.empresa = {
        ...updatedUser.empresa,
        razaoSocial: formData.nomePublico,
        email: formData.email,
        telefone: formData.telefone,
        // aqui garantimos que salvamos a logo atual (base64) se existir
        logo:
          typeof logo === 'string' && logo.startsWith('data:')
            ? logo
            : updatedUser.empresa.logo || null,
        endereco: {
          cep: formData.cep,
          rua: formData.rua,
          numero: formData.numero,
          complemento: formData.complemento,
          bairro: formData.bairro,
          cidade: formData.cidade,
          uf: formData.uf,
        },
        // se quiser, já salva o slug/url da página aqui
        // paginaSlug: formData.urlPagina,
      };
    } else {
      // Usuário sem empresa cadastrada ainda
      updatedUser.telefone = formData.telefone;
      updatedUser.endereco = {
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        complemento: formData.complemento,
        bairro: formData.bairro,
        cidade: formData.cidade,
        uf: formData.uf,
      };
    }

    // Atualiza ou insere usuário em `users`
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    } else {
      users.push(updatedUser);
    }

    localStorage.setItem('users', JSON.stringify(users));

    // Atualiza também o `auth.user` no localStorage
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (auth.user && auth.user.id === user.id) {
      const { password, ...userWithoutPassword } = updatedUser;
      auth.user = userWithoutPassword;
      localStorage.setItem('auth', JSON.stringify(auth));
    }

    // 🔁 "Refresh" do formulário com o que foi realmente salvo
    setFormData({
      nomePublico: updatedUser.empresa?.razaoSocial || updatedUser.name || '',
      urlPagina: updatedUser.empresa?.razaoSocial
        ? updatedUser.empresa.razaoSocial.toLowerCase().replace(/\s+/g, '-')
        : formData.urlPagina, // ou usa paginaSlug se você salvar
      email: updatedUser.empresa?.email || updatedUser.email || '',
      telefone: updatedUser.empresa?.telefone || updatedUser.telefone || '',
      whatsapp: updatedUser.telefone || '',
      cep: updatedUser.empresa?.endereco?.cep || updatedUser.endereco?.cep || '',
      rua: updatedUser.empresa?.endereco?.rua || updatedUser.endereco?.rua || '',
      numero:
        updatedUser.empresa?.endereco?.numero ||
        updatedUser.endereco?.numero ||
        '',
      complemento:
        updatedUser.empresa?.endereco?.complemento ||
        updatedUser.endereco?.complemento ||
        '',
      bairro:
        updatedUser.empresa?.endereco?.bairro ||
        updatedUser.endereco?.bairro ||
        '',
      cidade:
        updatedUser.empresa?.endereco?.cidade ||
        updatedUser.endereco?.cidade ||
        '',
      uf: updatedUser.empresa?.endereco?.uf || updatedUser.endereco?.uf || '',
      biografia: updatedUser.biografia || '',
    });

    if (updatedUser.empresa?.logo) {
      setLogo(updatedUser.empresa.logo);
    }

    alert('Perfil atualizado com sucesso!');
  };



  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogo(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return {
    formData,
    logo,
    handleChange,
    handleSubmit,
    handleLogoChange,
  };
}