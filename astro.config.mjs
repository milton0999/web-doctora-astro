// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Usamos 'server' con configuración específica para functions
  output: 'server',
  adapter: cloudflare({
    // Configuración para functions
    imageService: 'cloudflare',
  }),
  // Optimización de imágenes habilitada para Astro 5
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {}
    },
    domains: ['localhost', 'centromedicogonzalitos.milcoms.org'],
  },
  vite: {
    optimizeDeps: {
      exclude: ['decap-cms']
    }
  }
});