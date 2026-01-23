import { defineCollection, z } from 'astro:content';

const servicios = defineCollection({
  schema: z.object({
    title: z.string(), // Antes decía 'nombre'
    image: z.string().optional(), // Antes decía 'imagen'
    description: z.string(), // Antes decía 'descripcion'
    categoria: z.enum(['Adulto', 'Embarazada', 'Pediatrico']),
  }),
});

export const collections = { servicios };