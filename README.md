# create-vertex-service

Ferramenta CLI interna para scaffold (archetype) de microserviços Node.js usados na plataforma Vertex.

Resumo rápido
- Gera um template completo de microservice em TypeScript + Express usando templates Handlebars (.hbs).
- Copia os arquivos do diretório `src/templates/node-service` para uma nova pasta com o nome do serviço.
- Processa arquivos `.hbs` substituindo `{{serviceName}}` e remove os templates originais.

Estado atual (o que a aplicação faz agora)
- Comando `init` disponível: pede `serviceName` e gera o microservice.
- Templates básicos criados: `package.json.hbs`, `tsconfig.json.hbs`, `README.md.hbs`, `src/main.ts`, `src/server.ts`, `src/health/health.route.ts`.
- Tratamento de erros adicionado e mensagens coloridas com `chalk`.

Como usar

1. Executar a CLI localmente (no diretório do repositório):

```bash
node bin/index.js --help
```

2. Inicializar um novo microservice (vai pedir o `serviceName`):

```bash
node bin/index.js init
```

Passo a passo (PowerShell) — execute um por vez

```powershell
# 1) Gerar o microservice (interativo)
node bin/index.js init

    # (alternativa: gerar sem prompts — localmente temos um helper)
    node test-generate.mjs

# 2) Entrar na pasta do serviço (substitua pelo nome escolhido)
cd <nome-do-servico>

# 3) Instalar dependências
npm install

# 4) Compilar TypeScript
npm run build

# 5) Iniciar (o script já faz build antes de rodar)
npm start

    # 6) Iniciar manualmente (útil para debug)
    node dist/main.js

# 7) Testar endpoint /health
curl http://localhost:3000/health

# 8) Testar endpoint /health (PowerShell)
Invoke-WebRequest -UseBasicParsing http://localhost:3000/health | Select-Object -Expand Content

# 9) Mudar porta e iniciar (ex.: porta 4000)
$env:PORT=4000; npm start
```

Notas rápidas
- Se houver erro de import ES modules em tempo de execução, verifique se os imports relativos nos arquivos gerados terminam com `.js` (o gerador já aplica isso nos templates atualizados).
- O `npm start` do template executa `npm run build && node dist/main.js`.

Fluxo esperado após `init`
- A ferramenta cria uma pasta com o nome informado (ex: `adsb-feed-service`).
- Dentro dessa pasta haverá o template pronto. Para rodar o serviço gerado:

```bash
cd <serviceName>
npm install
npm run dev    # modo desenvolvimento (precisa de tsx ou tsc configurado no template)
```

Onde estão os templates
- Os templates usados para gerar o service ficam em `src/templates/node-service`.

Notas de desenvolvimento
- A CLI é um package ES module (`type: "module"` no `package.json`).
- O gerador processa apenas arquivos com extensão `.hbs`, os demais são copiados como estão.

Próximos passos recomendados
- Adicionar `Dockerfile` ao template gerado.
- Incluir um `eslint`/`prettier` e configuração de CI.
- Criar testes automáticos para validar scaffolding.

Contato
- Se quiser que eu rode um teste criando um serviço exemplo agora, diga e eu executo `node bin/index.js init` aqui.

