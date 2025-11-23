import { useState } from 'react';
import '../profile.css';

export default function NewGalleryModal({ isOpen, onClose, onSave }) {
  const [galleryName, setGalleryName] = useState('');
  const [galleryPhotos, setGalleryPhotos] = useState([]);

  const handleAddPhotos = (e) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files).map((file) => ({
        id: Date.now() + Math.random(),
        url: URL.createObjectURL(file),
        file: file,
      }));
      setGalleryPhotos([...galleryPhotos, ...newPhotos]);
    }
  };

  const removePhoto = (id) => {
    setGalleryPhotos(galleryPhotos.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!galleryName.trim()) {
      alert('Por favor, insira um nome para o ensaio.');
      return;
    }

    if (galleryPhotos.length === 0) {
      alert('Por favor, adicione pelo menos uma foto.');
      return;
    }

    const promises = galleryPhotos.map((photo) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            id: photo.id,
            url: e.target?.result,
          });
        };
        reader.readAsDataURL(photo.file);
      });
    });

    Promise.all(promises).then((photos) => {
      const newGallery = {
        id: Date.now(),
        name: galleryName,
        photos: photos,
        createdAt: new Date().toISOString(),
      };

      onSave(newGallery);
      
      setGalleryName('');
      setGalleryPhotos([]);
      onClose();
    });
  };

  const handleClose = () => {
    setGalleryName('');
    setGalleryPhotos([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Nova galeria</h3>
          <button className="close-btn" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="field">
            <label>Nome do ensaio:</label>
            <input
              type="text"
              placeholder="Ex: Ensaio Gestante"
              value={galleryName}
              onChange={(e) => setGalleryName(e.target.value)}
            />
          </div>

          <div>
            <div className="photos-header">
              <label style={{ color: 'var(--muted)', fontSize: '.95rem' }}>
                Fotos:
              </label>

              <label
                className="btn-primary"
              >
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

            <div className="photos-grid">
              {galleryPhotos.length === 0 && (
                <div
                  style={{
                    gridColumn: '1/-1',
                    textAlign: 'center',
                    padding: '20px',
                    border: '1px dashed var(--line)',
                    borderRadius: '8px',
                    color: 'var(--muted)',
                  }}
                >
                  Nenhuma foto selecionada.
                </div>
              )}

              {galleryPhotos.map((photo) => (
                <div key={photo.id} className="photo-item">
                  <img src={photo.url} alt="Preview" />
                  <div className="photo-actions">
                    <span
                      className="action-icon"
                      onClick={() => removePhoto(photo.id)}
                      title="Excluir"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-primary" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}