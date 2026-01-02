#!/bin/bash

# Script para criar e rodar o BFF no Docker
# Uso: ./docker-start.sh [dev|prod]
# Padrão: prod

MODE=${1:-prod}
SERVICE_NAME=$(basename "$PWD")

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env..."
    cp .env.example .env
fi

if [ "$MODE" = "dev" ]; then
    echo "🔧 Modo DESENVOLVIMENTO - Hot reload ativado"
    echo "📦 Instalando dependências..."
    npm install
    
    echo "🚀 Iniciando container em modo DEV..."
    docker compose -f docker-compose.dev.yml down 2>/dev/null
    docker compose -f docker-compose.dev.yml up -d
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao iniciar o container"
        exit 1
    fi
    
    echo "✅ Container em modo DEV rodando!"
    echo "🔄 Hot reload ATIVO - mudanças no código são refletidas automaticamente"
    echo "📋 Logs do container:"
    docker compose -f docker-compose.dev.yml logs -f
else
    echo "🏭 Modo PRODUÇÃO"
    echo "🐳 Construindo a imagem Docker..."
    docker build -t "$SERVICE_NAME" .
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao construir a imagem"
        exit 1
    fi
    
    echo "🚀 Iniciando container em modo PROD..."
    docker compose up -d
    
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao iniciar o container"
        exit 1
    fi
    
    echo "✅ Container em modo PROD rodando!"
    echo "📋 Logs do container:"
    docker compose logs -f
fi
