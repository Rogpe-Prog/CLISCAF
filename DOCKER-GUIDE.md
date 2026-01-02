# Guia Rápido - Docker + WSL

## Processo Completo: Criar e Rodar Microserviço no Docker

### 1. Criar o microserviço

```bash
node bin/index.js init
```

Responda as perguntas:
- **Nome**: `meu-servico` (ou qualquer nome que quiser)
- **Tipo**: `microservice` ou `bff`
- **Destino**: deixe vazio para criar na pasta atual

### 2. Entrar no diretório criado

```bash
cd meu-servico
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Construir e rodar no Docker (MÉTODO RÁPIDO)

```bash
chmod +x docker-start.sh
./docker-start.sh
```

Isso vai:
- ✅ Construir a imagem Docker com o nome `meu-servico`
- ✅ Criar o container com o mesmo nome
- ✅ Iniciar o container em background
- ✅ Mostrar os logs em tempo real

### 5. Testar o microserviço

```bash
curl http://localhost:3000/health
```

Deve retornar: `{"status":"ok"}`

---

## Comandos Docker Úteis

### Verificar containers rodando
```bash
docker ps
```

### Ver logs do container
```bash
docker compose logs -f
# ou
docker logs -f meu-servico
```

### Parar o container
```bash
docker compose down
# ou
docker stop meu-servico
```

### Reconstruir após mudanças no código
```bash
docker compose up --build -d
```

### Remover container
```bash
docker rm -f meu-servico
```

### Remover imagem
```bash
docker rmi meu-servico
```

---

## Processo Manual (Passo a Passo)

Se preferir fazer manualmente ao invés de usar `docker-start.sh`:

### 1. Construir a imagem
```bash
docker build -t meu-servico .
```

### 2. Rodar com docker-compose
```bash
docker compose up -d
```

### 3. Ver logs
```bash
docker compose logs -f
```

### 4. Parar
```bash
docker compose down
```

---

## Múltiplos Microserviços

Se você criar vários microserviços, cada um terá seu próprio container:

```bash
# Criar serviço 1
node bin/index.js init
# Nome: auth-service
# Tipo: microservice

# Criar serviço 2
node bin/index.js init
# Nome: payment-service
# Tipo: microservice

# Criar BFF
node bin/index.js init
# Nome: web-bff
# Tipo: bff
```

Cada um pode rodar em uma porta diferente. Edite o `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # auth-service
  - "3002:3000"  # payment-service
  - "3003:3000"  # web-bff
```

---

## Troubleshooting

### Erro: "env file .env not found"
```bash
# Solução: Criar o arquivo .env
cp .env.example .env
```

### Erro ao iniciar o container
```bash
# 1. Ver logs detalhados
docker compose logs

# 2. Verificar se o build foi bem-sucedido
docker images | grep meu-servico

# 3. Verificar se a porta já está em uso
docker ps
# Se houver conflito, pare o outro container ou mude a porta
```

### Porta já em uso
```bash
# Mude a porta no docker-compose.yml
ports:
  - "3001:3000"
```

### Container não inicia
```bash
# Veja os logs
docker compose logs

# Verifique se o build foi bem-sucedido
docker images | grep meu-servico
```

### Reconstruir do zero
```bash
docker compose down
docker rmi meu-servico
docker build -t meu-servico .
docker compose up -d
```
