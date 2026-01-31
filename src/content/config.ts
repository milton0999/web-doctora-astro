import { defineCollection, z } from 'astro:content';

// Servicios Médicos (expandido con categorías del sitio archivado)
const servicios = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string(),
    categoria: z.enum([
      'Ultrasonido Adulto',                    // Para estudios de adultos todas las especialidades
      'Ultrasonido de Paciente Embarazada',    // Estudios maternos y fetales
      'Ultrasonido Ginecología',               // Estudios ginecológicos específicos
      'Ultrasonido de Embarazo 5D',            // Estudios 4D/5D de alta definición
      'Ultrasonido Pediátrico'                // Estudios para niños
    ]),
    subcategoria: z.string().optional(), // Ej: "Abdominal", "Vascular", etc.
    price: z.string().optional(),    
    duration: z.string().optional(),  // Mantener consistencia con nombre en archivos
    preparacion: z.string().optional(),
    contraindicaciones: z.array(z.string()).optional(),
    gallery: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

// Configuración Global del Sitio
const settings = defineCollection({
  type: 'content', // Cambiar de 'data' a 'content' para que lea .md
  schema: z.object({
    site_name: z.string(),
    slogan: z.string(),
    description: z.string(),
    logo: z.string(),
    favicon: z.string(),
    hero_image: z.string(),
    whatsapp_number: z.string(),
    phone_number: z.string(),
    email_contact: z.string(),
    address: z.string(),
    hours: z.string(),
    facebook_url: z.string().optional(),
    instagram_url: z.string().optional(),
    
    // Enhanced CTA Section Configuration
    cta_section: z.object({
      enabled: z.boolean(),
      urgency: z.object({
        enabled: z.boolean(),
        icon: z.string(),
        text: z.string(),
        style: z.enum(['pulse', 'badge']).default('pulse'),
      }).optional(),
      content: z.object({
        title: z.string(),
        description: z.string(),
        discount_enabled: z.boolean(),
        discount_percentage: z.string(),
        discount_text: z.string(),
      }),
      buttons: z.object({
        primary: z.object({
          text: z.string(),
          icon: z.string(),
          color: z.string(),
          link_type: z.enum(['whatsapp', 'phone', 'email', 'custom']),
          enabled: z.boolean(),
          order: z.number(),
          subtext: z.string().optional(),
        }),
        secondary: z.object({
          text: z.string(),
          icon: z.string(),
          color: z.string(),
          link_type: z.enum(['whatsapp', 'phone', 'email', 'custom']),
          enabled: z.boolean(),
          order: z.number(),
          subtext: z.string().optional(),
        }),
        optional: z.object({
          text: z.string(),
          icon: z.string(),
          color: z.string(),
          link_type: z.enum(['whatsapp', 'phone', 'email', 'custom']),
          custom_link: z.string().optional(),
          enabled: z.boolean(),
          order: z.number(),
          subtext: z.string().optional(),
        }),
      }),
      trust_indicators: z.array(z.object({
        icon: z.string(),
        text: z.string(),
        icon_color: z.enum(['success', 'primary', 'warning', 'info']),
        enabled: z.boolean(),
        order: z.number(),
      })),
      styling: z.object({
        background_style: z.string().optional(),
        text_color: z.string().optional(),
        padding: z.string().optional(),
        animations_enabled: z.boolean().default(true),
      }).optional(),
      mobile: z.object({
        stack_buttons: z.boolean().default(true),
        reduce_text_size: z.boolean().default(true),
        hide_indicators: z.boolean().default(false),
      }).optional(),
      display: z.object({
        show_on_pages: z.array(z.string()).default(['home']),
        a_b_testing: z.boolean().default(false),
      }).optional(),
    }).optional(),
    
    // Hero Section Configuration
    hero: z.object({
      title_override: z.string().nullable().optional(),
      subtitle_override: z.string().nullable().optional(),
      background_style: z.enum(['gradient_blue', 'gradient_green', 'gradient_purple', 'solid_color']).default('gradient_blue'),
      background_color: z.string().optional(),
      buttons: z.object({
        whatsapp: z.object({
          text: z.string(),
          emoji: z.string(),
          color: z.enum(['light', 'outline-light', 'primary', 'success']),
          enabled: z.boolean(),
          order: z.number(),
        }),
        services: z.object({
          text: z.string(),
          emoji: z.string(),
          color: z.enum(['light', 'outline-light', 'primary', 'success']),
          link: z.string(),
          enabled: z.boolean(),
          order: z.number(),
        }),
        emergency: z.object({
          text: z.string(),
          emoji: z.string(),
          color: z.enum(['light', 'outline-light', 'primary', 'success']),
          link: z.string(),
          enabled: z.boolean(),
          order: z.number(),
        }),
      }),
    }).optional(),
  }),
});

// Blog y Novedades
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    excerpt: z.string(),
    category: z.enum(['Noticias', 'Promociones', 'Tips Médicos']),
    author: z.string(),
    date: z.date(),
    featured: z.boolean().default(false),
  }),
});

// Testimonios de Pacientes
const testimonials = defineCollection({
  schema: z.object({
    name: z.string(),
    photo: z.string().optional(),
    content: z.string(),
    rating: z.number().min(1).max(5),
    service_category: z.enum(['Adulto', 'Embarazada', 'Pediatrico']),
    date: z.date(),
    featured: z.boolean().default(false),
  }),
});

// Promociones y Ofertas
const promotions = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string(),
    description: z.string(),
    original_price: z.string(),
    sale_price: z.string(),
    discount_percentage: z.string(),
    valid_until: z.date(),
    services_included: z.array(z.string()),
    active: z.boolean().default(true),
    featured: z.boolean().default(false),
  }),
});

// Equipo Médico
const team = defineCollection({
  schema: z.object({
    name: z.string(),
    position: z.string(),
    photo: z.string().optional(),
    bio: z.string(),
    specialties: z.array(z.string()),
    experience_years: z.number().optional(),
    education: z.array(z.string()).optional(),
  }),
});

// Contenido "Sobre Nosotros" editable
const aboutUs = defineCollection({
  type: 'data',
  schema: z.object({
    hero_title: z.string().default("Sobre Centro Médico Gonzalitos"),
    hero_subtitle: z.string().default("Cuidando tu salud con la mejor tecnología y atención humana"),
    hero_image: z.string().optional(),

    mission_title: z.string().default("Nuestra Misión"),
    mission_content: z.string().default("En el Centro Médico Gonzalitos nos comprometemos a brindar atención médica de la más alta calidad, combinando tecnología de vanguardia con un trato humano y personalizado. Somos líderes en ultrasonografía en Monterrey."),
    mission_stats: z.array(z.object({
      number: z.string(),
      label: z.string()
    })).default([
      { number: "10+", label: "Años de Experiencia" },
      { number: "5000+", label: "Pacientes Atendidos" },
      { number: "100%", label: "Satisfacción Garantizada" }
    ]),

    values: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string()
    })).default([
      { icon: "🏥", title: "Tecnología Avanzada", description: "Equipos de última generación para diagnósticos precisos" },
      { icon: "👨‍⚕️", title: "Profesionales Certificados", description: "Médicos especializados con amplia experiencia" },
      { icon: "❤️", title: "Atención Personalizada", description: "Trato cercano y humano para cada paciente" },
      { icon: "⚡", title: "Resultados Rápidos", description: "Entrega oportuna de estudios y diagnósticos" }
    ]),

    team_title: z.string().default("Nuestro Equipo Médico"),
    show_team: z.boolean().default(true),

    cta_title: z.string().default("¿Listo para tu estudio médico?"),
    cta_description: z.string().default("Agenda tu cita hoy mismo y recibe la mejor atención médica con tecnología de vanguardia"),
    cta_button_text: z.string().default("Agendar Cita"),
    cta_button_link: z.string().default("/contacto"),

    location_title: z.string().default("Ubicación y Contacto"),
    address: z.string().default("Av. Dr. José Eleuterio González 135, Leones, 64600 Monterrey, N.L."),
    phone: z.string().default("81 1588 3775"),
    hours: z.string().default("Lunes a Viernes: 8:00 AM - 8:00 PM | Sábados: 8:00 AM - 2:00 PM"),
    map_embed: z.string().optional(),

    seo_title: z.string().default("Sobre Nosotros - Centro Médico Gonzalitos"),
    seo_description: z.string().default("Conoce nuestro equipo médico y nuestra misión de cuidar tu salud con la mejor tecnología en Monterrey"),
  }),
});

// Páginas de Categoría
const categorias = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hero_image: z.string().optional(),
    seo_title: z.string().default(""),
    seo_description: z.string().default(""),
  }),
});

// Páginas Legales
const legal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    last_updated: z.date().optional(),
  }),
});

export const collections = {
  servicios,
  settings,
  blog,
  testimonials,
  promotions,
  team,
  aboutUs,
  categorias,
  legal
};