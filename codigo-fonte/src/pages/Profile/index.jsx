import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { statesList } from '../../utils/constants/statesList';
import GalleryViewModal from './components/GalleryViewModal';
import NewGalleryModal from './components/NewGalleryModal';
import { useGalleries } from './hooks/useGalleries';
import { useProfile } from './hooks/useProfile';
import './profile.css';

export default function Profile() {
  const { formData, logo, handleChange, handleSubmit, handleLogoChange } =
    useProfile();
  const { galleries, addGallery, isInitialized } = useGalleries();

  const [showNewGalleryModal, setShowNewGalleryModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setShowViewModal(true);
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
        <div className='actionButtons'>
        <button
          className="btn btn-seconday-outline"
          onClick={() => alert('Em breve...')}
        >
          Ver página pública
        </button>
        <button type="submit" className="btn btn-primary btn-save">
              Salvar alterações
            </button>
        </div>
      </div>

      <section className="profile-form">
        <form className="form-grid" onSubmit={handleSubmit}>
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
              Nenhuma galeria criada ainda. Clique em "Nova Galeria" para
              começar.
            </div>
          ) : (
            galleries.map((gallery) => (
              <figure
                key={gallery.id}
                className="thumb"
                onClick={() => handleGalleryClick(gallery)}
                style={{ cursor: 'pointer' }}
              >
                <img src={gallery.photos[0].url} alt={gallery.name} />
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