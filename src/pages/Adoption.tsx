import { Check, Heart, House, MessageCircle, Search } from "lucide-react";
import {
  ButtonLink,
  PageHeading,
  SectionHeading,
  WhatsAppButton,
} from "../components/ui";
export default function Adoption() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="UMA AMIZADE PARA A VIDA TODA"
        title="Adotar é transformar duas vidas."
      >
        Adotar um gato é abrir espaço para uma nova amizade, cheia de
        descobertas, carinho e responsabilidade. Antes de dar esse passo,
        conheça suas necessidades e o compromisso de cuidar dele.
      </PageHeading>
      <div className="adoption-layout">
        <div className="adoption-steps">
          {[
            {
              icon: Search,
              title: "Encontre seu gatinho",
              text: "Explore os perfis e conheça as histórias dos gatos disponíveis.",
            },
            {
              icon: Heart,
              title: "Demonstre seu interesse",
              text: "Escolheu um gatinho especial? Clique em “Quero adotar” para conversar com os responsáveis pelo projeto.",
            },
            {
              icon: MessageCircle,
              title: "Converse sobre a adoção",
              text: "Esclareça dúvidas, conheça as necessidades do animal e receba orientações sobre o processo.",
            },
            {
              icon: House,
              title: "Prepare um lar seguro",
              text: "Antes da chegada do novo integrante, organize um espaço confortável, protegido e adequado às necessidades dele.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <div>
                <h2>
                  <Icon size={20} />
                  {title}
                </h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="adoption-art">
          <img
            src="/images/cats/frajola-cozy.svg"
            alt="Ilustração demonstrativa de um gato frajola em uma almofada"
          />
          <span>
            Um lar seguro.
            <br />
            Um tempo de adaptação.
            <br />
            <strong>Uma vida de cuidado.</strong>
          </span>
        </div>
      </div>
      <section className="surface responsibility">
        <SectionHeading
          eyebrow="ANTES DE DAR ESSE PASSO"
          title="Carinho também é responsabilidade."
        />
        <ul className="checklist">
          {[
            "Um gato precisa de cuidados durante toda a vida.",
            "Alimentação e água devem estar sempre disponíveis.",
            "Acompanhamento veterinário é importante.",
            "Janelas e varandas precisam de proteção adequada.",
            "A adaptação pode levar tempo.",
            "O animal precisa de respeito, paciência e carinho.",
            "A adoção deve ser uma decisão consciente de todos os envolvidos.",
          ].map((text) => (
            <li key={text}>
              <Check size={19} aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
        <p className="small-text">
          Os detalhes de cada adoção são combinados com os responsáveis pelo
          projeto.
        </p>
      </section>
      <div className="final-cta">
        <h2>Pronto para conhecer seu novo amigo?</h2>
        <div className="button-row center">
          <ButtonLink to="/gatos">Ver gatinhos disponíveis</ButtonLink>
          <WhatsAppButton>Dúvidas sobre adoção</WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
