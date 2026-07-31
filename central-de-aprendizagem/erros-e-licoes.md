# Central de Aprendizagem — Erros e Lições

## 📅 31/07/2026 — Falha no Deploy Remoto (Next.js / Vercel)

**Contexto:** Envio do código da Landing Page do 4º Torneio Bom de Pesca para o repositório `Techweniu/lp-bom-de-pesca`.
**Erro:** Usuário reportou falha no deploy no provedor de hospedagem (Vercel/servidor remoto).
**Consequência:** A aplicação não subiu no ambiente de produção.
**Correção aplicada:** Inspecionar e resolver a causa raiz do erro de compilação/deploy (verificação de componentes, imagens e configuração de build do Next.js).
**Lição:** Validar a compilação estática e de produção do Next.js localmente garantindo compatibilidade total com a plataforma de deploy antes de liberar o push.

## 📅 31/07/2026 — Falha Persistente no Deploy Remoto (Nomenclatura / Case Sensitivity / Vercel Logs)

**Contexto:** Segundo disparo de deploy no repositório `Techweniu/lp-bom-de-pesca`.
**Erro:** Deploy continua falhando no servidor Vercel.
**Consequência:** Build de produção rejeitado pela plataforma.
**Correção aplicada:** Inspecionar divergências de caixa alta/baixa nos arquivos do projeto (Linux case-sensitivity, ex: `ComunityCard.tsx` vs `CommunityCard`), verificar imports e ajustar dependências.
**Lição:** Servidores Linux em deploy (como Vercel) diferenciam maiúsculas/minúsculas estritamente no sistema de arquivos. Qualquer inconsistência entre o nome do arquivo no Git e o `import` quebra o build.

## 📅 31/07/2026 — Inspeção de Erro via API GitHub Comments / Statuses do Vercel Bot

**Contexto:** Terceiro disparo de deploy do repositório `Techweniu/lp-bom-de-pesca`.
**Erro:** Vercel postou detalhes do erro de build via comentários/status no GitHub.
**Consequência:** Aplicação offline.
**Correção aplicada:** Fazer chamada à API do GitHub (endpoints `/comments`, `/statuses` e `/check-runs`) usando o PAT do repositório para extrair o log exato de erro gerado pelo bot do Vercel.
**Lição:** Consultar a API do GitHub do repositório permite capturar a causa exata enviada pelos webhooks e bots de CI/CD da Vercel.
