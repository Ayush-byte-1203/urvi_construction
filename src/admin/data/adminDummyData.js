/**
 * adminDummyData.js
 * Centralised dummy data for the BuildCraft Admin CMS.
 * All data is static / frontend-only.
 * Replace with real API calls when backend is ready.
 */

// ─── KPI Stats ────────────────────────────────────────────────────────────────
export const adminStats = [
  { id: 'leads',       label: 'Total Leads',          value: 284,  trend: +12, unit: '',  icon: 'users'     },
  { id: 'quotes',      label: 'Open Quote Requests',  value: 37,   trend: +5,  unit: '',  icon: 'file-text' },
  { id: 'projects',    label: 'Active Projects',       value: 14,   trend: -2,  unit: '',  icon: 'layers'    },
  { id: 'blogs',       label: 'Published Articles',    value: 48,   trend: +8,  unit: '',  icon: 'book-open' },
  { id: 'subscribers', label: 'Newsletter Subscribers',value: 1240, trend: +34, unit: '',  icon: 'mail'      },
  { id: 'revenue',     label: 'Est. Pipeline Value',   value: 4.2,  trend: +18, unit: 'Cr', icon: 'trending-up' },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const adminNotifications = [
  { id: 1, type: 'lead',    message: 'New lead from Rajesh Mehta — Residential 3BHK',  time: '5 min ago',  read: false },
  { id: 2, type: 'quote',   message: 'Quote request submitted by Priya Sharma',          time: '22 min ago', read: false },
  { id: 3, type: 'project', message: 'The Vista Waterfront slab casting milestone done', time: '1 hr ago',   read: true  },
  { id: 4, type: 'app',     message: 'New job application for Civil Engineer (Senior)',   time: '2 hr ago',   read: true  },
  { id: 5, type: 'system',  message: 'SEO audit completed — 3 pages need attention',     time: '5 hr ago',   read: true  },
];

// ─── Upcoming Tasks ───────────────────────────────────────────────────────────
export const adminTasks = [
  { id: 1, title: 'Follow up with Rajesh Mehta lead',           due: 'Today',      priority: 'high',   done: false },
  { id: 2, title: 'Review quote for Kapoor Family Villa',        due: 'Today',      priority: 'high',   done: false },
  { id: 3, title: 'Publish blog: "10 Monsoon Proofing Tips"',    due: 'Tomorrow',   priority: 'medium', done: false },
  { id: 4, title: 'Update FAQ — new warranty policy',            due: 'Jul 5',      priority: 'low',    done: false },
  { id: 5, title: 'Review 4 job applications (Civil Eng.)',      due: 'Jul 6',      priority: 'medium', done: true  },
  { id: 6, title: 'Send newsletter — July material price update',due: 'Jul 8',      priority: 'medium', done: false },
];

// ─── Monthly Analytics (chart data) ──────────────────────────────────────────
export const monthlyLeads = [
  { month: 'Jan', leads: 18 },
  { month: 'Feb', leads: 24 },
  { month: 'Mar', leads: 31 },
  { month: 'Apr', leads: 27 },
  { month: 'May', leads: 38 },
  { month: 'Jun', leads: 45 },
  { month: 'Jul', leads: 52 },
  { month: 'Aug', leads: 48 },
  { month: 'Sep', leads: 41 },
  { month: 'Oct', leads: 56 },
  { month: 'Nov', leads: 62 },
  { month: 'Dec', leads: 58 },
];

export const leadsBySource = [
  { source: 'Website',   count: 112, color: '#3b82f6' },
  { source: 'WhatsApp',  count: 68,  color: '#22c55e' },
  { source: 'Referral',  count: 54,  color: '#f59e0b' },
  { source: 'Instagram', count: 32,  color: '#ec4899' },
  { source: 'Walk-in',   count: 18,  color: '#8b5cf6' },
];

export const pageViews = [
  { page: 'Home',     views: 8420 },
  { page: 'Services', views: 4210 },
  { page: 'Packages', views: 3870 },
  { page: 'Projects', views: 2940 },
  { page: 'Contact',  views: 2580 },
  { page: 'Blog',     views: 1940 },
  { page: 'About',    views: 1320 },
];

// ─── Leads ────────────────────────────────────────────────────────────────────
export const leadsData = [
  { id: 'L001', name: 'Rajesh Mehta',       phone: '+91 98765 43210', email: 'rajesh@email.com', city: 'Vadodara', service: 'Residential',  status: 'new',       date: 'Jul 3, 2026',  source: 'Website'  },
  { id: 'L002', name: 'Priya Kapoor',       phone: '+91 87654 32109', email: 'priya@email.com',  city: 'Surat',    service: 'Commercial',   status: 'contacted', date: 'Jul 2, 2026',  source: 'WhatsApp' },
  { id: 'L003', name: 'Sunil Patel',        phone: '+91 76543 21098', email: 'sunil@email.com',  city: 'Vadodara', service: 'Industrial',   status: 'converted', date: 'Jul 1, 2026',  source: 'Referral' },
  { id: 'L004', name: 'Anjali Shah',        phone: '+91 65432 10987', email: 'anjali@email.com', city: 'Anand',    service: 'Residential',  status: 'new',       date: 'Jun 30, 2026', source: 'Instagram'},
  { id: 'L005', name: 'Vikram Desai',       phone: '+91 54321 09876', email: 'vikram@email.com', city: 'Vadodara', service: 'Commercial',   status: 'closed',    date: 'Jun 28, 2026', source: 'Walk-in'  },
  { id: 'L006', name: 'Nisha Joshi',        phone: '+91 43210 98765', email: 'nisha@email.com',  city: 'Bharuch',  service: 'Residential',  status: 'contacted', date: 'Jun 27, 2026', source: 'Website'  },
  { id: 'L007', name: 'Arjun Trivedi',      phone: '+91 32109 87654', email: 'arjun@email.com',  city: 'Vadodara', service: 'Industrial',   status: 'new',       date: 'Jun 26, 2026', source: 'WhatsApp' },
  { id: 'L008', name: 'Meena Reddy',        phone: '+91 21098 76543', email: 'meena@email.com',  city: 'Surat',    service: 'Residential',  status: 'converted', date: 'Jun 25, 2026', source: 'Referral' },
  { id: 'L009', name: 'Kiran Singh',        phone: '+91 10987 65432', email: 'kiran@email.com',  city: 'Anand',    service: 'Commercial',   status: 'new',       date: 'Jun 24, 2026', source: 'Instagram'},
  { id: 'L010', name: 'Deepak Agarwal',     phone: '+91 99876 54321', email: 'deepak@email.com', city: 'Vadodara', service: 'Residential',  status: 'contacted', date: 'Jun 23, 2026', source: 'Website'  },
];

// ─── Quote Requests ───────────────────────────────────────────────────────────
export const quotesData = [
  { id: 'Q001', name: 'Priya Sharma',   city: 'Vadodara', package: 'Signature Elite',  plotSize: '2400 sqft', budget: '₹1.2 Cr+', status: 'pending',  date: 'Jul 3, 2026',  phone: '+91 98765 11111' },
  { id: 'Q002', name: 'Ravi Kumar',     city: 'Surat',    package: 'Executive Smart',  plotSize: '1800 sqft', budget: '₹60-80L',  status: 'reviewed', date: 'Jul 2, 2026',  phone: '+91 87654 22222' },
  { id: 'Q003', name: 'Lalitha Nair',   city: 'Anand',    package: 'Core Shell',       plotSize: '1200 sqft', budget: '₹30-50L',  status: 'sent',     date: 'Jul 1, 2026',  phone: '+91 76543 33333' },
  { id: 'Q004', name: 'Sanjay Gupta',   city: 'Vadodara', package: 'Executive Smart',  plotSize: '2100 sqft', budget: '₹80L-1Cr', status: 'pending',  date: 'Jun 30, 2026', phone: '+91 65432 44444' },
  { id: 'Q005', name: 'Pooja Verma',    city: 'Bharuch',  package: 'Core Shell',       plotSize: '1000 sqft', budget: '₹25-40L',  status: 'closed',   date: 'Jun 29, 2026', phone: '+91 54321 55555' },
  { id: 'Q006', name: 'Anil Jain',      city: 'Vadodara', package: 'Signature Elite',  plotSize: '3200 sqft', budget: '₹1.5 Cr+', status: 'reviewed', date: 'Jun 28, 2026', phone: '+91 43210 66666' },
  { id: 'Q007', name: 'Sunita Pillai',  city: 'Surat',    package: 'Executive Smart',  plotSize: '1600 sqft', budget: '₹55-75L',  status: 'pending',  date: 'Jun 27, 2026', phone: '+91 32109 77777' },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const servicesAdminData = [
  { id: 'residential',  title: 'Residential Construction',  tagline: 'Dream Homes Built to Last',     status: 'active', order: 1, lastUpdated: 'Jun 15, 2026' },
  { id: 'commercial',   title: 'Commercial Development',    tagline: 'Structures That Mean Business', status: 'active', order: 2, lastUpdated: 'Jun 10, 2026' },
  { id: 'industrial',   title: 'Industrial Engineering',    tagline: 'Heavy-Duty, Precision Built',   status: 'active', order: 3, lastUpdated: 'Jun 8, 2026'  },
  { id: 'renovation',   title: 'Renovation & Remodelling',  tagline: 'Transform Your Space',          status: 'active', order: 4, lastUpdated: 'May 30, 2026' },
  { id: 'interior',     title: 'Interior Design',           tagline: 'Spaces That Inspire',           status: 'draft',  order: 5, lastUpdated: 'May 20, 2026' },
  { id: 'pmc',          title: 'Project Management',        tagline: 'Your Trusted Site Supervisor',  status: 'active', order: 6, lastUpdated: 'May 15, 2026' },
];

// ─── Packages ─────────────────────────────────────────────────────────────────
export const packagesAdminData = [
  { id: 'P01', name: 'Core Shell Build',    city: 'Vadodara', price: '₹1,650',  tier: 'basic',     popular: false, status: 'active' },
  { id: 'P02', name: 'Executive Smart',     city: 'Vadodara', price: '₹1,950',  tier: 'mid',       popular: true,  status: 'active' },
  { id: 'P03', name: 'Signature Elite',     city: 'Vadodara', price: '₹2,450',  tier: 'premium',   popular: false, status: 'active' },
  { id: 'P04', name: 'Core Shell Build',    city: 'Surat',    price: '₹1,700',  tier: 'basic',     popular: false, status: 'active' },
  { id: 'P05', name: 'Executive Smart',     city: 'Surat',    price: '₹2,000',  tier: 'mid',       popular: true,  status: 'active' },
  { id: 'P06', name: 'Signature Elite',     city: 'Surat',    price: '₹2,500',  tier: 'premium',   popular: false, status: 'active' },
  { id: 'P07', name: 'Core Shell Build',    city: 'Anand',    price: '₹1,600',  tier: 'basic',     popular: false, status: 'draft'  },
  { id: 'P08', name: 'Executive Smart',     city: 'Anand',    price: '₹1,900',  tier: 'mid',       popular: false, status: 'draft'  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projectsAdminData = [
  { id: 'PR01', name: 'The Vista Waterfront',    location: 'Vadodara', category: 'Residential', status: 'ongoing',   featured: true,  completionPct: 62, value: '₹4.2 Cr', client: 'Dr. Ananya Sen',   startDate: 'Jan 2026' },
  { id: 'PR02', name: 'Kapoor Corporate Plaza',  location: 'Surat',    category: 'Commercial',  status: 'ongoing',   featured: true,  completionPct: 40, value: '₹8.5 Cr', client: 'Kapoor Industries', startDate: 'Mar 2026' },
  { id: 'PR03', name: 'Green Valley Villas',     location: 'Anand',    category: 'Residential', status: 'completed', featured: true,  completionPct: 100, value: '₹2.8 Cr', client: 'Multiple Owners', startDate: 'Aug 2024' },
  { id: 'PR04', name: 'Desai Logistics Hub',     location: 'Bharuch',  category: 'Industrial',  status: 'completed', featured: false, completionPct: 100, value: '₹6.1 Cr', client: 'Desai Logistics', startDate: 'Feb 2025' },
  { id: 'PR05', name: 'Sunrise Apartments',      location: 'Vadodara', category: 'Residential', status: 'ongoing',   featured: false, completionPct: 25, value: '₹3.4 Cr', client: 'Sunrise Dev.',    startDate: 'May 2026' },
  { id: 'PR06', name: 'Meridian Tech Park',      location: 'Surat',    category: 'Commercial',  status: 'completed', featured: true,  completionPct: 100, value: '₹12 Cr',  client: 'Meridian Grp.',   startDate: 'Jan 2024' },
];

// ─── Blogs ────────────────────────────────────────────────────────────────────
export const blogsAdminData = [
  { id: 'B01', title: 'Sustainable Building Materials for 2026',     category: 'Materials',     author: 'Er. Sandeep Joshi', status: 'published', date: 'Jun 20, 2026', views: 1240 },
  { id: 'B02', title: 'Smart Home Automation Integration Guide',      category: 'Technology',    author: 'Ar. Priyanka Rao',  status: 'published', date: 'Jun 15, 2026', views: 980  },
  { id: 'B03', title: 'Understanding BOQ Estimates for Homeowners',   category: 'Guides',        author: 'Er. Sandeep Joshi', status: 'published', date: 'Jun 5, 2026',  views: 2140 },
  { id: 'B04', title: 'Monsoon-Proofing Your Construction Site',      category: 'Construction',  author: 'Ar. Priyanka Rao',  status: 'draft',     date: 'Jul 3, 2026',  views: 0    },
  { id: 'B05', title: 'Steel vs TMT Rebar: Which is Better?',         category: 'Materials',     author: 'Er. Sandeep Joshi', status: 'published', date: 'May 28, 2026', views: 3560 },
  { id: 'B06', title: 'Vastu Shastra in Modern Construction',          category: 'Design',        author: 'Ar. Priyanka Rao',  status: 'draft',     date: 'Jul 1, 2026',  views: 0    },
  { id: 'B07', title: 'Complete Guide to RERA Compliance Gujarat',    category: 'Legal',         author: 'Legal Team',        status: 'published', date: 'May 10, 2026', views: 4820 },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonialsAdminData = [
  { id: 'T01', author: 'Dr. Ananya Sen',    project: 'Vista Waterfront',   rating: 5, status: 'active',  date: 'Jun 20, 2026', quote: 'Exceptional precision and transparency throughout.' },
  { id: 'T02', author: 'Kapoor Industries', project: 'Corporate Plaza',    rating: 5, status: 'active',  date: 'Jun 10, 2026', quote: 'Delivered on time and within budget. Remarkable team.' },
  { id: 'T03', author: 'Rohan Mehta',       project: 'Green Valley',       rating: 4, status: 'active',  date: 'May 25, 2026', quote: 'Great quality materials and professional site management.' },
  { id: 'T04', author: 'Lalitha Nair',      project: 'Sunrise Apartments', rating: 5, status: 'pending', date: 'Jul 1, 2026',  quote: 'Very satisfied with the design and execution quality.' },
  { id: 'T05', author: 'Vikram Desai',      project: 'Logistics Hub',      rating: 5, status: 'active',  date: 'May 5, 2026',  quote: 'Industrial-grade quality, completed ahead of schedule.' },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqAdminData = [
  { id: 'F01', question: 'What is included in the Core Shell Build package?',  category: 'pricing',  status: 'active', order: 1 },
  { id: 'F02', question: 'How long does a standard 1500 sqft home take?',       category: 'process',  status: 'active', order: 2 },
  { id: 'F03', question: 'Do you provide structural warranty certificates?',     category: 'warranty', status: 'active', order: 3 },
  { id: 'F04', question: 'What payment milestones are followed?',               category: 'pricing',  status: 'active', order: 4 },
  { id: 'F05', question: 'Can I customise materials within a package?',         category: 'general',  status: 'active', order: 5 },
  { id: 'F06', question: 'Do you handle RERA registration and approvals?',      category: 'process',  status: 'active', order: 6 },
  { id: 'F07', question: 'What is the minimum plot size you work with?',        category: 'general',  status: 'hidden', order: 7 },
];

// ─── Careers ──────────────────────────────────────────────────────────────────
export const careersAdminData = [
  { id: 'JB01', title: 'Senior Civil Engineer',          department: 'Engineering', type: 'full-time', location: 'Vadodara', status: 'active',   posted: 'Jun 25, 2026', applications: 12 },
  { id: 'JB02', title: 'Architectural Draughtsman',      department: 'Design',      type: 'full-time', location: 'Vadodara', status: 'active',   posted: 'Jun 20, 2026', applications: 8  },
  { id: 'JB03', title: 'Project Manager (Commercial)',   department: 'PMC',         type: 'full-time', location: 'Surat',    status: 'active',   posted: 'Jun 15, 2026', applications: 5  },
  { id: 'JB04', title: 'Site Supervisor',                department: 'Operations',  type: 'contract',  location: 'Vadodara', status: 'active',   posted: 'Jun 10, 2026', applications: 18 },
  { id: 'JB05', title: 'Interior Design Consultant',     department: 'Design',      type: 'part-time', location: 'Remote',   status: 'draft',    posted: 'Jul 1, 2026',  applications: 0  },
  { id: 'JB06', title: 'Business Development Executive', department: 'Sales',       type: 'full-time', location: 'Vadodara', status: 'closed',   posted: 'May 1, 2026',  applications: 24 },
];

// ─── Applications ─────────────────────────────────────────────────────────────
export const applicationsAdminData = [
  { id: 'AP01', name: 'Amish Patel',    role: 'Senior Civil Engineer',     experience: '8 yrs', stage: 'interview',  date: 'Jul 2, 2026',  resume: 'amish_cv.pdf'   },
  { id: 'AP02', name: 'Reena Sharma',   role: 'Architectural Draughtsman', experience: '5 yrs', stage: 'review',     date: 'Jul 1, 2026',  resume: 'reena_cv.pdf'   },
  { id: 'AP03', name: 'Mohit Trivedi',  role: 'Site Supervisor',           experience: '10 yrs',stage: 'offer',      date: 'Jun 30, 2026', resume: 'mohit_cv.pdf'   },
  { id: 'AP04', name: 'Shruti Kapoor',  role: 'Project Manager',           experience: '6 yrs', stage: 'review',     date: 'Jun 29, 2026', resume: 'shruti_cv.pdf'  },
  { id: 'AP05', name: 'Raj Desai',      role: 'Senior Civil Engineer',     experience: '12 yrs',stage: 'rejected',   date: 'Jun 28, 2026', resume: 'raj_cv.pdf'     },
  { id: 'AP06', name: 'Kavita Jain',    role: 'Interior Design Consultant',experience: '4 yrs', stage: 'review',     date: 'Jun 27, 2026', resume: 'kavita_cv.pdf'  },
  { id: 'AP07', name: 'Nikhil Rao',     role: 'Site Supervisor',           experience: '7 yrs', stage: 'interview',  date: 'Jun 26, 2026', resume: 'nikhil_cv.pdf'  },
];

// ─── Newsletter ───────────────────────────────────────────────────────────────
export const newsletterData = [
  { id: 'NL001', email: 'rajesh@email.com',    subscribed: 'Jun 1, 2026',  source: 'Website Footer', status: 'active'       },
  { id: 'NL002', email: 'priya@email.com',     subscribed: 'May 28, 2026', source: 'Blog CTA',       status: 'active'       },
  { id: 'NL003', email: 'sunil.p@email.com',   subscribed: 'May 20, 2026', source: 'Website Footer', status: 'active'       },
  { id: 'NL004', email: 'anjali@email.com',    subscribed: 'May 15, 2026', source: 'Blog CTA',       status: 'unsubscribed' },
  { id: 'NL005', email: 'vikram.d@email.com',  subscribed: 'May 10, 2026', source: 'Contact Page',   status: 'active'       },
  { id: 'NL006', email: 'nisha.j@email.com',   subscribed: 'Apr 30, 2026', source: 'Website Footer', status: 'active'       },
  { id: 'NL007', email: 'arjun.t@email.com',   subscribed: 'Apr 20, 2026', source: 'Blog CTA',       status: 'active'       },
  { id: 'NL008', email: 'meena.r@email.com',   subscribed: 'Apr 10, 2026', source: 'Contact Page',   status: 'unsubscribed' },
];

// ─── Downloads ────────────────────────────────────────────────────────────────
export const downloadsAdminData = [
  { id: 'D01', name: 'Core Shell Package Brochure',    category: 'Brochures',   size: '2.4 MB', format: 'PDF', downloads: 384, status: 'active',   uploaded: 'Jun 1, 2026'  },
  { id: 'D02', name: 'Executive Smart Package Guide',  category: 'Brochures',   size: '3.1 MB', format: 'PDF', downloads: 291, status: 'active',   uploaded: 'Jun 1, 2026'  },
  { id: 'D03', name: 'Signature Elite Specification',  category: 'Brochures',   size: '4.2 MB', format: 'PDF', downloads: 178, status: 'active',   uploaded: 'Jun 1, 2026'  },
  { id: 'D04', name: 'Construction Process Flowchart', category: 'Guides',      size: '1.8 MB', format: 'PDF', downloads: 520, status: 'active',   uploaded: 'May 15, 2026' },
  { id: 'D05', name: 'Material Comparison Sheet',      category: 'Guides',      size: '0.9 MB', format: 'PDF', downloads: 642, status: 'active',   uploaded: 'May 10, 2026' },
  { id: 'D06', name: 'Self-Build Cost Calculator',     category: 'Tools',       size: '0.4 MB', format: 'XLS', downloads: 892, status: 'active',   uploaded: 'Apr 20, 2026' },
  { id: 'D07', name: 'Project Portfolio 2024-2025',   category: 'Portfolio',   size: '8.6 MB', format: 'PDF', downloads: 1240, status: 'active',  uploaded: 'Mar 1, 2026'  },
  { id: 'D08', name: 'Company Profile Presentation',   category: 'Corporate',   size: '5.2 MB', format: 'PPT', downloads: 186, status: 'draft',    uploaded: 'Jul 1, 2026'  },
];

// ─── Media Library ────────────────────────────────────────────────────────────
export const mediaLibraryData = [
  { id: 'M01', name: 'hero-banner-main.jpg',        type: 'image', category: 'Homepage',   size: '820 KB', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', uploaded: 'Jun 1, 2026'  },
  { id: 'M02', name: 'residential-project-1.jpg',   type: 'image', category: 'Projects',   size: '640 KB', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400', uploaded: 'Jun 2, 2026'  },
  { id: 'M03', name: 'commercial-exterior.jpg',     type: 'image', category: 'Projects',   size: '720 KB', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400', uploaded: 'Jun 3, 2026'  },
  { id: 'M04', name: 'team-construction-site.jpg',  type: 'image', category: 'Team',       size: '580 KB', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400', uploaded: 'Jun 4, 2026'  },
  { id: 'M05', name: 'industrial-warehouse.jpg',    type: 'image', category: 'Projects',   size: '890 KB', url: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=400', uploaded: 'Jun 5, 2026'  },
  { id: 'M06', name: 'interior-living-room.jpg',    type: 'image', category: 'Interior',   size: '540 KB', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400', uploaded: 'Jun 6, 2026'  },
  { id: 'M07', name: 'site-aerial-view.jpg',        type: 'image', category: 'Projects',   size: '1.2 MB', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400', uploaded: 'Jun 7, 2026'  },
  { id: 'M08', name: 'materials-display.jpg',       type: 'image', category: 'Materials',  size: '420 KB', url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400', uploaded: 'Jun 8, 2026'  },
  { id: 'M09', name: 'construction-overview.mp4',   type: 'video', category: 'Brand',      size: '24 MB',  url: '',                                                                  uploaded: 'May 15, 2026' },
  { id: 'M10', name: 'corporate-profile.pdf',       type: 'doc',   category: 'Corporate',  size: '5.2 MB', url: '',                                                                  uploaded: 'Mar 1, 2026'  },
  { id: 'M11', name: 'floor-plan-template.pdf',     type: 'doc',   category: 'Templates',  size: '1.1 MB', url: '',                                                                  uploaded: 'Apr 20, 2026' },
  { id: 'M12', name: 'logo-primary.svg',            type: 'image', category: 'Brand',      size: '24 KB',  url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', uploaded: 'Jan 1, 2026'  },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export const usersAdminData = [
  { id: 'U01', name: 'Sandeep Joshi',   email: 'sandeep@buildcraft.com', role: 'Super Admin',    lastLogin: '5 min ago',   status: 'active'    },
  { id: 'U02', name: 'Priyanka Rao',    email: 'priyanka@buildcraft.com',role: 'Content Editor', lastLogin: '1 hr ago',    status: 'active'    },
  { id: 'U03', name: 'Ramesh Verma',    email: 'ramesh@buildcraft.com',  role: 'Sales Manager',  lastLogin: '3 hr ago',    status: 'active'    },
  { id: 'U04', name: 'Kavitha Nair',    email: 'kavitha@buildcraft.com', role: 'HR Manager',     lastLogin: 'Yesterday',   status: 'active'    },
  { id: 'U05', name: 'Alok Singh',      email: 'alok@buildcraft.com',    role: 'Content Editor', lastLogin: '3 days ago',  status: 'active'    },
  { id: 'U06', name: 'Meenakshi Iyer',  email: 'meenakshi@buildcraft.com',role:'Viewer',         lastLogin: '1 week ago',  status: 'suspended' },
];

// ─── Roles & Permissions ──────────────────────────────────────────────────────
export const rolesAdminData = [
  {
    id: 'R01', name: 'Super Admin', description: 'Full access to all modules',
    permissions: { dashboard: ['read','write','delete'], content: ['read','write','delete'], leads: ['read','write','delete'], hr: ['read','write','delete'], media: ['read','write','delete'], config: ['read','write','delete'] }
  },
  {
    id: 'R02', name: 'Content Editor', description: 'Manage content: blogs, services, FAQ',
    permissions: { dashboard: ['read'], content: ['read','write'], leads: ['read'], hr: [], media: ['read','write'], config: ['read'] }
  },
  {
    id: 'R03', name: 'Sales Manager', description: 'Manage leads, quotes, newsletter',
    permissions: { dashboard: ['read'], content: ['read'], leads: ['read','write'], hr: ['read'], media: ['read'], config: [] }
  },
  {
    id: 'R04', name: 'HR Manager', description: 'Manage careers and job applications',
    permissions: { dashboard: ['read'], content: ['read'], leads: ['read'], hr: ['read','write','delete'], media: ['read'], config: [] }
  },
  {
    id: 'R05', name: 'Viewer', description: 'Read-only access to dashboard only',
    permissions: { dashboard: ['read'], content: [], leads: [], hr: [], media: [], config: [] }
  },
];

// ─── SEO Pages ────────────────────────────────────────────────────────────────
export const seoAdminData = [
  { id: 'S01', route: '/',              page: 'Home',          title: 'BuildCraft Constructions | Premium Modern Construction',    description: 'Crafting luxury construction masterpieces...', ogImage: 'hero-banner.jpg',     schema: 'WebSite',    canonical: 'https://buildcraft.com' },
  { id: 'S02', route: '/about',         page: 'About',         title: 'About Us & Legacy | BuildCraft',                           description: 'Discover our history of engineering...',      ogImage: 'about-hero.jpg',       schema: 'AboutPage',  canonical: 'https://buildcraft.com/about' },
  { id: 'S03', route: '/services',      page: 'Services',      title: 'Engineering Services Ecosystem | BuildCraft',              description: 'Explore our complete services...',            ogImage: 'services-hero.jpg',    schema: 'Service',    canonical: 'https://buildcraft.com/services' },
  { id: 'S04', route: '/packages',      page: 'Packages',      title: 'Construction Packages | BuildCraft',                       description: 'Choose your perfect construction package...',  ogImage: 'packages-hero.jpg',    schema: 'Product',    canonical: 'https://buildcraft.com/packages' },
  { id: 'S05', route: '/projects',      page: 'Projects',      title: 'Our Portfolio | BuildCraft',                               description: 'Explore our completed and ongoing projects...', ogImage: 'projects-hero.jpg',   schema: 'ItemList',   canonical: 'https://buildcraft.com/projects' },
  { id: 'S06', route: '/blog',          page: 'Knowledge Hub', title: 'Construction Knowledge Center | BuildCraft',               description: 'Expert construction guides and insights...',   ogImage: 'blog-hero.jpg',        schema: 'Blog',       canonical: 'https://buildcraft.com/blog' },
  { id: 'S07', route: '/faq',           page: 'FAQ',           title: 'Frequently Asked Questions | BuildCraft',                  description: 'Get clear answers about construction...',     ogImage: 'hero-banner.jpg',      schema: 'FAQPage',    canonical: 'https://buildcraft.com/faq' },
  { id: 'S08', route: '/contact',       page: 'Contact',       title: 'Contact BuildCraft | Premium Construction Estimates',      description: 'Get in touch for a free site assessment...',  ogImage: 'contact-hero.jpg',     schema: 'ContactPage',canonical: 'https://buildcraft.com/contact' },
];

// ─── Page Builder ─────────────────────────────────────────────────────────────
export const homeSectionsData = [
  { id: 'HS01', name: 'Hero',                  enabled: true,  order: 1,  ctaText: 'Book Free Consultation',    note: 'Main cinematic video loop' },
  { id: 'HS02', name: 'Trust Strip',           enabled: true,  order: 2,  ctaText: '',                           note: 'Stats bar (projects, years, cities)' },
  { id: 'HS03', name: 'One Stop Solutions',    enabled: true,  order: 3,  ctaText: 'Explore All Services',      note: 'Circular ecosystem widget' },
  { id: 'HS04', name: 'Featured Services',     enabled: true,  order: 4,  ctaText: 'All Services',              note: 'Asymmetrical 3-card grid' },
  { id: 'HS05', name: 'Package Estimator',     enabled: true,  order: 5,  ctaText: 'Compare Specifications',    note: 'City-based package cards' },
  { id: 'HS06', name: 'Build Journey',         enabled: true,  order: 6,  ctaText: '',                           note: 'Interactive 9-stage timeline' },
  { id: 'HS07', name: 'Why Choose Us',         enabled: true,  order: 7,  ctaText: '',                           note: 'Feature cards with icons' },
  { id: 'HS08', name: 'Featured Projects',     enabled: true,  order: 8,  ctaText: 'View All Projects',         note: 'Asymmetrical project gallery' },
  { id: 'HS09', name: 'Material Brands',       enabled: true,  order: 9,  ctaText: '',                           note: 'Partner brand logo carousel' },
  { id: 'HS10', name: 'Video Gallery',         enabled: false, order: 10, ctaText: '',                           note: 'Video testimonial showcase' },
  { id: 'HS11', name: 'Testimonials',          enabled: true,  order: 11, ctaText: '',                           note: 'Split-layout review carousel' },
  { id: 'HS12', name: 'Knowledge Hub',         enabled: true,  order: 12, ctaText: 'All Articles',              note: 'Latest blog article previews' },
  { id: 'HS13', name: 'FAQ Preview',           enabled: true,  order: 13, ctaText: 'Read Full Q&A',             note: 'Accordion FAQ preview' },
  { id: 'HS14', name: 'Quote Wizard',          enabled: true,  order: 14, ctaText: 'Calculate Cost',            note: 'Interactive cost calculator' },
  { id: 'HS15', name: 'Final CTA',             enabled: true,  order: 15, ctaText: 'Book Free Site Consultation', note: 'Dark banner with dual CTAs' },
];

// ─── Cities ───────────────────────────────────────────────────────────────────
export const citiesAdminData = [
  { id: 'C01', name: 'Vadodara', state: 'Gujarat', active: true,  packages: 3, leads: 142 },
  { id: 'C02', name: 'Surat',    state: 'Gujarat', active: true,  packages: 3, leads: 86  },
  { id: 'C03', name: 'Anand',    state: 'Gujarat', active: false, packages: 2, leads: 34  },
  { id: 'C04', name: 'Bharuch',  state: 'Gujarat', active: false, packages: 0, leads: 22  },
];

// ─── Material Brands ──────────────────────────────────────────────────────────
export const brandsAdminData = [
  { id: 'BR01', name: 'UltraTech Cement',  category: 'Cement',    tier: 'premium', status: 'active',  order: 1 },
  { id: 'BR02', name: 'Tata Tiscon Steel', category: 'Steel',     tier: 'premium', status: 'active',  order: 2 },
  { id: 'BR03', name: 'Havells',           category: 'Electrical',tier: 'standard',status: 'active',  order: 3 },
  { id: 'BR04', name: 'Asian Paints',      category: 'Paints',    tier: 'premium', status: 'active',  order: 4 },
  { id: 'BR05', name: 'Kajaria Tiles',     category: 'Flooring',  tier: 'premium', status: 'active',  order: 5 },
  { id: 'BR06', name: 'Jaquar',            category: 'Sanitary',  tier: 'premium', status: 'active',  order: 6 },
  { id: 'BR07', name: 'CPVC Pipes (Astral)',category:'Plumbing',   tier: 'standard',status: 'active',  order: 7 },
  { id: 'BR08', name: 'Legrand Switches',  category: 'Electrical',tier: 'premium', status: 'draft',   order: 8 },
];

// ─── Navigation ───────────────────────────────────────────────────────────────
export const navigationAdminData = [
  { id: 'NAV01', label: 'Home',         path: '/',            enabled: true,  order: 1, inFooter: true  },
  { id: 'NAV02', label: 'About',        path: '/about',       enabled: true,  order: 2, inFooter: true  },
  { id: 'NAV03', label: 'Services',     path: '/services',    enabled: true,  order: 3, inFooter: true  },
  { id: 'NAV04', label: 'Packages',     path: '/packages',    enabled: true,  order: 4, inFooter: true  },
  { id: 'NAV05', label: 'Projects',     path: '/projects',    enabled: true,  order: 5, inFooter: true  },
  { id: 'NAV06', label: 'Process',      path: '/process',     enabled: true,  order: 6, inFooter: false },
  { id: 'NAV07', label: 'Knowledge Hub',path: '/blog',        enabled: true,  order: 7, inFooter: true  },
  { id: 'NAV08', label: 'FAQ',          path: '/faq',         enabled: true,  order: 8, inFooter: true  },
  { id: 'NAV09', label: 'Careers',      path: '/careers',     enabled: true,  order: 9, inFooter: true  },
  { id: 'NAV10', label: 'Contact',      path: '/contact',     enabled: true,  order: 10,inFooter: true  },
  { id: 'NAV11', label: 'Testimonials', path: '/testimonials',enabled: false, order: 11,inFooter: false },
];

// ─── Website Settings ─────────────────────────────────────────────────────────
export const settingsAdminData = {
  company: {
    name: 'BuildCraft Constructions',
    tagline: 'Building Excellence, One Structure at a Time',
    phone: '+91 XXXXX XXXXX',
    email: 'contact@example.com',
    address: '123 Business Avenue, Vadodara, Gujarat 390020',
    businessHours: 'Monday – Saturday, 9 AM – 6 PM',
    whatsapp: '+91XXXXXXXXXX',
    gstNumber: 'XXXXXXXXXXXX',
    reraNumber: 'PXXXXXXXXXXXXX',
  },
  social: { facebook: '#', instagram: '#', twitter: '#', linkedin: '#', youtube: '#' },
  theme: { accentColor: '#3b82f6', darkMode: false },
  maintenance: { enabled: false, message: 'Site under scheduled maintenance. Back shortly.' },
};
