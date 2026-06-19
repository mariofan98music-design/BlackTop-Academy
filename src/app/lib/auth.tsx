import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiLogout } from "./api";

interface AuthState {
  token: string | null;
  memberId: string | null;
}

interface AuthContextType extends AuthState {
  login: (token: string, id: string) => void;
  logout: () => void;
  isOwner: (id: string) => boolean;
}

const STORAGE_KEY = "ba_auth";

const Ctx = createContext<AuthContextType>({
  token: null,
  memberId: null,
  login: () => {},
  logout: () => {},
  isOwner: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { token: null, memberId: null };
    } catch {
      return { token: null, memberId: null };
    }
  });

  // keep storage in sync
  useEffect(() => {
    if (state.token && state.memberId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const login = (token: string, id: string) => {
    const next = {
      token,
      memberId: id,
    };

    setState(next);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const logout = async () => {
    if (state.token) {
      await apiLogout(state.token).catch(() => {});
    }

    setState({ token: null, memberId: null });
    localStorage.removeItem(STORAGE_KEY);
  };

  const isOwner = (id: string) => state.memberId === id;

  return (
    <Ctx.Provider value={{ ...state, login, logout, isOwner }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);