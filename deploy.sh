#!/bin/bash

# --- SHADOWROOT-AGRO DEPLOY SCRIPT ---
echo "🌿 Iniciando proceso de despliegue para ShadowRoot-Agro..."

# 1. Instalar dependencias por si acaso
echo "📦 Verificando dependencias..."
npm install

# 2. Construir el proyecto (Check de errores de compilación)
echo "🏗️  Compilando proyecto con Vite..."
if npm run build; then
    echo "✅ Compilación exitosa."
else
    echo "❌ Error en la compilación. Abortando despliegue."
    exit 1
fi

# 3. Git Workflow
echo "📂 Preparando cambios para Git..."
git add .

# Pedir mensaje de commit (útil para Neovim/Termux)
echo "📝 Introduce el mensaje del commit:"
read commit_message
git commit -m "$commit_message"

# 4. Push a GitHub
echo "🚀 Subiendo a GitHub..."
git push origin main

echo "✨ ¡Listo! Vercel detectará los cambios y actualizará la App en segundos."

