/**
 * AppServices.js
 * Unified frontend service layer abstraction.
 * Encapsulates mock API connections ready to be swapped with fetch/axios endpoints.
 */

const SIMULATED_DELAY = 600;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const AppServices = {
  // Authentication
  auth: {
    login: async (email, password) => {
      await delay(SIMULATED_DELAY);
      if (email && password) {
        return {
          success: true,
          user: { name: 'Dr. Ananya Sen', role: 'Premium Client', email }
        };
      }
      throw new Error('Authentication coordinates invalid.');
    },
    getCurrentUser: () => {
      return { name: 'Dr. Ananya Sen', role: 'Premium Client', email: 'ananya@vista.com' };
    }
  },

  // CRM Lead Inquiries
  crm: {
    submitInquiry: async (inquiryData) => {
      await delay(SIMULATED_DELAY);
      // TODO: Replace with real CRM API call (e.g. POST /api/leads)
      // console.log removed — use a proper logging service in production
      return { success: true, refId: `BC-${Math.floor(100000 + Math.random() * 900000)}` };
    }
  },

  // Active Project Tracking
  projects: {
    getActiveTracker: async () => {
      await delay(SIMULATED_DELAY);
      return {
        id: 'vista-waterfront-v4',
        name: 'The Vista Waterfront Estates',
        stage: 'Structure Slab Cast',
        completionPercent: 62,
        manager: 'Er. Sandeep Joshi',
        timelines: [
          { phase: 'Foundations Pours', done: true, date: 'May 10, 2026' },
          { phase: 'Columns Reinforcement', done: true, date: 'June 02, 2026' },
          { phase: 'Slab Shuttering', done: true, date: 'June 20, 2026' },
          { phase: 'Electrical Conduits Routing', done: false, date: 'Pending' },
          { phase: 'Masonry Block Wall Work', done: false, date: 'Pending' }
        ],
        payments: [
          { name: 'Mobilization Advance (10%)', amount: '₹12,50,000', status: 'Paid' },
          { name: 'Foundations RCC Cast (15%)', amount: '₹18,75,000', status: 'Paid' },
          { name: 'Slabs Casting Complete (20%)', amount: '₹25,00,000', status: 'Pending Review' }
        ],
        documents: [
          { name: 'Architectural Blueprint Layouts.pdf', size: '12.4 MB' },
          { name: 'Structural Safety Test Reports.pdf', size: '4.8 MB' },
          { name: 'BoQ Concrete Cost Estimation.xls', size: '1.2 MB' }
        ]
      };
    }
  }
};
