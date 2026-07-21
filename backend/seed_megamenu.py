import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
try:
    django.setup()
except Exception:
    os.environ["DJANGO_SETTINGS_MODULE"] = "backend.settings"
    django.setup()

from core.models import MegaMenu, MegaMenuCategory, MegaMenuLink, MegaMenuFeatured

menuContents = {
  'home': {
    'categories': [
      {
        'group': 'Quick Overview',
        'links': [
          { 'title': 'Company Legacy', 'desc': 'Crafting structural landmarks since 2011.', 'path': '/about', 'icon_name': 'Award' },
          { 'title': 'Why Choose Us', 'desc': 'Engineered for lifetimes with millimetric precision.', 'path': '/about', 'icon_name': 'ShieldCheck' }
        ]
      },
      {
        'group': 'Latest Updates',
        'links': [
          { 'title': 'Completed Landmarks', 'desc': 'Browse our built portfolio case studies.', 'path': '/projects', 'icon_name': 'Compass' },
          { 'title': 'Live Staging coordinates', 'desc': 'Watch active concrete curing yards.', 'path': '/projects', 'icon_name': 'HardHat' }
        ]
      }
    ],
    'featured': {
      'title': 'Obsidian Horizon Villa',
      'desc': 'Discover our latest structural cantilever masterpiece built in Vadodara.',
      'image_url': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
      'path': '/projects',
      'linkText': 'Explore Project Specs'
    }
  },
  'about': {
    'categories': [
      {
        'group': 'Our Identity',
        'links': [
          { 'title': 'Company Story', 'desc': 'Translating designs into physical landmarks.', 'path': '/about', 'icon_name': 'FileText' },
          { 'title': 'Strategic Timeline', 'desc': 'Our trajectory from residential contractor to heavy civil firm.', 'path': '/about', 'icon_name': 'Calendar' }
        ]
      },
      {
        'group': 'Values & Credentials',
        'links': [
          { 'title': 'Mission & Vision', 'desc': 'Sustainable building with zero safety incidents.', 'path': '/about', 'icon_name': 'Compass' },
          { 'title': 'Certifications & Quality', 'desc': 'ISO 9001:2015 and Council standards compliance.', 'path': '/about', 'icon_name': 'ShieldCheck' }
        ]
      }
    ],
    'featured': {
      'title': 'Our Executive Leadership',
      'desc': 'Meet the certified engineers and BIM modelers guiding our sites.',
      'image_url': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
      'path': '/about',
      'linkText': 'Read Bio Details'
    }
  },
  'services': {
    'categories': [
      {
        'group': 'Core Services',
        'links': [
          { 'title': 'Civil Foundations pouring', 'desc': 'Geotech soil capacity checks & concrete frames.', 'path': '/services', 'icon_name': 'HardHat' },
          { 'title': 'Precast structural spans', 'desc': 'Manufactured pre-stressed load columns.', 'path': '/services', 'icon_name': 'Package' }
        ]
      },
      {
        'group': 'Specialized & Smart Solutions',
        'links': [
          { 'title': 'Turnkey Solutions', 'desc': 'We have One-stop, stress-free construction from start to finish. We handle it all. Your dream, our mission.', 'path': '/services', 'icon_name': 'Package' },
          { 'title': 'Construction Management', 'desc': 'We are here to understand your unique style and preferences, translating them into functional pleasing spaces.', 'path': '/services', 'icon_name': 'FileCheck' },
          { 'title': 'Interior Designs', 'desc': 'We bring expertise, precision, and a keen eye for detail to every aspect of your construction process.', 'path': '/services', 'icon_name': 'Compass' },
          { 'title': 'Structural/Architectural', 'desc': 'Expert design and robust structural planning, all under one roof. Your vision, our expertise.', 'path': '/services', 'icon_name': 'HardHat' }
        ]
      }
    ],
    'featured': {
      'title': 'Integrated Construction',
      'desc': 'Explore how we coordinate all five build stages under a single contract.',
      'image_url': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
      'path': '/services',
      'linkText': 'Browse Divisions Scope'
    }
  },
  'packages': {
    'categories': [
      {
        'group': 'Available Packages',
        'links': [
          { 'title': 'Core Shell Build', 'desc': 'Raw concrete layouts starting at ₹2,100 / sq. ft.', 'path': '/packages', 'icon_name': 'HardHat' },
          { 'title': 'Executive Smart Build', 'desc': 'Premium finishes starting at ₹3,500 / sq. ft.', 'path': '/packages', 'icon_name': 'Cpu' },
          { 'title': 'Signature Elite Build', 'desc': 'Italian marble & design custom villa build at ₹5,200 / sq. ft.', 'path': '/packages', 'icon_name': 'Award' }
        ]
      },
      {
        'group': 'Calculators & Guides',
        'links': [
          { 'title': 'Construction Calculator', 'desc': 'Estimate build budgets based on plot area.', 'path': '/packages', 'icon_name': 'Info' },
          { 'title': 'Download Brochures', 'desc': 'Get pricing details and structural materials catalogs.', 'path': '/packages', 'icon_name': 'FileText' },
          { 'title': 'Tiers Comparison matrix', 'desc': 'Detail specs comparison of steel and cement brands.', 'path': '/packages', 'icon_name': 'ShieldCheck' }
        ]
      }
    ],
    'featured': {
      'title': 'Request Custom Estimation',
      'desc': 'We draft itemized Bill of Quantities sheets for custom architecture maps.',
      'image_url': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
      'path': '/contact',
      'linkText': 'Request BOQ Pricing'
    }
  },
  'projects': {
    'categories': [
      {
        'group': 'Portfolios',
        'links': [
          { 'title': 'Luxury Custom Villas', 'desc': 'High-end custom residences & structures.', 'path': '/projects', 'icon_name': 'Compass' },
          { 'title': 'Commercial Plaza units', 'desc': 'Offices, logistics warehouses, and assembly yards.', 'path': '/projects', 'icon_name': 'Briefcase' }
        ]
      },
    ],
    'featured': {
      'title': 'Vista Waterfront Residences',
      'desc': 'Take a virtual tour of our completed premium housing estate.',
      'image_url': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
      'path': '/projects',
      'linkText': 'Watch Video Tour'
    }
  },
  'process': {
    'categories': [
      {
        'group': 'Site Milestones',
        'links': [
          { 'title': 'Geotechnical Soil Journey', 'desc': 'Excavation coordinates and Soil load tests.', 'path': '/process', 'icon_name': 'Compass' },
          { 'title': 'Civil Frame assembly', 'desc': 'AAC masonry, concrete frameworks curing stages.', 'path': '/process', 'icon_name': 'HardHat' }
        ]
      },
      {
        'group': 'System Handover',
        'links': [
          { 'title': 'MEP Installation checks', 'desc': 'Electrical conduits and plumbing waterproofing.', 'path': '/process', 'icon_name': 'ShieldCheck' },
          { 'title': 'Framing Warranty terms', 'desc': 'Examine our 15-Year structural guarantees.', 'path': '/process', 'icon_name': 'Award' }
        ]
      }
    ],
    'featured': {
      'title': 'Process Timeline Preview',
      'desc': 'See our standard 12-month staged roadmap to keys handover.',
      'image_url': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80',
      'path': '/process',
      'linkText': 'Examine Milestones'
    }
  },
  'blog': {
    'categories': [
      {
        'group': 'Construction Guides',
        'links': [
          { 'title': 'Materials Comparison', 'desc': 'Ductility parameters: Fe 500D vs Fe 550D TMT steel.', 'path': '/blog', 'icon_name': 'FileText' },
          { 'title': 'Smart Energy Checks', 'desc': 'Integrating solar orientation design values.', 'path': '/blog', 'icon_name': 'Cpu' }
        ]
      },
      {
        'group': 'Articles & Blogs',
        'links': [
          { 'title': 'Sustainable Concrete Mixes', 'desc': 'Carbon-absorbing AAC block construction tips.', 'path': '/blog', 'icon_name': 'Compass' },
          { 'title': 'Estimating budget layouts', 'desc': 'How to review structural BOQ drafts before pouring.', 'path': '/blog', 'icon_name': 'Info' }
        ]
      }
    ],
    'featured': {
      'title': 'Smart Automation Guide',
      'desc': 'Read how sensory networks optimize HVAC energy consumption.',
      'image_url': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80',
      'path': '/blog',
      'linkText': 'Read Latest Guide'
    }
  },
  'faq': {
    'categories': [
      {
        'group': 'Popular Categories',
        'links': [
          { 'title': 'Zoning & Permits FAQ', 'desc': 'Municipal clearance cycles and geotech safety codes.', 'path': '/faq', 'icon_name': 'HelpCircle' },
          { 'title': 'Milestone Billing checks', 'desc': 'Details explaining escrow models and payment parts.', 'path': '/faq', 'icon_name': 'Info' }
        ]
      },
      {
        'group': 'Support Queries',
        'links': [
          { 'title': 'Structural Warranty FAQ', 'desc': 'Coverage rules for chemical waterproofing seals.', 'path': '/faq', 'icon_name': 'ShieldCheck' },
          { 'title': 'Materials validation checks', 'desc': 'How we verify sand grade purity on sites.', 'path': '/faq', 'icon_name': 'Package' }
        ]
      }
    ],
    'featured': {
      'title': 'Instant Support Desk',
      'desc': 'Our coordinate desk answers questions about raw build rates.',
      'image_url': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
      'path': '/contact',
      'linkText': 'Call Support Cell'
    }
  },
  'contact': {
    'categories': [
      {
        'group': 'Direct Channels',
        'links': [
          { 'title': 'Call Headquarters', 'desc': '+91 94286 94361 (Hours: 9 AM - 6 PM)', 'path': '/contact', 'icon_name': 'Phone' },
          { 'title': 'Email Inquiries', 'desc': 'cparamarsh@gmail.com (48-hour SLA)', 'path': '/contact', 'icon_name': 'Mail' }
        ]
      },
      {
        'group': 'Site Consultations',
        'links': [
          { 'title': 'Request Site Inspection', 'desc': 'Arrange a spatial layout planning visit.', 'path': '/contact', 'icon_name': 'MapPin' },
          { 'title': 'Connect on WhatsApp', 'desc': 'Instant chat coordinates with coordinator.', 'path': '/contact', 'icon_name': 'MessageSquare' }
        ]
      }
    ],
    'featured': {
      'title': 'Branch Office Locator',
      'desc': 'Visit our regional operations yards and material warehouses.',
      'image_url': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
      'path': '/contact',
      'linkText': 'View Office Coordinates'
    }
  }
}

for m_name, m_data in menuContents.items():
    menu, _ = MegaMenu.objects.get_or_create(name=m_name)
    
    MegaMenuCategory.objects.filter(menu=menu).delete()
    MegaMenuFeatured.objects.filter(menu=menu).delete()
    
    order = 0
    for cat_data in m_data.get('categories', []):
        cat = MegaMenuCategory.objects.create(menu=menu, group_title=cat_data['group'], order=order)
        order += 1
        l_order = 0
        for link_data in cat_data.get('links', []):
            MegaMenuLink.objects.create(
                category=cat,
                title=link_data['title'],
                description=link_data['desc'],
                path=link_data['path'],
                icon_name=link_data['icon_name'],
                order=l_order
            )
            l_order += 1
            
    f_data = m_data.get('featured')
    if f_data:
        MegaMenuFeatured.objects.create(
            menu=menu,
            title=f_data['title'],
            description=f_data['desc'],
            image_url=f_data.get('image_url'),
            path=f_data['path'],
            link_text=f_data['linkText']
        )

print("Seed complete.")
