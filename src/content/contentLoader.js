/**
 * contentLoader.js
 *
 * Único ponto de verdade para todo o conteúdo da landing page.
 * Fonte dos textos: /data/[LM][Growth][P.PLT][Launch Oficial] Copy LP Captura.pdf
 * Fonte do estilo: /data/documentacao-design-clube.md
 *
 * Para atualizar copy: edite os textos aqui.
 * Para atualizar imagens: substitua os arquivos em /imagens/ e ajuste os imports abaixo.
 */

// --- Importação de imagens (processadas pelo Vite) ---
import doutores640Avif from '../../imagens/optimized/doutores-640.avif'
import doutores640Webp from '../../imagens/optimized/doutores-640.webp'
import doutores960Avif from '../../imagens/optimized/doutores-960.avif'
import doutores960Webp from '../../imagens/optimized/doutores-960.webp'
import doutores1400Avif from '../../imagens/optimized/doutores-1400.avif'
import doutores1400Webp from '../../imagens/optimized/doutores-1400.webp'
import gutembergueImg from '../../imagens/gutembergue.webp'
import logoImg from '../../imagens/lm-logo.webp'
import predioLmImg from '../../imagens/predio-lm.webp'

// --- Conteúdo normalizado ---
export const content = {
  // ----------------------------------------------------------------
  // Marca / Branding
  // ----------------------------------------------------------------
  brand: {
    name: 'Liberdade Médica',
    tagline: 'A excelência não termina, escolhe alcançá-la quem continua.',
    institutionFull: 'A Liberdade Médica',
    logo: {
      src: logoImg,
      alt: 'Liberdade Médica — logotipo',
    },
  },

  // ----------------------------------------------------------------
  // Meta (SEO / Open Graph)
  // ----------------------------------------------------------------
  meta: {
    title: 'Live Oficial de Lançamento — Pós em Cuidados Paliativos e Medicina da Dor',
    description:
      'Participe da Live Oficial de Lançamento da Pós-Graduação em Cuidados Paliativos e Medicina da Dor — a única com dupla certificação e 60 horas práticas presenciais.',
  },

  // ----------------------------------------------------------------
  // Hero (Seção 1 — Stop Scroll)
  // ----------------------------------------------------------------
  hero: {
    headline: 'Domine as decisões mais delicadas da medicina: dor e fim de vida.',
    subtitle:
      'Participe do Lançamento Oficial da Pós-Graduação em Cuidados Paliativos e Manejo da Dor - a única com dupla formação e 60 horas práticas presenciais.',
    description:
      'Uma aula única, ao vivo, onde você vai conhecer por dentro a formação com a maior carga horária prática do mercado e entender como garantir sua vaga com condição especial de lançamento',
    badges: [
      { id: 'b1', text: 'Evento ao vivo.' },
      { id: 'b2', text: 'Única transmissão.' },
      { id: 'b3', text: 'Exclusivo para médicos.' },
    ],
    cta: {
      text: 'Quero Participar Gratuitamente',
      ariaLabel: 'Abrir formulário de inscrição gratuita na live de lançamento',
    },
    image: {
      mobile: {
        avif: doutores640Avif,
        webp: doutores640Webp,
      },
      tablet: {
        avif: doutores960Avif,
        webp: doutores960Webp,
      },
      desktop: {
        avif: doutores1400Avif,
        webp: doutores1400Webp,
      },
      alt: 'Dr. Gutembergue, Ian e Cleto — professores da Pós-Graduação em Cuidados Paliativos e Medicina da Dor',
    },
  },

  // ----------------------------------------------------------------
  // O Plano (Seção 2 — Agenda da Live)
  // ----------------------------------------------------------------
  eventPlan: {
    sectionLabel: 'O QUE VAI ACONTECER NA AULA',
    headline: 'Durante 3 horas ao vivo, você vai entender três pontos essenciais:',
    topics: [
      {
        id: 'topic-1',
        number: '01',
        title: 'As condutas que todo médico deveria dominar em Dor e Paliativos',
        items: [
          'Manejo estruturado da dor refratária',
          'Uso seguro e racional de opioides',
          'Como evitar distanásia sem abandonar o paciente',
          'Como conduzir conversas difíceis com segurança',
          'Como decidir quando intervir — e quando não',
        ],
        note: 'Não será uma aula teórica. Será aplicável ao seu próximo plantão.',
      },
      {
        id: 'topic-2',
        number: '02',
        title: 'Como funciona por dentro a Pós em Cuidados Paliativos e Manejo da Dor',
        items: [
          'Matriz curricular completa',
          'Estrutura das 300 horas teóricas',
          'Organização das 60 horas práticas presenciais',
          'Metodologia de imersão clínica',
          'Corpo docente',
          'Modelo de formação dupla',
          
        ],
        note: null,
      },
      {
        id: 'topic-3',
        number: '03',
        title: 'Por que essa é a única pós com dupla formação e maior carga prática do mercado',
        intro:
          'A maioria dos cursos ensina teoria. Alguns ensinam paliativos. Outros ensinam dor. Essa formação integra os dois pilares fundamentais do cuidado do paciente grave:',
        items: [
          'Controle real do sofrimento',
          'Segurança farmacológica',
          'Decisão proporcional',
          'Aplicação prática hospitalar',
          'Posicionamento profissional',
        ],
        note: 'E ao final da aula, será apresentada a condição especial de matrícula válida apenas para participantes da live.',
      },
    ],
  },

  // ----------------------------------------------------------------
  // Professor (Seção 3 — Dr. Gutembergue)
  // ----------------------------------------------------------------
  professor: {
    sectionLabel: 'QUEM VAI CONDUZIR A LIVE',
    name: 'Dr. Gutembergue',
    bio: 'Dr. Gutembergue é médico formado pela Universidade Evangélica de Goiás, coordenador do corpo clínico do Pronto-Socorro do Hospital Dr. Jacob Facuri e preceptor da Pós-Graduação em Paciente Grave da Liberdade Médica. Com ampla experiência em terapia intensiva e formação de médicos, atua na linha de frente do cuidado ao paciente crítico e no ensino da medicina prática.',
    image: {
      src: gutembergueImg,
      alt: 'Dr. Gutembergue — especialista em Medicina Intensiva e Cuidados Paliativos',
    },
    credentials: [
      'Especialista em Medicina Intensiva pela AMIB.',
      'Especialista em Cuidados Paliativos pelo Hospital Israelita Albert Einstein.',
      'Doutorando em Reabilitação com foco em Reabilitação Cardiopneumointensivismo.',
      'Instrutor de ACLS certificado pela American Heart Association.',
      'Preceptor em Pós-Graduação em Paciente Grave.',
      'Experiência docente em diversas universidades.',
    ],
  },

  // ----------------------------------------------------------------
  // Instituição (Seção 4 — A Liberdade Médica)
  // ----------------------------------------------------------------
  institution: {
    sectionLabel: 'A INSTITUIÇÃO',
    name: 'A Liberdade Médica',
    description:
      'Instituição dedicada à formação de médicos que atuam em cenários de alta complexidade. Programas de Pós-Graduação com ensino teórico estruturado, prática supervisionada presencial  e simulação realística.',
    detail:
      'Como braço educacional do maior hospital privado de Goiás, a instituição une rigor acadêmico e vivência hospitalar, promovendo o desenvolvimento do raciocínio clínico, da segurança em procedimentos e da tomada de decisão em contextos críticos. Mais do que conteúdo, a Liberdade Médica oferece formação aplicada à realidade.',
    image: {
      src: predioLmImg,
      alt: 'Prédio da Liberdade Médica',
    },
  },

  // ----------------------------------------------------------------
  // CTA Final (Seção 5)
  // ----------------------------------------------------------------
  cta: {
    sectionLabel: 'GARANTA SUA VAGA',
    headline: 'Garanta sua vaga na Live Oficial de Lançamento',
    description:
      'Evento único. Sem replay. Com condição especial exclusiva para participantes.',
    button: {
      text: 'Quero participar da live e conhecer a pós por dentro',
      ariaLabel: 'Abrir formulário de inscrição na live de lançamento',
    },
  },

  // ----------------------------------------------------------------
  // Formulário de Inscrição (Popup/Modal)
  // ----------------------------------------------------------------
  form: {
    title: 'Quero estar preparado',
    subtitle: 'Inscreva-se e tenha acesso à live de lançamento',
    fields: [
      {
        name: 'nome',
        label: 'Nome Completo',
        type: 'text',
        required: true,
        placeholder: 'Seu nome completo',
        autocomplete: 'name',
      },
      {
        name: 'email',
        label: 'E-mail Profissional',
        type: 'email',
        required: true,
        placeholder: 'seu@email.com',
        autocomplete: 'email',
      },
      {
        name: 'telefone',
        label: 'Telefone Celular',
        type: 'tel',
        required: true,
        placeholder: '(00) 00000-0000',
        autocomplete: 'tel',
      },
      {
        name: 'crm',
        label: 'Qual a situação do seu CRM hoje?',
        type: 'radio',
        required: true,
        options: [
          {
            value: 'crm_ativo_mais_3_anos',
            label: 'CRM Ativo há mais de 3 anos',
          },
          {
            value: 'crm_ativo_menos_3_anos',
            label: 'CRM Ativo há menos de 3 anos',
          },
          {
            value: 'revalidando',
            label: 'Revalidando',
          },
          {
            value: 'interno',
            label: 'Interno',
          },
          {
            value: 'estudante_ciclo_clinico',
            label: 'Estudante de Medicina Ciclo Clínico',
          },
          {
            value: 'estudante_ciclo_basico',
            label: 'Estudante de Medicina Ciclo Básico',
          },
          {
            value: 'nao_medico',
            label: 'Não sou médico(a)',
          },
        ],
      },
    ],
    submit: 'Quero participar da live',
    successTitle: 'Inscrição confirmada!',
    successMessage:
      'Em breve você receberá as instruções de acesso no e-mail informado.',
  },

  // ----------------------------------------------------------------
  // Header
  // ----------------------------------------------------------------
  header: {
    cta: {
      text: 'Pré-matrícula Gratuita',
      ariaLabel: 'Abrir formulário de pré-matrícula gratuita',
    },
  },

  // ----------------------------------------------------------------
  // Footer
  // ----------------------------------------------------------------
  footer: {
    brand: 'Liberdade Médica.',
    tagline: 'A excelência não termina, escolhe alcançá-la quem continua.',
    copyright: `© ${new Date().getFullYear()} Liberdade Médica. Todos os direitos reservados.`,
  },
}
