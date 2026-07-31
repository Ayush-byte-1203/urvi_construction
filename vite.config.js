import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function dynamicSitemapPlugin() {
  return {
    name: 'vite-plugin-dynamic-sitemap',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/sitemap.xml') {
          try {
            const { generateDynamicSitemap } = await import('./src/utils/sitemapGenerator.js');
            const xml = await generateDynamicSitemap('http://localhost:8000/api');
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(xml);
            return;
          } catch (e) {
            console.error('Failed to generate dev sitemap:', e);
          }
        }
        next();
      });
    },
    async closeBundle() {
      try {
        const { generateDynamicSitemap } = await import('./src/utils/sitemapGenerator.js');
        const xml = await generateDynamicSitemap();
        const distPath = path.resolve('dist');
        if (fs.existsSync(distPath)) {
          fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml, 'utf-8');
          console.log('✔ Successfully generated dynamic sitemap.xml in dist/');
        }
      } catch (e) {
        console.error('Failed to generate production sitemap.xml:', e);
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), dynamicSitemapPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    },
    watch: {
      ignored: ['**/backend/**']
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});
