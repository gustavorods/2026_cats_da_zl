# PROMPT MESTRE — CATS DA ZL 🐱

## 1. Objetivo do projeto

Crie um site frontend completo, moderno, interativo, responsivo e visualmente encantador chamado **Cats da ZL**, uma plataforma dedicada à divulgação e à adoção responsável dos gatos de uma colônia localizada na Zona Leste de São Paulo.

O site faz parte de um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes da área administrativa.

O objetivo é:

- Dar visibilidade aos gatos que vivem na colônia.
- Apresentar suas histórias e características.
- Facilitar o contato entre interessados em adotar e responsáveis pelo projeto.
- Promover a adoção e a guarda responsável.
- Incentivar doações para alimentação, saúde e cuidados.
- Conscientizar sobre abandono, castração e bem-estar animal.
- Criar uma experiência divertida de descoberta de gatos por meio de um quiz e um sistema de cartões semelhante ao Tinder.

**Importante:** O Cats da ZL não é um abrigo ou centro de acolhimento. O projeto atende exclusivamente aos gatos que já pertencem à colônia. Não é permitido comunicar que recebemos ou resgatamos novos animais.

O resultado deve parecer um produto digital real, pronto para apresentação pública, e não apenas um protótipo acadêmico.

Não produza apenas um wireframe, um planejamento ou componentes isolados. **Implemente o site frontend completo, com todas as páginas, funcionalidades, navegação, componentes, dados demonstrativos e documentação especificados neste prompt.**

---

# 2. Tecnologias e arquitetura

Se já existir um projeto inicial, avalie sua estrutura e preserve as tecnologias existentes quando apropriado.

Caso seja necessário iniciar do zero, utilize:

- React com Vite.
- TypeScript com tipagem estrita.
- Tailwind CSS.
- React Router para navegação.
- Lucide React para ícones.
- Motion/Framer Motion para animações, apenas quando agregarem valor.
- Google Fonts para carregar Fredoka e Nunito.

Não implementar backend neste momento.

Não utilizar banco de dados, autenticação ou serviços pagos.

Todos os dados inicialmente virão de arquivos mockados, organizados para facilitar uma futura integração com uma API REST.

Criar componentes reutilizáveis, separação entre dados e interface, gerenciamento de estados consistente, tratamento de erros e arquitetura organizada.

O código deve ser legível, escalável e fácil de manter.

---

# 3. Identidade visual — Playful Organic Design

## Conceito

A identidade visual deve seguir o estilo **Playful Organic Design**, com uma abordagem acolhedora, divertida, amigável, delicada e contemporânea.

Referências estéticas:

- Formas orgânicas e assimétricas.
- Cantos muito arredondados.
- Ilustrações de gatos.
- Elementos decorativos delicados.
- Patinhas, corações, estrelas e pequenos desenhos.
- Bordas onduladas.
- Seções com divisores em formato de ondas.
- Cartões com aparência suave e amigável.
- Composições criativas, porém organizadas.
- Bastante espaço em branco.
- Microinterações agradáveis.
- Sombras discretas e naturais.
- Botões grandes, simpáticos e claramente clicáveis.

O site deve equilibrar fofura e profissionalismo.

Evitar aparência infantil em excesso, interfaces corporativas genéricas, efeitos exagerados, componentes visualmente desconexos e excesso de informações por seção.

## Tipografia

Utilizar obrigatoriamente:

**Fredoka**
- Títulos principais.
- Títulos das seções.
- Destaques.
- Números de estatísticas.
- Textos curtos com personalidade.
- Chamadas principais.

**Nunito**
- Parágrafos.
- Descrições.
- Menu de navegação.
- Perguntas e respostas.
- Formulários.
- Botões, quando a legibilidade for melhor.
- Informações complementares.

Estabelecer uma hierarquia tipográfica clara com títulos grandes e expressivos, subtítulos equilibrados e textos de leitura confortável.

## Paleta de cores

Utilizar as seguintes cores como base:

| Cor | Hexadecimal | Utilização |
|---|---|---|
| Rosa principal | #F7AFCB | Elementos de identidade e destaques |
| Rosa vibrante | #F17FA8 | Ícones, elementos interativos |
| Rosa muito claro | #FFF1F6 | Backgrounds de seções |
| Branco rosado | #FFF9FC | Fundo principal |
| Branco | #FFFFFF | Cartões e superfícies |
| Preto suave | #29242A | Títulos e texto principal |
| Cinza suave | #6D6570 | Textos secundários |
| Rosa escuro | #A52F65 | Botões com texto branco e links de destaque |

Pequenos detalhes em tons pastel complementares são permitidos, mas o rosa deve continuar dominante.

Garantir contraste adequado. Não colocar texto branco sobre rosa muito claro.

## Elementos visuais

Criar uma identidade memorável, incluindo:

- Ilustrações ou silhuetas delicadas de gatos.
- Patinhas como detalhes gráficos.
- Cards com cantos arredondados.
- Fundos com formas orgânicas discretas.
- Botões pill-shaped.
- Elementos flutuantes suaves.
- Divisores ondulados entre seções.
- Elementos decorativos que não atrapalhem a navegação.
- Estados de hover com pequenas alterações de escala, cor e sombra.

O uso de ilustrações SVG é incentivado.

**Não utilizar emojis como substitutos universais de ícones.** Priorizar ícones consistentes, mantendo emojis apenas onde fizerem sentido na comunicação.

## Animações

Adicionar animações sutis:

- Fade-in e movimento suave na entrada das seções.
- Hover em cartões de gatos.
- Transições entre páginas.
- Pequena animação dos botões de favoritos.
- Transições suaves entre perguntas do quiz.
- Animação de cartões no Tinder dos Gatos.
- Feedback visual para ações do usuário.
- Elementos decorativos flutuando suavemente, quando apropriado.

Evitar animações excessivas e respeitar a preferência de movimento reduzido (`prefers-reduced-motion`).

---

# 4. Estrutura de navegação

Implementar as seguintes rotas:

| Rota | Página |
|---|---|
| `/` | Página inicial |
| `/gatos` | Catálogo de gatos |
| `/gatos/:slug` | Perfil individual do gato |
| `/match` | Quiz de compatibilidade |
| `/tinder` | Tinder dos Gatos |
| `/adotar` | Como adotar |
| `/ajudar` | Doações e outras formas de ajudar |
| `/sobre` | Sobre o projeto |
| `/duvidas` | Perguntas frequentes |
| `/contato` | Contato |
| `*` | Página 404 personalizada |

## Cabeçalho

Criar um header com:

- Logotipo Cats da ZL.
- Início.
- Conheça os Gatos.
- Match Felino.
- Como Ajudar.
- Sobre Nós.
- Botão destacado: "Quero Adotar".

O botão "Quero Adotar" do menu deve abrir `/adotar`, enquanto botões específicos de adoção de um gato devem direcionar diretamente ao WhatsApp.

No mobile, utilizar um menu responsivo acessível.

Criar navegação ativa, header sticky quando apropriado e transições suaves.

## Rodapé

Incluir:

- Logo Cats da ZL.
- Breve descrição do projeto.
- Links rápidos.
- Redes sociais, quando configuradas.
- Contato.
- Link para dúvidas.
- Aviso de que o projeto não recebe novos animais.
- Copyright com ano dinâmico.

Texto sugerido:

"Cats da ZL — Pequenas patinhas, grandes histórias. Um projeto dedicado a conectar gatos da nossa colônia a lares responsáveis e cheios de carinho."

---

# 5. Página inicial — Home

A página inicial deve causar uma ótima primeira impressão.

## 5.1 Hero principal

Criar uma seção hero criativa com layout em duas colunas no desktop.

Na esquerda:

**Título principal:**

"Um lar cheio de amor começa com um miau. 🐾"

**Subtítulo:**

"Conheça os gatinhos da nossa colônia, descubra suas histórias e encontre um novo amigo para compartilhar a vida."

**Botões:**

- "Conhecer os gatinhos" → `/gatos`
- "Encontrar meu match" → `/match`

Na direita, exibir uma composição visual atraente com gatos demonstrativos em cartões orgânicos, elementos decorativos, patinhas e corações.

Não utilizar imagens estouradas, elementos sobrepostos indevidamente ou ilustrações sem coerência visual.

No mobile, reorganizar a composição verticalmente.

## 5.2 Apresentação do projeto

Título:

"Bem-vindo ao Cats da ZL!"

Texto:

"Somos um projeto criado para dar visibilidade aos gatos de uma colônia na Zona Leste de São Paulo. Nosso objetivo é aproximar esses pequenos companheiros de pessoas dispostas a oferecer amor, cuidado e um lar seguro."

Complemento:

"Mais do que encontrar famílias, queremos incentivar a adoção responsável e mostrar como pequenos gestos podem transformar vidas."

Botão:

"Conheça nossa história" → `/sobre`

## 5.3 Gatinhos em destaque

Título:

"Esses fofinhos estão esperando por você!"

Subtítulo:

"Cada gatinho tem sua personalidade, seus encantos e uma história especial para contar."

Mostrar de três a quatro gatos em destaque, obtidos dinamicamente dos mocks.

Cada cartão deve apresentar:

- Foto principal.
- Nome.
- Faixa etária.
- Sexo.
- Tipo de pelagem.
- Descrição curta.
- Características principais.
- Botão "Conhecer melhor".

A seleção deve depender do campo `destaque` dos dados.

Não exibir gatos adotados como disponíveis para adoção.

Botão ao final:

"Ver todos os gatinhos" → `/gatos`

## 5.4 Apresentação do Match Felino

Criar uma seção altamente visual e divertida.

Título:

"E se o seu melhor amigo estiver a um match de distância?"

Texto:

"Responda a algumas perguntinhas sobre suas preferências e descubra quais gatinhos mais combinam com você!"

Botão:

"Descobrir meu match" → `/match`

Incluir uma representação visual de cartões de gatos, corações e compatibilidade.

Adicionar um pequeno aviso:

"O resultado é uma sugestão baseada nas características conhecidas dos gatos. A adoção responsável envolve muito mais do que uma porcentagem!"

## 5.5 Tinder dos Gatos

Título:

"Amor à primeira patinha? 💗"

Texto:

"Conheça nossos gatinhos de um jeito diferente! Explore os perfis, favorite aqueles que conquistarem seu coração e descubra mais sobre cada um."

Botão:

"Explorar os gatinhos" → `/tinder`

## 5.6 Como funciona a adoção?

Mostrar três ou quatro etapas visualmente conectadas:

**1. Conheça os gatinhos**

"Explore os perfis e descubra quem pode fazer parte da sua família."

**2. Escolha seu companheiro**

"Conheça sua história, personalidade e necessidades."

**3. Entre em contato**

"Converse com os responsáveis pelo projeto para conhecer as próximas etapas."

**4. Adote com responsabilidade**

"Prepare seu lar para oferecer segurança, respeito e carinho ao novo integrante da família."

Botão:

"Entender o processo" → `/adotar`

## 5.7 Como ajudar

Título:

"Nem toda ajuda precisa vir com uma adoção."

Texto:

"Mesmo que você não possa adotar, ainda pode fazer parte dessa história. Sua contribuição ajuda a manter os cuidados com os gatos da colônia."

Criar cards para:

- Doações financeiras.
- Alimentação e materiais.
- Divulgação do projeto.

Botão:

"Quero ajudar" → `/ajudar`

## 5.8 Seção final

Título:

"Às vezes, tudo o que falta é uma chance de ser amado."

Texto:

"Conheça nossos gatinhos e ajude a escrever um novo capítulo na história deles."

Botão:

"Conhecer os gatinhos" → `/gatos`

---

# 6. Catálogo de gatos — `/gatos`

Criar uma página de exploração com visual de catálogo moderno.

## Cabeçalho

Título:

"Conheça nossos gatinhos 🐱"

Descrição:

"Personalidades diferentes, histórias únicas e muito amor para compartilhar. Explore os perfis e encontre um gatinho especial."

## Funcionalidades

Criar uma grade responsiva de cartões com:

- Campo de pesquisa por nome.
- Filtro por sexo.
- Filtro por tipo de pelagem.
- Filtro por faixa etária, quando disponível.
- Filtro por disponibilidade.
- Filtros de sociabilidade, brincadeira e carinho.
- Botão para limpar filtros.
- Ordenação por nome.
- Possibilidade de visualizar favoritos.

Os filtros devem funcionar com os dados mockados.

Atualizar a lista em tempo real conforme o usuário alterar suas escolhas.

Mostrar a quantidade de resultados.

## Cartões dos gatos

Cada gato deverá ter um cartão com:

1. Foto principal.
2. Nome em destaque.
3. Idade aproximada ou faixa etária.
4. Sexo.
5. Pelagem.
6. Pequena apresentação.
7. Indicadores visuais de personalidade.
8. Status de disponibilidade.
9. Botão de favorito.
10. Botão "Conhecer história".
11. Botão "Quero adotar", quando disponível.

**Os indicadores de personalidade devem seguir a escala de zero a três:**

- Sociabilidade: 0–3.
- Brincadeira: 0–3.
- Carinho: 0–3.

Exemplo de apresentação:

"🐾 Sociável: 3/3"

"🎾 Brincalhão: 2/3"

"💗 Carinhoso: 3/3"

Os valores devem vir dos dados do gato, sem serem fixados no componente.

Criar uma representação visual bonita com patinhas preenchidas, barras arredondadas ou indicadores equivalentes.

Se a informação não estiver disponível, mostrar "Não informado", em vez de inventar um valor.

## Estado vazio

Caso nenhum gato corresponda aos filtros, exibir:

"Ops! Nenhum gatinho apareceu por aqui."

"Que tal ajustar os filtros? Talvez seu novo amigo esteja esperando logo ali."

Botão:

"Limpar filtros"

---

# 7. Perfil individual — `/gatos/:slug`

Criar uma página detalhada para cada gato.

## Layout

No desktop:

- Galeria de imagens à esquerda.
- Informações principais à direita.
- História e detalhes abaixo.

No mobile:

- Galeria no topo.
- Informações organizadas verticalmente.
- CTA de adoção sempre facilmente acessível.

## Informações obrigatórias

Apresentar:

- Nome.
- Galeria de fotos.
- Sexo.
- Idade aproximada.
- Pelagem.
- Status de adoção.
- História.
- Personalidade.
- Níveis de sociabilidade, brincadeira e carinho.
- Observações de saúde, apenas quando informadas.
- Informações de castração e vacinação, quando conhecidas.
- Necessidades especiais, se houver.
- Informações adicionais relevantes.

Texto da seção de personalidade:

"Cada gatinho tem seu jeitinho de ser!"

Texto de apoio:

"Conheça um pouquinho mais sobre a personalidade deste fofinho. Essas características são observações e podem mudar conforme ele se adapta a um novo ambiente."

## Botões

- "Quero adotar [Nome]" → WhatsApp.
- "Adicionar aos favoritos".
- "Voltar para os gatinhos".

Adicionar também uma seção:

"Talvez você também se apaixone por..."

Mostrar até três outros gatos disponíveis.

## Disponibilidade

Tratar os estados:

- Disponível para adoção.
- Em processo de adoção.
- Adotado.
- Temporariamente indisponível.

Caso esteja adotado ou indisponível, não exibir o CTA como se ainda estivesse disponível.

---

# 8. Match Felino — Quiz de compatibilidade

Esta é uma das funcionalidades centrais do site e deve receber atenção especial.

Criar uma experiência interativa, semelhante a um quiz de aplicativos modernos.

## Tela inicial do quiz

Título:

"Descubra seu match felino! 💘"

Descrição:

"Todo gatinho tem uma personalidade única, e queremos te ajudar a encontrar um companheiro que combine com suas preferências!"

Texto secundário:

"São apenas cinco perguntinhas. Preparado para descobrir quem pode conquistar seu coração?"

Botão:

"Começar quiz"

Mostrar uma ilustração ou um gatinho decorativo.

## Interface do quiz

- Uma pergunta por tela.
- Indicador de progresso.
- Cinco etapas.
- Transição suave.
- Opções em cartões clicáveis.
- Destaque visual da opção selecionada.
- Botões de avançar e voltar.
- Possibilidade de reiniciar.
- Layout mobile-friendly.
- Navegação por teclado.

## Pergunta 1 — Sexo

Título:

"Você prefere um gatinho ou uma gatinha?"

Opções:

- Macho.
- Fêmea.
- Sem preferência.

## Pergunta 2 — Tipo de gato

Título:

"Qual desses estilos de gatinho encanta mais você?"

Opções:

- Laranja.
- Siamês / padrão siamês.
- Preto.
- Branco.
- Frajola.
- Cinza.
- Escaminha.
- Rajado.
- Sem preferência.

**Importante:** Esses tipos representam principalmente pelagens e aparências. Não devem ser tratados como raças comprovadas. Um gato com aparência siamesa não deve ser automaticamente classificado como um gato de raça Siamês.

Incluir pequenos desenhos ou representações visuais quando possível.

## Pergunta 3 — Sociabilidade

Título:

"Como você imagina a personalidade social do seu futuro amigo?"

Opções:

- 0 — Mais reservado.
- 1 — Pouco sociável.
- 2 — Sociável.
- 3 — Muito sociável.
- Sem preferência.

## Pergunta 4 — Brincadeira

Título:

"Qual nível de energia combina com você?"

Opções:

- 0 — Bem tranquilo.
- 1 — Pouco brincalhão.
- 2 — Brincalhão.
- 3 — Muito brincalhão.
- Sem preferência.

## Pergunta 5 — Carinho

Título:

"Quanto carinho você espera do seu companheiro?"

Opções:

- 0 — Mais independente.
- 1 — Pouco carinhoso.
- 2 — Carinhoso.
- 3 — Muito carinhoso.
- Sem preferência.

## Algoritmo de compatibilidade

Implementar uma função de compatibilidade real no frontend, utilizando os dados dos gatos.

Critérios sugeridos:

| Critério | Peso |
|---|---:|
| Sexo | 15% |
| Pelagem | 20% |
| Sociabilidade | 25% |
| Brincadeira | 20% |
| Carinho | 20% |

Regras:

1. Para sexo e pelagem, comparar a resposta com o campo correspondente do gato.
2. Para os três atributos numéricos, calcular a proximidade entre a preferência do usuário e o atributo do gato, ambos de zero a três.
3. Preferências marcadas como "Sem preferência" devem ser ignoradas no cálculo.
4. Normalizar os pesos de acordo com os critérios efetivamente selecionados.
5. Informações desconhecidas de gatos não devem ser inventadas nem tratadas como valor zero.
6. Quando houver dados desconhecidos, informar que a estimativa é parcial e usar a quantidade de critérios avaliados para diferenciar resultados equivalentes.
7. Se o usuário escolher "Sem preferência" em tudo, mostrar os gatos disponíveis sem criar percentuais artificiais.
8. Ordenar os resultados da maior para a menor compatibilidade.
9. Manter o algoritmo isolado e testável.
10. Disponibilizar uma explicação simples do cálculo na interface.

A compatibilidade deve ser apresentada como **afinidade estimada**, nunca como garantia de adaptação ou sucesso na adoção.

## Tela de resultados

Título:

"Encontramos alguns amiguinhos para você! 💕"

Descrição:

"Com base nas suas preferências, estes são os gatinhos que mais combinam com o que você procura."

Para cada gato:

- Foto.
- Nome.
- Afinidade estimada, quando houver dados suficientes.
- Características.
- Breve descrição.
- Quantidade de critérios utilizados no cálculo.
- Botão "Conhecer melhor".
- Botão "Quero adotar".

Destacar o primeiro resultado com uma apresentação especial.

Adicionar:

- "Refazer quiz".
- "Ver todos os gatos".
- "Explorar no Tinder dos Gatos".

Mensagem de conscientização:

"Um match é só o começo! Conhecer as necessidades e a personalidade do animal é essencial antes da adoção."

---

# 9. Tinder dos Gatos — `/tinder`

Criar uma experiência divertida de cartões deslizáveis, inspirada na mecânica visual dos aplicativos de relacionamento, mas adaptada ao contexto de adoção responsável.

## Apresentação

Título:

"Um swipe, um miau, uma nova história!"

Descrição:

"Deslize os cartões, conheça os gatinhos e favorite aqueles que conquistarem seu coração."

## Cartões

Cada cartão deverá exibir:

- Foto grande.
- Nome.
- Idade aproximada.
- Sexo.
- Personalidade resumida.
- Ícones de sociabilidade, brincadeira e carinho.

## Interações

- Deslizar para a esquerda: próximo gato.
- Deslizar para a direita: adicionar aos favoritos.
- Botão com X: passar.
- Botão com coração: favoritar.
- Botão de informações: abrir perfil.
- Botão de desfazer a última ação.
- Animação de rotação e deslocamento dos cartões.

Ao favoritar, mostrar feedback:

"Esse fofinho conquistou seu coração! 💗"

O usuário deve poder acessar os gatos favoritos.

Os favoritos podem ser mantidos no `localStorage`, com opção para remover ou limpar.

Adicionar botões alternativos ao gesto para manter a funcionalidade acessível a pessoas que não conseguem deslizar cartões.

Não implementar falsos "matches mútuos". O interesse do usuário não significa que a adoção foi aprovada.

## Encerramento

Quando todos os gatos tiverem sido visualizados:

"Você conheceu todos os nossos fofinhos!"

"Quer rever algum deles ou conhecer melhor seus favoritos?"

Botões:

- "Ver meus favoritos".
- "Recomeçar".
- "Ver catálogo completo".

---

# 10. Como adotar — `/adotar`

Criar uma página clara, informativa e acolhedora.

## Título

"Adotar é transformar duas vidas."

## Introdução

"Adotar um gato é abrir espaço para uma nova amizade, cheia de descobertas, carinho e responsabilidade. Antes de dar esse passo, é importante conhecer as necessidades do animal e entender o compromisso de cuidar dele."

## Etapas

**1. Encontre seu gatinho**

"Explore os perfis e conheça as histórias dos gatos disponíveis."

**2. Demonstre seu interesse**

"Escolheu um gatinho especial? Clique em 'Quero adotar' para conversar com os responsáveis pelo projeto."

**3. Converse sobre a adoção**

"Entre em contato para esclarecer dúvidas, conhecer as necessidades do animal e receber orientações sobre o processo."

**4. Prepare um lar seguro**

"Antes da chegada do novo integrante, organize um espaço confortável, protegido e adequado às necessidades dele."

## Adoção responsável

Criar uma seção de conscientização com orientações:

- Um gato precisa de cuidados durante toda a vida.
- Alimentação e água devem estar sempre disponíveis.
- Acompanhamento veterinário é importante.
- Janelas e varandas precisam de proteção adequada.
- A adaptação pode levar tempo.
- O animal precisa de respeito, paciência e carinho.
- A adoção deve ser uma decisão consciente de todos os envolvidos.

Evitar apresentar regras internas específicas que ainda não foram confirmadas pela equipe.

## CTA

Título:

"Pronto para conhecer seu novo amigo?"

Botão:

"Ver gatinhos disponíveis" → `/gatos`

Adicionar também um botão de WhatsApp para dúvidas gerais sobre adoção.

---

# 11. Integração com WhatsApp — Obrigatória

O número oficial para contato sobre adoção é:

**11952685748**

Todos os botões que representam interesse direto em adotar devem redirecionar para:

`https://wa.me/5511952685748`

Utilizar o padrão internacional do WhatsApp com DDI 55.

## Mensagem para adoção de um gato específico

Gerar dinamicamente:

"Olá! Conheci o(a) [NOME_DO_GATO] pelo site Cats da ZL e gostaria de saber mais sobre ele(a) e o processo de adoção. 🐱"

Exemplo:

"Olá! Conheci a Amora pelo site Cats da ZL e gostaria de saber mais sobre ela e o processo de adoção. 🐱"

## Mensagem para dúvidas gerais

"Olá! Conheci o projeto Cats da ZL pelo site e gostaria de tirar algumas dúvidas sobre adoção."

## Requisitos técnicos

- Criar uma função utilitária centralizada para gerar os links.
- Utilizar `encodeURIComponent` para codificar a mensagem.
- Abrir em nova aba, quando adequado.
- Usar `rel="noopener noreferrer"` para links externos.
- Nunca repetir o número manualmente em vários componentes.
- Manter o número em um arquivo central de configuração.
- Não criar checkout de adoção.
- Não exigir cadastro antes do redirecionamento.
- Não criar um formulário falso que promete enviar mensagens sem backend.

O clique deve funcionar de verdade.

---

# 12. Como ajudar — `/ajudar`

Esta página deverá incentivar contribuições para o cuidado dos gatos da colônia.

## Título

"Seu carinho também pode chegar em forma de ajuda. 💗"

## Texto de apresentação

"Cada contribuição faz diferença para os gatos da nossa colônia. Sua ajuda pode colaborar com os cuidados necessários para proporcionar mais saúde, conforto e qualidade de vida a esses pequenos companheiros."

## Seção — Doação via Pix

Criar um cartão visualmente destacado, mas integrado à identidade do site.

Título:

"Faça uma doação via Pix"

Descrição:

"As contribuições recebidas são destinadas ao apoio dos cuidados com os gatos da colônia, como alimentação, higiene, atendimento veterinário e outros itens essenciais."

Incluir:

- Espaço para chave Pix.
- Botão "Copiar chave Pix".
- Área de QR Code, somente quando o QR Code oficial existir.
- Confirmação visual de cópia.
- Aviso para o usuário conferir os dados do destinatário antes de concluir uma transferência.

**Importante: a chave Pix real ainda não foi fornecida.**

Por enquanto:

- Utilizar configuração nula ou vazia para a chave.
- Mostrar "Chave Pix em breve".
- Desativar o botão de cópia até que exista uma chave válida.
- Não criar chaves bancárias fictícias.
- Não gerar QR Codes de pagamento falsos.

A doação deverá ser claramente voluntária e separada do interesse em adoção.

## Outras formas de ajudar

Criar três cards:

**Ajude com alimentação**

"Rações e outros itens apropriados ajudam a manter o bem-estar dos gatinhos."

**Compartilhe nosso projeto**

"Divulgar o Cats da ZL pode aproximar nossos gatinhos de futuras famílias."

**Espalhe a adoção responsável**

"Compartilhe informações e ajude a conscientizar mais pessoas sobre os cuidados com os animais."

Não prometer coleta, recebimento ou entrega de materiais sem que o projeto tenha definido esse procedimento.

## Transparência

Criar uma seção informativa sobre a finalidade das contribuições.

Não inventar valores arrecadados, despesas, relatórios financeiros ou campanhas concluídas.

Deixar a arquitetura preparada para uma futura seção de prestação de contas, alimentada por dados reais.

---

# 13. Sobre nós — `/sobre`

## Título

"Por trás de cada patinha, existe uma história. E por trás deste projeto, muito carinho."

## Quem somos

Texto:

"Somos um grupo de estudantes da área administrativa que desenvolveu o Cats da ZL como parte de um Trabalho de Conclusão de Curso (TCC). Nosso projeto une planejamento, organização e responsabilidade social para dar mais visibilidade aos gatos de uma colônia da Zona Leste de São Paulo."

## Nossa missão

"Aproximar os gatos da colônia de pessoas dispostas a oferecer um lar seguro e responsável, promovendo a conscientização sobre o respeito e o cuidado com os animais."

## Nossa visão

"Contribuir para que mais gatos tenham oportunidades de viver com segurança, cuidado e carinho."

## Nossos valores

Criar cards com:

- Amor e respeito pelos animais.
- Responsabilidade.
- Transparência.
- Empatia.
- Compromisso social.
- Educação e conscientização.

## Nossa iniciativa

Texto:

"O Cats da ZL nasceu da vontade de transformar conhecimento em ação. Acreditamos que organização, informação e participação da comunidade podem contribuir para melhorar a qualidade de vida dos animais."

## Aviso importante

"Não somos um abrigo e não recebemos novos animais. Nossa atuação é dedicada exclusivamente aos gatos que já fazem parte da colônia."

Criar uma área opcional para apresentação dos integrantes do TCC, com nomes, fotos e funções somente quando esses dados forem fornecidos.

---

# 14. Perguntas frequentes — `/duvidas`

Criar um FAQ em accordion com animações suaves.

Utilizar as seguintes perguntas e respostas:

**1. Como posso adotar um gatinho?**

"Você pode explorar os perfis dos gatos disponíveis e clicar no botão 'Quero adotar'. Assim, poderá conversar diretamente pelo WhatsApp para conhecer melhor o processo."

**2. Posso escolher um gato pelo site?**

"Sim! Você pode conhecer os perfis, explorar as características de cada gatinho e demonstrar seu interesse. A disponibilidade e as próximas etapas deverão ser confirmadas com os responsáveis."

**3. O que é o Match Felino?**

"É um quiz divertido que compara suas preferências com as características conhecidas dos gatos, sugerindo aqueles que podem combinar mais com você."

**4. A compatibilidade garante que o gato vai se adaptar?**

"Não. A compatibilidade é apenas uma estimativa. Cada animal possui necessidades e comportamentos próprios, e a adaptação depende de vários fatores."

**5. O Cats da ZL recebe gatos abandonados?**

"Não. Nosso projeto é voltado exclusivamente aos gatos que já fazem parte da colônia e não funciona como abrigo ou serviço de recolhimento."

**6. Como posso contribuir sem adotar?**

"Você pode ajudar divulgando o projeto, compartilhando informações sobre adoção responsável ou contribuindo com as iniciativas de apoio à colônia."

**7. Para onde vão as doações?**

"As doações destinadas ao projeto ajudam a apoiar os cuidados dos gatos da colônia, incluindo alimentação, higiene e necessidades de saúde."

**8. Todos os gatos estão disponíveis para adoção?**

"Não necessariamente. A disponibilidade pode variar. Consulte o status apresentado no perfil e confirme as informações com os responsáveis."

**9. Como posso entrar em contato?**

"Você pode utilizar os canais informados na página de contato ou acessar diretamente nosso WhatsApp."

**10. Como saber se estou preparado para adotar?**

"Considere sua disponibilidade de tempo, condições para oferecer alimentação e cuidados veterinários, segurança do ambiente e compromisso com o animal ao longo da vida."

---

# 15. Contato — `/contato`

## Título

"Vamos conversar? 🐾"

## Texto

"Tem alguma dúvida sobre o projeto, quer saber mais sobre um gatinho ou deseja contribuir de alguma forma? Entre em contato com a gente!"

Criar cartões para:

### WhatsApp

Utilizar o número oficial:

`+55 11 95268-5748`

Botão:

"Conversar pelo WhatsApp"

### E-mail

O e-mail ainda será definido.

Exibir "E-mail em breve" enquanto não houver um endereço oficial.

### Instagram

O perfil oficial deve ser configurável.

Se a URL não estiver cadastrada, não gerar links fictícios.

### Outras redes sociais

Preparar suporte para inclusão posterior, mas não apresentar canais como oficiais sem confirmação.

Criar uma área de contato com visual acolhedor, pequenas ilustrações e elementos gráficos consistentes.

---

# 16. Dados mockados dos gatos

Como ainda não temos todas as fotos e informações reais, criar dados demonstrativos completos para permitir que o site funcione.

## Quantidade

Criar entre 10 e 12 perfis fictícios de gatos.

Exemplos de nomes:

- Mingau.
- Amora.
- Paçoca.
- Nino.
- Lua.
- Pipoca.
- Bento.
- Mel.
- Chico.
- Aurora.
- Frida.
- Simba.

Esses nomes são apenas exemplos demonstrativos, não representam necessariamente os gatos da colônia.

## Diversidade

Distribuir diferentes:

- Sexos.
- Pelagens.
- Idades.
- Personalidades.
- Níveis de sociabilidade.
- Níveis de brincadeira.
- Níveis de carinho.
- Status de disponibilidade.

Criar pequenas histórias fictícias coerentes para os perfis de demonstração.

Exemplo:

**Amora**

"Amora é uma gatinha curiosa e carinhosa que adora observar tudo ao seu redor. Quando se sente à vontade, mostra seu jeitinho brincalhão e gosta de receber atenção."

Características:
- Sexo: fêmea.
- Pelagem: preta.
- Sociabilidade: 3.
- Brincadeira: 2.
- Carinho: 3.

## Fotos mockadas

Utilizar imagens demonstrativas coerentes de gatos ou placeholders visuais bem elaborados.

Priorizar:

- Imagens que carreguem corretamente.
- Fotografias de boa qualidade, quando disponíveis para uso.
- Proporções consistentes.
- Diversidade visual dos animais.
- Fallback para imagem ausente.
- Descrições alternativas acessíveis.

Evitar serviços instáveis de imagens aleatórias em produção.

Se não houver imagens adequadas, criar placeholders SVG locais com ilustrações de gatos, personalizados por pelagem.

Não inventar fotos reais dos animais da colônia.

## Identificação de conteúdo fictício

Enquanto `IS_DEMO` estiver ativado:

- Exibir um aviso discreto e claro de que os perfis dos gatos são demonstrativos.
- Evitar comunicar que os gatos fictícios estão realmente disponíveis.
- Não exibir dados fictícios como resultados reais do TCC.
- Usar contadores demonstrativos apenas quando explicitamente identificados como tal.

Separar os dados de demonstração do conteúdo institucional confirmado.

---

# 17. Documentação obrigatória — `data.md`

**Criar obrigatoriamente um arquivo `data.md` na raiz do projeto.**

Este arquivo deve explicar, de maneira completa e organizada, todos os dados reais necessários para substituir os mocks.

Não basta incluir uma lista genérica de informações pendentes.

O arquivo deve servir como um guia operacional para a equipe do Cats da ZL alimentar o site com dados reais.

## Estrutura obrigatória do `data.md`

### 1. Introdução

Explicar:

- Quais partes do site utilizam dados demonstrativos.
- Por que os mocks foram criados.
- Onde ficam os arquivos de dados.
- Como identificar os dados ainda pendentes.
- Como substituir os mocks.
- Como desativar o modo demonstrativo.
- Como validar os dados antes da publicação.

### 2. Dados necessários de cada gato

Documentar os seguintes campos:

| Campo | Tipo | Obrigatório |
|---|---|---|
| `id` | string | Sim |
| `slug` | string | Sim |
| `nome` | string | Sim |
| `sexo` | enum | Sim |
| `pelagem` | enum | Sim |
| `idadeEstimada` | string ou null | Não |
| `faixaEtaria` | enum ou null | Não |
| `descricaoCurta` | string | Sim |
| `historia` | string | Sim |
| `sociabilidade` | number 0–3 ou null | Não |
| `brincadeira` | number 0–3 ou null | Não |
| `carinho` | number 0–3 ou null | Não |
| `fotos` | array | Sim, pode estar vazio |
| `status` | enum | Sim |
| `castrado` | boolean ou null | Não |
| `vacinado` | boolean ou null | Não |
| `vermifugado` | boolean ou null | Não |
| `necessidadesEspeciais` | string ou null | Não |
| `observacoesSaude` | string ou null | Não |
| `conviveComGatos` | boolean ou null | Não |
| `conviveComCaes` | boolean ou null | Não |
| `conviveComCriancas` | boolean ou null | Não |
| `destaque` | boolean | Sim |
| `dataAtualizacao` | string ISO | Sim |

Explicar o significado de cada campo e apresentar um exemplo completo em JSON ou TypeScript.

Utilizar `null` para informações desconhecidas.

Não confundir informação desconhecida com um valor negativo.

Por exemplo, `vacinado: null` significa que a vacinação não foi informada, e não que o gato não foi vacinado.

### 3. Escala de personalidade

Documentar:

**Sociabilidade**
- 0: mais reservado.
- 1: pouco sociável.
- 2: sociável.
- 3: muito sociável.

**Brincadeira**
- 0: muito tranquilo.
- 1: pouco brincalhão.
- 2: brincalhão.
- 3: muito brincalhão.

**Carinho**
- 0: mais independente.
- 1: pouco carinhoso.
- 2: carinhoso.
- 3: muito carinhoso.

Esclarecer que os valores devem se basear em observações de pessoas que conhecem os animais e podem mudar ao longo do tempo.

### 4. Fotos reais

Documentar:

- Quais fotos serão necessárias.
- Qual foto será a principal.
- Como adicionar fotos à galeria.
- Onde armazenar os arquivos.
- Como nomeá-los.
- Formatos aceitos.
- Tamanhos recomendados.
- Textos alternativos.
- Créditos, quando necessários.
- Autorização para utilização e publicação das fotografias.
- Como funciona o placeholder quando não existe uma foto.

### 5. Dados institucionais

Criar uma tabela com:

- Nome oficial do projeto.
- Logo.
- Descrição oficial.
- Nome dos integrantes do TCC.
- Funções dos integrantes.
- Fotos da equipe, se autorizadas.
- E-mail oficial.
- Número do WhatsApp.
- Instagram oficial.
- Outras redes sociais.
- Informações públicas autorizadas sobre a colônia.

Registrar que não se deve publicar a localização exata da colônia sem autorização e avaliação dos riscos aos animais.

### 6. Dados de doações

Documentar:

- Chave Pix oficial.
- Tipo de chave.
- Nome do destinatário.
- QR Code oficial, se houver.
- Texto sobre o destino das contribuições.
- Formas de ajuda autorizadas.
- Informações verificadas de prestação de contas, se futuramente disponíveis.

Explicar onde esses dados serão inseridos.

### 7. Onde substituir os mocks

Mostrar os nomes e caminhos exatos dos arquivos criados na implementação.

Exemplo:

- `src/data/cats.mock.ts`
- `src/config/site.ts`
- `src/types/cat.ts`
- `public/images/cats/`

Os caminhos documentados devem corresponder aos caminhos realmente utilizados no projeto.

### 8. Exemplo de cadastro real

Mostrar um objeto preenchido com dados explicitamente fictícios e explicar como trocar cada campo.

### 9. Migração futura para backend

Explicar como a arquitetura permitirá substituir os dados locais por uma API.

Documentar:

- Interfaces TypeScript.
- Estrutura de serviços.
- Campos necessários.
- Formato esperado das respostas.
- Tratamento de dados ausentes.
- Tratamento de erros.
- Separação entre UI e fonte de dados.

### 10. Checklist de publicação

Criar checklist com:

- [ ] Substituir perfis demonstrativos.
- [ ] Adicionar fotos reais autorizadas.
- [ ] Validar características.
- [ ] Confirmar disponibilidade de cada gato.
- [ ] Revisar histórias.
- [ ] Inserir chave Pix oficial.
- [ ] Confirmar destinatário da chave Pix.
- [ ] Inserir redes sociais.
- [ ] Inserir e-mail oficial.
- [ ] Confirmar WhatsApp.
- [ ] Validar textos institucionais.
- [ ] Remover avisos demonstrativos quando não houver mocks publicados.
- [ ] Testar links de adoção.
- [ ] Testar o quiz com os gatos reais.
- [ ] Testar site no celular.
- [ ] Revisar acessibilidade.
- [ ] Revisar privacidade e permissões de uso das imagens.

**O `data.md` deve ser um dos entregáveis finais mais completos do projeto.**

---

# 18. Arquitetura de arquivos sugerida

Organizar o projeto de forma semelhante a:

```text
cats-da-zl/
├── public/
│   ├── images/
│   │   ├── cats/
│   │   ├── illustrations/
│   │   └── branding/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── cats/
│   │   ├── quiz/
│   │   └── tinder/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Cats.tsx
│   │   ├── CatDetails.tsx
│   │   ├── Match.tsx
│   │   ├── Tinder.tsx
│   │   ├── Adoption.tsx
│   │   ├── Help.tsx
│   │   ├── About.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── NotFound.tsx
│   ├── data/
│   │   └── cats.mock.ts
│   ├── types/
│   │   └── cat.ts
│   ├── services/
│   │   └── cats.service.ts
│   ├── hooks/
│   ├── utils/
│   │   ├── compatibility.ts
│   │   └── whatsapp.ts
│   ├── config/
│   │   └── site.ts
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
├── data.md
├── README.md
└── package.json
```

A estrutura pode ser adaptada, desde que a organização e a separação de responsabilidades sejam mantidas.

---

# 19. Componentes reutilizáveis

Criar componentes como:

- `Header`
- `Footer`
- `MobileNavigation`
- `PrimaryButton`
- `SectionHeading`
- `CatCard`
- `CatGallery`
- `CatPersonality`
- `AvailabilityBadge`
- `FavoriteButton`
- `CatFilters`
- `EmptyState`
- `QuizProgress`
- `QuizQuestion`
- `QuizOption`
- `CompatibilityResult`
- `SwipeCard`
- `FAQAccordion`
- `PixDonationCard`
- `WhatsAppButton`
- `OrganicDecoration`
- `DemoNotice`
- `LoadingSkeleton`

Não é necessário criar um componente separado para cada pequeno elemento visual. O objetivo é evitar duplicação e melhorar a manutenção.

---

# 20. Responsividade

O site deve funcionar perfeitamente em:

- Celulares pequenos a partir de 320 px.
- Celulares comuns.
- Tablets.
- Notebooks.
- Monitores desktop.

Regras:

- Mobile-first.
- Navegação adaptativa.
- Cards que se reorganizam conforme a largura.
- Imagens responsivas.
- Nenhuma barra de rolagem horizontal indevida.
- Botões confortáveis para toque.
- Textos legíveis.
- Espaçamentos proporcionais.
- Quiz confortável em telas pequenas.
- Tinder utilizável por toque e por clique.
- Modal, menu e accordion acessíveis em mobile.

A versão mobile não deve parecer apenas uma versão desktop comprimida.

---

# 21. Acessibilidade

Implementar:

- HTML semântico.
- Navegação por teclado.
- Estados de foco visíveis.
- Labels acessíveis.
- Alt text nas imagens.
- Contraste adequado.
- Suporte a leitores de tela.
- Hierarquia correta de headings.
- Área de toque adequada.
- Feedback acessível ao favoritar.
- Progresso do quiz comunicado corretamente.
- Estados desativados claramente identificados.
- Preferência de movimento reduzido.

Não depender somente da cor para transmitir informações.

---

# 22. Estados e experiência do usuário

Todas as funcionalidades devem contemplar:

- Estado padrão.
- Hover.
- Foco.
- Clique.
- Estado vazio.
- Estado de carregamento, quando aplicável.
- Tratamento de erros.
- Feedback de sucesso.
- Dados ausentes.

Exemplos:

Quando não houver imagem:

"Foto em breve."

Quando não houver idade:

"Idade não informada."

Quando uma característica for desconhecida:

"Informação ainda não disponível."

Quando um gato não estiver disponível:

"Este gatinho não está disponível para adoção no momento."

Nunca utilizar `undefined`, `null` ou textos técnicos visíveis para o usuário.

---

# 23. Funcionalidades adicionais recomendadas

## Favoritos

Permitir que o usuário favorite gatos no catálogo, no perfil e no Tinder.

Manter a lista sincronizada entre páginas utilizando estado compartilhado e `localStorage`.

Criar uma interface para visualizar e remover favoritos.

Não exigir conta ou cadastro.

## Compartilhamento

Adicionar uma opção "Compartilhar perfil".

Utilizar a Web Share API quando disponível, com fallback para copiar o link.

## Scroll e navegação

- Botão de voltar ao topo, quando necessário.
- Scroll suave.
- Restauração adequada de rolagem nas rotas.
- Links de navegação funcionais.

## Página 404 personalizada

Texto:

"Ops! Esse gatinho se perdeu pelo caminho. 🐾"

"Não encontramos a página que você procurava, mas nossos fofinhos continuam por aqui!"

Botão:

"Voltar ao início"

## SEO básico

Configurar:

- Título do site.
- Meta description.
- Favicon.
- Open Graph básico.
- Idioma `pt-BR`.
- Títulos específicos por página.
- Estrutura semântica adequada.

Evitar publicar conteúdo demonstrativo como se fosse informação real em metadados.

## Contadores

Se incluir estatísticas como total de gatos, disponíveis e adotados, calcular a partir dos dados.

Enquanto forem utilizados mocks, identificar os números como demonstrativos.

Não inventar números de resgates, adoções concluídas ou doações.

---

# 24. Qualidade e desempenho

Priorizar:

- Carregamento rápido.
- Lazy loading de rotas e imagens.
- Imagens otimizadas.
- Componentes bem organizados.
- Código TypeScript tipado.
- Ausência de erros de console.
- Ausência de links quebrados.
- Layout sem overflow horizontal.
- Boas práticas de React.
- Separação entre lógica e apresentação.

Não adicionar bibliotecas desnecessárias.

Implementar testes para as funcionalidades essenciais quando possível, principalmente:

- Algoritmo de compatibilidade.
- Tratamento de "Sem preferência".
- Tratamento de dados desconhecidos.
- Filtros do catálogo.
- Persistência de favoritos.
- Links do WhatsApp.
- Status de disponibilidade.

---

# 25. Diretrizes de conteúdo

Todo o site deve estar em português brasileiro.

O tom de voz deve ser:

- Acolhedor.
- Amigável.
- Carinhoso.
- Positivo.
- Simples.
- Respeitoso.
- Natural.

Os textos devem ter personalidade, mas sem exagerar em emojis ou expressões infantis.

Exemplos de microcopy:

"Um novo amigo pode estar esperando por você."

"Pequenas patinhas, grandes histórias."

"Seu próximo melhor amigo pode ter bigodes!"

"Tem espaço para mais amor aí?"

"Um carinho pode mudar uma vida."

"Conheça, se apaixone e adote com responsabilidade."

Evitar:

- Promessas de adoção garantida.
- Afirmações médicas não verificadas.
- Histórias reais inventadas.
- Depoimentos fictícios apresentados como verdadeiros.
- Linguagem que pressione emocionalmente o usuário.
- Prometer que um gato terá determinado comportamento para sempre.
- Solicitar informações pessoais desnecessárias.
- Expor localização precisa dos animais.
- Apresentar o projeto como abrigo.

---

# 26. Critérios de aceitação

A implementação só estará completa quando:

1. Todas as rotas planejadas existirem.
2. O header e o footer estiverem funcionais.
3. O layout estiver consistente com Playful Organic Design.
4. Fredoka e Nunito estiverem aplicadas corretamente.
5. A paleta rosa estiver consistente.
6. O catálogo exibir dados demonstrativos funcionais.
7. Os filtros de gatos funcionarem.
8. Os perfis individuais funcionarem.
9. Os níveis de personalidade forem exibidos corretamente.
10. O quiz tiver cinco perguntas completas.
11. O algoritmo calcular afinidade e ordenar resultados.
12. O Tinder permitir navegar e favoritar gatos.
13. Os favoritos estiverem sincronizados.
14. Os CTAs de adoção direcionarem para o WhatsApp correto.
15. As mensagens de adoção incluírem o nome do gato.
16. A página de doações não exibir dados financeiros falsos.
17. O FAQ estiver funcional.
18. Os layouts estiverem responsivos.
19. Dados ausentes forem tratados corretamente.
20. Acessibilidade básica estiver implementada.
21. O modo demonstrativo estiver claramente identificado.
22. O arquivo `data.md` existir e documentar todos os dados necessários.
23. O `README.md` explicar instalação, execução e estrutura.
24. O projeto iniciar sem erros.
25. Não existirem botões decorativos sem funcionalidade.

---

# 27. Resultado esperado

Entregar um **frontend completo e funcional do Cats da ZL**, visualmente marcante, com personalidade própria, agradável de navegar e preparado para receber dados reais futuramente.

O site deve causar uma sensação de carinho e proximidade com os gatos, sem perder o compromisso com a responsabilidade e a transparência.

Priorize uma execução visual bem trabalhada, especialmente na página inicial, nos perfis dos gatos e no Match Felino.

Não quero uma interface genérica criada apenas para preencher requisitos. Quero um projeto com atenção aos detalhes, boa experiência do usuário, tipografia expressiva, composição orgânica, animações sutis e componentes coerentes.

**Implemente o projeto, e não apenas descreva como ele seria.**

Ao finalizar, apresente:

- Resumo das funcionalidades implementadas.
- Estrutura de arquivos.
- Como executar o projeto localmente.
- Como funciona o quiz.
- Como funciona o redirecionamento para WhatsApp.
- Onde substituir dados e fotos mockados.
- Localização e explicação do arquivo `data.md`.
- Quais configurações ainda dependem de dados reais.

A meta é que o Cats da ZL esteja pronto para ser apresentado no TCC e, posteriormente, transformado em um site público real de divulgação e adoção dos gatos da colônia.