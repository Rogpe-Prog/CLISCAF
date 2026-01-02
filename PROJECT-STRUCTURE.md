# Estrutura do Projeto Scaffolding CLI

## Diretórios Principais

```
scaffolding-cli/
├── bin/
│   └── index.js                    # Entry point do CLI
├── src/
│   ├── cli/
│   │   └── run.js                  # Lógica principal do CLI
│   ├── generators/
│   │   └── node-service/
│   │       └── node-service.generator.js
│   ├── prompts/
│   │   ├── destination.prompt.js   # Prompt para destino
│   │   ├── index.js                # Exportação dos prompts
│   │   ├── service-name.prompt.js  # Prompt para nome
│   │   └── service-type.prompt.js  # Prompt para tipo
│   └── templates/
│       ├── bff-service/            # Template BFF
│       │   ├── .dockerignore
│       │   ├── .env.example
│       │   ├── .gitignore
│       │   ├── Dockerfile
│       │   ├── docker-compose.yml.hbs
│       │   ├── docker-start.sh
│       │   ├── package.json.hbs
│       │   ├── README.md.hbs
│       │   ├── tsconfig.json.hbs
│       │   └── src/
│       │       ├── main.ts.hbs
│       │       ├── server.ts.hbs
│       │       ├── clients/
│       │       ├── controllers/
│       │       ├── health/
│       │       └── routes/
│       └── node-service/           # Template Microservice
│           ├── .dockerignore
│           ├── .env.example
│           ├── .gitignore
│           ├── Dockerfile
│           ├── docker-compose.yml.hbs
│           ├── docker-start.sh
│           ├── package.json.hbs
│           ├── README.md.hbs
│           ├── tsconfig.json.hbs
│           └── src/
│               ├── main.ts.hbs
│               ├── server.ts.hbs
│               ├── controllers/
│               ├── health/
│               ├── repositories/
│               ├── routes/
│               ├── use-cases/
│               └── workers/
├── DOCKER-GUIDE.md                 # Guia Docker
├── README.md                       # Documentação principal
└── package.json                    # Configuração do projeto
```

## Arquivos Removidos

- ✅ `src/commands/` - Pasta vazia
- ✅ `src/utils/` - Pasta vazia
- ✅ Scripts desnecessários no package.json

## Comandos Úteis

```bash
# Instalar globalmente
npm link

# Desinstalar
npm unlink -g scaffolding-cli

# Criar microservice
scaffolding-cli init
# ou
node bin/index.js init
```
