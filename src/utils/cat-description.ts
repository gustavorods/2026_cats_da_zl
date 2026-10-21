import { coats, statuses } from "../types/cat";
import type { Cat, Coat, Level } from "../types/cat";

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/** Aceita os relatos originais, inclusive marcadores e metadados sem rótulo. */
export function parseCatDescription(source: string, folder: string): Cat {
  const lines = source
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^\s*[*•-]\s*/, "").trim());
  const field = (...labels: string[]) => {
    const line = lines.find((line) =>
      labels.includes(normalize(line.split(":")[0])),
    );
    return line?.slice(line.indexOf(":") + 1).trim() || null;
  };
  const nome =
    field("nome") ??
    folder
      .replace(/\s*\(.*\)$/, "")
      .trim()
      .toLocaleLowerCase("pt-BR")
      .replace(/(^|\s)\S/g, (letter) => letter.toLocaleUpperCase("pt-BR"));
  const gender = normalize(
    field("genero", "sexo") ??
      lines.find((line) => /^(macho|fêmea)$/i.test(line)) ??
      "",
  );
  const sexo = /femea|feminino/.test(gender)
    ? "Fêmea"
    : /macho|masculino/.test(gender)
      ? "Macho"
      : null;
  const color = normalize(
    field("cor", "pelagem") ??
      lines.find((line) =>
        coats.some((coat) => normalize(coat) === normalize(line)),
      ) ??
      "",
  );
  const pelagem: Coat | undefined = color.includes("tigrado")
    ? color.includes("branco")
      ? "Rajado e branco"
      : "Rajado"
    : coats.find((coat) => normalize(coat) === color);
  if (!sexo || !pelagem)
    throw new Error(`Confira gênero e cor em src/cats/${folder}/desc.txt.`);

  const descriptionStart = lines.findIndex((line) =>
    /^descri[çc][ãa]o:/i.test(line),
  );
  const siteStart = lines.findIndex((line) => /^site:/i.test(line));
  const storyLines = lines.slice(
    descriptionStart >= 0 ? descriptionStart : 0,
    siteStart >= 0 ? siteStart : undefined,
  );
  const historia = storyLines
    .filter(
      (line) =>
        !/^(nome|g[êe]nero|sexo|cor|pelagem|status|castrad[oa]|atualiza[çc][ãa]o):/i.test(
          line,
        ),
    )
    .filter(
      (line) => ![normalize(nome), gender, color].includes(normalize(line)),
    )
    .map((line) => line.replace(/^descri[çc][ãa]o:\s*/i, ""))
    .join("\n")
    .trim();
  if (!historia)
    throw new Error(`Descrição ausente em src/cats/${folder}/desc.txt.`);

  const level = (label: string): Level | null => {
    const value = field(label);
    if (!value) return null;
    const match = value.match(/^([0-3])\s*\/\s*3$/);
    if (!match)
      throw new Error(`Nota inválida de ${label} para ${nome}: ${value}`);
    return Number(match[1]) as Level;
  };
  const summary =
    historia.split("\n").find((line) => line.length > 80) ?? historia;
  const descricaoCurta =
    summary.length > 180
      ? `${summary
          .slice(0, 177)
          .replace(/\s+\S*$/, "")
          .trimEnd()}…`
      : summary;
  const slug = normalize(nome)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const rawStatus = field("status");
  const status = rawStatus ?? "disponivel";
  if (!Object.hasOwn(statuses, status))
    throw new Error(`Status inválido para ${nome}: ${status}`);
  const castrado = field("castrado", "castrada");
  return {
    id: slug,
    slug,
    nome,
    sexo,
    pelagem,
    historia,
    descricaoCurta,
    idadeEstimada: null,
    faixaEtaria: null,
    sociabilidade: level("sociavel"),
    brincadeira: level("brincalhao"),
    carinho: level("carinhoso"),
    fotos: [],
    status: status as Cat["status"],
    castrado: castrado
      ? normalize(castrado) === "sim"
        ? true
        : normalize(castrado) === "nao"
          ? false
          : null
      : null,
    vacinado: null,
    vermifugado: null,
    necessidadesEspeciais: null,
    observacoesSaude: null,
    conviveComGatos: null,
    conviveComCaes: null,
    conviveComCriancas: null,
    destaque: true,
    dataAtualizacao: null,
  };
}
