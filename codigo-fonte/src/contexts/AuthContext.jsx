import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  AUTH: 'auth',
  USERS: 'users',
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEYS.AUTH);
    return data
      ? JSON.parse(data)
      : { isAuthenticated: false, user: null, token: null };
  });

  useEffect(() => {
    const existingUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!existingUsers) {
      const defaultUsers = [
        {
          id: 1,
          name: 'Usuário Demo',
          email: 'demo@teste.com',
          password: '123456',
        },
        {
          id: 2,
          name: 'Demo Dois',
          email: 'demo2@teste.com',
          password: '123456',
        },
      ];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  }, [auth]);

  const getUsers = () => {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  };

  const register = (userData) => {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
      return { ok: false, error: 'Todos os campos são obrigatórios' };
    }

    if (password.length < 6) {
      return { ok: false, error: 'A senha deve ter pelo menos 6 caracteres' };
    }

    const users = getUsers();
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return { ok: false, error: 'E-mail já cadastrado' };
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    return { ok: true, message: 'Usuário cadastrado com sucesso' };
  };

  const login = (email, password) => {
    if (!email || !password) {
      return { ok: false, error: 'E-mail e senha são obrigatórios' };
    }

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email.toLowerCase().trim() && u.password === password
    );

    if (!user) {
      return { ok: false, error: 'E-mail ou senha incorretos' };
    }

    const fakeToken = `token-${user.id}-${Date.now()}`;
    const userAuth = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    setAuth({
      isAuthenticated: true,
      user: userAuth,
      token: fakeToken,
    });

    return { ok: true };
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
  };

  const value = useMemo(
    () => ({
      ...auth,
      login,
      logout,
      register,
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return ctx;
}
