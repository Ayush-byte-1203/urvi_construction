import { dummyServices } from '../data/dummyServices.js';
import { dummyBlogs } from '../data/dummyBlogs.js';
import { dummyProjects } from '../data/dummyProjects.js';
import { citiesData } from '../data/citiesData.js';

const DEFAULT_API_URL = 'https://Paramarsh.pythonanywhere.com/api';
const DOMAIN = 'https://pccbuild.in';

const CORE_PAGES = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: 'about', priority: '0.8', changefreq: 'weekly' },
  { path: 'services', priority: '0.9', changefreq: 'weekly' },
  { path: 'packages', priority: '0.9', changefreq: 'weekly' },
  { path: 'projects', priority: '0.9', changefreq: 'weekly' },
  { path: 'blog', priority: '0.7', changefreq: 'weekly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' }
];

const DEFAULT_CITIES = [
  'vadodara',
  'ahmedabad',
  'surat',
  'rajkot',
  'gandhinagar',
  'mumbai'
];

function formatDate(dateStr) {
  try {
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0];
      }
    }
  } catch (e) {}
  return new Date().toISOString().split('T')[0];
}

async function fetchWithTimeout(url, timeoutMs = 4000) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}

export async function generateDynamicSitemap(customApiUrl) {
  const apiUrl = customApiUrl || process.env.VITE_API_URL || DEFAULT_API_URL;
  const today = new Date().toISOString().split('T')[0];

  // Fetch dynamic data from backend API with fallback to local dummy data
  const [servicesRes, blogsRes, projectsRes] = await Promise.all([
    fetchWithTimeout(`${apiUrl}/services/`),
    fetchWithTimeout(`${apiUrl}/blogs/`),
    fetchWithTimeout(`${apiUrl}/projects/`)
  ]);

  const services = (Array.isArray(servicesRes) && servicesRes.length > 0) ? servicesRes : dummyServices;
  const blogs = (Array.isArray(blogsRes) && blogsRes.length > 0) ? blogsRes : dummyBlogs;
  const projects = (Array.isArray(projectsRes) && projectsRes.length > 0) ? projectsRes : dummyProjects;

  // Compile SEO city slugs
  const citySlugs = new Set(DEFAULT_CITIES);
  if (Array.isArray(citiesData)) {
    citiesData.forEach(c => {
      if (c.id) citySlugs.add(c.id);
    });
  }

  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
  ];

  // 1. Core Pages
  xmlLines.push('  <!-- ── Main Core Pages ── -->');
  for (const page of CORE_PAGES) {
    const loc = page.path ? `${DOMAIN}/${page.path}` : `${DOMAIN}/`;
    xmlLines.push(
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${page.changefreq}</changefreq>`,
      `    <priority>${page.priority}</priority>`,
      '  </url>'
    );
  }

  // 2. Dynamic Service Pages (automatically includes any new services added)
  xmlLines.push('  <!-- ── Dynamic Service Pages ── -->');
  for (const s of services) {
    const slug = s.slug || s.id;
    if (!slug) continue;
    const lastmod = formatDate(s.updated_at || s.created_at || s.date);
    xmlLines.push(
      '  <url>',
      `    <loc>${DOMAIN}/services/${slug}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.8</priority>',
      '  </url>'
    );
  }

  // 3. Dynamic Blog Post Pages (automatically includes any new blog posts added)
  xmlLines.push('  <!-- ── Dynamic Blog Post Pages ── -->');
  for (const b of blogs) {
    const slug = b.slug || b.id;
    if (!slug) continue;
    const lastmod = formatDate(b.date || b.updated_at || b.created_at);
    xmlLines.push(
      '  <url>',
      `    <loc>${DOMAIN}/blog/${slug}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      '    <priority>0.7</priority>',
      '  </url>'
    );
  }

  // 4. Dynamic SEO City Landing Pages
  xmlLines.push('  <!-- ── City Landing Pages for SEO ── -->');
  for (const citySlug of citySlugs) {
    xmlLines.push(
      '  <url>',
      `    <loc>${DOMAIN}/${citySlug}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      '    <priority>0.7</priority>',
      '  </url>'
    );
  }

  // 5. Legal Pages
  xmlLines.push(
    '  <!-- ── Legal Pages ── -->',
    '  <url>',
    `    <loc>${DOMAIN}/privacy-policy</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>yearly</changefreq>',
    '    <priority>0.3</priority>',
    '  </url>',
    '  <url>',
    `    <loc>${DOMAIN}/terms-and-conditions</loc>`,
    `    <lastmod>${today}</lastmod>`,
    '    <changefreq>yearly</changefreq>',
    '    <priority>0.3</priority>',
    '  </url>'
  );

  xmlLines.push('</urlset>');
  return xmlLines.join('\n');
}
