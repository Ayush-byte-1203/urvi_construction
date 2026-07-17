import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We will fetch the data via HTTP to the Django backend
const API_URL = 'http://localhost:8000/api';

// Dynamically import data files
const importData = async () => {
  const { appConfig } = await import('./src/data/appConfig.js');
  const { servicesData } = await import('./src/data/servicesData.js');
  const { packagesData } = await import('./src/data/packagesData.js');
  const { projectsData } = await import('./src/data/projectsData.js');
  const { testimonialsData } = await import('./src/data/testimonialsData.js');
  const { faqData } = await import('./src/data/faqData.js');

  return { appConfig, servicesData, packagesData, projectsData, testimonialsData, faqData };
};

const postData = async (endpoint, data) => {
  try {
    const res = await fetch(`${API_URL}/${endpoint}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      console.error(`Failed to post to ${endpoint}:`, await res.text());
    } else {
      console.log(`Successfully seeded ${endpoint}`);
    }
  } catch (err) {
    console.error(`Error posting to ${endpoint}`, err.message);
  }
};

const seed = async () => {
  console.log('Starting data seeding...');
  const data = await importData();

  // Seed Site Settings
  await postData('site-settings', {
    site_name: data.appConfig.company.name,
    contact_email: data.appConfig.company.email,
    contact_phone: data.appConfig.company.phone,
    address: data.appConfig.company.address,
    facebook_url: data.appConfig.social.facebook,
    twitter_url: data.appConfig.social.twitter,
    linkedin_url: data.appConfig.social.linkedin,
    instagram_url: data.appConfig.social.instagram
  });

  // Seed Services
  for (const [key, service] of Object.entries(data.servicesData)) {
    await postData('services', {
      title: service.title,
      description: service.desc || '',
      icon_name: service.icon || 'Building',
      features: service.features || []
    });
  }

  // Seed Testimonials
  for (const test of data.testimonialsData) {
    await postData('testimonials', {
      name: test.author,
      role: test.role,
      content: test.quote,
      rating: test.rating || 5
    });
  }

  // Seed FAQs
  for (const faq of data.faqData) {
    await postData('faqs', {
      question: faq.q,
      answer: faq.a,
      category: 'General'
    });
  }

  // Seed basic pages (Home, About, etc.)
  const pages = ['home', 'about', 'services', 'packages', 'projects', 'process', 'contact'];
  for (const p of pages) {
    await postData('pages', {
      page: p,
      title: `${p.charAt(0).toUpperCase() + p.slice(1)} Page`,
      subtitle: `Welcome to the ${p} page.`
    });
  }

  console.log('Seeding complete.');
};

seed();
