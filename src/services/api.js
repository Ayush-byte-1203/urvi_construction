const hostname = window.location.hostname;
const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
export const API_URL = import.meta.env.VITE_API_URL || 
  (isLocal ? `http://${hostname}:8000/api` : 'https://Paramarsh.pythonanywhere.com/api');

export const fetchSiteSettings = async () => {
  const response = await fetch(`${API_URL}/settings/`);
  return response.json();
};

export const fetchPageContent = async (page) => {
  const response = await fetch(`${API_URL}/pages/${page}/`);
  if (!response.ok) return null;
  return response.json();
};

export const fetchServices = async () => {
  const response = await fetch(`${API_URL}/services/`);
  return response.json();
};

export const fetchPackages = async () => {
  const response = await fetch(`${API_URL}/packages/`);
  return response.json();
};

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/projects/`);
  return response.json();
};

export const fetchTestimonials = async () => {
  const response = await fetch(`${API_URL}/testimonials/`);
  return response.json();
};

export const fetchFAQs = async () => {
  const response = await fetch(`${API_URL}/faqs/`);
  return response.json();
};

export const fetchCoreValues = async () => {
  const response = await fetch(`${API_URL}/core-values/`);
  return response.json();
};

export const fetchBlogCategories = async () => {
  const response = await fetch(`${API_URL}/blog-categories/`);
  return response.json();
};

export const fetchBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs/`);
  return response.json();
};

export const fetchMegaMenus = async () => {
  const response = await fetch(`${API_URL}/mega-menus/`);
  return response.json();
};
