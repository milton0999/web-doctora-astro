import { defineCollection, z } from 'astro:content';

const servicios = defineCollection({
  // 'type: content' es para archivos Markdown
  type: 'content', 
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
  }),
});

// Esto exporta la colección para que Astro la reconozca
export const collections = {
  'servicios': servicios,
};