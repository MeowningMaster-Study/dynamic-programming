import vercel from '@sveltejs/adapter-vercel';
import { resolve } from 'path';

export default {
  kit: {
    adapter: vercel(),
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          '@components': resolve('./src/components')
        }
      }
    }
  }
};
