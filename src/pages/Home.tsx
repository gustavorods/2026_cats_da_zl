import {
  Heart,
  PawPrint,
  Sparkles,
  ArrowUpRight,
  HandHeart,
  Package,
  Megaphone,
  Search,
  MessageCircle,
  House,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../hooks/AppProvider";
import CatCard from "../components/CatCard";
import { IS_DEMO } from "../config/site";
import { ButtonLink, DataBoundary, SectionHeading } from "../components/ui";

export default function Home() {
  const { cats } = useApp();
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-dot" />
            PEQUENAS PATINHAS, GRANDES HISTÓRIAS
          </span>
          <h1>
            Um lar cheio de amor começa com um{" "}
            <span className="handwritten-accent">
              miau.
              <svg viewBox="0 0 230 18" aria-hidden="true">
                <path d="M4 12Q110-3 224 8M17 17Q118 5 204 13" />
              </svg>
            </span>
          </h1>
          <p>
            Conheça os gatinhos da nossa colônia, descubra suas histórias e
            encontre um novo amigo para compartilhar a vida.
          </p>
          <div className="button-row">
            <ButtonLink to="/gatos">Conhecer os gatinhos</ButtonLink>
            <ButtonLink to="/match" secondary>
              Encontrar meu match
            </ButtonLink>
          </div>
          <div className="hero-footnote">
            <span className="mini-paws">
              <PawPrint size={17} />
              <Heart size={17} />
              <House size={17} />
            </span>
            <span>
              Uma conexão de verdade.
              <br />
              <strong>Um compromisso para a vida.</strong>
            </span>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Composição de ilustrações demonstrativas de gatos"
        >
          <div className="hero-blob" />
          <Sparkles
            className="hero-sparkle"
            size={45}
            strokeWidth={1.2}
            aria-hidden="true"
          />
          <div className="hero-photo photo-back">
            <img
              src="/images/cats/preto.svg"
              alt="Ilustração de uma gatinha preta de olhos curiosos"
            />
            <span>
              Amora <Heart size={16} fill="currentColor" />
            </span>
          </div>
          <div className="hero-photo photo-front">
            <img
              src="/images/cats/laranja.svg"
              alt="Ilustração de um gato laranja de olhar carinhoso"
              fetchPriority="high"
            />
            <span>
              Mingau <PawPrint size={18} />
            </span>
          </div>
          <div className="hero-sticker">
            <Heart size={22} />
            <span>
              seu novo melhor amigo
              <br />
              <strong>pode ter bigodes!</strong>
            </span>
          </div>
          <PawPrint
            className="hero-paw"
            size={52}
            strokeWidth={1.3}
            aria-hidden="true"
          />
        </div>
      </section>
      <div className="marquee-strip" aria-hidden="true">
        <span>amor em cada miado</span>
        <PawPrint />
        <span>adoção responsável</span>
        <Heart />
        <span>pequenas patinhas, grandes histórias</span>
        <PawPrint />
        <span>da ZL para o seu coração</span>
        <Heart />
      </div>
      <section className="container welcome section">
        <div className="welcome-illustration" aria-hidden="true">
          <img src="/images/cats/siames-cozy.svg" alt="" loading="lazy" />
          <span>por aqui, todo carinho conta.</span>
        </div>
        <div>
          <SectionHeading
            eyebrow="MUITO PRAZER, SOMOS O CATS DA ZL"
            title="Uma pequena colônia. Um mundo de possibilidades."
          />
          <h3 className="welcome-subtitle">Bem-vindo ao Cats da ZL!</h3>
          <p>
            Somos um projeto criado para dar visibilidade aos gatos de uma
            colônia na Zona Leste de São Paulo. Nosso objetivo é aproximar esses
            pequenos companheiros de pessoas dispostas a oferecer amor, cuidado
            e um lar seguro.
          </p>
          <p>
            Mais do que encontrar famílias, queremos incentivar a adoção
            responsável e mostrar como pequenos gestos podem transformar vidas.
          </p>
          <Link to="/sobre" className="text-link">
            Conheça nossa história <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <section className="pink-section section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              eyebrow="TEM ESPAÇO PARA MAIS AMOR AÍ?"
              title="Esses fofinhos estão esperando por você!"
            >
              Cada gatinho tem sua personalidade, seus encantos e uma história
              especial para contar.
            </SectionHeading>
            <Link to="/gatos" className="text-link">
              Ver todos os gatinhos <ArrowUpRight size={19} />
            </Link>
          </div>
          <DataBoundary>
            <div className="cat-grid">
              {cats
                .filter((c) => c.destaque && c.status === "disponivel")
                .slice(0, 4)
                .map((cat) => (
                  <CatCard key={cat.id} cat={cat} adoption={false} />
                ))}
            </div>
          </DataBoundary>
          {IS_DEMO && (
            <p className="demo-caption">
              Perfis de demonstração. Os gatinhos e suas histórias são
              fictícios.
            </p>
          )}
        </div>
      </section>
      <section className="container section">
        <div className="match-banner">
          <div className="match-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              MATCH FELINO
            </span>
            <h2>
              E se o seu melhor amigo estiver a um <em>match</em> de distância?
            </h2>
            <p>
              Responda a algumas perguntinhas sobre suas preferências e descubra
              quais gatinhos mais combinam com você!
            </p>
            <ButtonLink to="/match">Descobrir meu match</ButtonLink>
            <small>
              Uma sugestão baseada nas características conhecidas. A adoção
              responsável vai muito além de uma porcentagem.
            </small>
          </div>
          <div className="match-art" aria-hidden="true">
            <span className="match-orbit" />
            <div className="mini-match-card">
              <img src="/images/cats/frajola.svg" alt="" loading="lazy" />
              <strong>O começo de uma amizade</strong>
              <span>
                <Heart size={16} fill="currentColor" /> Tem carinho por aqui
              </span>
            </div>
            <div className="floating-heart">
              <Heart size={35} fill="currentColor" />
            </div>
            <span className="five-questions">
              5 perguntinhas.
              <br />
              Muitas possibilidades.
            </span>
          </div>
        </div>
      </section>
      <section className="container tinder-promo">
        <div className="tinder-promo-icon">
          <Heart size={39} strokeWidth={1.3} />
          <PawPrint size={31} />
        </div>
        <div>
          <span className="eyebrow">AMOR À PRIMEIRA PATINHA?</span>
          <h2>Deslize. Conheça. Se apaixone.</h2>
          <p>
            Explore os perfis de um jeito diferente e favorite quem conquistar
            seu coração.
          </p>
        </div>
        <ButtonLink to="/tinder" secondary>
          Explorar os gatinhos
        </ButtonLink>
      </section>
      <section className="container section adoption-home">
        <SectionHeading
          center
          eyebrow="DO PRIMEIRO OI AO NOVO LAR"
          title="Como funciona a adoção?"
        >
          Um encontro especial começa com uma escolha responsável.
        </SectionHeading>
        <div className="steps-grid">
          {[
            {
              icon: Search,
              title: "Conheça os gatinhos",
              text: "Explore os perfis e descubra quem pode fazer parte da sua família.",
            },
            {
              icon: Heart,
              title: "Escolha seu companheiro",
              text: "Conheça sua história, personalidade e necessidades.",
            },
            {
              icon: MessageCircle,
              title: "Entre em contato",
              text: "Converse com os responsáveis para conhecer as próximas etapas.",
            },
            {
              icon: House,
              title: "Adote com responsabilidade",
              text: "Prepare seu lar para oferecer segurança, respeito e carinho.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <div className="step" key={title}>
              <div className="step-icon">
                <Icon size={28} strokeWidth={1.5} />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <div className="center">
          <ButtonLink to="/adotar" secondary>
            Entender o processo
          </ButtonLink>
        </div>
      </section>
      <section className="help-home section">
        <div className="container">
          <SectionHeading
            center
            eyebrow="CUIDAR É UM TRABALHO DE MUITAS MÃOS"
            title="Nem toda ajuda precisa vir com uma adoção."
          >
            Mesmo que você não possa adotar, sua contribuição ajuda a manter os
            cuidados com os gatos da colônia.
          </SectionHeading>
          <div className="info-grid">
            {[
              {
                icon: HandHeart,
                title: "Um pouco faz muito",
                text: "Contribuições financeiras apoiam alimentação, higiene e cuidados.",
              },
              {
                icon: Package,
                title: "Carinho em forma de cuidado",
                text: "Alimentação e materiais também fazem diferença na rotina.",
              },
              {
                icon: Megaphone,
                title: "Leve essa história adiante",
                text: "Divulgar o projeto aproxima nossos gatos de novas possibilidades.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title} className="help-tile">
                <Icon size={29} strokeWidth={1.5} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="center">
            <ButtonLink to="/ajudar">Quero ajudar</ButtonLink>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="final-cta">
          <PawPrint size={40} strokeWidth={1.3} aria-hidden="true" />
          <h2>Às vezes, tudo o que falta é uma chance de ser amado.</h2>
          <p>
            Conheça nossos gatinhos e ajude a escrever um novo capítulo na
            história deles.
          </p>
          <ButtonLink to="/gatos">Conhecer os gatinhos</ButtonLink>
        </div>
      </section>
    </>
  );
}
