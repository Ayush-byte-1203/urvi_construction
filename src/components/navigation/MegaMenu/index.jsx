import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Cpu, HardHat, FileCheck, Package, 
  MapPin, HelpCircle, Briefcase, FileText, Info, Compass, Award, Calendar, Phone, Mail, MessageSquare
} from 'lucide-react';
import styles from './styles.module.css';

const menuContents = {
  home: {
    categories: [
      {
        group: 'Quick Overview',
        links: [
          { title: 'Company Legacy', desc: 'Crafting structural landmarks since 2011.', path: '/about', icon: <Award size={16} /> },
          { title: 'Why Choose Us', desc: 'Engineered for lifetimes with millimetric precision.', path: '/about', icon: <ShieldCheck size={16} /> }
        ]
      },
      {
        group: 'Latest Updates',
        links: [
          { title: 'Completed Landmarks', desc: 'Browse our built portfolio case studies.', path: '/projects', icon: <Compass size={16} /> },
          { title: 'Live Staging coordinates', desc: 'Watch active concrete curing yards.', path: '/projects', icon: <HardHat size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Obsidian Horizon Villa',
      desc: 'Discover our latest structural cantilever masterpiece built in Vadodara.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      path: '/projects',
      linkText: 'Explore Project Specs'
    }
  },
  about: {
    categories: [
      {
        group: 'Our Identity',
        links: [
          { title: 'Company Story', desc: 'Translating designs into physical landmarks.', path: '/about', icon: <FileText size={16} /> },
          { title: 'Strategic Timeline', desc: 'Our trajectory from residential contractor to heavy civil firm.', path: '/about', icon: <Calendar size={16} /> }
        ]
      },
      {
        group: 'Values & Credentials',
        links: [
          { title: 'Mission & Vision', desc: 'Sustainable building with zero safety incidents.', path: '/about', icon: <Compass size={16} /> },
          { title: 'Certifications & Quality', desc: 'ISO 9001:2015 and Council standards compliance.', path: '/about', icon: <ShieldCheck size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Our Executive Leadership',
      desc: 'Meet the certified engineers and BIM modelers guiding our sites.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=400&q=80',
      path: '/about',
      linkText: 'Read Bio Details'
    }
  },
  services: {
    categories: [
      {
        group: 'Core Services',
        links: [
          { title: 'Civil Foundations pouring', desc: 'Geotech soil capacity checks & concrete frames.', path: '/services', icon: <HardHat size={16} /> },
          { title: 'Precast structural spans', desc: 'Manufactured pre-stressed load columns.', path: '/services', icon: <Package size={16} /> }
        ]
      },
      {
        group: 'Specialized & Smart Solutions',
        links: [
          { title: 'Smart Home Automation', desc: 'Low-voltage panel grids & sensory systems.', path: '/services', icon: <Cpu size={16} /> },
          { title: 'PMC Consultancy', desc: 'Supervised scheduling and milestone billing support.', path: '/services', icon: <FileCheck size={16} /> },
          { title: 'Plan Clearance & Permits', desc: 'Municipal approvals and zoning clearance coordination.', path: '/services', icon: <FileText size={16} /> },
          { title: 'Material Supply network', desc: 'Direct sourcing of certified EAF steel reinforcements.', path: '/services', icon: <Package size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Integrated Construction',
      desc: 'Explore how we coordinate all five build stages under a single contract.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
      path: '/services',
      linkText: 'Browse Divisions Scope'
    }
  },
  packages: {
    categories: [
      {
        group: 'Available Packages',
        links: [
          { title: 'Core Shell Build', desc: 'Raw concrete layouts starting at ₹2,100 / sq. ft.', path: '/packages', icon: <HardHat size={16} /> },
          { title: 'Executive Smart Build', desc: 'Premium finishes starting at ₹3,500 / sq. ft.', path: '/packages', icon: <Cpu size={16} /> },
          { title: 'Signature Elite Build', desc: 'Italian marble & design custom villa build at ₹5,200 / sq. ft.', path: '/packages', icon: <Award size={16} /> }
        ]
      },
      {
        group: 'Calculators & Guides',
        links: [
          { title: 'Construction Calculator', desc: 'Estimate build budgets based on plot area.', path: '/packages', icon: <Info size={16} /> },
          { title: 'Download Brochures', desc: 'Get pricing details and structural materials catalogs.', path: '/packages', icon: <FileText size={16} /> },
          { title: 'Tiers Comparison matrix', desc: 'Detail specs comparison of steel and cement brands.', path: '/packages', icon: <ShieldCheck size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Request Custom Estimation',
      desc: 'We draft itemized Bill of Quantities sheets for custom architecture maps.',
      image: 'https://images.unsplash.com/photo-1503387762-592ded58c45a?auto=format&fit=crop&w=400&q=80',
      path: '/contact',
      linkText: 'Request BOQ Pricing'
    }
  },
  projects: {
    categories: [
      {
        group: 'Portfolios',
        links: [
          { title: 'Luxury Custom Villas', desc: 'High-end custom residences & structures.', path: '/projects', icon: <Compass size={16} /> },
          { title: 'Commercial Plaza units', desc: 'Offices, logistics warehouses, and assembly yards.', path: '/projects', icon: <Briefcase size={16} /> }
        ]
      },
      {
        group: 'Active Media',
        links: [
          { title: 'Ongoing Builds', desc: 'See live concrete pouring reports from active sites.', path: '/projects', icon: <HardHat size={16} /> },
          { title: 'Site Video Gallery', desc: 'Walkthroughs of structural frameworks inspections.', path: '/projects', icon: <Compass size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Vista Waterfront Residences',
      desc: 'Take a virtual tour of our completed premium housing estate.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
      path: '/projects',
      linkText: 'Watch Video Tour'
    }
  },
  process: {
    categories: [
      {
        group: 'Site Milestones',
        links: [
          { title: 'Geotechnical Soil Journey', desc: 'Excavation coordinates and Soil load tests.', path: '/process', icon: <Compass size={16} /> },
          { title: 'Civil Frame assembly', desc: 'AAC masonry, concrete frameworks curing stages.', path: '/process', icon: <HardHat size={16} /> }
        ]
      },
      {
        group: 'System Handover',
        links: [
          { title: 'MEP Installation checks', desc: 'Electrical conduits and plumbing waterproofing.', path: '/process', icon: <ShieldCheck size={16} /> },
          { title: 'Framing Warranty terms', desc: 'Examine our 15-Year structural guarantees.', path: '/process', icon: <Award size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Process Timeline Preview',
      desc: 'See our standard 12-month staged roadmap to keys handover.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
      path: '/process',
      linkText: 'Examine Milestones'
    }
  },
  blog: {
    categories: [
      {
        group: 'Construction Guides',
        links: [
          { title: 'Materials Comparison', desc: 'Ductility parameters: Fe 500D vs Fe 550D TMT steel.', path: '/blog', icon: <FileText size={16} /> },
          { title: 'Smart Energy Checks', desc: 'Integrating solar orientation design values.', path: '/blog', icon: <Cpu size={16} /> }
        ]
      },
      {
        group: 'Articles & Blogs',
        links: [
          { title: 'Sustainable Concrete Mixes', desc: 'Carbon-absorbing AAC block construction tips.', path: '/blog', icon: <Compass size={16} /> },
          { title: 'Estimating budget layouts', desc: 'How to review structural BOQ drafts before pouring.', path: '/blog', icon: <Info size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Smart Automation Guide',
      desc: 'Read how sensory networks optimize HVAC energy consumption.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      path: '/blog',
      linkText: 'Read Latest Guide'
    }
  },
  faq: {
    categories: [
      {
        group: 'Popular Categories',
        links: [
          { title: 'Zoning & Permits FAQ', desc: 'Municipal clearance cycles and geotech safety codes.', path: '/faq', icon: <HelpCircle size={16} /> },
          { title: 'Milestone Billing checks', desc: 'Details explaining escrow models and payment parts.', path: '/faq', icon: <Info size={16} /> }
        ]
      },
      {
        group: 'Support Queries',
        links: [
          { title: 'Structural Warranty FAQ', desc: 'Coverage rules for chemical waterproofing seals.', path: '/faq', icon: <ShieldCheck size={16} /> },
          { title: 'Materials validation checks', desc: 'How we verify sand grade purity on sites.', path: '/faq', icon: <Package size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Instant Support Desk',
      desc: 'Our coordinate desk answers questions about raw build rates.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
      path: '/contact',
      linkText: 'Call Support Cell'
    }
  },
  contact: {
    categories: [
      {
        group: 'Direct Channels',
        links: [
          { title: 'Call Headquarters', desc: '+91 94286 94361 (Hours: 9 AM - 6 PM)', path: '/contact', icon: <Phone size={16} /> },
          { title: 'Email Inquiries', desc: 'cparamarsh@gmail.com (48-hour SLA)', path: '/contact', icon: <Mail size={16} /> }
        ]
      },
      {
        group: 'Site Consultations',
        links: [
          { title: 'Request Site Inspection', desc: 'Arrange a spatial layout planning visit.', path: '/contact', icon: <MapPin size={16} /> },
          { title: 'Connect on WhatsApp', desc: 'Instant chat coordinates with coordinator.', path: '/contact', icon: <MessageSquare size={16} /> }
        ]
      }
    ],
    featured: {
      title: 'Branch Office Locator',
      desc: 'Visit our regional operations yards and material warehouses.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      path: '/contact',
      linkText: 'View Office Coordinates'
    }
  }
};

const MegaMenu = ({ activeItem, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !activeItem || !menuContents[activeItem]) return null;

  const content = menuContents[activeItem];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={styles.megaMenu}
      onMouseLeave={onClose}
    >
      <div className="container" style={{ maxWidth: '1440px' }}>
        <div className={styles.grid}>
          {/* Categories Links Column */}
          <div className={styles.categories}>
            {content.categories.map((cat, idx) => (
              <div key={idx} className={styles.categoryGroup}>
                <span className={styles.groupTitle}>{cat.group}</span>
                <div className={styles.linkList}>
                  {cat.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      to={link.path}
                      className={styles.itemLink}
                      onClick={onClose}
                    >
                      <div className={styles.linkIconWrapper}>
                        {link.icon}
                      </div>
                      <div>
                        <span className={styles.itemTitle}>{link.title}</span>
                        <span className={styles.itemDesc}>{link.desc}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Showcase Column */}
          <div className={styles.featured}>
            <div className={styles.featuredImageWrapper}>
              <img
                src={content.featured.image}
                alt={content.featured.title}
                className={styles.featuredImage}
              />
            </div>
            <h5 className={styles.featuredTitle}>{content.featured.title}</h5>
            <p className={styles.featuredDesc}>{content.featured.desc}</p>
            <Link
              to={content.featured.path}
              className={styles.featuredBtnLink}
              onClick={onClose}
            >
              <span className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                {content.featured.linkText} <ArrowRight size={12} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
