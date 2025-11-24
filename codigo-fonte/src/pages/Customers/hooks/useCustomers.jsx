import { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { defaultCustomers } from '../../../utils/mocks/customersMock';

export function useCustomers() {
  const [customers, setCustomers, clearCustomers, isInitialized] = useLocalStorage(
    'customers',
    defaultCustomers,
    true
  );

  useEffect(() => {
    if (isInitialized && customers.length === 0) {
      setCustomers(defaultCustomers);
    }
  }, [isInitialized, customers.length, setCustomers]);

  const addCustomer = (newCustomer) => {
    if (!isInitialized) return;
    setCustomers((prev) => [...prev, newCustomer]);
  };

  const updateCustomer = (customerId, updates) => {
    if (!isInitialized) return;
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, ...updates } : c))
    );
  };

  const deleteCustomer = (customerId) => {
    if (!isInitialized) return;
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  const getCustomerById = (customerId) =>
    customers.find((c) => c.id === customerId);

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
    clearCustomers,
    isInitialized,
    setCustomers,
  };
}