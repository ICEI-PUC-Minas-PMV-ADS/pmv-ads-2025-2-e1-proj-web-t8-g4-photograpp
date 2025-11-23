import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import './GalleryViewModal.css';

export default function GalleryViewModal({ isOpen, onClose, gallery }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen || !gallery) return null;

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? gallery.photos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === gallery.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleClose = () => {
    setCurrentIndex(0);
    onClose();
  };

  return (
    <div className="gallery-view-overlay" onClick={handleClose}>
      <div className="gallery-view-content" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-view-header">
          <h3>{gallery.name}</h3>
          <button className="gallery-view-close" onClick={handleClose}>
            <FiX />
          </button>
        </div>

        <div className="gallery-view-body">
          <button className="gallery-nav-btn" onClick={handlePrevious}>
            <FiChevronLeft />
          </button>

          <div className="gallery-main-image">
            <img 
              src={gallery.photos[currentIndex].url} 
              alt={`${gallery.name} - foto ${currentIndex + 1}`}
            />
          </div>

          <button className="gallery-nav-btn" onClick={handleNext}>
            <FiChevronRight />
          </button>
        </div>

        <div className="gallery-thumbnails">
          {gallery.photos.map((photo, index) => (
            <button
              key={photo.id}
              className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={photo.url} alt={`Miniatura ${index + 1}`} />
            </button>
          ))}
        </div>

        <div className="gallery-counter">
          {currentIndex + 1} / {gallery.photos.length}
        </div>
      </div>
    </div>
  );
}