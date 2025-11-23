import { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { defaultGalleries } from '../../../utils/mocks/galleriesMock';

export function useGalleries() {
  const [galleries, setGalleries, _, isInitialized] = useLocalStorage(
    'galleries',
    defaultGalleries,
    true
  );

  useEffect(() => {
    if (isInitialized && galleries.length === 0) {
      setGalleries(defaultGalleries);
    }
  }, [isInitialized, galleries.length, setGalleries]);

  const addGallery = (gallery) => {
    if (!isInitialized) return;
    setGalleries((prev) => [...prev, gallery]);
  };

  const updateGallery = (galleryId, updates) => {
    if (!isInitialized) return;
    setGalleries((prev) =>
      prev.map((gallery) =>
        gallery.id === galleryId ? { ...gallery, ...updates } : gallery
      )
    );
  };

  const deleteGallery = (galleryId) => {
    if (!isInitialized) return;
    setGalleries((prev) => prev.filter((gallery) => gallery.id !== galleryId));
  };

  const getGalleryById = (galleryId) => {
    return galleries.find((gallery) => gallery.id === galleryId);
  };

  return {
    galleries,
    addGallery,
    updateGallery,
    deleteGallery,
    getGalleryById,
    isInitialized,
  };
}
