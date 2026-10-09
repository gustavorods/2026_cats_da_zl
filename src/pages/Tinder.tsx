import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { Link } from "react-router-dom";
import { Heart, Info, RotateCcw, Undo2, X } from "lucide-react";
import { useApp } from "../hooks/AppProvider";
import { CatImage, CatPersonality } from "../components/CatCard";
import {
  ButtonLink,
  DataBoundary,
  DemoNotice,
  EmptyState,
  PageHeading,
} from "../components/ui";
interface Action {
  id: string;
  wasFavorite: boolean;
  liked: boolean;
}
export default function Tinder() {
  const { cats, favorites, setFavorite, announce } = useApp();
  const available = cats.filter((c) => c.status === "disponivel");
  const [history, setHistory] = useState<Action[]>([]);
  const [offset, setOffset] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const start = useRef<number | null>(null);
  const locked = useRef(false);
  const cat = available[history.length];
  const act = (liked: boolean) => {
    if (!cat || locked.current) return;
    locked.current = true;
    if (liked) {
      setFavorite(cat.id, true);
      announce(`${cat.nome} conquistou seu coração!`);
    }
    setLeaving(true);
    setOffset(liked ? 600 : -600);
    setTimeout(
      () => {
        setHistory((old) => [
          ...old,
          { id: cat.id, wasFavorite: favorites.includes(cat.id), liked },
        ]);
        setOffset(0);
        setLeaving(false);
        locked.current = false;
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240,
    );
  };
  const undo = () => {
    if (locked.current || !history.length) return;
    const action = history[history.length - 1];
    if (action.liked) setFavorite(action.id, action.wasFavorite);
    setHistory(history.slice(0, -1));
    announce("Última ação desfeita.");
  };
  const pointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (locked.current || (e.target as HTMLElement).closest("a,button")) return;
    start.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (start.current !== null) {
      const distance = e.clientX - start.current;
      setOffset(distance);
    }
  };
  const pointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (start.current === null) return;
    const distance = e.clientX - start.current;
    start.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
    if (Math.abs(distance) > 90) act(distance > 0);
    else setOffset(0);
  };
  return (
    <div className="container page tinder-page">
      <PageHeading
        eyebrow="TINDER DOS GATOS"
        title="Um swipe, um miau, uma nova história!"
      >
        Deslize os cartões, conheça os gatinhos e favorite aqueles que
        conquistarem seu coração.
      </PageHeading>
      <DemoNotice />
      <div className="tinder-top">
        <span aria-live="polite">
          {Math.min(history.length + 1, available.length)} de {available.length}{" "}
          perfis
        </span>
        <Link to="/gatos?favoritos=1" className="text-link">
          <Heart size={17} />
          Meus favoritos ({favorites.length})
        </Link>
      </div>
      <DataBoundary>
        {cat ? (
          <>
            <div className="swipe-stage">
              <div className="stack-card" />
              <div
                className={`swipe-card ${leaving ? "leaving" : ""}`}
                style={{
                  transform: `translateX(${offset}px) rotate(${offset / 22}deg)`,
                }}
                onPointerDown={pointerDown}
                onPointerMove={pointerMove}
                onPointerUp={pointerUp}
                onPointerCancel={() => {
                  start.current = null;
                  setOffset(0);
                }}
              >
                <CatImage key={cat.id} cat={cat} eager />
                <div className="swipe-labels" aria-hidden="true">
                  {offset > 40 && <span className="like-label">FAVORITAR</span>}
                  {offset < -40 && <span className="pass-label">PRÓXIMO</span>}
                </div>
                <div className="swipe-card-body">
                  <div className="cat-name-row">
                    <h2>{cat.nome}</h2>
                    <span>{cat.sexo === "Fêmea" ? "♀" : "♂"}</span>
                  </div>
                  <p className="cat-meta">
                    {cat.idadeEstimada ?? "Idade não informada"} · {cat.sexo} ·{" "}
                    {cat.pelagem}
                  </p>
                  <p>{cat.descricaoCurta}</p>
                  <CatPersonality cat={cat} />
                </div>
              </div>
            </div>
            <div className="swipe-actions">
              <button
                className="swipe-action undo"
                disabled={!history.length || leaving}
                onClick={undo}
                aria-label="Desfazer última ação"
              >
                <Undo2 />
              </button>
              <button
                className="swipe-action pass"
                disabled={leaving}
                onClick={() => act(false)}
                aria-label={`Passar ${cat.nome}`}
              >
                <X size={30} />
              </button>
              <Link
                className="swipe-action info"
                to={`/gatos/${cat.slug}`}
                aria-label={`Abrir perfil de ${cat.nome}`}
              >
                <Info size={24} />
              </Link>
              <button
                className="swipe-action like"
                disabled={leaving}
                onClick={() => act(true)}
                aria-label={`Favoritar ${cat.nome}`}
              >
                <Heart size={30} fill="currentColor" />
              </button>
            </div>
            <p className="swipe-instructions">
              Esquerda para passar · Direita para favoritar
              <br />
              Ou use os botões. Um favorito é o começo de um interesse.
            </p>
          </>
        ) : (
          <EmptyState
            title="Você conheceu todos os nossos fofinhos!"
            action={
              <div className="button-row center">
                <ButtonLink to="/gatos?favoritos=1">
                  Ver meus favoritos
                </ButtonLink>
                <button
                  className="button secondary"
                  onClick={() => setHistory([])}
                >
                  <RotateCcw size={17} />
                  Recomeçar
                </button>
                <button
                  className="text-link"
                  onClick={undo}
                  disabled={!history.length}
                >
                  Desfazer última ação
                </button>
                <ButtonLink to="/gatos" secondary>
                  Ver catálogo completo
                </ButtonLink>
              </div>
            }
          >
            Quer rever algum deles ou conhecer melhor seus favoritos?
          </EmptyState>
        )}
      </DataBoundary>
    </div>
  );
}
