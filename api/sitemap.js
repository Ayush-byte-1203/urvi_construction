import { generateDynamicSitemap } from '../src/utils/sitemapGenerator.js';

export default async function handler(req, res) {
  try {
    const xml = await generateDynamicSitemap();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
