import { Phase } from '../types/curriculum';

export const CRO_PHASES: Phase[] = [
  {
    id: 'phase-1',
    order: 1,
    title: 'Foundations',
    weeks: 'Weeks 1–4',
    description: 'Master ecommerce funnel dynamics, Shopify architecture surface areas, pixel tracking, and rigorous heuristic friction mapping.',
    moduleIds: ['module-1', 'module-2', 'module-3', 'module-4'],
    trackId: 'cro',
  },
  {
    id: 'phase-2',
    order: 2,
    title: 'Experimentation',
    weeks: 'Weeks 5–8',
    description: 'Formulate hypotheses, master sample size statistics, build flicker-free A/B testing frameworks, and optimize Core Web Vitals.',
    moduleIds: ['module-5', 'module-6', 'module-7', 'module-8'],
    trackId: 'cro',
  },
  {
    id: 'phase-3',
    order: 3,
    title: 'Optimization',
    weeks: 'Weeks 9–12',
    description: 'Engineer high-converting PDPs, friction-free cart drawers, Checkout UI extensions, post-purchase funnels, and ethical personalization.',
    moduleIds: ['module-9', 'module-10', 'module-11', 'module-12'],
    trackId: 'cro',
  },
  {
    id: 'phase-4',
    order: 4,
    title: 'Scale & Capstone',
    weeks: 'Weeks 13–16',
    description: 'Run 90-day program roadmaps, deploy Shopify Functions & Edge A/B routing, ship the 10-deliverable capstone theme, and craft a portfolio case study.',
    moduleIds: ['module-13', 'module-14', 'module-15', 'module-16'],
    trackId: 'cro',
  },
  {
    id: 'phase-5',
    order: 5,
    title: 'Advanced Specialties',
    weeks: 'Weeks 17–20',
    description: 'Master mobile thumb-zone ergonomics, conversion copywriting & risk reversal, high-ticket B2B volume pricing funnels, and global Shopify Markets multi-currency localization.',
    moduleIds: ['module-17', 'module-18', 'module-19', 'module-20'],
    trackId: 'cro',
  },
  {
    id: 'phase-6',
    order: 6,
    title: 'Mastery & Enterprise QA',
    weeks: 'Weeks 21–24',
    description: 'Harness behavioral economics & choice architecture, engineer predictive search and faceted filtering, automate A/B testing with Playwright CI/CD, and sit for the Master CRO Certification Exam.',
    moduleIds: ['module-21', 'module-22', 'module-23', 'module-24'],
    trackId: 'cro',
  },
];

export const DEV_PHASES: Phase[] = [
  {
    id: 'dev-phase-1',
    order: 1,
    title: 'Shopify Core, Liquid & Theme Architecture',
    weeks: 'Weeks 1–4',
    description: 'Master the modern Shopify ecosystem: Shopify CLI 3.x, Dawn architecture, deep Liquid templating, JSON templates, section groups, Web Components, and Ajax Cart API.',
    moduleIds: ['dev-module-1', 'dev-module-2', 'dev-module-3', 'dev-module-4'],
    trackId: 'dev',
  },
  {
    id: 'dev-phase-2',
    order: 2,
    title: 'Data Modeling, Customer Accounts & Checkout Extensibility',
    weeks: 'Weeks 5–8',
    description: 'Architect custom data models with Metafields & Metaobjects, implement New Customer Accounts & Privacy APIs, build Checkout UI Extensions, and compile high-speed WebAssembly Shopify Functions.',
    moduleIds: ['dev-module-5', 'dev-module-6', 'dev-module-7', 'dev-module-8'],
    trackId: 'dev',
  },
  {
    id: 'dev-phase-3',
    order: 3,
    title: 'Full-Stack Shopify App Development & APIs',
    weeks: 'Weeks 9–12',
    description: 'Build enterprise Shopify Apps with Remix, Node.js & Prisma, master GraphQL Admin API queries and leaky bucket rate limits, orchestrate event-driven Webhooks with HMAC verification, and integrate Billing API with Polaris.',
    moduleIds: ['dev-module-9', 'dev-module-10', 'dev-module-11', 'dev-module-12'],
    trackId: 'dev',
  },
  {
    id: 'dev-phase-4',
    order: 4,
    title: 'Headless Hydrogen, B2B, Flow & Enterprise CI/CD',
    weeks: 'Weeks 13–16',
    description: 'Deploy headless storefronts with Hydrogen on Oxygen, implement Shopify Plus B2B wholesale architecture, build custom Shopify Flow triggers, automate GitHub theme CI/CD, and conduct Playwright E2E testing.',
    moduleIds: ['dev-module-13', 'dev-module-14', 'dev-module-15', 'dev-module-16'],
    trackId: 'dev',
  },
];

export const PHASES: Phase[] = [...CRO_PHASES, ...DEV_PHASES];

export function getPhasesByTrack(track: 'cro' | 'dev'): Phase[] {
  return PHASES.filter((p) => p.trackId === track);
}
