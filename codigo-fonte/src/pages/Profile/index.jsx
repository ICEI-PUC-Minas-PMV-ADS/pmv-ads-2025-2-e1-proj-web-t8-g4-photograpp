import Breadcrumb from "../../components/Breadcrumb";
import { useState } from "react";
import "./profile.css";

export default function Profile() {
  const [logo, setLogo] = useState(null);
  
  // Novos estados para o Modal
  const [showModal, setShowModal] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  // Função para simular adição de fotos no modal
  const handleAddPhotos = (e) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map(file => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file)
      }));
      setGalleryPhotos([...galleryPhotos, ...newPhotos]);
    }
  };

  // Função para remover foto da lista
  const removePhoto = (id) => {
    setGalleryPhotos(galleryPhotos.filter(p => p.id !== id));
  };

  return (
    <main className="profile-page">
      <div className="profile-header">
        <div>
          <h1 className="page-title">Perfil público</h1>
          <div className="breadcrumb">
            <Breadcrumb />
          </div>
        </div>
        <button className="btn btn-primary">Ver página pública</button>
      </div>

      {/* Card: Formulário principal */}
      <section className="card">
        <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label>Nome público da empresa:</label>
            <input type="text" placeholder="" />
          </div>

          <div className="field">
            <label>URL da página:</label>
            <input type="text" placeholder="" />
          </div>

          <div className="field logo-field">
            <label>Logo:</label>
            <label className="logo-drop" htmlFor="logo-input">
              {logo ? (
                <img
                  src={URL.createObjectURL(logo)}
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
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              hidden
            />
          </div>

          <div className="field">
            <label>E-mail para contato:</label>
            <input type="email" />
          </div>
          <div className="field">
            <label>Telefone:</label>
            <input type="tel" />
          </div>
          <div className="field">
            <label>WhatsApp:</label>
            <input type="tel" />
          </div>

          {/* Endereço */}
          <div className="field">
            <label>Endereço:</label>
            <input type="text" placeholder="CEP" />
          </div>
          <div className="field span-2">
            <label>&nbsp;</label>
            <input type="text" placeholder="Rua, avenida..." />
          </div>
          <div className="field">
            <label>&nbsp;</label>
            <input type="text" placeholder="Número" />
          </div>
          <div className="field">
            <label>&nbsp;</label>
            <input type="text" placeholder="Complemento" />
          </div>
          <div className="field">
            <label>&nbsp;</label>
            <input type="text" placeholder="Bairro" />
          </div>
          <div className="field">
            <label>&nbsp;</label>
            <div className="select-wrap">
              <select defaultValue="">
                <option value="" disabled>UF</option>
                {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
              <span className="chev">▾</span>
            </div>
          </div>

          <div className="field span-3">
            <label>Biografia:</label>
            <textarea rows={6} />
          </div>
        </form>
      </section>

      <section className="portfolio">
        <div className="portfolio__head">
          <div>
            <h2>Portfólio</h2>
            <p>Adicione suas melhores fotos para encantar seus clientes.</p>
          </div>
          {/* Botão que abre o Modal */}
          <button 
            className="btn btn-primary" 
            onClick={() => setShowModal(true)}
          >
            Nova Galeria
          </button>
        </div>

        <div className="gallery">
          <figure className="thumb">
            <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop" alt="" />
            <figcaption>Casamento Maria Luisa e Cláudio</figcaption>
          </figure>
          <figure className="thumb">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" alt="" />
            <figcaption>Ensaio Ana Paula</figcaption>
          </figure>
        </div>
      </section>

      {/* --- INÍCIO POO-PUP --- */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          {/* stopPropagation evita que clicar no modal feche ele */}
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            
            <div className="modal-header">
              <h3>Nova galeria</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>

            <div className="modal-body">
              {/* Campo Nome */}
              <div className="field">
                <label>Nome do ensaio:</label>
                <input type="text" placeholder="Ex: Ensaio Gestante" />
              </div>

              {/* Seção de Fotos */}
              <div>
                <div className="photos-header">
                  <label style={{color: 'var(--muted)', fontSize:'.95rem'}}>Fotos:</label>
                  
                  <label className="btn btn-primary" style={{fontSize: '.85rem', padding: '6px 12px', cursor: 'pointer'}}>
                    Enviar fotos
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      hidden 
                      onChange={handleAddPhotos}
                    />
                  </label>
                </div>

                {/* Grid de pré-visualização */}
                <div className="photos-grid">
                  {/* Se não tiver fotos, mostra mensagem ou estado vazio (deu bug 2x) */}
                  {galleryPhotos.length === 0 && (
                     <div style={{gridColumn: '1/-1', textAlign:'center', padding:'20px', border:'1px dashed var(--line)', borderRadius:'8px', color:'var(--muted)'}}>
                       Nenhuma foto selecionada.
                     </div>
                  )}

                  {galleryPhotos.map(photo => (
                    <div key={photo.id} className="photo-item">
                      <img src={photo.url} alt="Preview" />
                      <div className="photo-actions">
                        {/* Ícone de Lixeira (deu bug) */}
                        <span className="action-icon" onClick={() => removePhoto(photo.id)} title="Excluir">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </span>
                        {/* Ícone de Editar */}
                        <span className="action-icon" title="Editar">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary">Salvar</button>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}