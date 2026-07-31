# Graph Report - lp-bom-de-pesca-main  (2026-07-31)

## Corpus Check
- 18 files · ~58,885 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 105 nodes · 98 edges · 15 communities (10 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ac8caced`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- compilerOptions
- page.tsx
- include
- package.json
- projeto.md
- lib
- layout.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- Bom de Pesca - Landing Page de Alta Conversão
- AGENTS.md
- Central de Aprendizagem — Erros e Lições

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `scripts` - 5 edges
4. `lib` - 4 edges
5. `Bom de Pesca - Landing Page de Alta Conversão` - 4 edges
6. `Central de Aprendizagem — Erros e Lições` - 4 edges
7. `next` - 2 edges
8. `react` - 2 edges
9. `react-dom` - 2 edges
10. `@tailwindcss/postcss` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (15 total, 5 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.09
Nodes (23): eslint, eslint-config-next, next, dependencies, eslint, eslint-config-next, next, react (+15 more)

### Community 1 - "compilerOptions"
Cohesion: 0.13
Nodes (15): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, module, moduleResolution (+7 more)

### Community 2 - "page.tsx"
Cohesion: 0.22
Nodes (5): AnimateOnScrollProps, CommunityCard(), ContactCard(), Header(), TorneioCards()

### Community 3 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 4 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "projeto.md"
Cohesion: 0.25
Nodes (7): Configuração do workspace, Decisões de arquitetura, Estado atual, Estrutura de pastas relevantes, O que é este projeto, Observações importantes, Stack e tecnologias

### Community 6 - "lib"
Cohesion: 0.50
Nodes (4): dom, dom.iterable, esnext, lib

### Community 11 - "Bom de Pesca - Landing Page de Alta Conversão"
Cohesion: 0.40
Nodes (4): Bom de Pesca - Landing Page de Alta Conversão, Instalação e Execução, Pré-requisitos, Stack Tecnológico

### Community 14 - "Central de Aprendizagem — Erros e Lições"
Cohesion: 0.40
Nodes (4): 📅 31/07/2026 — Falha no Deploy Remoto (Next.js / Vercel), 📅 31/07/2026 — Falha Persistente no Deploy Remoto (Nomenclatura / Case Sensitivity / Vercel Logs), 📅 31/07/2026 — Inspeção de Erro via API GitHub Comments / Statuses do Vercel Bot, Central de Aprendizagem — Erros e Lições

## Knowledge Gaps
- **62 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`, `lib`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._