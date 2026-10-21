import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, PawPrint, Zap } from "lucide-react";
import type { Cat, CatPhoto, Trait } from "../types/cat";
import { statuses } from "../types/cat";
import { IS_DEMO } from "../config/site";
import { FavoriteButton, WhatsAppButton } from "./ui";
export function CatImage({
  cat,
  photo,
  eager = false,
}: {
  cat: Cat;
  photo?: CatPhoto;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const image = photo ?? cat.fotos[0];
  return (
    <div className="cat-image">
      <img
        src={!failed && image ? image.src : "/images/cats/placeholder.svg"}
        alt={
          !failed && image
            ? image.alt
            : `Ilustração de um gato. Foto de ${cat.nome} em breve.`
        }
        loading={eager ? "eager" : "lazy"}
        draggable={false}
        onError={() => setFailed(true)}
        width="600"
        height="620"
      />
      {(!image || failed) && (
        <span className="photo-placeholder">Foto em breve</span>
      )}
      {!failed && image?.credito && (
        <span className="photo-credit">Foto: {image.credito}</span>
      )}
    </div>
  );
}
const traits = [
  { key: "sociabilidade", label: "Sociável", icon: PawPrint },
  { key: "brincadeira", label: "Brincalhão", icon: Zap },
  { key: "carinho", label: "Carinhoso", icon: Heart },
] as const;
export function CatPersonality({ cat }: { cat: Pick<Cat, Trait> }) {
  return (
    <div className="personality">
      {traits.map(({ key, label, icon: Icon }) => (
        <div className="trait" key={key}>
          <span>
            <Icon size={14} aria-hidden="true" />
            {label}
          </span>
          <span
            className="trait-level"
            role="img"
            aria-label={`${label}: ${cat[key] === null ? "Não informado" : `${cat[key]} de 3`}`}
          >
            {cat[key] === null ? (
              <small>Não informado</small>
            ) : (
              <>
                <span className="level-dots" aria-hidden="true">
                  {[1, 2, 3].map((n) => (
                    <i key={n} className={n <= cat[key]! ? "filled" : ""} />
                  ))}
                </span>
                <small aria-hidden="true">{cat[key]}/3</small>
              </>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
export function AvailabilityBadge({ cat }: { cat: Cat }) {
  return (
    <span className={`availability ${cat.status}`}>
      <span aria-hidden="true" />
      {IS_DEMO
        ? `Exemplo: ${statuses[cat.status].toLowerCase()}`
        : statuses[cat.status]}
    </span>
  );
}
export default function CatCard({
  cat,
  adoption = true,
}: {
  cat: Cat;
  adoption?: boolean;
}) {
  return (
    <article className="cat-card">
      <div className="cat-card-visual">
        <Link
          to={`/gatos/${cat.slug}`}
          aria-label={`Conhecer a história de ${cat.nome}`}
        >
          <CatImage cat={cat} />
        </Link>
        <FavoriteButton cat={cat} />
        <span className="coat-tag">{cat.pelagem}</span>
      </div>
      <div className="cat-card-body">
        <div className="cat-name-row">
          <h3>
            <Link to={`/gatos/${cat.slug}`}>{cat.nome}</Link>
          </h3>
          <span>
            {cat.sexo === "Fêmea" ? "♀" : "♂"}{" "}
            <span className="sr-only">{cat.sexo}</span>
          </span>
        </div>
        <p className="cat-meta">
          {cat.faixaEtaria ?? "Idade não informada"} <span>·</span> {cat.sexo}
        </p>
        <p className="cat-description">{cat.historia}</p>
        <CatPersonality cat={cat} />
        <AvailabilityBadge cat={cat} />
        <Link to={`/gatos/${cat.slug}`} className="card-link">
          Conhecer história <ArrowUpRight size={20} aria-hidden="true" />
        </Link>
        {adoption && <WhatsAppButton cat={cat}>Quero adotar</WhatsAppButton>}
      </div>
    </article>
  );
}
