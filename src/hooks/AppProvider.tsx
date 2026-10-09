import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Cat } from "../types/cat";
import { catsService } from "../services/cats.service";
import { FAVORITES_KEY, parseFavorites } from "../utils/storage";
interface AppState {
  cats: Cat[];
  loading: boolean;
  error: boolean;
  reload: () => void;
  favorites: string[];
  setFavorite: (id: string, value: boolean) => void;
  toggleFavorite: (cat: Cat) => void;
  clearFavorites: () => void;
  announce: (message: string) => void;
}
const Context = createContext<AppState | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [notice, announce] = useState("");
  const [storageError, setStorageError] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return parseFavorites(localStorage.getItem(FAVORITES_KEY));
    } catch {
      return [];
    }
  });
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    catsService
      .list()
      .then((data) => {
        if (active) setCats(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [attempt]);
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      setStorageError(true);
    }
  }, [favorites]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY || e.key === null)
        setFavorites(parseFavorites(e.newValue));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => announce(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const setFavorite = (id: string, value: boolean) =>
    setFavorites((old) =>
      value ? [...new Set([...old, id])] : old.filter((item) => item !== id),
    );
  const toggleFavorite = (cat: Cat) => {
    const selected = favorites.includes(cat.id);
    setFavorite(cat.id, !selected);
    announce(
      selected
        ? `${cat.nome} removido dos favoritos.`
        : `${cat.nome} conquistou seu coração!`,
    );
  };
  return (
    <Context.Provider
      value={{
        cats,
        loading,
        error,
        reload: () => setAttempt((a) => a + 1),
        favorites,
        setFavorite,
        toggleFavorite,
        clearFavorites: () => {
          setFavorites([]);
          announce("Lista de favoritos limpa.");
        },
        announce,
      }}
    >
      {storageError && (
        <p className="storage-notice">
          Seu navegador não permite salvar favoritos. Eles ficarão disponíveis
          apenas nesta visita.
        </p>
      )}
      {children}
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </Context.Provider>
  );
}
export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("AppProvider ausente");
  return value;
}
