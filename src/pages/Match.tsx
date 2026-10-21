import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  PawPrint,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../hooks/AppProvider";
import { questions } from "../data/quiz";
import { coatImages } from "../data/coat-images";
import type { Coat, Preferences } from "../types/cat";
import { emptyPreferences, rankCats } from "../utils/compatibility";
import {
  ButtonLink,
  DataBoundary,
  DemoNotice,
  EmptyState,
  PageHeading,
} from "../components/ui";
import CatCard from "../components/CatCard";
import { IS_DEMO } from "../config/site";

export default function Match() {
  const { cats } = useApp();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Partial<Preferences>>({});
  const title = useRef<HTMLHeadingElement>(null);
  const resultTitle = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step === 5) resultTitle.current?.focus();
    else if (step >= 0) title.current?.focus();
  }, [step]);
  const reset = () => {
    setAnswers({});
    setStep(-1);
  };
  if (step === -1)
    return (
      <div className="container page">
        <div className="quiz-intro">
          <div>
            <span className="eyebrow">
              <Sparkles size={17} />
              SEU PRÓXIMO AMIGO PODE TER BIGODES
            </span>
            <h1>
              Descubra seu <span className="pink">match felino!</span>
            </h1>
            <p>
              Todo gatinho tem uma personalidade única. Vamos te ajudar a
              encontrar um companheiro que combine com suas preferências!
            </p>
            <div className="quiz-intro-details">
              <span>
                <PawPrint size={18} />5 perguntinhas
              </span>
              <span>
                <Heart size={18} />
                Uma nova conexão
              </span>
            </div>
            <p>Preparado para descobrir quem pode conquistar seu coração?</p>
            <button className="button" onClick={() => setStep(0)}>
              Começar quiz <ArrowRight size={18} />
            </button>
            <small>Afinidade é uma sugestão. Adoção é um compromisso.</small>
          </div>
          <div className="quiz-intro-art">
            <img
              src="/images/cats/laranja-cozy.svg"
              alt="Ilustração de um gato laranja em seu cantinho"
            />
            <span>
              <Heart fill="currentColor" size={22} /> Será que a gente combina?
            </span>
          </div>
        </div>
        <DemoNotice />
      </div>
    );
  if (step === 5) {
    const results = rankCats(cats, { ...emptyPreferences, ...answers });
    const anyPreference = Object.values(answers).some((v) => v !== null);
    return (
      <div className="container page">
        <div ref={resultTitle} tabIndex={-1}>
          <PageHeading
            eyebrow="UM MATCH É SÓ O COMEÇO"
            title="Encontramos alguns amiguinhos para você!"
          >
            {anyPreference
              ? "Com base nas suas preferências, estes são os gatinhos que mais combinam com o que você procura."
              : `Você deixou o coração aberto! Conheça todos os ${IS_DEMO ? "perfis com disponibilidade demonstrativa" : "gatinhos disponíveis"}, sem porcentagens artificiais.`}
          </PageHeading>
        </div>
        <DemoNotice />
        <details className="explanation">
          <summary>Como calculamos a afinidade estimada?</summary>
          <p>
            Comparamos sexo (peso 15), pelagem (20), sociabilidade (25),
            brincadeira (20) e carinho (20). Nos níveis de personalidade, a
            proximidade é calculada por 1 − diferença ÷ 3. Usamos apenas os
            critérios que você escolheu e que são conhecidos para cada gato,
            ajustando os pesos ao total avaliado.
          </p>
          <p>
            Dados desconhecidos tornam a estimativa parcial. Em empates, mais
            critérios avaliados vêm primeiro. Sem preferências ou sem dados
            comparáveis, não mostramos porcentagem. A afinidade não garante
            adaptação nem aprovação da adoção.
          </p>
        </details>
        <DataBoundary>
          <h2 className="sr-only">Gatinhos sugeridos</h2>
          {results.length ? (
            <div className="cat-grid match-results">
              {results.map((result, index) => (
                <div
                  key={result.cat.id}
                  className={`result-wrapper ${index === 0 && anyPreference && result.score !== null ? "best-match" : ""}`}
                >
                  <div className="result-affinity">
                    <Sparkles size={18} />
                    <strong>
                      {result.score === null
                        ? result.selected
                          ? "Ainda precisamos conhecer mais"
                          : "Uma história para descobrir"
                        : `${result.score}% de afinidade estimada`}
                    </strong>
                    {index === 0 && anyPreference && result.score !== null && (
                      <span>Maior afinidade</span>
                    )}
                  </div>
                  <p className="result-criteria">
                    {result.evaluated} de {result.selected} critérios escolhidos
                    avaliados{result.partial ? " · Estimativa parcial" : ""}
                  </p>
                  <CatCard cat={result.cat} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="Nenhum perfil disponível por enquanto.">
              Você pode conhecer as outras histórias no catálogo.
            </EmptyState>
          )}
        </DataBoundary>
        <div className="notice-box">
          Um match é só o começo! Conhecer as necessidades e a personalidade do
          animal é essencial antes da adoção.
        </div>
        <div className="button-row">
          <button className="button" onClick={reset}>
            <RotateCcw size={17} />
            Refazer quiz
          </button>
          <ButtonLink to="/gatos" secondary>
            Ver todos os gatos
          </ButtonLink>
          <Link to="/tinder" className="text-link">
            Explorar no Tinder dos Gatos <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }
  const question = questions[step];
  const answered = Object.hasOwn(answers, question.key);
  return (
    <div className="container page quiz-page">
      <div className="quiz-top">
        <Link to="/match" onClick={reset} className="text-link">
          <PawPrint size={18} />
          Match Felino
        </Link>
        <button className="text-link" onClick={reset}>
          <RotateCcw size={16} />
          Reiniciar
        </button>
      </div>
      <div className="quiz-progress-label">
        <span>Pergunta {step + 1} de 5</span>
        <span>{Math.round((step / 5) * 100)}% do caminho</span>
      </div>
      <progress value={step} max={5} aria-label={`Pergunta ${step + 1} de 5`} />
      <section className="quiz-step" key={step}>
        <span className="quiz-number">0{step + 1}</span>
        <h1 ref={title} tabIndex={-1} id="question-title">
          {question.title}
        </h1>
        <p>{question.description}</p>
        <fieldset
          className={`quiz-options ${question.key === "pelagem" ? "coat-options" : ""}`}
          aria-labelledby="question-title"
        >
          <legend className="sr-only">Escolha uma opção</legend>
          {question.options.map((option, i) => (
            <label
              className={`quiz-option ${answered && answers[question.key] === option.value ? "chosen" : ""}`}
              key={String(option.value)}
            >
              <input
                type="radio"
                aria-label={option.label}
                name={question.key}
                value={String(option.value)}
                checked={answered && answers[question.key] === option.value}
                onChange={() =>
                  setAnswers({ ...answers, [question.key]: option.value })
                }
              />
              {question.key === "pelagem" && option.value !== null ? (
                <img
                  src={`/images/cats/${coatImages[option.value as Coat]}.svg`}
                  alt=""
                />
              ) : (
                <span className="option-icon">
                  {option.value === null ? (
                    <Heart size={23} />
                  ) : question.key === "sexo" ? (
                    option.value === "Macho" ? (
                      "♂"
                    ) : (
                      "♀"
                    )
                  ) : (
                    <PawPrint size={19 + i * 2} />
                  )}
                </span>
              )}
              <span>{option.label}</span>
              <span className="radio-mark" aria-hidden="true">
                {answered && answers[question.key] === option.value && (
                  <Check size={15} />
                )}
              </span>
            </label>
          ))}
        </fieldset>
        <div className="quiz-navigation">
          <button
            className="button secondary"
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft size={17} />
            Voltar
          </button>
          <button
            className="button"
            disabled={!answered}
            onClick={() => setStep(step + 1)}
          >
            {step === 4 ? "Ver meus matches" : "Próxima pergunta"}
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
      <p className="quiz-reassurance">
        <Heart size={15} />
        Não existe resposta errada. Cada amizade tem seu próprio jeito.
      </p>
    </div>
  );
}
