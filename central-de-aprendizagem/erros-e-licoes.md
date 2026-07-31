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

## 📅 31/07/2026 — Erro Persistente no Deploy / Teste em Conta Alternativa

**Contexto:** Quarto disparo de deploy no repositório `Techweniu/lp-bom-de-pesca`.
**Erro:** Deploy continua com falha na Vercel da conta atual. Usuário optou por testar em repositório/conta alternativa.
**Consequência:** Projeto em espera pela nova URL/PAT de teste.
**Correção aplicada:** Registrar ocorrência e aguardar novos dados de conta/repositório para isolamento da falha.
**Lição:** Testar o build em um projeto Vercel zerado e em conta limpa permite isolar problemas de cache ou configurações legadas de ambiente no painel da Vercel.

## 📅 31/07/2026 — Divergência de Build entre Contas Vercel (Configurações do Projeto Vercel)

**Contexto:** Sincronização do commit `36f304f` (100% funcional na Niutech) para a conta Techweniu.
**Erro:** O mesmo código exato roda com sucesso na Niutech mas falha na Vercel da Techweniu.
**Consequência:** Incompatibilidade nas configurações internas do projeto na Vercel da Techweniu.
**Correção aplicada:** Analisar causas específicas de painel Vercel: Root Directory alterado, Node.js Version defasada (18x vs 20x) ou Build Command customizado.
**Lição:** Quando um código idêntico compila em um projeto Vercel e falha em outro, a falha é 100% decorrente de configurações do painel da Vercel (Root Directory, Node Version ou Override de Build).

## 📅 31/07/2026 — Falha no Deploy de Teste Mínimo na Vercel (Configuração de Painel Vercel)

**Contexto:** Teste com versão mínima de `page.tsx` (sem componentes) enviado em `6416751`.
**Erro:** O build da Vercel da conta Techweniu falhou até para um código de 5 linhas em branco.
**Consequência:** Prova conclusiva de que a falha NÃO é no código fonte da Landing Page.
**Correção aplicada:** Registrar conclusão do isolamento de causa (problema 100% nas configurações de Build/Framework Preset/Root Directory do painel Vercel Techweniu) e restaurar o código completo da Landing Page.
**Lição:** Se um arquivo JSX simples com apenas <h1> de 5 linhas falha no build remoto da Vercel, a causa é 100% configuração sobrescrita no painel (Root Directory incorreto, Framework Preset alterado ou Build Command customizado).
