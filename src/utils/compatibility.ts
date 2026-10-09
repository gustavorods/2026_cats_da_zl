import type { Cat, Preferences } from "../types/cat";
export const weights: Record<keyof Preferences, number> = {
  sexo: 15,
  pelagem: 20,
  sociabilidade: 25,
  brincadeira: 20,
  carinho: 20,
};
export const emptyPreferences: Preferences = {
  sexo: null,
  pelagem: null,
  sociabilidade: null,
  brincadeira: null,
  carinho: null,
};
export interface MatchResult {
  cat: Cat;
  score: number | null;
  evaluated: number;
  selected: number;
  partial: boolean;
}
export function compatibility(cat: Cat, preferences: Preferences): MatchResult {
  let total = 0,
    weight = 0,
    evaluated = 0,
    selected = 0;
  for (const key of Object.keys(weights) as (keyof Preferences)[]) {
    const preference = preferences[key];
    if (preference === null) continue;
    selected++;
    const value = cat[key];
    if (value === null) continue;
    const similarity =
      typeof preference === "number" && typeof value === "number"
        ? 1 - Math.abs(preference - value) / 3
        : Number(preference === value);
    total += similarity * weights[key];
    weight += weights[key];
    evaluated++;
  }
  return {
    cat,
    score: weight ? Math.round((total / weight) * 100) : null,
    evaluated,
    selected,
    partial: evaluated < selected,
  };
}
export function rankCats(cats: Cat[], preferences: Preferences): MatchResult[] {
  return cats
    .filter((cat) => cat.status === "disponivel")
    .map((cat) => compatibility(cat, preferences))
    .sort(
      (a, b) =>
        (b.score ?? -1) - (a.score ?? -1) ||
        b.evaluated - a.evaluated ||
        a.cat.nome.localeCompare(b.cat.nome, "pt-BR"),
    );
}
