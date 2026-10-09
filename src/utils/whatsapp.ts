import { IS_DEMO, site } from "../config/site";
import type { Cat } from "../types/cat";
export function whatsappDisplay(): string {
  return site.whatsapp.replace(
    /^(\d{2})(\d{2})(\d{5})(\d{4})$/,
    "+$1 ($2) $3-$4",
  );
}
export function whatsappUrl(
  cat?: Pick<Cat, "nome" | "sexo">,
  message?: string,
): string {
  const female = cat?.sexo === "Fêmea";
  const text =
    message ??
    (cat
      ? `Olá! Conheci ${female ? "a" : "o"} ${cat.nome} pelo site Cats da ZL e gostaria de saber mais sobre ${female ? "ela" : "ele"} e o processo de adoção. 🐱${IS_DEMO ? " Vi que este perfil é demonstrativo e gostaria de conhecer os gatos reais do projeto." : ""}`
      : "Olá! Conheci o projeto Cats da ZL pelo site e gostaria de tirar algumas dúvidas sobre adoção.");
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
