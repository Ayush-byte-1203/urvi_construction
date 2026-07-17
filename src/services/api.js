const API_URL = import.meta.env.VITE_API_URL || 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:8000/api' 
    : 'https://Paramarsh.pythonanywhere.com/api');

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

export const fetchMilestones = async () => {
  const response = await fetch(`${API_URL}/milestones/`);
  return response.json();
};

export const fetchCompanyStats = async () => {
  const response = await fetch(`${API_URL}/company-stats/`);
  return response.json();
};

export const fetchProcessSteps = async () => {
  const response = await fetch(`${API_URL}/process-steps/`);
  return response.json();
};

export const fetchTrustPartners = async () => {
  const response = await fetch(`${API_URL}/trust-partners/`);
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
