import { defineCollection, z } from 'astro:content';

// Servicios Médicos (expandido)
const servicios = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string(),
    categoria: z.enum(['Adulto', 'Embarazada', 'Pediatrico']),
    price: z.string().optional(),
    duration: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

// Configuración Global del Sitio
const settings = defineCollection({
  type: 'data',
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

export const collections = { 
  servicios, 
  settings, 
  blog, 
  testimonials, 
  promotions,
  team
};