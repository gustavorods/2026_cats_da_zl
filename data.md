# Cats da ZL — guia para cadastrar os dados reais

Este documento é o manual de atualização do site. Ele deve ser usado pela equipe do projeto antes da apresentação com dados reais e antes da publicação pública.

## 1. Introdução e modo demonstrativo

O site funciona com **12 perfis inteiramente fictícios**. Nomes, idades, histórias, sexo, pelagem, personalidade, informações de saúde e status desses perfis servem exclusivamente para demonstrar as funcionalidades. As imagens são ilustrações SVG criadas para o projeto; não são fotografias dos gatos da colônia. Os exemplos não representam resultados do TCC, adoções realizadas ou animais realmente disponíveis.

O conteúdo institucional parte das informações fornecidas no prompt: projeto de TCC de estudantes da área administrativa, dedicado aos gatos de uma colônia da Zona Leste de São Paulo. O projeto **não é abrigo e não recebe novos animais**. O WhatsApp fornecido é `5511952685748`.

### Arquivos que você vai editar

| Informação                                              | Arquivo                                                                                      |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Perfis demonstrativos                                   | `src/data/cats.mock.ts`                                                                      |
| Fonte de dados usada pelas páginas                      | `src/services/cats.service.ts`                                                               |
| Modelo de cadastro e valores permitidos                 | `src/types/cat.ts`                                                                           |
| Modo demo, contatos, Pix, redes, equipe e transparência | `src/config/site.ts`                                                                         |
| Fotografias e ilustrações                               | `public/images/cats/`                                                                        |
| Perguntas frequentes                                    | `src/data/faq.ts`                                                                            |
| Perguntas e opções do quiz                              | `src/data/quiz.ts`                                                                           |
| Textos institucionais                                   | `src/pages/About.tsx`, `src/pages/Adoption.tsx`, `src/pages/Help.tsx` e `src/pages/Home.tsx` |

### Como identificar pendências

- `null`: informação ainda desconhecida ou canal não confirmado. Não substitua por `false`, `0` ou texto inventado.
- `[]`: lista ainda sem itens, como redes sociais, integrantes, fotos ou documentos de prestação de contas.
- Identificadores iniciados em `demo-`: cadastros fictícios.
- Fotos `.svg` geradas pelo projeto: ilustrações de demonstração, não registros dos animais reais.
- Textos “em breve”, “não informado” e aviso de demonstração: tratamentos intencionais da interface.

### Procedimento de substituição

1. Reúna os dados e confirme as autorizações com quem cuida da colônia.
2. Cadastre cada animal em um novo `src/data/cats.ts`, exportando `cats: Cat[]`. Use o exemplo completo da seção 8. Não reutilize uma história fictícia como se fosse real.
3. Em `src/services/cats.service.ts`, altere a importação de `../data/cats.mock` para `../data/cats`.
4. Coloque fotos autorizadas em `public/images/cats/` e informe seus caminhos a partir de `/images/cats/`.
5. Preencha os campos confirmados em `src/config/site.ts`. Os campos ainda desconhecidos devem continuar nulos.
6. Revise as chamadas visuais fixas da home e páginas institucionais. Elas usam ilustrações locais. Você pode mantê-las como decoração, mas remova ou atualize nomes e legendas que se referem aos exemplos. Consulte a seção 7.
7. Teste catálogo, perfil, filtros, quiz, favoritos e os textos das mensagens do WhatsApp.
8. Execute `npm test`, `npm run build` e `npm run test:e2e` antes da entrega.
9. Só depois de retirar todos os perfis fictícios, altere `IS_DEMO` para `false` em `src/config/site.ts`.
10. Atualize os metadados de `index.html`, que atualmente dizem que o site é demonstrativo. Não remova avisos enquanto houver mocks publicados.

**Atenção:** desligar `IS_DEMO` não troca os dados automaticamente. Essa variável controla os avisos, rótulos de disponibilidade e complemento da mensagem de WhatsApp. Os dados precisam ser substituídos primeiro. Não misture exemplos e cadastros reais sem criar uma identificação individual apropriada.

## 2. Dados necessários de cada gato

Cada cadastro deve seguir a interface `Cat`, definida em `src/types/cat.ts`.

| Campo                   | Tipo                       | Obrigatório | Significado e preenchimento                                                                                 |
| ----------------------- | -------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `id`                    | `string`                   | Sim         | Identificador único e permanente. Não muda com nome, foto ou disponibilidade; favoritos usam esse valor.    |
| `slug`                  | `string`                   | Sim         | Endereço único, sem espaços ou acentos, por exemplo `nome-do-gato`. Evite alterar depois da divulgação.     |
| `nome`                  | `string`                   | Sim         | Nome público confirmado pela equipe.                                                                        |
| `sexo`                  | `"Macho" \| "Fêmea"`       | Sim         | Informação confirmada. Se desconhecida, confirme antes de publicar; o modelo atual exige uma dessas opções. |
| `pelagem`               | `Coat`                     | Sim         | Uma das opções abaixo. Aparência não comprova raça.                                                         |
| `idadeEstimada`         | `string \| null`           | Não         | Texto claro, como “Cerca de 2 anos”. Use “estimada” quando não houver certeza.                              |
| `faixaEtaria`           | `Age \| null`              | Não         | `Filhote`, `Jovem`, `Adulto` ou `Sênior`, quando conhecida. Usada no filtro.                                |
| `descricaoCurta`        | `string`                   | Sim         | Apresentação breve, cerca de 80–140 caracteres, baseada em observações reais.                               |
| `historia`              | `string`                   | Sim         | História autorizada, sem fatos inventados, endereço exato ou dados pessoais de terceiros.                   |
| `sociabilidade`         | `0 \| 1 \| 2 \| 3 \| null` | Não         | Escala observada, definida na seção 3.                                                                      |
| `brincadeira`           | `0 \| 1 \| 2 \| 3 \| null` | Não         | Escala observada, definida na seção 3.                                                                      |
| `carinho`               | `0 \| 1 \| 2 \| 3 \| null` | Não         | Escala observada, definida na seção 3.                                                                      |
| `fotos`                 | `CatPhoto[]`               | Sim         | Lista ordenada; pode ser `[]`. Primeiro item é a imagem principal.                                          |
| `status`                | `Status`                   | Sim         | Situação atual de adoção. Veja valores abaixo.                                                              |
| `castrado`              | `boolean \| null`          | Não         | `true` se confirmado, `false` se confirmado que não, `null` se desconhecido.                                |
| `vacinado`              | `boolean \| null`          | Não         | Estado conhecido de vacinação. Detalhes pertinentes podem ir em observações, sem diagnósticos inventados.   |
| `vermifugado`           | `boolean \| null`          | Não         | Mesma distinção entre confirmado, negativo e desconhecido.                                                  |
| `necessidadesEspeciais` | `string \| null`           | Não         | Necessidades confirmadas e autorizadas, relevantes para o cuidado.                                          |
| `observacoesSaude`      | `string \| null`           | Não         | Apenas informações verificadas. Não publicar inferências médicas.                                           |
| `conviveComGatos`       | `boolean \| null`          | Não         | Convivência observada; não promete adaptação futura.                                                        |
| `conviveComCaes`        | `boolean \| null`          | Não         | Use `null` se não há observações confiáveis.                                                                |
| `conviveComCriancas`    | `boolean \| null`          | Não         | Use `null` se não há observações confiáveis.                                                                |
| `destaque`              | `boolean`                  | Sim         | Define participação na seção de destaques da home. Só aparecem os disponíveis; até quatro itens.            |
| `dataAtualizacao`       | `string ISO`               | Sim         | Data real da última revisão: `2026-10-09` ou ISO completo.                                                  |

### Enums e convenções

`pelagem`: `Laranja`, `Padrão siamês`, `Preto`, `Branco`, `Frajola`, `Cinza`, `Escaminha`, `Rajado`.

O padrão siamês é uma descrição de aparência. Não classifique um gato como raça Siamês sem comprovação. Se um animal não se encaixar nas opções, acrescente uma categoria em `src/types/cat.ts`, uma ilustração/mapeamento em `src/data/cats.mock.ts` (`coatImages`) e revise o quiz e filtros. Esse mapeamento serve às ilustrações das opções do quiz e pode ser movido para um arquivo separado quando os mocks forem retirados.

| Valor de `status` | Exibição                     | Consequência                                                    |
| ----------------- | ---------------------------- | --------------------------------------------------------------- |
| `disponivel`      | Disponível para adoção       | Aparece no quiz e Tinder; pode ter CTA de interesse e destaque. |
| `em_processo`     | Em processo de adoção        | Continua no catálogo; sem CTA de adoção, sem quiz/Tinder.       |
| `adotado`         | Adotado                      | Perfil preservado; sem CTA de adoção, sem quiz/Tinder.          |
| `indisponivel`    | Temporariamente indisponível | Perfil preservado; sem CTA de adoção, sem quiz/Tinder.          |

Não remova um perfil só porque foi adotado: atualizar o status mantém links e favoritos compreensíveis. Confirme a disponibilidade regularmente. Cada interessado ainda precisa conversar com os responsáveis.

`vacinado: null` significa **não informado**, não significa “não vacinado”. `sociabilidade: null` significa desconhecida; `sociabilidade: 0` significa um comportamento reservado observado. Campos vazios não podem virar notas zero.

## 3. Escala de personalidade

| Nível  | Sociabilidade  | Brincadeira      | Carinho           |
| ------ | -------------- | ---------------- | ----------------- |
| 0      | Mais reservado | Muito tranquilo  | Mais independente |
| 1      | Pouco sociável | Pouco brincalhão | Pouco carinhoso   |
| 2      | Sociável       | Brincalhão       | Carinhoso         |
| 3      | Muito sociável | Muito brincalhão | Muito carinhoso   |
| `null` | Não informado  | Não informado    | Não informado     |

Esses valores devem ser preenchidos por pessoas que conhecem os animais, considerando observações em diferentes momentos. Não estime pelo sexo, idade, cor ou fotografia. A nota pode mudar com o tempo e com o ambiente; revise `dataAtualizacao` ao atualizá-la. A escala não é um diagnóstico nem uma garantia de comportamento.

O Match Felino compara preferências com esses dados. Pesos: sexo 15, pelagem 20, sociabilidade 25, brincadeira 20 e carinho 20. Para personalidade, semelhança = `1 - abs(preferência - observação) / 3`. Critérios sem preferência ou com dados desconhecidos ficam fora da média. A pontuação é normalizada pelo peso dos critérios avaliados. Empates consideram quantos critérios foram conhecidos. A interface informa estimativas parciais. Sem critérios utilizáveis, não há percentual.

## 4. Fotos reais

### O que reunir

- Uma imagem principal nítida, com o rosto ou o gato inteiro bem enquadrado.
- Duas a cinco imagens extras, se disponíveis: corpo, outra expressão e contexto seguro.
- Fotografias atuais, sem filtros que distorçam a pelagem e sem informações sensíveis no fundo.
- Autorização do fotógrafo/titular e das pessoas que apareçam. Evite rostos de terceiros e documentos no enquadramento.

### Preparação e armazenamento

1. Salve em `public/images/cats/`. Exemplo: `amora-principal.webp`, `amora-descansando.webp`, `amora-brincando.webp`.
2. Use nomes minúsculos, sem espaços e acentos. Não use identificadores que revelem o endereço da colônia.
3. Prefira WebP ou AVIF otimizados; JPEG e PNG também funcionam. SVG é usado para ilustrações.
4. Recomenda-se lado maior de 1.200–1.600 px e aproximadamente 150–300 KB por foto. Uma imagem entre quadrada e vertical se adapta melhor ao catálogo e galeria.
5. O catálogo recorta a imagem; deixe margem ao redor do rosto. Confira a prévia em celular e desktop.
6. Remova metadados EXIF de localização antes de disponibilizar o arquivo.

### Estrutura de cada foto

```ts
fotos: [
  {
    src: "/images/cats/exemplo-principal.webp",
    alt: "Descrição objetiva do gato e da posição em que aparece",
    credito: "Nome autorizado do fotógrafo, se aplicável",
  },
  {
    src: "/images/cats/exemplo-descansando.webp",
    alt: "O mesmo gato descansando sobre uma almofada",
  },
];
```

O primeiro item é a foto principal. Reordene a lista para trocá-la; acrescente itens para ampliar a galeria. O campo `credito` é opcional e aparece junto à imagem quando informado. A autorização precisa ser guardada pela equipe fora do site; não exponha documentos pessoais no repositório.

Se `fotos` estiver vazio ou a imagem falhar, o componente mostra `/images/cats/placeholder.svg`, com texto “Foto em breve” e descrição acessível. Não use uma fotografia de outro animal como se fosse daquele gato.

## 5. Dados institucionais

| Dado                            | Situação atual                                            | Onde inserir / confirmar                                                                 |
| ------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Nome oficial                    | Cats da ZL, fornecido no briefing                         | `site.name` em `src/config/site.ts`; revisar logo/textos/metadados se mudar.             |
| Logo                            | Marca tipográfica e ícone criados para esta implementação | Aprovar ou substituir `Logo` em `src/components/Layout.tsx` e `public/favicon.svg`.      |
| Descrição oficial               | Texto baseado no briefing                                 | Validar com a equipe e revisar `src/pages/About.tsx`, home, rodapé e metadados.          |
| Nomes dos integrantes           | Não fornecidos                                            | `site.team[]`, campo `nome`.                                                             |
| Funções dos integrantes         | Não fornecidas                                            | `site.team[]`, campo `funcao`.                                                           |
| Fotos da equipe                 | Não fornecidas                                            | `site.team[]`, campo `foto`, somente com autorização; `null` quando ausente.             |
| E-mail                          | Não fornecido                                             | `site.email`. Enquanto `null`, aparece “E-mail em breve”.                                |
| WhatsApp                        | +55 11 95268-5748                                         | `site.whatsapp`, apenas dígitos com DDI: `5511952685748`. Confirmar antes da publicação. |
| Instagram                       | Não fornecido                                             | `site.instagram`, URL HTTPS completa do perfil oficial; `null` oculta links.             |
| Outras redes                    | Não fornecidas                                            | `site.social`, lista de `{ nome, url }`, somente canais confirmados.                     |
| Informações públicas da colônia | Zona Leste de São Paulo                                   | Validar o texto de apresentação e omitir detalhes não autorizados.                       |

**Não publicar a localização exata da colônia sem autorização e avaliação dos riscos aos animais.** O site não inclui mapa, endereço ou coordenadas. Confirme novamente esse cuidado ao escolher fotografias e revisar histórias.

Para incluir integrantes:

```ts
team: [
  { nome: "NOME REAL AUTORIZADO", funcao: "FUNÇÃO CONFIRMADA", foto: null },
];
```

Esse trecho é um modelo, não um cadastro pronto para publicação. A seção de equipe só aparece quando houver itens.

## 6. Dados de doações

Todos ficam em `site.pix` dentro de `src/config/site.ts`.

| Campo          | O que confirmar                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `chave`        | Chave Pix oficial, copiada exatamente e validada com o responsável.                                              |
| `tipo`         | Tipo da chave: aleatória, telefone, e-mail ou outro tipo confirmado.                                             |
| `destinatario` | Nome que aparece no banco ao consultar a chave. Deve ser confirmado pelo responsável.                            |
| `qrCode`       | Caminho de um QR Code oficial autorizado, por exemplo `/images/pix-oficial.png`. Não gerar um código de exemplo. |

O cartão habilita a cópia somente quando há **chave e destinatário**. Sem ambos, mostra “Chave Pix em breve” e o botão fica desativado. O QR Code só aparece quando há configuração válida e arquivo fornecido. Confirme que o QR Code corresponde à mesma chave/destinatário.

Também é necessário confirmar:

- Texto sobre o destino das contribuições: alimentação, higiene, atendimento veterinário e outros cuidados autorizados.
- Quais itens podem ser doados e como combinar a entrega. O site orienta conversar com a equipe e não promete coleta.
- Responsável pela manutenção dos dados e pela prestação de contas.
- Documentos de transparência, se houver, com dados pessoais protegidos. `site.transparency` aceita `{ titulo, url }`; sem itens, nenhum relatório é inventado.

O texto de transparência em `src/pages/Help.tsx` também deve refletir quando os relatórios passarem a existir. As doações são voluntárias e independentes do processo de adoção. Não apresentar pagamentos como reserva ou compra de um animal.

## 7. Mapa completo de substituição dos mocks

| Caminho real                                                                                    | Responsabilidade                                                                             |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `src/data/cats.mock.ts`                                                                         | 12 exemplos de gatos e mapeamento das ilustrações de pelagem.                                |
| `src/types/cat.ts`                                                                              | Interface `Cat`, `CatPhoto`, preferências, escalas e enums.                                  |
| `src/services/cats.service.ts`                                                                  | Única entrada dos perfis no estado compartilhado; mude a fonte aqui.                         |
| `src/config/site.ts`                                                                            | `IS_DEMO`, WhatsApp, Pix, contatos, redes, equipe e transparência.                           |
| `src/hooks/AppProvider.tsx`                                                                     | Carregamento/erro dos dados, favoritos e avisos acessíveis.                                  |
| `src/utils/compatibility.ts`                                                                    | Regras de afinidade; não contém cadastros de animais.                                        |
| `src/utils/whatsapp.ts`                                                                         | Mensagens e URL codificada para WhatsApp; usa configuração central.                          |
| `src/data/quiz.ts`                                                                              | Cinco perguntas e opções.                                                                    |
| `src/data/faq.ts`                                                                               | Dez perguntas frequentes e suas respostas.                                                   |
| `public/images/cats/`                                                                           | Imagens locais e fallback. URLs no código começam em `/images/cats/`, sem `public`.          |
| `scripts/generate-illustrations.mjs`                                                            | Gerador das ilustrações demonstrativas. Não o execute sobre fotos reais com os mesmos nomes. |
| `src/pages/Home.tsx`                                                                            | Hero, ilustrações e legendas fixas “Amora”/“Mingau”; destaques são dinâmicos.                |
| `src/pages/Match.tsx`, `src/pages/About.tsx`, `src/pages/Adoption.tsx`, `src/pages/Contact.tsx` | Ilustrações decorativas podem ser mantidas ou substituídas com descrições corretas.          |
| `src/components/CatCard.tsx`                                                                    | Foto, fallback, status e personalidade de cada cadastro.                                     |
| `src/components/Layout.tsx`                                                                     | Logo, navegação, aviso e rodapé.                                                             |
| `index.html`                                                                                    | Idioma, título inicial, descrição e Open Graph demonstrativos.                               |

Ao retirar os mocks, preserve ou mova `coatImages`, usado nas opções ilustradas do quiz. Não apague arquivos importados antes de ajustar suas referências. As frases sobre demonstração da home e introdução dos resultados do quiz precisam acompanhar `IS_DEMO`.

## 8. Exemplo de cadastro completo

**Todos os dados deste objeto são fictícios e servem só para explicar o preenchimento. Não publique este exemplo como um animal real.**

```ts
import type { Cat } from "../types/cat";

export const cats: Cat[] = [
  {
    id: "exemplo-nao-publicar-001",
    slug: "exemplo-nao-publicar",
    nome: "Exemplo fictício",
    sexo: "Fêmea",
    pelagem: "Preto",
    idadeEstimada: "Cerca de 2 anos",
    faixaEtaria: "Adulto",
    descricaoCurta:
      "Apresentação fictícia, a ser substituída por observações reais.",
    historia:
      "História ilustrativa: troque integralmente pelo relato autorizado sobre o animal real.",
    sociabilidade: 2,
    brincadeira: 1,
    carinho: null,
    fotos: [],
    status: "indisponivel",
    castrado: true,
    vacinado: null,
    vermifugado: null,
    necessidadesEspeciais: null,
    observacoesSaude: null,
    conviveComGatos: true,
    conviveComCaes: null,
    conviveComCriancas: null,
    destaque: false,
    dataAtualizacao: "2026-10-09",
  },
];
```

Troque `id`, `slug` e `nome` pelo registro confirmado. Confira sexo e pelagem. Preencha idade somente quando houver estimativa confiável. Escreva descrição e história autorizadas. Faça as observações de personalidade; se não souber, mantenha `null`. Acrescente fotos conforme a seção 4. Escolha o status atual antes de decidir o destaque. Preencha saúde e convivência somente quando conhecidos e registre a data da revisão.

Para fotos, substitua `fotos: []` pela lista da seção 4 com arquivos reais existentes. Para cada novo gato, adicione um objeto à lista. Não repita IDs ou slugs. O compilador verifica tipos locais; a equipe ainda deve verificar a veracidade dos dados.

## 9. Migração futura para backend

A interface não acessa diretamente os cadastros. `AppProvider` chama `catsService.list(): Promise<Cat[]>`, e páginas/quiz/filtros recebem os dados pelo contexto. Isso permite trocar a fonte sem refazer os componentes.

Uma API futura pode responder a `GET /cats` com um JSON de lista: `[{ ...campos de Cat }]`. Cada item precisa incluir os campos obrigatórios, e os desconhecidos devem chegar como `null`. `fotos` deve ser sempre um array, mesmo vazio. Não devolver um erro como se fosse uma lista vazia.

Para migrar:

1. Troque o retorno local de `src/services/cats.service.ts` por uma chamada `fetch` ao endpoint configurado.
2. Verifique `response.ok` e lance erro para respostas inválidas. O provider já tem estados de carregamento, erro e botão de tentar novamente.
3. Valide a resposta em tempo de execução: TypeScript não valida JSON externo. Rejeite IDs/slug duplicados, enums desconhecidos, números fora de 0–3 e datas inválidas. Trate campos opcionais ausentes como `null` no adaptador.
4. Normalize URLs das fotos e preserve seus textos alternativos. Garanta autorização e origem confiável.
5. Se o servidor usar `{ data: [...] }`, adapte o serviço para devolver apenas `Cat[]`.
6. Mantenha IDs estáveis para os favoritos persistidos não apontarem para outro animal.
7. Atualize os testes para os cadastros reais e para falhas de rede. O quiz continua usando a mesma função pura.

Hoje não há backend, banco, autenticação, envio de formulário ou armazenamento remoto. Favoritos ficam neste navegador, sob `cats-da-zl:favorites:v1`. Abas da mesma origem são sincronizadas pelo evento `storage`. Sem acesso ao armazenamento, a interface informa que a seleção dura apenas a visita.

## 10. Checklist de publicação

- [ ] Substituir perfis demonstrativos.
- [ ] Adicionar fotos reais autorizadas.
- [ ] Validar características e escala 0–3 com observadores.
- [ ] Confirmar disponibilidade de cada gato.
- [ ] Revisar histórias e datas de atualização.
- [ ] Inserir chave Pix oficial.
- [ ] Confirmar destinatário da chave Pix e QR Code, se houver.
- [ ] Inserir redes sociais oficiais.
- [ ] Inserir e-mail oficial.
- [ ] Confirmar WhatsApp e seus responsáveis.
- [ ] Validar textos institucionais e integrantes, se apresentados.
- [ ] Remover avisos demonstrativos somente quando não houver mocks publicados.
- [ ] Revisar ilustrações, nomes fixos da home e metadados antes de desligar `IS_DEMO`.
- [ ] Testar links de adoção e nomes nas mensagens, sem envio automático.
- [ ] Testar o quiz com os gatos reais, dados desconhecidos e “Sem preferência”.
- [ ] Testar favoritos e filtros.
- [ ] Testar site no celular, inclusive a 320 px.
- [ ] Revisar acessibilidade: teclado, foco, contraste, labels e textos alternativos.
- [ ] Revisar privacidade, localização e permissões de uso das imagens.
- [ ] Executar testes e build.
- [ ] Configurar hospedagem com fallback de rotas para `index.html`.
- [ ] Definir quem vai revisar periodicamente cadastros, canais e disponibilidade.
