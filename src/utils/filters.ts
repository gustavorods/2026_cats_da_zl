import type { Cat } from "../types/cat";
export interface Filters {
  search: string;
  sexo: string;
  pelagem: string;
  faixaEtaria: string;
  status: string;
  sociabilidade: string;
  brincadeira: string;
  carinho: string;
  favorites: boolean;
  sort: string;
}
export const defaultFilters: Filters = {
  search: "",
  sexo: "",
  pelagem: "",
  faixaEtaria: "",
  status: "",
  sociabilidade: "",
  brincadeira: "",
  carinho: "",
  favorites: false,
  sort: "asc",
};
const normalized = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function filterCats(
  cats: Cat[],
  filters: Filters,
  favorites: string[],
): Cat[] {
  return cats
    .filter((cat) => {
      if (!normalized(cat.nome).includes(normalized(filters.search)))
        return false;
      if (filters.favorites && !favorites.includes(cat.id)) return false;
      for (const key of [
        "sexo",
        "pelagem",
        "faixaEtaria",
        "status",
        "sociabilidade",
        "brincadeira",
        "carinho",
      ] as const) {
        if (
          filters[key] !== "" &&
          (cat[key] === null || String(cat[key]) !== filters[key])
        )
          return false;
      }
      return true;
    })
    .sort(
      (a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR") *
        (filters.sort === "desc" ? -1 : 1),
    );
}
