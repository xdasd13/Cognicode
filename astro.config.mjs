// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';
import lucide from '@iconify-json/lucide/icons.json' assert { type: 'json' };
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		icon({
			// @ts-expect-error: The current astro-icon type definitions don't yet expose the `collections` option.
			collections: {
				lucide,
			},
		}),
	],

	vite: {
		plugins: [tailwindcss()],
	},
});