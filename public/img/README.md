# Sistema de Imágenes - Centro Médico Gonzalitos
# Estructura de directorios para gestión de imágenes optimizadas

## Directorios Principales
public/img/
├── uploads/                    # Imágenes subidas por CMS
│   ├── original/               # Archivos originales sin modificar (backup)
│   ├── processed/              # Imágenes procesadas automáticamente
│   │   ├── thumbnails/         # 150x150px (thumbnails, avatares)
│   │   ├── small/             # 300x300px (galerías, vistas previas)
│   │   ├── medium/            # 800x600px (display normal)
│   │   ├── large/             # 1200x900px (hero, imágenes grandes)
│   │   ├── extra-large/      # 1920x1080px (4K pantallas)
│   │   └── temp/                 # Archivos temporales durante procesamiento
│   ├── webp/                 # Formatos WebP optimizados
│   ├── avif/                 # Formatos AVIF (máxima compresión)
│   └── fallback/           # JPG para navegadores antiguos
│   ├── optimized/             # Versión final optimizada
│   ├── cache/                # Caché de imágenes procesadas
│   └── manifest.json        # Registro de todas las imágenes
├── servicios/                 # Imágenes de servicios específicos
│   ├── ecografia-4d/
│   ├── ultrasonido-adulto/
│   ├── ultrasonido-embarazada/
│   ├── ultrasonido-pediatrico/
│   ├── ultrasonido-ginecologia/
│   └── [otras categorías]
├── hero/                     # Imágenes de secciones hero
│   ├── home/
│   ├── nosotros/
│   ├── servicios/
│   └── [otras secciones]
├── assets/                   # Imágenes estáticas del sistema
│   ├── logos/
│   ├── icons/
│   ├── ui/
│   ├── fallbacks/            # Imágenes por defecto cuando falla algo
│   ├── defaults/             # Imágenes predeterminadas
│   └── generated/           # Imágenes generadas automáticamente
└── system/                   # Archivos del sistema de imágenes
    ├── logos/
    ├── icons/
    └── ui/

## Configuración de Optimización
- **Formatos Soportados**: JPG, PNG, WebP, AVIF
- **Niveles de Calidad**: Web (balanceado), Alta (máxima), Máxima (máxima fidelidad)
- **Compresión Inteligente**: Adaptativa según tipo de imagen y contenido
- **Caché Automático**: Sistema de caché basado en frecuencia de uso
- **Lazy Loading**: Carga de imágenes solo cuando se necesitan
- **Responsive Design**: Múltiples tamaños para diferentes dispositivos

## Procesamiento Automático
1. **Detección**: Análisis automático de tipo de imagen y contexto
2. **Optimización**: Compresión balanceada manteniendo calidad visual
3. **Generación**: Múltiples formatos y tamaños de forma automática
4. **Validación**: Verificación de calidad y consistencia
5. **Caché**: Almacenamiento inteligente para acceso rápido

## Integración CMS
- **Upload con Procesamiento**: Las imágenes se optimizan automáticamente al subirse
- **Preview Fiel**: Vista previa exacta a la versión final
- **Gestión Centralizada**: Control total desde el panel de administración
- **Validación Automática**: Comprobación de calidad antes de publicar

## Optimización Web
- **WebP para Navegadores Modernos**: 60-80% de reducción de tamaño
- **AVIF para Máxima Compresión**: 80-90% de reducción
- **JPG Fallback**: Compatibilidad con navegadores antiguos
- **Responsive Images**: Tamaños adaptativos para todos los dispositivos