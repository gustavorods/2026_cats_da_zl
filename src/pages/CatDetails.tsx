import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2, ShieldCheck } from "lucide-react";
import { useApp } from "../hooks/AppProvider";
import CatCard, {
  AvailabilityBadge,
  CatImage,
  CatPersonality,
} from "../components/CatCard";
import {
  DataBoundary,
  DemoNotice,
  EmptyState,
  FavoriteButton,
  SectionHeading,
  WhatsAppButton,
} from "../components/ui";
import { shareLink } from "../utils/share";
export default function CatDetails() {
  const { slug } = useParams();
  const { cats, announce } = useApp();
  const cat = cats.find((c) => c.slug === slug);
  const [photo, setPhoto] = useState(0);
  useEffect(() => {
    setPhoto(0);
    if (cat) document.title = `${cat.nome} — Conheça sua história | Cats da ZL`;
  }, [cat]);
  return (
    <div className="container page">
      <Link className="text-link back-link" to="/gatos">
        <ArrowLeft size={17} />
        Voltar para os gatinhos
      </Link>
      <DataBoundary>
        {!cat ? (
          <EmptyState
            title="Esse gatinho não está por aqui."
            action={
              <Link to="/gatos" className="button">
                Conhecer os gatinhos
              </Link>
            }
          >
            O perfil pode ter mudado. Explore as outras histórias.
          </EmptyState>
        ) : (
          <>
            <DemoNotice />
            <div className="profile-grid">
              <div className="gallery">
                <div
                  className={`gallery-main${cat.slug === "mijona" && photo === 1 ? " gallery-photo--mijona-second" : ""}`}
                >
                  <CatImage
                    key={`${cat.id}-${photo}`}
                    cat={cat}
                    photo={cat.fotos[photo]}
                    eager
                  />
                </div>
                {cat.fotos.length > 1 && (
                  <div className="gallery-thumbs" aria-label="Galeria de fotos">
                    {cat.fotos.map((image, i) => (
                      <button
                        key={image.src}
                        className={
                          cat.slug === "mijona" && i === 1
                            ? "gallery-photo--mijona-second"
                            : undefined
                        }
                        onClick={() => setPhoto(i)}
                        aria-label={`Ver imagem ${i + 1} de ${cat.nome}`}
                        aria-pressed={photo === i}
                      >
                        <img src={image.src} alt={image.alt} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="profile-intro">
                <span className="eyebrow">UMA HISTÓRIA PARA CONHECER</span>
                <h1>
                  Oi, eu sou {cat.nome}
                  <span className="pink">.</span>
                </h1>
                <AvailabilityBadge cat={cat} />
                <p className="profile-description">{cat.descricaoCurta}</p>
                <dl className="facts">
                  <div>
                    <dt>Sexo</dt>
                    <dd>{cat.sexo}</dd>
                  </div>
                  <div>
                    <dt>Pelagem</dt>
                    <dd>{cat.pelagem}</dd>
                  </div>
                  <div>
                    <dt>Fase da vida</dt>
                    <dd>{cat.faixaEtaria ?? "Não informada"}</dd>
                  </div>
                </dl>
                <CatPersonality cat={cat} />
                <div className="profile-actions">
                  {cat.status === "disponivel" ? (
                    <WhatsAppButton cat={cat} />
                  ) : (
                    <p className="notice-box">
                      Este gatinho não está disponível para adoção no momento.
                    </p>
                  )}
                  <FavoriteButton cat={cat} text />
                  <button
                    className="text-link"
                    onClick={async () =>
                      announce(
                        await shareLink(`Conheça ${cat.nome} — Cats da ZL`),
                      )
                    }
                  >
                    <Share2 size={17} />
                    Compartilhar perfil
                  </button>
                </div>
                <p className="small-text">
                  Interesse não é confirmação de adoção. Converse com a equipe
                  para conhecer as próximas etapas.
                </p>
              </div>
            </div>
            <div className="profile-story-grid">
              <article className="surface">
                <h2>Minha história</h2>
                {cat.historia.split(/\n+/).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <h3>Cada gatinho tem seu jeitinho de ser!</h3>
                <p>
                  Essas características são observações e podem mudar conforme
                  ele se adapta a um novo ambiente. Conheça suas necessidades
                  com a equipe e respeite seu tempo.
                </p>
              </article>
              <article className="surface care-card">
                <h2>
                  <ShieldCheck size={23} aria-hidden="true" />
                  Cuidado em cada detalhe
                </h2>
                <dl className="health-facts">
                  <div>
                    <dt>Castração</dt>
                    <dd>
                      {cat.castrado === null
                        ? "Não informada"
                        : cat.castrado
                          ? cat.sexo === "Fêmea"
                            ? "Castrada"
                            : "Castrado"
                          : "Não castrado"}
                    </dd>
                  </div>
                  <div>
                    <dt>Convivência</dt>
                    <dd>
                      {[
                        cat.conviveComGatos && "Outros gatos",
                        cat.conviveComCriancas && "crianças",
                      ]
                        .filter(Boolean)
                        .join(" e ") || "Não informada"}
                    </dd>
                  </div>
                </dl>
              </article>
            </div>
            <section className="section">
              <SectionHeading title="Talvez você também se apaixone por…" />
              <div className="cat-grid">
                {cats
                  .filter((c) => c.status === "disponivel" && c.id !== cat.id)
                  .slice(0, 3)
                  .map((other) => (
                    <CatCard key={other.id} cat={other} adoption={false} />
                  ))}
              </div>
            </section>
          </>
        )}
      </DataBoundary>
    </div>
  );
}
