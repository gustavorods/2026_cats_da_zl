export const IS_DEMO = false;
interface SiteConfig {
  name: string;
  whatsapp: string;
  email: string | null;
  instagram: string | null;
  social: { nome: string; url: string }[];
  pix: {
    chave: string | null;
    tipo: string | null;
    destinatario: string | null;
    qrCode: string | null;
  };
  team: { nome: string; funcao: string; foto: string | null }[];
  transparency: { titulo: string; url: string }[];
}
export const site: SiteConfig = {
  name: "Cats da ZL",
  whatsapp: "5511952685748",
  email: null,
  instagram: null,
  social: [],
  pix: { chave: null, tipo: null, destinatario: null, qrCode: null },
  team: [],
  transparency: [],
};
