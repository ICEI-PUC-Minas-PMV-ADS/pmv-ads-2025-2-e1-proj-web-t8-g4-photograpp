import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useLocalStorage(key, defaultValue, userSpecific = true) {
  const { user, isAuthenticated } = useAuth();
  const [value, setValue] = useState(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  const getStorageKey = useCallback(() => {
    return userSpecific && user?.id ? `${key}_${user.id}` : key;
  }, [key, userSpecific, user?.id]);

  useEffect(() => {
    if (userSpecific && !isAuthenticated) {
      setIsInitialized(false);
      return;
    }

    try {
      const storageKey = getStorageKey();
      const savedValue = localStorage.getItem(storageKey);

      if (savedValue !== null) {
        const parsedValue = JSON.parse(savedValue);
        setValue(parsedValue);
      } else {
        setValue(defaultValue);
        if (defaultValue !== undefined) {
          localStorage.setItem(storageKey, JSON.stringify(defaultValue));
        }
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Erro ao carregar dados do localStorage:', error);
      setValue(defaultValue);
      setIsInitialized(true);
    }
  }, [
    user?.id,
    isAuthenticated,
    key,
    userSpecific,
    getStorageKey,
    defaultValue,
  ]);

  useEffect(() => {
    if (!isInitialized) return;
    if (userSpecific && !isAuthenticated) return;

    try {
      const storageKey = getStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar dados no localStorage:', error);
    }
  }, [
    value,
    isAuthenticated,
    user?.id,
    getStorageKey,
    userSpecific,
    isInitialized,
  ]);

  const updateValue = useCallback((newValue) => {
    if (typeof newValue === 'function') {
      setValue((prevValue) => {
        const updatedValue = newValue(prevValue);
        return updatedValue;
      });
    } else {
      setValue(newValue);
    }
  }, []);

  const clearValue = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      setValue(defaultValue);
    } catch (error) {
      console.error('Erro ao limpar dados do localStorage:', error);
    }
  }, [getStorageKey, defaultValue]);

  return [value, updateValue, clearValue, isInitialized];
}
