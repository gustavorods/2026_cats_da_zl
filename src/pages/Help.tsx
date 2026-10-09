import {
  Copy,
  HandHeart,
  Megaphone,
  Package,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { site } from "../config/site";
import { useApp } from "../hooks/AppProvider";
import { shareLink } from "../utils/share";
import { PageHeading, WhatsAppButton } from "../components/ui";
export default function Help() {
  const { announce } = useApp();
  const ready = Boolean(site.pix.chave && site.pix.destinatario);
  const copy = async () => {
    if (!ready || !site.pix.chave) return;
    try {
      await navigator.clipboard.writeText(site.pix.chave);
      announce(
        "Chave Pix copiada! Confira o destinatário antes de transferir.",
      );
    } catch {
      announce(
        "Não foi possível copiar automaticamente. Selecione e copie a chave exibida.",
      );
    }
  };
  return (
    <div className="container page">
      <PageHeading
        eyebrow="TODO GESTO DE CARINHO CONTA"
        title="Seu carinho também pode chegar em forma de ajuda."
      >
        Cada contribuição faz diferença para os gatos da nossa colônia. Sua
        ajuda pode colaborar com mais saúde, conforto e qualidade de vida.
      </PageHeading>
      <div className="donation-layout">
        <section className="pix-card">
          <span className="pix-icon">
            <HandHeart size={35} />
          </span>
          <h2>Faça uma doação via Pix</h2>
          <p>
            As contribuições recebidas apoiam alimentação, higiene, atendimento
            veterinário e outros itens essenciais para os gatos da colônia.
          </p>
          <div className="pix-key">
            <span>
              {ready ? "Chave Pix oficial" : "ESTAMOS PREPARANDO ESSE CANTINHO"}
            </span>
            <strong>{ready ? site.pix.chave : "Chave Pix em breve"}</strong>
            {ready && <small>Destinatário: {site.pix.destinatario}</small>}
          </div>
          {ready && site.pix.qrCode && (
            <img
              className="pix-qr"
              src={site.pix.qrCode}
              alt={`QR Code Pix oficial de ${site.pix.destinatario}`}
            />
          )}
          <button className="button" disabled={!ready} onClick={copy}>
            <Copy size={17} />
            Copiar chave Pix
          </button>
          <small>
            Confira os dados do destinatário antes de concluir qualquer
            transferência. A contribuição é voluntária e não faz parte do
            processo de adoção.
          </small>
        </section>
        <div className="help-options">
          <article>
            <Package size={28} />
            <h2>Ajude com alimentação</h2>
            <p>
              Rações e outros itens apropriados ajudam a manter o bem-estar dos
              gatinhos. Converse com a equipe para saber quais materiais são
              necessários e como contribuir.
            </p>
            <WhatsAppButton message="Olá! Gostaria de saber como contribuir com alimentação e materiais para os gatos do Cats da ZL.">
              Combinar com a equipe
            </WhatsAppButton>
          </article>
          <article>
            <Share2 size={26} />
            <h2>Compartilhe nosso projeto</h2>
            <p>
              Divulgar o Cats da ZL pode aproximar nossos gatinhos de futuras
              famílias.
            </p>
            <button
              className="text-link"
              onClick={async () =>
                announce(
                  await shareLink(
                    "Conheça o Cats da ZL",
                    window.location.origin,
                  ),
                )
              }
            >
              Compartilhar o projeto <Share2 size={16} />
            </button>
          </article>
          <article>
            <Megaphone size={28} />
            <h2>Espalhe a adoção responsável</h2>
            <p>
              Compartilhe informações e ajude a conscientizar mais pessoas sobre
              respeito, castração, abandono e os cuidados com os animais.
            </p>
          </article>
        </div>
      </div>
      <section className="notice-box transparency">
        <ShieldCheck size={29} />
        <div>
          <h2>Cuidado também é transparência.</h2>
          <p>
            As contribuições são destinadas aos cuidados dos gatos da colônia.
            Os canais de doação serão divulgados após confirmação dos dados
            oficiais. Não há arrecadações ou relatórios financeiros publicados
            neste momento.
          </p>
          {site.transparency.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.titulo}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
