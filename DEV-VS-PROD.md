# Guia de Desenvolvimento vs Produção

## 🔧 Modo DESENVOLVIMENTO (dev)

Use este modo quando estiver **desenvolvendo** o microserviço.

### Características:
- ✅ **Hot reload** - Mudanças no código refletem automaticamente
- ✅ Não precisa rebuild
- ✅ Mais rápido para desenvolver
- ✅ TypeScript compilado em tempo real
- ⚠️ Usa mais recursos (mantém ts-node-dev rodando)

### Como usar:
```bash
cd <nome-do-servico>
./docker-start.sh dev
```

### Fluxo de trabalho:
1. Inicie o container em modo dev
2. Edite seus arquivos `.ts` normalmente
3. As mudanças são refletidas automaticamente
4. Veja os logs em tempo real
5. Não precisa reiniciar o container!

### Exemplo:
```bash
# Iniciar em modo dev
./docker-start.sh dev

# Agora edite um arquivo
vim src/controllers/sample.controller.ts

# Salve o arquivo e veja o reload automático nos logs!
# O serviço reinicia automaticamente
```

---

## 🏭 Modo PRODUÇÃO (prod)

Use este modo para **rodar em produção** ou quando quiser uma imagem otimizada.

### Características:
- ✅ Imagem Docker otimizada e menor
- ✅ Apenas código compilado (JavaScript)
- ✅ Sem dependências de desenvolvimento
- ✅ Mais performático
- ✅ Mais seguro
- ⚠️ Requer rebuild para refletir mudanças

### Como usar:
```bash
cd <nome-do-servico>
./docker-start.sh prod
# ou simplesmente
./docker-start.sh
```

### Fluxo de trabalho:
1. Desenvolva e teste em modo dev
2. Quando estiver pronto, builde para produção
3. A imagem é otimizada e buildada
4. Container roda o código compilado

### Rebuild após mudanças:
```bash
# Parar o container
docker compose down

# Rebuild e subir novamente
docker compose up --build -d

# Ver logs
docker compose logs -f
```

---

## 📊 Comparação

| Aspecto | Modo DEV 🔧 | Modo PROD 🏭 |
|---------|-------------|--------------|
| Hot reload | ✅ Sim | ❌ Não |
| Rebuild necessário | ❌ Não | ✅ Sim |
| Tamanho da imagem | Maior | Menor |
| Performance | Normal | Otimizada |
| Uso de recursos | Maior | Menor |
| Dependências dev | ✅ Incluídas | ❌ Removidas |
| TypeScript | Compilado em tempo real | Pré-compilado |
| Arquivos fonte | ✅ Incluídos | ❌ Removidos |

---

## 🎯 Quando usar cada modo?

### Use DEV quando:
- Estiver desenvolvendo novas funcionalidades
- Fazendo debugging
- Testando mudanças rapidamente
- Trabalhando localmente

### Use PROD quando:
- Fazendo deploy para servidor
- Executando em ambiente de homologação/produção
- Precisa de performance máxima
- Quer uma imagem Docker otimizada

---

## 🔄 Alternando entre modos

```bash
# Parar modo dev
docker compose -f docker-compose.dev.yml down

# Iniciar modo prod
./docker-start.sh prod

# Ou vice-versa
docker compose down
./docker-start.sh dev
```

---

## ⚡ Dicas

### Desenvolvimento eficiente:
1. Use **modo dev** durante o desenvolvimento
2. Mantenha o container rodando
3. Edite os arquivos normalmente
4. Veja os logs para acompanhar os reloads

### Deploy para produção:
1. Teste tudo em **modo dev**
2. Faça commit das mudanças
3. Builde em **modo prod**
4. Teste a imagem de produção
5. Faça deploy

### Comandos úteis:
```bash
# Ver logs em modo dev
docker compose -f docker-compose.dev.yml logs -f

# Ver logs em modo prod
docker compose logs -f

# Parar todos os containers
docker compose down
docker compose -f docker-compose.dev.yml down

# Ver status
docker ps
```
