import {
  ArrowRight,
  Cat as CatIcon,
  Heart,
  MessageCircle,
  PawPrint,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { Cat } from "../types/cat";
import { whatsappUrl } from "../utils/whatsapp";
import { IS_DEMO } from "../config/site";
import { useApp } from "../hooks/AppProvider";

export function ButtonLink({
  to,
  children,
  secondary = false,
  className = "",
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`button ${secondary ? "secondary" : ""} ${className}`}
    >
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}
export function WhatsAppButton({
  cat,
  children,
  message,
}: {
  cat?: Cat;
  children?: ReactNode;
  message?: string;
}) {
  if (cat && cat.status !== "disponivel") return null;
  return (
    <a
      className="button"
      href={whatsappUrl(cat, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} aria-hidden="true" />
      {children ??
        (cat ? `Quero adotar ${cat.nome}` : "Conversar pelo WhatsApp")}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow">
          <PawPrint size={15} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <span className="eyebrow">
        <PawPrint size={15} aria-hidden="true" />
        {eyebrow}
      </span>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
export function EmptyState({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <CatIcon size={48} strokeWidth={1.4} aria-hidden="true" />
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}
export function LoadingSkeleton() {
  return (
    <div className="container section" role="status">
      <span className="sr-only">Carregando os gatinhos…</span>
      <div className="cat-grid">
        {[1, 2, 3].map((n) => (
          <div key={n} className="skeleton" />
        ))}
      </div>
    </div>
  );
}
export function DataBoundary({ children }: { children: ReactNode }) {
  const { loading, error, reload } = useApp();
  if (loading) return <LoadingSkeleton />;
  if (error)
    return (
      <EmptyState
        title="Os gatinhos não carregaram desta vez."
        action={
          <button className="button" onClick={reload}>
            Tentar novamente
          </button>
        }
      >
        Tente de novo em alguns instantes.
      </EmptyState>
    );
  return children;
}
export function DemoNotice({ compact = false }: { compact?: boolean }) {
  if (!IS_DEMO) return null;
  return (
    <div className={`demo-notice ${compact ? "compact" : ""}`}>
      <Sparkles size={15} aria-hidden="true" />
      <span>
        {compact
          ? "Uma prévia cheia de carinho. Os perfis dos gatos são fictícios."
          : "Modo demonstrativo: nomes, histórias, ilustrações e disponibilidades são fictícios. Conheça os gatos reais com a equipe."}
      </span>
      {compact && (
        <Link to="/sobre">
          Sobre o projeto <ArrowRight size={13} aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
export function FavoriteButton({
  cat,
  text = false,
}: {
  cat: Cat;
  text?: boolean;
}) {
  const { favorites, toggleFavorite } = useApp();
  const selected = favorites.includes(cat.id);
  return (
    <button
      className={`favorite-button ${text ? "with-text" : ""} ${selected ? "selected" : ""}`}
      onClick={() => toggleFavorite(cat)}
      aria-pressed={selected}
      aria-label={
        text
          ? undefined
          : `${selected ? "Remover" : "Adicionar"} ${cat.nome} ${selected ? "dos" : "aos"} favoritos`
      }
    >
      <Heart
        size={21}
        fill={selected ? "currentColor" : "none"}
        aria-hidden="true"
      />
      {text && (selected ? "Remover dos favoritos" : "Adicionar aos favoritos")}
    </button>
  );
}
