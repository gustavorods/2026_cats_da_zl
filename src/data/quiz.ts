import { coats } from "../types/cat";
import type { Preferences } from "../types/cat";
interface Question {
  key: keyof Preferences;
  title: string;
  description: string;
  options: { value: string | number | null; label: string }[];
}
const any = { value: null, label: "Sem preferência" };
const levels = (labels: string[]) => [
  ...labels.map((label, value) => ({ value, label: `${value} — ${label}` })),
  any,
];
export const questions: Question[] = [
  {
    key: "sexo",
    title: "Você prefere um gatinho ou uma gatinha?",
    description: "O primeiro passo para conhecer seu futuro companheiro.",
    options: [
      { value: "Macho", label: "Macho" },
      { value: "Fêmea", label: "Fêmea" },
      any,
    ],
  },
  {
    key: "pelagem",
    title: "Qual desses estilos de gatinho encanta mais você?",
    description: "Falamos de pelagens e aparências, não de raças comprovadas.",
    options: [
      ...coats.map((value) => ({
        value,
        label: value === "Padrão siamês" ? "Siamês / padrão siamês" : value,
      })),
      any,
    ],
  },
  {
    key: "sociabilidade",
    title: "Como você imagina a personalidade social do seu futuro amigo?",
    description: "Dos mais reservados aos que gostam de companhia.",
    options: levels([
      "Mais reservado",
      "Pouco sociável",
      "Sociável",
      "Muito sociável",
    ]),
  },
  {
    key: "brincadeira",
    title: "Qual nível de energia combina com você?",
    description: "Uma tarde de brincadeiras ou uma soneca compartilhada?",
    options: levels([
      "Bem tranquilo",
      "Pouco brincalhão",
      "Brincalhão",
      "Muito brincalhão",
    ]),
  },
  {
    key: "carinho",
    title: "Quanto carinho você espera do seu companheiro?",
    description: "Cada gatinho demonstra afeto do seu próprio jeito.",
    options: levels([
      "Mais independente",
      "Pouco carinhoso",
      "Carinhoso",
      "Muito carinhoso",
    ]),
  },
];
