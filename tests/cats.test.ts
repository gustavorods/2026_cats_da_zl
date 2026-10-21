import { describe, expect, it } from "vitest";
import { loadCats } from "../src/data/cats";
import { parseCatDescription } from "../src/utils/cat-description";
import { filterCats, defaultFilters } from "../src/utils/filters";
import { rankCats, emptyPreferences } from "../src/utils/compatibility";

describe("cadastros reais da colônia", () => {
  const cats = loadCats();
  it("carrega os sete relatos e todas as 21 fotos das pastas corretas", () => {
    expect(cats.map((cat) => cat.nome)).toEqual([
      "Ângela",
      "Chester",
      "Mijona",
      "Miyagi",
      "Mu",
      "Scar",
      "Shalom Harlow",
    ]);
    expect(cats.map((cat) => cat.fotos.length)).toEqual([2, 3, 4, 3, 2, 3, 4]);
    for (const cat of cats) {
      expect(cat.historia).not.toMatch(/Site:|Gênero:|Sociável:|Cor:/);
      expect(cat.historia.length).toBeGreaterThan(300);
      expect(cat.fotos.every((photo) => photo.src.endsWith(".jpeg"))).toBe(
        true,
      );
      expect(cat.fotos.every((photo) => photo.alt.includes(cat.nome))).toBe(
        true,
      );
    }
    expect(new Set(cats.map((cat) => cat.slug)).size).toBe(7);
  });
  it("preserva as características fornecidas, inclusive formatos livres", () => {
    expect(
      cats.map(({ sexo, pelagem, sociabilidade, brincadeira, carinho }) => [
        sexo,
        pelagem,
        sociabilidade,
        brincadeira,
        carinho,
      ]),
    ).toEqual([
      ["Fêmea", "Branco", 2, 2, 3],
      ["Macho", "Rajado e branco", 3, 2, 2],
      ["Fêmea", "Rajado", 3, 2, 3],
      ["Macho", "Rajado e branco", 2, 2, 2],
      ["Macho", "Frajola", 3, 2, 3],
      ["Macho", "Rajado", 1, 1, 2],
      ["Fêmea", "Frajola", 1, 3, 1],
    ]);
    expect(cats.find((cat) => cat.slug === "mu")?.historia).toMatch(
      /Adote o Mu e leve o chefão para casa!$/,
    );
    expect(cats.find((cat) => cat.slug === "angela")?.historia).toContain(
      "Sharlow",
    );
  });
  it("não inventa idade, vacinação ou data de atualização", () => {
    for (const cat of cats) {
      expect(cat.idadeEstimada).toBeNull();
      expect(cat.faixaEtaria).toBeNull();
      expect(cat.vacinado).toBeNull();
      expect(cat.vermifugado).toBeNull();
      expect(cat.dataAtualizacao).toBeNull();
      expect(cat.castrado).toBe(cat.slug === "mijona" ? true : null);
    }
  });
  it("usa os dados reais na busca e no match", () => {
    expect(
      filterCats(cats, { ...defaultFilters, search: "ANGELA" }, [])[0].slug,
    ).toBe("angela");
    const matches = rankCats(cats, {
      sexo: "Macho",
      pelagem: "Frajola",
      sociabilidade: 3,
      brincadeira: 2,
      carinho: 3,
    });
    expect(matches[0].cat.nome).toBe("Mu");
    expect(matches[0].score).toBe(100);
    expect(rankCats(cats, emptyPreferences)).toHaveLength(7);
  });
  it("aceita novos cadastros e distingue notas ausentes de zero", () => {
    const cat = parseCatDescription(
      "Nome: Teste\r\nGênero: Fêmea\r\nCor: Preto\r\nStatus: adotado\r\nDescrição: Um novo relato.\r\nSite:\r\nSociável: 0/3",
      "Teste",
    );
    expect(cat.status).toBe("adotado");
    expect(cat.sociabilidade).toBe(0);
    expect(cat.carinho).toBeNull();
    expect(rankCats([cat], emptyPreferences)).toEqual([]);
    expect(() => parseCatDescription("Nome: Sem dados", "Sem dados")).toThrow(
      /gênero e cor/,
    );
  });
});
