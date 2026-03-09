# Documentação de Design — Análise Visual da Landing Page

**Fonte**: [Clube da Liberdade Médica](https://liberdademedicaedu.com.br/clube-da-liberdade-medica) **Objetivo**: Replicar a estrutura e estética da página com a nova paleta **Preto \+ Azul (\#2e52eb)**

---

## 1\. Visão Geral da Página

A página é uma **landing page de alta conversão** em dark mode, composta por 7 seções sequenciais que seguem uma narrativa persuasiva clássica: provocação, dor, solução, prova, benefícios, preço e CTA final. O design é sóbrio, com espaçamento generoso e uso estratégico de uma cor de destaque (originalmente vermelho/coral) contra um fundo predominantemente preto.

A estrutura narrativa segue o modelo **PAS (Problem–Agitation–Solution)**, onde cada seção aprofunda a urgência antes de apresentar a oferta.

---

## 3\. Paleta de Cores Original (Extraída via CSS Computado)

### 3.1 Cores de Fundo

| Cor | Valor RGB | Uso na Página |
| :---- | :---- | :---- |
| Preto absoluto | `rgb(0, 0, 0)` | Fundo principal das seções |
| Quase preto | `rgb(4, 4, 4)` / `rgb(5, 5, 5)` | Variações sutis entre seções |
| Slate escuro | `rgb(15, 23, 42)` | Fundo de botões e elementos interativos |
| Overlay forte | `rgba(0, 0, 0, 0.8)` | Sobre imagem do hero |
| Overlay médio | `rgba(0, 0, 0, 0.6)` / `rgba(0, 0, 0, 0.7)` | Camadas de escurecimento |
| Branco sutil | `rgba(255, 255, 255, 0.05)` | Fundo de cards glassmorphism |
| Vermelho transparente | `rgba(239, 68, 68, 0.2)` | Glow/destaque em badges |

### 3.2 Cores de Texto

| Cor | Valor RGB | Classe Tailwind Equivalente | Uso |
| :---- | :---- | :---- | :---- |
| Branco puro | `rgb(255, 255, 255)` | `white` | Títulos principais (H1, H2) |
| Cinza muito claro | `rgb(229, 231, 235)` | `gray-200` | Texto de corpo principal |
| Cinza claro | `rgb(209, 213, 219)` | `gray-300` | Texto de corpo secundário |
| Cinza médio | `rgb(156, 163, 175)` | `gray-400` | Descrições e subtextos |
| Cinza escuro | `rgb(107, 114, 128)` | `gray-500` | Labels terciários, copyright |
| Vermelho/Coral | `rgb(248, 113, 113)` | `red-400` | Destaques, títulos de cards, números |
| Rosa claro | `rgb(252, 165, 165)` | `red-300` | Variação de destaque secundário |
| Rosa mais claro | `rgb(254, 202, 202)` | `red-200` | Destaque terciário |

### 3.3 Cor de Destaque (Accent)

A cor de destaque original é o **vermelho/coral do Tailwind**, usado em 3 variações de intensidade para criar hierarquia visual dentro da própria cor de destaque.

---

## 4\. Mapeamento de Cores: Original para Nova Paleta

A substituição direta do vermelho/coral pelo azul \#2e52eb, mantendo a mesma lógica de hierarquia:

| Função | Original (Vermelho) | Nova Paleta (Azul) | Uso |
| :---- | :---- | :---- | :---- |
| Destaque primário | `rgb(248, 113, 113)` / `red-400` | **\#2e52eb** | Títulos de cards, números, destaques em texto |
| Destaque secundário | `rgb(252, 165, 165)` / `red-300` | **\#6b8af0** | Variação mais clara para hover states |
| Destaque terciário | `rgb(254, 202, 202)` / `red-200` | **\#a3b5f5** | Textos de menor destaque |
| Glow/transparente | `rgba(239, 68, 68, 0.2)` | **rgba(46, 82, 235, 0.2)** | Badges, efeitos de glow |
| Glow forte | — | **rgba(46, 82, 235, 0.15)** | Box-shadow em hover de cards |
| Fundo de botão | `rgb(248, 113, 113)` | **\#2e52eb** | CTAs principais |
| Preto (mantém) | `rgb(0, 0, 0)` | `rgb(0, 0, 0)` | Fundo principal |
| Brancos/Cinzas (mantém) | Todos os valores | Todos os valores | Textos e hierarquia |

### 4.1 Variações Recomendadas do Azul

| Nome | Hex | RGB | Uso Sugerido |
| :---- | :---- | :---- | :---- |
| Azul principal | `#2e52eb` | `rgb(46, 82, 235)` | CTAs, destaques primários, badges |
| Azul escuro | `#1a3cb8` | `rgb(26, 60, 184)` | Hover de botões, estados pressed |
| Azul médio | `#5b7cf0` | `rgb(91, 124, 240)` | Textos de destaque secundário |
| Azul claro | `#8da3f5` | `rgb(141, 163, 245)` | Destaques terciários, ícones |
| Azul ghost | `#c4d0fa` | `rgb(196, 208, 250)` | Textos muito sutis sobre fundo escuro |
| Azul glow 20% | `rgba(46, 82, 235, 0.2)` | — | Efeitos de glow e transparência |
| Azul glow 10% | `rgba(46, 82, 235, 0.1)` | — | Box-shadow suave |

---

## 5\. Tipografia

### 5.1 Sistema Tipográfico Extraído

A página original utiliza a stack padrão do Tailwind CSS (`ui-sans-serif, system-ui, sans-serif`), sem fontes customizadas carregadas via Google Fonts. A hierarquia é construída exclusivamente por **peso, tamanho e espaçamento**.

### 5.2 Escala Tipográfica

| Elemento | Tamanho | Peso | Line-Height | Letter-Spacing | Uso |
| :---- | :---- | :---- | :---- | :---- | :---- |
| H1 (Hero) | 60px | 700 (Bold) | 60px (1.0) | \-1.5px (tight) | Título principal do hero |
| H2 (Seções) | 36px | 700 (Bold) | 40px (1.11) | normal | Títulos de cada seção |
| H3 (Cards) | 20px–24px | 700 (Bold) | normal | normal | Títulos dentro de cards |
| Body | 16px–18px | 400 (Regular) | 1.5–1.6 | normal | Texto de corpo |
| Labels/Subtítulos | 12px–14px | 500–600 | normal | 0.2em (wide) | Subtítulos uppercase acima dos títulos |
| Preço | 48px | 700 (Bold) | normal | normal | Valor monetário |
| Copyright | 14px | 400 | normal | normal | Rodapé |

### 5.3 Padrões Tipográficos Recorrentes

Cada seção segue um padrão consistente de hierarquia composto por três níveis. O primeiro nível é um **label uppercase** com tracking largo (letter-spacing: 0.2em), tamanho 12px, peso 500, em cor cinza claro — funciona como contextualizador da seção (exemplos: "QUANDO O BARULHO SOME", "E APÓS A PÓS?", "O QUE ACONTECE DEPOIS QUE VOCÊ ENTRA"). O segundo nível é o **título principal** em branco, bold, tamanho 36px, que carrega a mensagem central da seção. O terceiro nível é o **texto de corpo** em cinza médio (gray-300 a gray-400), tamanho 16–18px, que desenvolve o argumento.

---

## 9\. Efeitos e Animações

### 9.1 Animações Identificadas

| Animação | Tipo | Trigger | Duração |
| :---- | :---- | :---- | :---- |
| Ponto pulsante | CSS animation (scale \+ opacity) | Contínuo | 2s loop |
| Fade-in de conteúdo | Opacity 0→1 \+ translateY | Scroll (IntersectionObserver) | \~0.6–0.8s |
| Glow no hover de cards | Box-shadow transition | Hover | \~0.4s ease |
| Mudança de borda no hover | Border-color transition | Hover | \~0.4s ease |

### 9.2 Efeitos de Background

A página utiliza overlays escuros sobre imagens (hero) e gradientes radiais sutis na cor de destaque para criar "pontos de luz" em seções específicas (especialmente na seção de preço). Na nova paleta, esses gradientes devem usar o azul:

```css
/* Glow de fundo para seções de destaque */
background: radial-gradient(
  ellipse at center,
  rgba(46, 82, 235, 0.08) 0%,
  transparent 70%
);
```

---

## 10\. Conteúdo Textual Completo

Todo o conteúdo textual da página foi extraído e está disponível para reutilização direta. Os textos seguem um tom **direto, provocativo e persuasivo**, sem ser excessivamente inspiracional — foca na urgência e na consequência de não agir.

### Textos do Hero

**Título**: E se o maior erro da sua carreira médica fosse parar de evoluir justamente agora?

**Subtítulo**: Você viveu meses sendo provocado. Cresceu mais em pouco tempo do que muitos médicos crescem em anos.

**Indicador**: A pós acabou... e o silêncio chegou.

### Textos da Seção Problema

**Título**: Mas agora... o que sobra?

**Corpo**: Sem aula, sem debate, sem mentor — o silêncio volta a tomar conta. E quem não se prepara volta para o piloto automático.

**Fechamento**: A maioria dos médicos volta para o automático sem perceber.

**Texto final**: Sem ambiente exigente, o cérebro volta ao padrão que o mercado já conhece — previsível e seguro demais para ser referência.

### Textos da Seção Solução

**Título**: Há os que aceitam voltar para a rotina. E há quem entende que o próximo ciclo é sobre evoluir em outro nível.

**Corpo**: Se a pós foi apenas um gatilho e não um ponto final, você precisa continuar em um ambiente que mantenha o ritmo que te trouxe até aqui.

### Textos da Seção Preço

**Introdução**: Fazer parte desse ambiente custa

**Preço**: R$29.000

**Condição**: Condição especial exclusiva no Dia da Liberdade Médica. Bônus vitalício: acesso completo à Pós em Paciente Grave.

**Escassez**: Apenas 25 egressos serão aceitos na primeira turma.

### Texto do CTA Final

**Título**: Decida antes que o silêncio volte

**Corpo**: Se você sabe que não pode parar aqui, mantenha-se no ambiente que puxou seu crescimento até agora.

**Botão**: Quero entrar no Clube

**Rodapé**: Rito de passagem: somente quem continua vigilante mantém o título de referência.

### Footer

**Marca**: Liberdade Médica.

**Tagline**: A excelência não termina, escolhe alcançá-la quem continua.

---

## 11\. Resumo Executivo para Implementação

Para replicar esta página com a nova paleta, os pontos-chave são:

1. **Fundo**: Manter o preto absoluto como base. Variações entre `#000000`, `#040404` e `#050505` entre seções criam profundidade sutil sem ser perceptível conscientemente.  
     
2. **Cor de destaque**: Substituir todas as ocorrências de vermelho/coral (`red-400`, `red-300`, `red-200`) pelo azul `#2e52eb` e suas variações (`#6b8af0`, `#a3b5f5`).  
     
3. **Glassmorphism**: Manter `backdrop-filter: blur(20px)` com `bg: rgba(255,255,255,0.03)` e `border: 1px solid rgba(255,255,255,0.06)`. No hover, a borda muda para `rgba(46, 82, 235, 0.3)` com box-shadow azul.  
     
4. **Tipografia**: Sistema sans-serif com hierarquia por peso e tamanho. H1 a 60px com tracking negativo, labels a 12px uppercase com tracking largo.  
     
5. **Espaçamento**: Generoso entre seções (80–120px), com padding interno de cards em 24–32px.  
     
6. **Animações**: Fade-in on scroll, ponto pulsante contínuo, glow transitions no hover. Todas sutis e com easing suave.  
     
7. **Layout**: Alinhamento à esquerda no hero, grid de duas colunas nas seções de problema/solução, centralizado nas seções de timeline/benefícios/preço.

