// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Cambiamos a 'server' o 'hybrid' para que las funciones de API funcionen bien
  output: 'server', 
  adapter: cloudflare(),
  // Optimización de imágenes - Comentado por compatibilidad con Cloudflare
  // image: {
  //   service: 'sharp',
  //   domains: ['localhost', 'centromedicogonzalitos.milcoms.org'],
  // },
  vite: {
    optimizeDeps: {
      exclude: ['decap-cms']
    }
  }
});