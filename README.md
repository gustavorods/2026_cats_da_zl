# Cats da ZL

Frontend em português para divulgar o projeto de cuidado e adoção responsável dos gatos de uma colônia da Zona Leste de São Paulo. Implementado conforme `prompt.md`, com React, Vite, TypeScript estrito, Tailwind CSS 4, React Router e Lucide. Animações sutis usam CSS e respeitam movimento reduzido.

**O site usa os dados reais de `src/cats/`:** são 7 gatos, com suas histórias, notas de personalidade e 21 fotos. O projeto não é abrigo e não recebe novos animais. Não há backend, banco, cadastro, formulários de envio ou serviço pago.

## Executar

Requer Node.js 22.20+ e npm.

```bash
npm install
npm run dev
```

Acesse a URL exibida pelo Vite, normalmente `http://localhost:5173`.

```bash
npm run build    # verifica TypeScript e gera dist/
npm run preview  # serve o build para revisão local
npm test         # testes da lógica
npm run test:e2e # testes reais de navegação com Google Chrome instalado
```

Os testes E2E iniciam o servidor automaticamente. `playwright.config.ts` usa o Chrome do sistema (`channel: 'chrome'`). Em ambientes sem Chrome, instale o navegador com `npx playwright install chrome` ou adapte a configuração para um Chromium disponível. Os testes não enviam mensagens, não fazem transferências e não realizam adoções.

## Funcionalidades e rotas

| Rota           | Conteúdo                                                                       |
| -------------- | ------------------------------------------------------------------------------ |
| `/`            | Apresentação visual, destaques dinâmicos, match, adoção e ajuda                |
| `/gatos`       | Busca por nome, cinco filtros, ordenação e favoritos                            |
| `/gatos/:slug` | Galeria, história, personalidade, saúde, compartilhar e interesse via WhatsApp |
| `/match`       | Quiz de cinco perguntas e afinidade estimada                                   |
| `/tinder`      | Cartões por gesto ou botões, favoritos, desfazer e recomeçar                   |
| `/adotar`      | Etapas e adoção responsável                                                    |
| `/ajudar`      | Pix condicionado aos dados oficiais, materiais e divulgação                    |
| `/sobre`       | Missão, visão, valores e equipe opcional                                       |
| `/duvidas`     | Dez respostas em accordion acessível                                           |
| `/contato`     | WhatsApp e canais configuráveis                                                |
| demais rotas   | Página 404 personalizada                                                       |

Favoritos funcionam sem conta, sincronizados entre páginas e abas da mesma origem, persistidos em `localStorage`. Compartilhamento usa Web Share API e cópia de link como alternativa. Dados ausentes, fotos inválidas, listas vazias e erros de carregamento têm tratamento na interface.

## Estrutura

```text
public/
  favicon.svg
  images/cats/          # 16 ilustrações por pelagem + placeholder
scripts/
  generate-illustrations.mjs
src/
  components/           # layout, cartões e elementos reutilizáveis
  cats/                 # uma pasta por gato, com desc.txt e photos/
  config/site.ts        # configuração oficial
  data/                 # carregamento dos gatos, quiz e FAQ
  hooks/AppProvider.tsx # carregamento, favoritos e notificações
  pages/                # onze páginas, carregadas sob demanda
  services/             # acesso à fonte de cadastros
  styles/index.css      # identidade, responsividade e animações
  types/cat.ts          # contratos TypeScript
  utils/                # afinidade, filtros, WhatsApp, storage e share
  App.tsx
  main.tsx
tests/
  core.test.ts          # regras com fixtures isoladas
  cats.test.ts          # integração dos relatos e fotos reais
  e2e/site.spec.ts      # fluxos e larguras de 320 a 1440 px
data.md                 # guia operacional para dados reais
prompt.md               # especificação original preservada
```

## Quiz

O algoritmo está isolado em `src/utils/compatibility.ts`. Sexo e pelagem usam correspondência exata. Sociabilidade, brincadeira e carinho usam distância de 0 a 3. Pesos: 15/20/25/20/20. Critérios sem preferência ou sem observação são excluídos e os pesos são normalizados. A interface mostra quantos critérios foram avaliados e informa estimativas parciais. Empates priorizam mais dados conhecidos. Sem preferências não existem percentuais. Apenas perfis com status `disponivel` participam.

A afinidade é uma sugestão, não garante adaptação nem aprovação da adoção.

## WhatsApp

O número `5511952685748` fica em `src/config/site.ts`. `src/utils/whatsapp.ts` cria links `https://wa.me/...` com `encodeURIComponent`, incluindo o nome e os pronomes do gato. O clique abre o WhatsApp; **a pessoa decide enviar a mensagem**. Gatos em processo, adotados ou indisponíveis não recebem CTA de adoção. O CTA do menu leva a `/adotar`.

## Dados reais e imagens

Os cadastros são carregados de `src/cats/<pasta>/desc.txt` (ou `desc`) e as fotos de `src/cats/<pasta>/photos/`. O Vite inclui os arquivos no build; não é necessário cadastrar imports por foto nem copiar arquivos para `public/`. Veja o formato e as instruções em **[data.md](./data.md)**.

Idade, vacinação, vermifugação, convivência e data de atualização permanecem desconhecidas quando não fornecidas. A castração de Mijona foi transcrita do relato para o campo `Castrada: Sim`. Os perfis usam `disponivel` por padrão; o campo `Status:` permite alterar a disponibilidade. Os dados fictícios ficaram somente em `tests/fixtures/`, para testar casos como notas desconhecidas e diferentes status.

As ilustrações em `public/images/cats/` continuam nas opções de pelagem do quiz, em seções institucionais e no fallback de foto ausente. A home usa fotos reais.

As fontes Fredoka e Nunito são carregadas pelo Google Fonts e precisam de internet para seu primeiro carregamento; há fallback sans-serif. Ilustrações e funcionalidades do site são locais.

## Pendências para publicação real

Revisar a disponibilidade dos animais e completar, quando fornecidos, chave Pix e destinatário, e-mail, Instagram e integrantes. O WhatsApp fornecido já está configurado. `IS_DEMO` está desativado porque os cadastros exibidos são reais.

`npm run build` gera um site estático em `dist/`. A hospedagem precisa servir `index.html` para rotas como `/gatos/mijona` e `/match`. Não foram configurados domínio, hospedagem ou publicação automática.
