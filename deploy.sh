#!/bin/bash

# --- SHADOWROOT-AGRO DEPLOY SCRIPT ---
echo "🌿 Iniciando proceso de despliegue para ShadowRoot-Agro..."

# 1. Instalar dependencias
echo "📦 Verificando dependencias..."
npm install

# 2. EJECUTAR TESTS (La muralla de seguridad)
echo "🧪 Ejecutando batería de tests..."
if npx vitest run; then
    echo "✅ Tests pasados. Procediendo..."
else
    echo "❌ Los tests fallaron. El despliegue se ha cancelado para proteger la producción."
    exit 1
fi

# 3. Construir el proyecto
echo "🏗️  Compilando proyecto con Vite..."
if npm run build; then
    echo "✅ Compilación exitosa."
else
    echo "❌ Error en la compilación. Abortando."
    exit 1
fi

# 4. Git Workflow
echo "📂 Preparando cambios para Git..."
git add .
echo "📝 Introduce el mensaje del commit:"
read commit_message
git commit -m "$commit_message"

# 5. Push a GitHub
echo "🚀 Subiendo a GitHub..."
git push origin main

echo "✨ ¡Listo! Vercel detectará los cambios y actualizará la App en segundos."

