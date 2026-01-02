# Scaffolding CLI

CLI para criar scaffolding de microservices e BFFs Node.js com TypeScript, prontos para rodar em Docker.

## Requisitos

- Node.js 18+
- npm
- Docker & Docker Compose (para execução em containers)

## Comandos

### Criar e rodar microservice/BFF

```bash
# 1. Criar o scaffolding
node bin/index.js init

# 2. Entrar no diretório
cd <nome-do-servico>

# 3. Dar permissão ao script
chmod +x docker-start.sh

# 4. Rodar em modo DEV (hot reload)
./docker-start.sh dev

# 5. Rodar em modo PROD (quando estiver pronto)
docker compose -f docker-compose.dev.yml down
./docker-start.sh prod
```

### Modo DEV vs PROD

- **DEV**: Hot reload ativo - mudanças refletem automaticamente
- **PROD**: Imagem otimizada - requer rebuild após mudanças

### Gerenciar containers

```bash
# Ver containers
docker ps

# Ver logs (DEV)
docker compose -f docker-compose.dev.yml logs -f

# Ver logs (PROD)
docker compose logs -f

# Parar DEV
docker compose -f docker-compose.dev.yml down

# Parar PROD
docker compose down
```

## Estrutura de Projeto Gerada

```
seu-servico/
├── docker-compose.yml      # Configuração do container
├── Dockerfile              # Imagem Docker otimizada
├── .dockerignore          # Arquivos ignorados no build
├── docker-start.sh        # Script de automação
├── package.json
├── tsconfig.json
├── README.md
└── src/
    ├── main.ts            # Entry point
    ├── server.ts          # Configuração do servidor
    ├── health/            # Health check endpoint
    ├── controllers/       # Controllers
    ├── routes/            # Rotas
    ├── repositories/      # Camada de dados (microservice)
    ├── use-cases/         # Casos de uso (microservice)
    ├── workers/           # Background workers (microservice)
    └── clients/           # HTTP clients (BFF)
```

## Exemplo de Uso Completo

```bash
# 1. Criar o microserviço
node bin/index.js init
# Nome: auth-service
# Tipo: microservice

# 2. Entrar no diretório
cd auth-service

# 3. Instalar dependências
npm install

# 4. Rodar no Docker
./docker-start.sh
```

Pronto! Seu microserviço estará rodando em `http://localhost:3000`

## Portas Padrão

- Microservices e BFFs: `3000`
- Health check disponível em: `http://localhost:3000/health`

Para mudar a porta, edite o arquivo `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Porta 3001 no host -> 3000 no container
```

## Docker Features

✅ **Build otimizado** - Imagem única sem duplicação  
✅ **Non-root user** - Segurança melhorada  
✅ **Health checks** - Monitoramento automático  
✅ **Layer caching** - Builds mais rápidos  
✅ **Network isolation** - Comunicação segura entre serviços  
✅ **Environment variables** - Configuração via .env  
✅ **Production ready** - Apenas dependências necessárias
