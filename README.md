# 🏥 Centro Médico Gonzalitos - Sistema Web Completo

## 📋 Descripción del Proyecto

Sitio web moderno para el Centro Médico Gonzalitos, desarrollado con **Astro** y gestionable completamente a través de **Decap CMS**. El sitio ofrece servicios de ecografías y ultrasonidos con un sistema de administración completo que permite a la doctora gestionar todo el contenido autónomamente.

---

## 🚀 Características Principales

### ⚡ **Tecnología Moderna**
- **Astro 5.16.14** - Framework ultra-rápido y moderno
- **Bootstrap 5** - Sistema de diseño responsivo
- **Cloudflare Pages** - Hosting estático con CDN global
- **Decap CMS** - Sistema de gestión de contenido con GitHub backend
- **TypeScript** - Tipado estático y mejor desarrollo

### 🎨 **Diseño y UX**
- **Responsive Design** - Optimizado para móviles y tablets
- **Interfaz Moderna** - Diseño limpio y profesional
- **Animaciones Suaves** - Microinteracciones y transiciones fluidas
- **Optimización SEO** - Meta tags y estructura semántica
- **Accesibilidad** - Cumplimiento con estándares WCAG

### 📱 **Funcionalidades**
- **Gestión Completa de Servicios** - Precios, descripciones, galerías
- **Blog y Novedades** - Artículos y contenido médico
- **Promociones y Ofertas** - Sistema de descuentos con fechas
- **Testimonios de Pacientes** - Reseñas y calificaciones
- **Equipo Médico** - Biografías y especialidades
- **Contacto Múltiple** - WhatsApp, teléfono, email

---

## 🛠️ **Arquitectura Técnica**

### 📂 **Estructura del Proyecto**
```
web-doctora-astro/
├── src/
│   ├── components/          # Componentes UI reutilizables
│   │   └── ServicioCard.astro
│   ├── content/             # Contenido gestionable por CMS
│   │   ├── servicios/       # Estudios médicos
│   │   ├── settings/        # Configuración global
│   │   ├── blog/           # Artículos y noticias
│   │   ├── testimonials/    # Testimonios
│   │   ├── promotions/      # Promociones
│   │   └── team/           # Equipo médico
│   ├── layouts/             # Plantillas de página
│   │   └── Layout.astro
│   └── pages/              # Páginas del sitio
│       ├── index.astro
│       ├── blog.astro
│       ├── contacto.astro
│       ├── nosotros.astro
│       ├── promociones.astro
│       └── servicios/[slug].astro
├── public/
│   └── admin/             # Panel de administración CMS
├── functions/
│   └── api/              # Autenticación GitHub OAuth
└── dist/                 # Sitio construido para deploy
```

### 🔧 **Configuraciones Clave**
- **`astro.config.mjs`** - Configuración principal de Astro
- **`src/content/config.ts`** - Schemas de validación de contenido
- **`public/admin/config.yml`** - Configuración de Decap CMS
- **`package.json`** - Dependencias y scripts

---

## 💻 **Instalación y Desarrollo**

### 📋 **Requisitos Previos**
- Node.js 18+
- npm o yarn
- Git
- Cuenta de GitHub para CMS

### 🚀 **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/milton0999/web-doctora-astro.git
cd web-doctora-astro

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

### 📦 **Scripts Disponibles**
```json
{
  "dev": "astro dev",        # Servidor de desarrollo
  "build": "astro build",    # Construir para producción
  "preview": "astro preview", # Vista previa del build
  "astro": "astro"          # CLI de Astro
}
```

---

## 🎯 **Panel de Administración (Decap CMS)**

### 🔐 **Acceso**
- **URL**: `https://dominio.com/admin`
- **Autenticación**: GitHub OAuth
- **Backend**: GitHub (versionado automático)

### 📝 **Contenido Gestionable**

#### 🏥 **Servicios Médicos**
- ✅ Crear/editar estudios y exámenes
- ✅ Establecer precios y duraciones
- ✅ Subir imágenes y galerías
- ✅ Categorizar (Adulto/Embarazada/Pediátrico)
- ✅ Etiquetas y palabras clave
- ✅ Servicios destacados

#### 💰 **Promociones y Ofertas**
- ✅ Crear ofertas especiales
- ✅ Configurar precios con descuento
- ✅ Establecer fechas de vigencia
- ✅ Servicios incluidos
- ✅ Activar/desactivar promociones

#### 📝 **Blog y Novedades**
- ✅ Publicar artículos médicos
- ✅ Categorías: Noticias/Promociones/Tips
- ✅ Imágenes destacadas
- ✅ Autores y fechas
- ✅ Artículos destacados

#### ⭐ **Testimonios**
- ✅ Agregar reseñas de pacientes
- ✅ Calificaciones con estrellas
- ✅ Fotos de pacientes (con permiso)
- ✅ Categorización por servicio
- ✅ Testimonios destacados

#### 👥 **Equipo Médico**
- ✅ Biografías de doctores
- ✅ Especialidades y experiencia
- ✅ Formación académica
- ✅ Fotos profesionales
- ✅ Años de experiencia

#### 📄 **Configuración del Sitio**
- ✅ Nombre y slogan del centro
- ✅ Logo e imágenes del sitio
- ✅ Información de contacto completa
- ✅ Redes sociales
- ✅ SEO y meta descripciones

---

## 🌐 **Deployment**

### 🚀 **Producción (Cloudflare Pages)**
```bash
# Construir el sitio
npm run build

# Deploy automático con GitHub Actions
git push origin main

# O deploy manual a Cloudflare Pages
npx wrangler pages deploy dist
```

### 🔧 **Configuración de Cloudflare**
- **Dominio**: `centromedicogonzalitos.milcoms.org`
- **Build Command**: `npm run build`
- **Build Output**: `dist`
- **Node Version**: `18`
- **Environment Variables**: 
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`

---

## 📚 **Guías y Documentación**

### 📖 **Guía de Usuario**
Archivo completo para la doctora: [GUIA-USUARIO.md](./GUIA-USUARIO.md)

Contenido:
- 🔐 Acceso al sistema
- 📝 Edición de contenido
- 📱 Gestión de imágenes
- 💰 Creación de promociones
- 📊 Flujos de trabajo
- 🆘 Soporte técnico

### 🛠️ **Guía de Desarrollador**
#### **Estructura de Content Collections**
```typescript
// Servicios Médicos
interface Servicio {
  title: string;
  image?: string;
  description: string;
  categoria: 'Adulto' | 'Embarazada' | 'Pediatrico';
  price?: string;
  duration?: string;
  gallery?: string[];
  featured?: boolean;
  tags?: string[];
}

// Configuración Global
interface Settings {
  site_name: string;
  slogan: string;
  description: string;
  logo: string;
  favicon: string;
  hero_image: string;
  whatsapp_number: string;
  phone_number: string;
  email_contact: string;
  address: string;
  hours: string;
  facebook_url?: string;
  instagram_url?: string;
}
```

#### **Personalización**
- **Colores**: Modificar variables CSS en `src/layouts/Layout.astro`
- **Tipografía**: Cambiar fuentes en el mismo archivo
- **Componentes**: Crear nuevos componentes en `src/components/`
- **Páginas**: Agregar nuevas rutas en `src/pages/`

---

## 🎨 **Sistema de Diseño**

### 🎨 **Paleta de Colores**
```css
:root {
  --primary-color: #2563EB;      /* Azul principal */
  --secondary-color: #1E40AF;    /* Azul oscuro */
  --accent-color: #10B981;       /* Verde destacado */
  --text-dark: #191919;          /* Texto oscuro */
  --text-light: #6c757d;         /* Texto secundario */
  --bg-light: #f8f9fa;          /* Fondo claro */
  --border-color: #dee2e6;      /* Bordes */
  --success-color: #25D366;      /* WhatsApp */
}
```

### 📱 **Breakpoints Responsive**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🔧 **Mantenimiento**

### 📊 **Monitoreo**
- **Performance**: Google PageSpeed Insights
- **Uptime**: Cloudflare Analytics
- **Errores**: Cloudflare Logs
- **SEO**: Google Search Console

### 🔄 **Actualizaciones**
- **Dependencias**: `npm audit fix` mensual
- **Seguridad**: Revisión quarterly de dependencias
- **Backup**: Automático con GitHub
- **Content**: Editable via CMS sin necesidad de deploy

---

## 🆘 **Soporte**

### 📞 **Contacto Directo**
- **WhatsApp**: 528115883775
- **Email**: soporte@milcoms.org
- **Horario**: 24/7 para emergencias técnicas

### 🐛 **Reporte de Issues**
- **GitHub Issues**: [Crear nuevo issue](https://github.com/milton0999/web-doctora-astro/issues)
- **Información requerida**:
  - Descripción detallada del problema
  - Pasos para reproducir
  - Capturas de pantalla si aplica
  - Navegador y versión

---

## 📄 **Licencia**

Este proyecto es propiedad del Centro Médico Gonzalitos. Desarrollo y mantenimiento por [Milcoms](https://milcoms.org).

---

## 🎯 **Próximos Pasos**

### 🚀 **Implementación Inmediata**
- [ ] Configurar variables de entorno en Cloudflare
- [ ] Verificar dominio y SSL
- [ ] Probar CMS con doctora
- [ ] Capacitación completa del sistema

### 📈 **Mejoras Futuras**
- [ ] Sistema de agendamiento online
- [ ] Integración con pasarelas de pago
- [ ] Historial clínico de pacientes
- [ ] Notificaciones automáticas
- [ ] Chatbot para consultas rápidas

---

## 🏆 **Resultados Esperados**

✅ **Independencia Total** - La doctora puede gestionar todo el contenido sin ayuda técnica
✅ **Performance Excelente** - Puntuación 95+ en PageSpeed
✅ **SEO Optimizado** - Mejor posicionamiento en buscadores
✅ **Responsive** - Experiencia perfecta en todos los dispositivos
✅ **Escalable** - Fácilmente extensible y mantenible
✅ **Seguro** - Autenticación robusta y backups automáticos

---

**🎉 ¡Proyecto listo para producción!**

*Desarrollado con ❤️ por [Milcoms](https://milcoms.org)*
