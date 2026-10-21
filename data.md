# Dados dos gatinhos

O site lê os arquivos de `src/cats/` com `import.meta.glob` do Vite. Catálogo, perfis, favoritos, match e Tinder usam a mesma fonte. A home também mostra fotos e nomes reais. Não há backend.

## Adicionar ou atualizar um gatinho

Crie uma pasta com esta estrutura:

```text
src/cats/Nome do gatinho/
  desc.txt
  photos/
    01-principal.jpeg
    02-descansando.jpeg
```

Também é aceito um arquivo chamado `desc`, sem extensão. Use apenas um dos dois por pasta. Fotos podem ser JPEG, JPG, PNG, WebP ou AVIF, com extensão minúscula ou maiúscula. Espaços e acentos nos nomes dos arquivos são aceitos.

Formato recomendado de `desc.txt` (modelo de preenchimento):

```text
Nome: Nome do gatinho
Gênero: Fêmea
Cor: Frajola
Status: disponivel
Castrada: Não informado

Descrição: Escreva aqui a história real do gatinho.
Pode usar vários parágrafos e emojis.

Site:
Sociável: 2/3
Brincalhão: 3/3
Carinhoso: 2/3
```

As descrições originais também são aceitas, incluindo marcadores `*`/`•`, o nome vindo da pasta, gênero feminino/masculino e os metadados soltos do Mu. Prefira o formato acima nos próximos cadastros. Os cartões exibem a história completa, preservando as quebras de linha do relato. A introdução do perfil usa um resumo de até 180 caracteres, seguido da história completa.

O nome gera o identificador e a URL sem acentos, por exemplo `Ângela` → `/gatos/angela`. Evite renomear gatos já cadastrados: isso altera links e favoritos. Nomes duplicados são rejeitados.

## Características e disponibilidade

- Gênero: Macho ou Fêmea. Os qualificadores dos relatos atuais são normalizados.
- Cor: Laranja, Padrão siamês, Preto, Branco, Frajola, Cinza, Escaminha, Rajado ou Rajado e branco. “Tigrado”, “Tigrado branco” e “Tigrado e branco” são normalizados para as opções rajadas.
- Personalidade: notas de `0/3` a `3/3`. Omitir uma nota significa desconhecida; zero é uma observação válida. Notas fora da escala geram erro de carregamento.
- Castrado/Castrada: `Sim`, `Não` ou `Não informado`. O campo de Mijona reproduz a informação explícita do relato.
- Status: `disponivel`, `em_processo`, `adotado` ou `indisponivel`.

**Sem `Status:`, o cadastro é considerado disponível.** Os sete relatos recebidos não indicavam status; todos entraram com esse padrão. Confirme e atualize o campo conforme a situação de cada gato. Apenas disponíveis aparecem no match e no Tinder. Os demais continuam no catálogo, sem botão de adoção.

Idade, fase da vida, vacinação, vermifugação, convivência, necessidades especiais e data de atualização não foram fornecidas e ficam como `null`. O carregador não estima esses dados pelas fotografias ou pelo tom das histórias. Para acrescentar esses campos futuramente, amplie o adaptador em `src/utils/cat-description.ts` e a cobertura em `tests/cats.test.ts`.

## Fotos

Todas as imagens de `photos/` entram na galeria, ordenadas pelo nome do arquivo (com ordenação numérica). A primeira é a capa. Para controlar a ordem, use prefixos como `01-`, `02-`, `03-`. Sem fotos ou se uma imagem falhar, aparece “Foto em breve”. Os arquivos originais não são transformados.

Depois de adicionar ou alterar arquivos, rode `npm run build` e publique o novo `dist/` para atualizar a versão hospedada. Em desenvolvimento, o Vite acompanha as mudanças.

## Onde fica cada parte

| Arquivo | Função |
| --- | --- |
| `src/cats/` | Relatos e fotos reais |
| `src/data/cats.ts` | Descoberta das pastas, fotos e ordenação |
| `src/utils/cat-description.ts` | Leitura e normalização dos relatos |
| `src/services/cats.service.ts` | Entrada dos dados no estado compartilhado |
| `src/types/cat.ts` | Tipos e opções de filtros |
| `src/data/coat-images.ts` | Ilustrações das opções de pelagem do quiz |
| `tests/fixtures/cats.ts` | Exemplos fictícios usados apenas nos testes |

O serviço mantém a assinatura `list(): Promise<Cat[]>`, permitindo uma futura API sem mudar as páginas. Dados inválidos passam pelo estado de erro existente, com opção de tentar novamente.

## Contatos e doações

A configuração continua em `src/config/site.ts`: WhatsApp, e-mail, Instagram, redes sociais, equipe, Pix e transparência. Valores não fornecidos ficam vazios. O Pix só habilita cópia quando chave e destinatário estão configurados; o QR Code depende de um arquivo fornecido. Links de WhatsApp preenchem uma mensagem com o nome do gatinho, e a pessoa decide enviá-la.

## Verificação

```bash
npm test
npm run build
npm run test:e2e
```

Os testes cobrem os sete relatos, as 21 fotos, notas, dados desconhecidos, busca, match, galeria, favoritos, navegação, acessibilidade e tamanhos de tela. Os testes não enviam mensagens nem realizam adoções.
