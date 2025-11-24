import { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { defaultServices } from '../../../utils/mocks/servicesMock';

export function useServices() {
  const [services, setServices, clearServices, isInitialized] = useLocalStorage(
    'services',
    defaultServices,
    true
  );

  useEffect(() => {
    if (isInitialized && services.length === 0) {
      setServices(defaultServices);
    }
  }, [isInitialized, services.length, setServices]);

  const addService = (newService) => {
    if (!isInitialized) return;
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id, updates) => {
    if (!isInitialized) return;
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id) => {
    if (!isInitialized) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const getServiceById = (id) => services.find((s) => s.id === id);

  return {
    services,
    addService,
    updateService,
    deleteService,
    getServiceById,
    clearServices,
    isInitialized,
    setServices,
  };
}