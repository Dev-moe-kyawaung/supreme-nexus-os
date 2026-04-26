import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react({ include: ['**/*.react.jsx'] }), svelte(), mdx(), tailwind()],
  vite: { ssr: { noExternal: ['three'] } }
});
