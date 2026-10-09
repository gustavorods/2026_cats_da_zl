# Cats da ZL

Frontend em português para divulgar o projeto de cuidado e adoção responsável dos gatos de uma colônia da Zona Leste de São Paulo. Implementado conforme `prompt.md`, com React, Vite, TypeScript estrito, Tailwind CSS 4, React Router e Lucide. Animações sutis usam CSS e respeitam movimento reduzido.

**O site está em demonstração:** os 12 gatos e suas histórias são fictícios. O projeto não é abrigo e não recebe novos animais. Não há backend, banco, cadastro, formulários de envio ou serviço pago.

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
| `/gatos`       | Busca por nome, sete filtros, ordenação e favoritos                            |
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
  config/site.ts        # modo demonstrativo e configuração oficial
  data/                 # gatos, quiz e FAQ
  hooks/AppProvider.tsx # carregamento, favoritos e notificações
  pages/                # onze páginas, carregadas sob demanda
  services/             # acesso à fonte de cadastros
  styles/index.css      # identidade, responsividade e animações
  types/cat.ts          # contratos TypeScript
  utils/                # afinidade, filtros, WhatsApp, storage e share
  App.tsx
  main.tsx
tests/
  core.test.ts          # regras e integridade
  e2e/site.spec.ts      # fluxos e larguras de 320 a 1440 px
data.md                 # guia operacional para dados reais
prompt.md               # especificação original preservada
```

## Quiz

O algoritmo está isolado em `src/utils/compatibility.ts`. Sexo e pelagem usam correspondência exata. Sociabilidade, brincadeira e carinho usam distância de 0 a 3. Pesos: 15/20/25/20/20. Critérios sem preferência ou sem observação são excluídos e os pesos são normalizados. A interface mostra quantos critérios foram avaliados e informa estimativas parciais. Empates priorizam mais dados conhecidos. Sem preferências não existem percentuais. Apenas perfis com status `disponivel` participam.

A afinidade é uma sugestão, não garante adaptação nem aprovação da adoção.

## WhatsApp

O número `5511952685748` fica em `src/config/site.ts`. `src/utils/whatsapp.ts` cria links `https://wa.me/...` com `encodeURIComponent`, incluindo o nome e os pronomes do gato. Em modo demo, acrescenta que o perfil é demonstrativo e pede informações dos gatos reais. O clique abre o WhatsApp; **a pessoa decide enviar a mensagem**. Gatos em processo, adotados ou indisponíveis não recebem CTA de adoção. O CTA do menu leva a `/adotar`.

## Dados reais e imagens

Consulte **[data.md](./data.md)** antes de atualizar os cadastros. Ele documenta cada campo, fotos, escalas, permissões, contatos, Pix, substituição dos mocks, exemplo completo, migração para API e checklist de publicação.

Os cadastros atuais ficam em `src/data/cats.mock.ts`; o serviço permite trocar por outra fonte. Fotos são armazenadas em `public/images/cats/`. Os SVGs foram criados localmente, por pelagem, e não dependem de serviços aleatórios. O gerador é reproduzível: `node scripts/generate-illustrations.mjs`.

As fontes Fredoka e Nunito são carregadas pelo Google Fonts e precisam de internet para seu primeiro carregamento; há fallback sans-serif. Ilustrações e funcionalidades do site são locais.

## Pendências para publicação real

Confirmar perfis e fotos autorizadas dos animais, chave Pix e destinatário, e-mail, Instagram, integrantes e conteúdo institucional. O WhatsApp fornecido já está configurado. `IS_DEMO` deve continuar ativo até concluir a substituição. A home contém composições decorativas com nomes demonstrativos que também devem ser revisados.

`npm run build` gera um site estático em `dist/`. A hospedagem precisa servir `index.html` para rotas como `/gatos/mingau` e `/match`. Não foram configurados domínio, hospedagem ou publicação automática. Atualize os metadados de `index.html` ao publicar conteúdo real.
