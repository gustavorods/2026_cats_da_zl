import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { ages, coats, statuses } from "../types/cat";
import { useApp } from "../hooks/AppProvider";
import { defaultFilters, filterCats } from "../utils/filters";
import {
  DataBoundary,
  DemoNotice,
  EmptyState,
  PageHeading,
} from "../components/ui";
import CatCard from "../components/CatCard";
export default function Cats() {
  const { cats, favorites, clearFavorites } = useApp();
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const onlyFavorites = params.get("favoritos") === "1";
  const effectiveFilters = { ...filters, favorites: onlyFavorites };
  const results = useMemo(
    () => filterCats(cats, { ...filters, favorites: onlyFavorites }, favorites),
    [cats, filters, onlyFavorites, favorites],
  );
  const reset = () => {
    setFilters(defaultFilters);
    setParams({});
  };
  const selects = [
    {
      key: "sexo",
      label: "Sexo",
      options: ["Macho", "Fêmea"].map((v) => [v, v]),
    },
    { key: "pelagem", label: "Pelagem", options: coats.map((v) => [v, v]) },
    {
      key: "faixaEtaria",
      label: "Faixa etária",
      options: ages.map((v) => [v, v]),
    },
    {
      key: "status",
      label: "Disponibilidade",
      options: Object.entries(statuses),
    },
    ...(["sociabilidade", "brincadeira", "carinho"] as const).map((key) => ({
      key,
      label: {
        sociabilidade: "Sociabilidade",
        brincadeira: "Brincadeira",
        carinho: "Carinho",
      }[key],
      options: [0, 1, 2, 3].map((v) => [String(v), `${v} de 3`]),
    })),
  ] as const;
  return (
    <div className="container page">
      <PageHeading
        eyebrow="CADA BIGODE, UMA HISTÓRIA"
        title="Conheça nossos gatinhos"
      >
        Personalidades diferentes, histórias únicas e muito amor para
        compartilhar. Um novo amigo pode estar esperando por você.
      </PageHeading>
      <DemoNotice />
      <div className="catalog-toolbar">
        <label className="search-field">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Pesquisar por nome</span>
          <input
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Quem você quer conhecer? Busque pelo nome"
          />
        </label>
        <button
          className={`button ${onlyFavorites ? "" : "secondary"}`}
          aria-pressed={onlyFavorites}
          onClick={() => setParams(onlyFavorites ? {} : { favoritos: "1" })}
        >
          <Heart size={17} />
          Meus favoritos ({favorites.length})
        </button>
      </div>
      <details className="filters-panel" open>
        <summary>
          <SlidersHorizontal size={17} />
          Encontre seu companheiro <span>Filtros</span>
        </summary>
        <div className="filter-grid">
          {selects.map(({ key, label, options }) => (
            <label key={key}>
              {label}
              <select
                value={
                  effectiveFilters[key as keyof typeof defaultFilters] as string
                }
                onChange={(e) =>
                  setFilters({ ...filters, [key]: e.target.value })
                }
              >
                <option value="">Todos</option>
                {options.map(([value, text]) => (
                  <option key={value} value={value}>
                    {text}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <button className="text-link" onClick={reset}>
          <X size={16} />
          Limpar filtros
        </button>
      </details>
      <div className="results-toolbar">
        <p role="status">
          <strong>{results.length}</strong>{" "}
          {results.length === 1 ? "gatinho encontrado" : "gatinhos encontrados"}
          {onlyFavorites ? " nos favoritos" : ""}
        </p>
        <label>
          Ordenar por{" "}
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="asc">Nome: A a Z</option>
            <option value="desc">Nome: Z a A</option>
          </select>
        </label>
        {onlyFavorites && favorites.length > 0 && (
          <button className="text-link" onClick={clearFavorites}>
            Limpar favoritos
          </button>
        )}
      </div>
      <DataBoundary>
        <h2 className="sr-only">Gatinhos encontrados</h2>
        {results.length > 0 ? (
          <div className="cat-grid">
            {results.map((cat) => (
              <CatCard key={cat.id} cat={cat} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Ops! Nenhum gatinho apareceu por aqui."
            action={
              <button className="button" onClick={reset}>
                Limpar filtros
              </button>
            }
          >
            Que tal ajustar os filtros? Talvez seu novo amigo esteja esperando
            logo ali.
          </EmptyState>
        )}
      </DataBoundary>
    </div>
  );
}
