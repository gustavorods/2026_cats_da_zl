import { Instagram, Mail, MessageCircle } from "lucide-react";
import { site } from "../config/site";
import { whatsappDisplay } from "../utils/whatsapp";
import { PageHeading, WhatsAppButton } from "../components/ui";
export default function Contact() {
  return (
    <div className="container page">
      <PageHeading eyebrow="UM OI PODE SER O COMEÇO" title="Vamos conversar?">
        Tem alguma dúvida sobre o projeto, quer saber mais sobre um gatinho ou
        deseja contribuir de alguma forma? Entre em contato com a gente!
      </PageHeading>
      <div className="contact-layout">
        <div className="contact-cards">
          <article className="surface contact-main">
            <MessageCircle size={29} />
            <h2>Um alô pelo WhatsApp</h2>
            <p>
              Nosso canal para conversar sobre adoção, cuidados e formas de
              contribuir.
            </p>
            <strong>{whatsappDisplay()}</strong>
            <WhatsAppButton />
          </article>
          <div className="contact-secondary">
            <article className="surface">
              <Mail size={25} />
              <h2>E-mail</h2>
              {site.email ? (
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <p>E-mail em breve</p>
              )}
            </article>
            <article className="surface">
              <Instagram size={25} />
              <h2>Instagram</h2>
              {site.instagram ? (
                <a
                  className="text-link"
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Conhecer nosso perfil
                </a>
              ) : (
                <p>Perfil oficial em breve</p>
              )}
            </article>
          </div>
          {site.social.map((s) => (
            <a
              className="button secondary"
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.nome}
            </a>
          ))}
        </div>
        <div className="contact-art">
          <img
            src="/images/cats/preto-cozy.svg"
            alt="Ilustração de uma gatinha preta esperando uma visita"
          />
          <span>
            Tem sempre uma boa
            <br />
            história para compartilhar.
          </span>
        </div>
      </div>
      <p className="notice-box">
        Nossa atuação é dedicada aos gatos que já fazem parte da colônia. Não
        somos um abrigo e não recebemos novos animais.
      </p>
    </div>
  );
}
