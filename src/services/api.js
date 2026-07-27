const hostname = window.location.hostname;
const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
export const API_URL = import.meta.env.VITE_API_URL ||
  (isLocal ? `http://${hostname}:8000/api` : 'https://Paramarsh.pythonanywhere.com/api');

export const fetchSiteSettings = async () => {
  try {
    const response = await fetch(`${API_URL}/settings/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchPageContent = async (page) => {
  const response = await fetch(`${API_URL}/pages/${page}/`);
  if (!response.ok) return null;
  return response.json();
};

export const fetchServices = async () => {
  try {
    const response = await fetch(`${API_URL}/services/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchPackages = async () => {
  try {
    const response = await fetch(`${API_URL}/packages/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchProjectCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/project-categories/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchTestimonials = async () => {
  try {
    const response = await fetch(`${API_URL}/testimonials/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchFAQs = async () => {
  try {
    const response = await fetch(`${API_URL}/faqs/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchCoreValues = async () => {
  try {
    const response = await fetch(`${API_URL}/core-values/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchBlogCategories = async () => {
  try {
    const response = await fetch(`${API_URL}/blog-categories/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/blogs/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchGalleryImages = async () => {
  try {
    const response = await fetch(`${API_URL}/gallery-images/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchCompanyStats = async () => {
  try {
    const response = await fetch(`${API_URL}/company-stats/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchCalculatorSettings = async () => {
  try {
    const response = await fetch(`${API_URL}/calculator-settings/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchJourneyMilestones = async () => {
  try {
    const response = await fetch(`${API_URL}/journey/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchWhyChooseUs = async () => {
  try {
    const response = await fetch(`${API_URL}/why-choose-us/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchProcessSteps = async () => {
  try {
    const response = await fetch(`${API_URL}/process-steps/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};

export const fetchTrustFeatures = async () => {
  try {
    const response = await fetch(`${API_URL}/trust-features/`);
    if (!response.ok) return [];
    return response.json();
  } catch { return []; }
};
