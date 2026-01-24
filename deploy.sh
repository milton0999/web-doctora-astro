#!/bin/bash

# 🚀 SCRIPT DE DEPLOY AUTOMÁTICO - CENTRO MÉDICO GONZALITOS

echo "🏥 INICIANDO DEPLOY DEL CENTRO MÉDICO GONZALITOS..."
echo "=================================================="

# Verificar que estamos en el branch correcto
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "❌ Error: Debes estar en el branch 'main'"
    echo "   Branch actual: $BRANCH"
    exit 1
fi

echo "✅ Branch correcto: $BRANCH"

# Verificar si hay cambios pendientes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Hay cambios pendientes en el repositorio:"
    git status --short
    echo ""
    echo "❌ Por favor, comete los cambios antes de hacer deploy:"
    echo "   git add ."
    echo "   git commit -m 'Tu mensaje'"
    echo "   Luego ejecuta este script de nuevo"
    exit 1
fi

echo "✅ Repositorio limpio, sin cambios pendientes"

# Verificar instalación de dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
else
    echo "📦 Verificando dependencias..."
    npm ci
fi

if [ $? -ne 0 ]; then
    echo "❌ Error en la instalación de dependencias"
    exit 1
fi

echo "✅ Dependencias instaladas correctamente"

# Limpiar build anterior
if [ -d "dist" ]; then
    echo "🧹 Limpiando build anterior..."
    rm -rf dist
fi

# Construir el proyecto
echo "🔨 Construyendo el proyecto para producción..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build del proyecto"
    exit 1
fi

echo "✅ Build completado exitosamente"

# Verificar que se generaron los archivos HTML
echo "🔍 Verificando archivos generados..."
HTML_FILES=$(find dist -name "*.html" | wc -l)
echo "   Archivos HTML generados: $HTML_FILES"

if [ "$HTML_FILES" -lt 5 ]; then
    echo "❌ Error: No se generaron suficientes archivos HTML"
    echo "   Esperado: >5, Obtenido: $HTML_FILES"
    exit 1
fi

echo "✅ Archivos HTML verificados"

# Verificar que el CMS está incluido
if [ ! -f "dist/admin/index.html" ]; then
    echo "❌ Error: No se encontró el CMS en el build"
    exit 1
fi

echo "✅ CMS incluido en el build"

# Push a GitHub (si es automático, esto lo hace Cloudflare)
echo "📤 Archivos listos para deployment automático"

# Listar archivos principales generados
echo ""
echo "📄 Archivos principales generados:"
echo "   📄 dist/index.html (Página principal)"
echo "   📄 dist/blog/index.html (Blog)"
echo "   📄 dist/promociones/index.html (Promociones)"
echo "   📄 dist/nosotros/index.html (Nosotros)"
echo "   📄 dist/contacto/index.html (Contacto)"
echo "   📄 dist/admin/index.html (Panel CMS)"

echo ""
echo "🎉 DEPLOY COMPLETADO EXITOSAMENTE!"
echo "=================================================="
echo "🌐 URL del sitio: https://centromedicogonzalitos.milcoms.org"
echo "🔐 URL del CMS: https://centromedicogonzalitos.milcoms.org/admin"
echo "📊 Build generado en: $(date)"
echo ""
echo "📝 Notas:"
echo "   • El deploy se procesará automáticamente en Cloudflare Pages"
echo "   • El sitio estará disponible en 1-2 minutos"
echo "   • Puedes monitorear el estado en el dashboard de Cloudflare"
echo ""
echo "🚀 ¡Listo para producción!"