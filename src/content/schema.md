# Schema — Content Loader

Documenta a estrutura do objeto exportado por `contentLoader.js`.
Para atualizar copy ou imagens, edite **apenas** `contentLoader.js`.
Os componentes consomem `content` via import e **nunca** têm texto hardcoded.

---

## Como atualizar imagens

1. Substitua o arquivo em `/imagens/` (mantenha o mesmo nome) **ou**
2. Adicione o novo arquivo em `/imagens/` e atualize o `import` no topo de `contentLoader.js`

## Como atualizar textos

Edite os valores de string dentro de `contentLoader.js`. Nunca toque nos componentes.

---

## Estrutura do objeto `content`

### `brand` (obrigatório)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | string | ✅ | Nome da marca |
| `tagline` | string | ✅ | Tagline institucional |
| `institutionFull` | string | ✅ | Nome completo da instituição |

---

### `meta`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | ✅ | Título da página (SEO) |
| `description` | string | ✅ | Meta description |

---

### `hero`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `headline` | string | ✅ | Título principal (H1, ~60px) |
| `subtitle` | string | ✅ | Subtítulo descritivo |
| `description` | string | ✅ | Parágrafo de detalhamento |
| `badges` | `{id, text}[]` | ✅ | Badges de atributos (ex: "Evento ao vivo") |
| `cta.text` | string | ✅ | Texto do botão CTA |
| `cta.ariaLabel` | string | ✅ | Label acessível do botão |
| `image.src` | string (url) | ✅ | Imagem de background do hero |
| `image.alt` | string | ✅ | Alt text acessível da imagem |

---

### `eventPlan`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `sectionLabel` | string | ✅ | Label uppercase acima do título |
| `headline` | string | ✅ | Título da seção (H2) |
| `topics` | `Topic[]` | ✅ | Array de tópicos da live |

**Topic:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | ✅ | Identificador único |
| `number` | string | ✅ | Número do tópico (ex: "01") |
| `title` | string | ✅ | Título do tópico (H3) |
| `intro` | string | ❌ | Parágrafo de introdução opcional |
| `items` | `string[]` | ✅ | Lista de bullet points |
| `note` | string \| null | ❌ | Nota de rodapé do card |

---

### `professor`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `sectionLabel` | string | ✅ | Label uppercase |
| `name` | string | ✅ | Nome do professor |
| `image.src` | string | ✅ | Foto do professor |
| `image.alt` | string | ✅ | Alt text |
| `credentials` | `string[]` | ✅ | Lista de credenciais/titulações |

---

### `institution`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `sectionLabel` | string | ✅ | Label uppercase |
| `name` | string | ✅ | Nome da instituição |
| `description` | string | ✅ | Descrição principal |
| `detail` | string | ✅ | Parágrafo de detalhamento |
| `image.src` | string | ✅ | Imagem da equipe |
| `image.alt` | string | ✅ | Alt text |

---

### `cta`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `sectionLabel` | string | ✅ | Label uppercase |
| `headline` | string | ✅ | Título do CTA |
| `description` | string | ✅ | Subtexto de urgência/escassez |
| `button.text` | string | ✅ | Texto do botão |
| `button.ariaLabel` | string | ✅ | Label acessível |

---

### `form`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `title` | string | ✅ | Título do modal |
| `subtitle` | string | ✅ | Subtítulo |
| `fields` | `Field[]` | ✅ | Campos do formulário |
| `submit` | string | ✅ | Texto do botão de submit |
| `successTitle` | string | ✅ | Título após envio bem-sucedido |
| `successMessage` | string | ✅ | Mensagem após envio |

**Field:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | string | ✅ | Atributo `name` do input |
| `label` | string | ✅ | Label visível |
| `type` | string | ✅ | Tipo HTML do input |
| `required` | boolean | ✅ | Se é obrigatório |
| `placeholder` | string | ❌ | Placeholder |
| `autocomplete` | string | ❌ | Atributo autocomplete |

---

### `footer`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `brand` | string | ✅ | Nome da marca |
| `tagline` | string | ✅ | Tagline |
| `copyright` | string | ✅ | Texto de copyright |
