// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // Cambiamos a 'server' o 'hybrid' para que las funciones de API funcionen bien
  output: 'server', 
  adapter: cloudflare({
    // Esto asegura que Astro sepa que vas a usar el binding de KV
    runtime: { mode: 'complete' } 
  }),
  vite: {
    optimizeDeps: {
      exclude: ['decap-cms']
    }
  }
});