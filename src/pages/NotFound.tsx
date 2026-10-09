import { PawPrint } from "lucide-react";
import { ButtonLink } from "../components/ui";
export default function NotFound() {
  return (
    <div className="container page not-found">
      <span className="error-code">
        4<PawPrint size={80} />4
      </span>
      <h1>Ops! Esse gatinho se perdeu pelo caminho.</h1>
      <p>
        Não encontramos a página que você procurava, mas nossos fofinhos
        continuam por aqui!
      </p>
      <ButtonLink to="/">Voltar ao início</ButtonLink>
    </div>
  );
}
