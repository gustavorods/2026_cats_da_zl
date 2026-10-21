import { describe, expect, it } from "vitest";
import { cats } from "./fixtures/cats";
import {
  compatibility,
  emptyPreferences,
  rankCats,
} from "../src/utils/compatibility";
import { defaultFilters, filterCats } from "../src/utils/filters";
import { parseFavorites } from "../src/utils/storage";
import { whatsappUrl } from "../src/utils/whatsapp";

describe("afinidade estimada", () => {
  const mingau = cats[0];
  it("não inventa percentuais sem preferências", () => {
    const result = compatibility(mingau, emptyPreferences);
    expect(result).toMatchObject({
      score: null,
      selected: 0,
      evaluated: 0,
      partial: false,
    });
  });
  it("normaliza apenas critérios escolhidos", () => {
    expect(
      compatibility(mingau, { ...emptyPreferences, sexo: "Macho" }).score,
    ).toBe(100);
    expect(
      compatibility(mingau, { ...emptyPreferences, sexo: "Fêmea" }).score,
    ).toBe(0);
  });
  it("usa distância de zero a três com pesos diferentes", () => {
    // sexo 15 + pelagem 0 + sociabilidade 25*(2/3) + brincadeira 20 + carinho 20
    expect(
      compatibility(mingau, {
        sexo: "Macho",
        pelagem: "Preto",
        sociabilidade: 2,
        brincadeira: 2,
        carinho: 3,
      }).score,
    ).toBe(72);
  });
  it("zero é um valor conhecido e selecionado", () => {
    expect(
      compatibility(cats[4], {
        ...emptyPreferences,
        sociabilidade: 0,
        brincadeira: 0,
      }).score,
    ).toBe(100);
    expect(
      compatibility(mingau, { ...emptyPreferences, sociabilidade: 0 }).score,
    ).toBe(0);
  });
  it("não trata desconhecido como zero", () => {
    const result = compatibility(cats[9], {
      ...emptyPreferences,
      sociabilidade: 0,
      brincadeira: 2,
    });
    expect(result).toMatchObject({
      score: 100,
      evaluated: 1,
      selected: 2,
      partial: true,
    });
    expect(
      compatibility(cats[9], { ...emptyPreferences, sociabilidade: 0 }).score,
    ).toBeNull();
  });
  it("ordena por afinidade e por quantidade de critérios em empate", () => {
    const preferences = {
      ...emptyPreferences,
      sociabilidade: 3 as const,
      brincadeira: 2 as const,
    };
    const result = rankCats([cats[9], mingau], preferences);
    expect(result[0].cat.id).toBe(mingau.id);
    expect(result[1].partial).toBe(true);
    const all = rankCats(cats, preferences);
    expect(
      all.every(
        (r, i) => i === 0 || (all[i - 1].score ?? -1) >= (r.score ?? -1),
      ),
    ).toBe(true);
  });
  it("exclui todos os estados que não são disponíveis", () => {
    const results = rankCats(cats, emptyPreferences);
    expect(results).toHaveLength(9);
    expect(results.every((r) => r.cat.status === "disponivel")).toBe(true);
  });
});
describe("catálogo e favoritos", () => {
  it("pesquisa nomes ignorando acentos e maiúsculas", () => {
    expect(
      filterCats(cats, { ...defaultFilters, search: "PACOCA" }, []).map(
        (c) => c.nome,
      ),
    ).toEqual(["Paçoca"]);
  });
  it("combina filtros e ordenação", () => {
    const results = filterCats(
      cats,
      {
        ...defaultFilters,
        sexo: "Fêmea",
        status: "disponivel",
        brincadeira: "2",
        sort: "desc",
      },
      [],
    );
    expect(results.map((c) => c.nome)).toEqual(["Aurora", "Amora"]);
  });
  it("diferencia desconhecido de zero no filtro", () => {
    expect(
      filterCats(cats, { ...defaultFilters, sociabilidade: "0" }, []).map(
        (c) => c.nome,
      ),
    ).toEqual(["Lua"]);
  });
  it("lista favoritos e aceita estado vazio", () => {
    expect(
      filterCats(cats, { ...defaultFilters, favorites: true }, ["demo-mingau"]),
    ).toEqual([cats[0]]);
    expect(
      filterCats(cats, { ...defaultFilters, favorites: true }, []),
    ).toEqual([]);
  });
  it("recupera armazenamento inválido sem quebrar a página", () => {
    expect(parseFavorites("broken json")).toEqual([]);
    expect(parseFavorites('{"bad":1}')).toEqual([]);
    expect(
      parseFavorites('["demo-mingau",12,"demo-mingau","demo-amora"]'),
    ).toEqual(["demo-mingau", "demo-amora"]);
  });
});
describe("WhatsApp", () => {
  it("utiliza DDI e texto codificado com nome e pronome", () => {
    const url = new URL(whatsappUrl(cats[1]));
    expect(url.origin + url.pathname).toBe("https://wa.me/5511952685748");
    expect(url.searchParams.get("text")).toContain("Conheci a Amora");
    expect(url.searchParams.get("text")).toContain("sobre ela");
    expect(url.searchParams.get("text")).not.toContain(
      "perfil é demonstrativo",
    );
    expect(whatsappUrl(cats[2])).toContain("Pa%C3%A7oca");
  });
  it("oferece mensagem geral de adoção", () => {
    expect(new URL(whatsappUrl()).searchParams.get("text")).toContain(
      "dúvidas sobre adoção",
    );
  });
});
describe("integridade dos dados", () => {
  it("mantém identificadores únicos, escalas válidas e estados variados", () => {
    expect(new Set(cats.map((c) => c.id)).size).toBe(cats.length);
    expect(new Set(cats.map((c) => c.slug)).size).toBe(cats.length);
    expect(new Set(cats.map((c) => c.status)).size).toBe(4);
    for (const cat of cats) {
      for (const trait of [cat.sociabilidade, cat.brincadeira, cat.carinho])
        expect(trait === null || [0, 1, 2, 3].includes(trait)).toBe(true);
      expect(Number.isNaN(Date.parse(cat.dataAtualizacao!))).toBe(false);
    }
  });
});
