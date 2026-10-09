import { Plus } from "lucide-react";
import { faq } from "../data/faq";
import { PageHeading, WhatsAppButton } from "../components/ui";
export default function FAQ() {
  return (
    <div className="container page narrow">
      <PageHeading
        eyebrow="VAMOS DESCOMPLICAR?"
        title="Dúvidas pequenas. Respostas com carinho."
      >
        Tudo o que você precisa saber para dar o próximo passo.
      </PageHeading>
      <div className="faq-list">
        {faq.map(([question, answer], i) => (
          <details key={question}>
            <summary>
              <span className="faq-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2>{question}</h2>
              <Plus size={21} aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <div className="final-cta">
        <h2>Ainda ficou alguma dúvida?</h2>
        <p>A gente conversa e encontra o caminho juntos.</p>
        <WhatsAppButton />
      </div>
    </div>
  );
}
