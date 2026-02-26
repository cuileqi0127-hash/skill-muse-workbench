import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
}

interface AuthContextValue extends AuthState {
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, username: null });

  const login = (username: string, _password: string) => {
    // Mock login — accepts any non-empty credentials
    if (username.trim()) {
      setAuth({ isLoggedIn: true, username: username.trim() });
      return true;
    }
    return false;
  };

  const logout = () => setAuth({ isLoggedIn: false, username: null });

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
