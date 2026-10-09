export const coats = [
  "Laranja",
  "Padrão siamês",
  "Preto",
  "Branco",
  "Frajola",
  "Cinza",
  "Escaminha",
  "Rajado",
] as const;
export const ages = ["Filhote", "Jovem", "Adulto", "Sênior"] as const;
export const statuses = {
  disponivel: "Disponível para adoção",
  em_processo: "Em processo de adoção",
  adotado: "Adotado",
  indisponivel: "Temporariamente indisponível",
} as const;
export type Level = 0 | 1 | 2 | 3;
export type Coat = (typeof coats)[number];
export type Age = (typeof ages)[number];
export type Status = keyof typeof statuses;
export type Sex = "Macho" | "Fêmea";
export type Trait = "sociabilidade" | "brincadeira" | "carinho";
export interface CatPhoto {
  src: string;
  alt: string;
  credito?: string;
}
export interface Cat {
  id: string;
  slug: string;
  nome: string;
  sexo: Sex;
  pelagem: Coat;
  idadeEstimada: string | null;
  faixaEtaria: Age | null;
  descricaoCurta: string;
  historia: string;
  sociabilidade: Level | null;
  brincadeira: Level | null;
  carinho: Level | null;
  fotos: CatPhoto[];
  status: Status;
  castrado: boolean | null;
  vacinado: boolean | null;
  vermifugado: boolean | null;
  necessidadesEspeciais: string | null;
  observacoesSaude: string | null;
  conviveComGatos: boolean | null;
  conviveComCaes: boolean | null;
  conviveComCriancas: boolean | null;
  destaque: boolean;
  dataAtualizacao: string;
}
export interface Preferences {
  sexo: Sex | null;
  pelagem: Coat | null;
  sociabilidade: Level | null;
  brincadeira: Level | null;
  carinho: Level | null;
}
