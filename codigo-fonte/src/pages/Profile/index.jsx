import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { useAuth } from '../../contexts/AuthContext';
import { statesList } from '../../utils/constants/statesList';
import GalleryViewModal from './components/GalleryViewModal';
import NewGalleryModal from './components/NewGalleryModal';
import { useGalleries } from './hooks/useGalleries';
import { useProfile } from './hooks/useProfile';
import './profile.css';

function slugify(str) {
  return (str || 'perfil')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { formData, logo, handleChange, handleSubmit, handleLogoChange } =
    useProfile();
  const { galleries, addGallery, isInitialized, deleteGallery } =
    useGalleries();

  const [showNewGalleryModal, setShowNewGalleryModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setShowViewModal(true);
  };

  const handleDeleteGallery = (e, galleryId) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta galeria?'
    );
    if (!confirmDelete) return;

    deleteGallery(galleryId);

    if (selectedGallery && selectedGallery.id === galleryId) {
      setSelectedGallery(null);
      setShowViewModal(false);
    }
  };

  const handleGoToPublicPage = () => {
    const slug = slugify(
      formData.nomePublico || formData.urlPagina || 'perfil'
    );

    const publicData = {
      profile: {
        userId: user?.id,
        publicName: formData.nomePublico,
        pageUrl: formData.urlPagina,
        email: formData.email,
        phone: formData.telefone,
        whatsapp: formData.whatsapp,
        cep: formData.cep,
        street: formData.rua,
        number: formData.numero,
        complement: formData.complemento,
        neighborhood: formData.bairro,
        city: formData.cidade,
        uf: formData.uf,
        bio: formData.biografia,
        logo: typeof logo === 'string' ? logo : null,
      },
      galleries: galleries.map((g) => ({
        id: g.id,
        name: g.name,
        coverUrl: g.photos?.[0]?.url || '',
        photos: (g.photos || []).map((p) => ({
          id: p.id,
          url: p.url,
        })),
      })),
    };

    console.log('Salvando perfil público com userId:', user?.id);
    console.log('Dados públicos:', publicData);

    localStorage.setItem(`public_profile_${slug}`, JSON.stringify(publicData));
    navigate(`/${slug}`);
  };

  if (!isInitialized) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <h1 className="page-title">Perfil público</h1>
          <div className="breadcrumb">
            <Breadcrumb />
          </div>
        </div>
        <div className="actionButtons">
          <button
            type="button"
            className="btn btn-seconday-outline"
            onClick={handleGoToPublicPage}
          >
            Ver página pública
          </button>
          <button
            type="submit"
            form="profile-form"
            className="btn btn-primary btn-save"
          >
            Salvar alterações
          </button>
        </div>
      </div>

      <section className="profile-form">
        <form className="form-grid" onSubmit={handleSubmit} id="profile-form">
          <div className="field span-2">
            <label>Nome público da empresa:</label>
            <input
              type="text"
              name="nomePublico"
              value={formData.nomePublico}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>URL da página:</label>
            <input
              type="text"
              name="urlPagina"
              value={formData.urlPagina}
              onChange={handleChange}
            />
          </div>

          <div className="field logo-field">
            <label>Logo:</label>
            <label className="logo-drop" htmlFor="logo-input">
              {logo ? (
                <img
                  src={
                    typeof logo === 'string' ? logo : URL.createObjectURL(logo)
                  }
                  alt="Logo"
                  className="logo-preview"
                />
              ) : (
                <span className="logo-hint">Arraste ou clique para enviar</span>
              )}
            </label>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              hidden
            />
          </div>

          <div className="field">
            <label>E-mail para contato:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Telefone:</label>
            <input
              type="tel"
              name="telefone"
              placeholder="(00) 0 0000-0000"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>WhatsApp:</label>
            <input
              type="tel"
              name="whatsapp"
              placeholder="(00) 0 0000-0000"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>Endereço:</label>
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
            />
          </div>

          <div className="field span-2 rua-field">
            <label>&nbsp;</label>
            <input
              type="text"
              name="rua"
              placeholder="Rua, avenida..."
              value={formData.rua}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label>&nbsp;</label>
            <input
              type="text"
              name="numero"
              placeholder="Número"
              value={formData.numero}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="complemento"
              placeholder="Complemento"
              value={formData.complemento}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="bairro"
              placeholder="Bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <select
              className="uf"
              name="uf"
              value={formData.uf}
              onChange={handleChange}
            >
              <option value="">UF</option>
              {statesList.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>
          </div>

          <div className="field span-4">
            <label>Biografia:</label>
            <textarea
              rows={6}
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
            />
          </div>
        </form>
      </section>

      <section className="portfolio">
        <div className="portfolio__head">
          <div>
            <h2>Portfólio</h2>
            <p>Adicione suas melhores fotos para encantar seus clientes.</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowNewGalleryModal(true)}
          >
            Nova Galeria
          </button>
        </div>

        <div className="gallery">
          {galleries.length === 0 ? (
            <div
              style={{
                gridColumn: '1/-1',
                textAlign: 'center',
                padding: '40px',
                color: 'var(--muted)',
              }}
            >
              Nenhuma galeria criada ainda. Clique em &quot;Nova Galeria&quot;
              para começar.
            </div>
          ) : (
            galleries.map((gallery) => (
              <figure
                key={gallery.id}
                className="thumb"
                onClick={() => handleGalleryClick(gallery)}
                style={{ cursor: 'pointer' }}
              >
                <button
                  type="button"
                  className="thumb-delete-btn"
                  onClick={(e) => handleDeleteGallery(e, gallery.id)}
                  aria-label="Excluir galeria"
                >
                  ×
                </button>

                {gallery.photos[0] && (
                  <img src={gallery.photos[0].url} alt={gallery.name} />
                )}
                <figcaption>{gallery.name}</figcaption>
              </figure>
            ))
          )}
        </div>
      </section>

      <NewGalleryModal
        isOpen={showNewGalleryModal}
        onClose={() => setShowNewGalleryModal(false)}
        onSave={addGallery}
      />

      <GalleryViewModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedGallery(null);
        }}
        gallery={selectedGallery}
      />
    </main>
  );
}