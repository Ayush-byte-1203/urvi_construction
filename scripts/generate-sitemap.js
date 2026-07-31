import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDynamicSitemap } from '../src/utils/sitemapGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function main() {
  console.log('🔄 Fetching latest website data and generating dynamic sitemap.xml...');
  try {
    const xml = await generateDynamicSitemap();
    
    // Write to dist/ if it exists, otherwise to public/
    const distPath = path.join(rootDir, 'dist');
    const publicPath = path.join(rootDir, 'public');
    
    if (fs.existsSync(distPath)) {
      fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml, 'utf-8');
      console.log('✔ Generated dynamic sitemap.xml in dist/sitemap.xml');
    }
    
    if (fs.existsSync(publicPath)) {
      fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), xml, 'utf-8');
      console.log('✔ Generated dynamic sitemap.xml in public/sitemap.xml');
    }

    // Also update root sitemap.xml if present for local inspection
    fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf-8');
    console.log('✔ Generated dynamic sitemap.xml in root sitemap.xml');
  } catch (err) {
    console.error('✖ Error generating dynamic sitemap:', err);
    process.exit(1);
  }
}

main();
