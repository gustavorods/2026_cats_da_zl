import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUp, Cat, Heart, Menu, PawPrint, X } from "lucide-react";
import { site } from "../config/site";
import { useApp } from "../hooks/AppProvider";
import { DemoNotice } from "./ui";
import { whatsappDisplay, whatsappUrl } from "../utils/whatsapp";
const navigation = [
  ["/", "Início"],
  ["/gatos", "Conheça os gatos"],
  ["/match", "Match Felino"],
  ["/ajudar", "Como ajudar"],
  ["/sobre", "Sobre nós"],
];
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Cats da ZL — início">
      <span className="logo-icon">
        <Cat strokeWidth={1.9} size={29} />
      </span>
      <span>
        cats
        <span className="logo-small">
          da ZL<span className="logo-dot">.</span>
        </span>
      </span>
    </Link>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  const { favorites } = useApp();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            to="/gatos?favoritos=1"
            className="header-favorites"
            aria-label={`Ver favoritos (${favorites.length})`}
          >
            <Heart size={20} />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </Link>
          <Link to="/adotar" className="button header-adopt">
            Quero adotar <PawPrint size={17} aria-hidden="true" />
          </Link>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        hidden={!open}
        aria-label="Navegação no celular"
      >
        {navigation
          .concat([
            ["/adotar", "Quero adotar"],
            ["/tinder", "Tinder dos Gatos"],
            ["/duvidas", "Dúvidas"],
            ["/contato", "Contato"],
          ])
          .map(([path, label]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {label}
            </NavLink>
          ))}
      </nav>
    </header>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p>
            Pequenas patinhas, grandes histórias.
            <br />
            Conectando os gatos da nossa colônia a lares responsáveis e cheios
            de carinho.
          </p>
          <span className="footer-location">
            Feito com carinho na Zona Leste, SP{" "}
            <Heart size={14} aria-hidden="true" />
          </span>
        </div>
        <div>
          <h2>Encontre seu amigo</h2>
          <Link to="/gatos">Conheça os gatos</Link>
          <Link to="/match">Match Felino</Link>
          <Link to="/tinder">Tinder dos Gatos</Link>
          <Link to="/adotar">Como adotar</Link>
        </div>
        <div>
          <h2>Vamos juntos</h2>
          <Link to="/ajudar">Como ajudar</Link>
          <Link to="/sobre">Sobre o projeto</Link>
          <Link to="/duvidas">Perguntas frequentes</Link>
          <Link to="/contato">Fale com a gente</Link>
        </div>
        <div>
          <h2>Um alô faz diferença</h2>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp: {whatsappDisplay()}
          </a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          {site.instagram && (
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {site.social.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.nome}
            </a>
          ))}
          <p className="footer-warning">
            Não somos um abrigo e não recebemos novos animais. Cuidamos
            exclusivamente dos gatos da nossa colônia.
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Cats da ZL. Todos os direitos reservados.
        </span>
        <span>Um projeto de TCC com propósito.</span>
      </div>
    </footer>
  );
}
export default function Layout() {
  const { pathname } = useLocation();
  const [top, setTop] = useState(false);
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current) main.current?.focus({ preventScroll: true });
    first.current = false;
    const titles: Record<string, string> = {
      "/": "Pequenas patinhas, grandes histórias",
      "/gatos": "Conheça nossos gatinhos",
      "/match": "Match Felino",
      "/tinder": "Tinder dos Gatos",
      "/adotar": "Como adotar",
      "/ajudar": "Como ajudar",
      "/sobre": "Sobre nós",
      "/duvidas": "Perguntas frequentes",
      "/contato": "Contato",
    };
    document.title = `${titles[pathname] ?? (pathname.startsWith("/gatos/") ? "Conheça esta história" : "Página não encontrada")} | Cats da ZL`;
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <DemoNotice compact />
      <Header />
      <main id="conteudo" ref={main} tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {top && (
        <button
          className="back-top icon-button"
          aria-label="Voltar ao topo"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            })
          }
        >
          <ArrowUp size={21} />
        </button>
      )}
    </>
  );
}
