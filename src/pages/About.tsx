import { BookHeart, Eye, Heart, HandHeart, Leaf, Users } from "lucide-react";
import { site } from "../config/site";
import {
  ButtonLink,
  DemoNotice,
  PageHeading,
  SectionHeading,
} from "../components/ui";
export default function About() {
  return (
    <div className="container page">
      <PageHeading
        eyebrow="DA ZONA LESTE, COM CARINHO"
        title="Por trás de cada patinha, existe uma história."
      >
        E por trás deste projeto, muito carinho.
      </PageHeading>
      <div className="about-intro">
        <div>
          <SectionHeading title="Conhecimento que vira cuidado." />
          <p>
            Somos um grupo de estudantes da área administrativa que desenvolveu
            o Cats da ZL como parte de um Trabalho de Conclusão de Curso (TCC).
            Nosso projeto une planejamento, organização e responsabilidade
            social para dar mais visibilidade aos gatos de uma colônia da Zona
            Leste de São Paulo.
          </p>
          <p>
            O Cats da ZL nasceu da vontade de transformar conhecimento em ação.
            Acreditamos que organização, informação e participação da comunidade
            podem contribuir para melhorar a qualidade de vida dos animais.
          </p>
          <ButtonLink to="/contato" secondary>
            Conheça a gente de perto
          </ButtonLink>
        </div>
        <img
          src="/images/cats/escaminha-cozy.svg"
          alt="Ilustração demonstrativa de uma gatinha escaminha"
        />
      </div>
      <div className="info-grid mission-grid">
        <article className="surface">
          <Heart size={28} />
          <h2>Nossa missão</h2>
          <p>
            Aproximar os gatos da colônia de pessoas dispostas a oferecer um lar
            seguro e responsável, promovendo a conscientização sobre o respeito
            e o cuidado com os animais.
          </p>
        </article>
        <article className="surface">
          <Eye size={28} />
          <h2>Nossa visão</h2>
          <p>
            Contribuir para que mais gatos tenham oportunidades de viver com
            segurança, cuidado e carinho.
          </p>
        </article>
      </div>
      <section className="section">
        <SectionHeading
          center
          eyebrow="O QUE GUIA NOSSAS ESCOLHAS"
          title="Valores que cabem no coração."
        />
        <div className="values-grid">
          {[
            { icon: Heart, title: "Amor e respeito pelos animais" },
            { icon: Leaf, title: "Responsabilidade" },
            { icon: Eye, title: "Transparência" },
            { icon: HandHeart, title: "Empatia" },
            { icon: Users, title: "Compromisso social" },
            { icon: BookHeart, title: "Educação e conscientização" },
          ].map(({ icon: Icon, title }) => (
            <div key={title}>
              <Icon size={26} />
              <h3>{title}</h3>
            </div>
          ))}
        </div>
      </section>
      <div className="notice-box">
        <h2>Nosso cuidado tem um compromisso.</h2>
        <p>
          Não somos um abrigo e não recebemos novos animais. Nossa atuação é
          dedicada exclusivamente aos gatos que já fazem parte da colônia.
        </p>
      </div>
      {site.team.length > 0 && (
        <section className="section">
          <SectionHeading title="Quem faz parte dessa história" />
          <div className="info-grid">
            {site.team.map((member) => (
              <article className="surface" key={member.nome}>
                {member.foto && (
                  <img src={member.foto} alt={member.nome} loading="lazy" />
                )}
                <h3>{member.nome}</h3>
                <p>{member.funcao}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <DemoNotice />
    </div>
  );
}
