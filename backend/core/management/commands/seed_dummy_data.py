import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify

from core.models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue, BlogCategory, BlogPost
)

class Command(BaseCommand):
    help = 'Seeds the database with full placeholder data matching the frontend'

    def handle(self, *args, **options):
        self.stdout.write("Clearing existing data...")
        Service.objects.all().delete()
        ServiceCategory.objects.all().delete()
        Package.objects.all().delete()
        PackageMaterialCategory.objects.all().delete()
        Project.objects.all().delete()
        ProjectCategory.objects.all().delete()
        BlogPost.objects.all().delete()
        BlogCategory.objects.all().delete()
        Testimonial.objects.all().delete()
        FAQ.objects.all().delete()
        FAQCategory.objects.all().delete()
        CoreValue.objects.all().delete()
        SiteSettings.objects.all().delete()
        PageContent.objects.all().delete()

        # 1. Site Settings
        self.stdout.write("Seeding Site Settings...")
        SiteSettings.objects.create(
            site_name="Paramarsh Construction",
            contact_email="contact@urviconstruction.com",
            contact_phone="+91 9428694361",
            address="Vadodara, Gujarat, India"
            # Note: models.py doesn't have founding_year in SiteSettings based on my earlier check,
            # but if it does, it will be added. 
        )

        # 2. Pages
        self.stdout.write("Seeding Pages...")
        PageContent.objects.create(
            page="home",
            title="Building Your Dreams",
            subtitle="Paramarsh Construction turns visions into reality."
        )
        PageContent.objects.create(
            page="about",
            title="About Paramarsh",
            subtitle="Established in 2016, we have been delivering excellence."
        )

        # 3. Core Values
        self.stdout.write("Seeding Core Values...")
        CoreValue.objects.create(title="Safety First", description="Zero incident track record across all our sites.", icon_name="ShieldCheck", order=1)
        CoreValue.objects.create(title="Quality Assurance", description="Using only premium graded materials.", icon_name="CheckCircle2", order=2)
        CoreValue.objects.create(title="Timely Delivery", description="Strict adherence to project schedules.", icon_name="Clock", order=3)

        # 4. Service Categories and Services
        self.stdout.write("Seeding Services...")
        cat_res = ServiceCategory.objects.create(name="Residential")
        cat_com = ServiceCategory.objects.create(name="Commercial")
        cat_ind = ServiceCategory.objects.create(name="Industrial")
        cat_arch = ServiceCategory.objects.create(name="Architecture")

        Service.objects.create(
            category=cat_res,
            title="Residential Construction",
            slug=slugify("Residential Construction"),
            description="Crafting luxury custom residential developments. We construct premium homes tailored to your aspirations.",
            icon_name="Home",
            features=["Custom Luxury Homes", "Multi-Family Residences", "High-Rise Apartments"]
        )
        Service.objects.create(
            category=cat_com,
            title="Commercial Developments",
            slug=slugify("Commercial Developments"),
            description="High-performance buildings for modern corporations.",
            icon_name="Building",
            features=["Office Buildings", "Shopping Plazas", "Corporate Headquarters"]
        )
        Service.objects.create(
            category=cat_ind,
            title="Interior Designing",
            slug=slugify("Interior Designing"),
            description="Robust infrastructure engineered for processing & manufacture.",
            icon_name="Factory",
            features=["Logistics Warehouses", "Manufacturing Plants", "Refineries"]
        )
        Service.objects.create(
            category=cat_arch,
            title="Structural/Architectural Consulting",
            slug=slugify("Structural/Architectural Consulting"),
            description="Designing spatial systems that inspire human lives.",
            icon_name="PenTool",
            features=["Structural Analysis", "3D Visualizations", "BIM Modelling"]
        )

        # 5. FAQs
        self.stdout.write("Seeding FAQs...")
        faq_cat = FAQCategory.objects.create(name="General")
        faqs = [
            {'q': 'Do you provide end-to-end turnkey solutions?', 'a': 'Yes, we handle everything from architectural design, structural engineering, and government approvals to final construction and interior finishing.'},
            {'q': 'How do you ensure the quality of materials?', 'a': 'We strictly adhere to the material specifications outlined in your contract. All materials are sourced from reputed, certified brands and undergo quality checks on-site before use.'},
            {'q': 'Can I customize the architectural design?', 'a': 'Absolutely. We offer complete customization in the architectural design phase. Our architects work closely with you until you are completely satisfied with the 3D elevations and floor plans.'},
            {'q': 'How do you handle project timelines and delays?', 'a': 'We provide a detailed project schedule before starting. We use advanced project management tools to track progress and send you weekly updates. Weather-related or unforeseen delays are communicated proactively.'},
            {'q': 'What is the warranty on your construction?', 'a': 'We provide up to a 10-year structural warranty depending on the package selected, along with standard manufacturer warranties on all fittings and fixtures.'}
        ]
        for idx, faq in enumerate(faqs):
            FAQ.objects.create(category=faq_cat, question=faq['q'], answer=faq['a'])

        # 6. Testimonials
        self.stdout.write("Seeding Testimonials...")
        Testimonial.objects.create(name="Rajesh Patel", role="Homeowner", rating=5, content="Paramarsh constructed our villa perfectly. The attention to detail and transparency were unparalleled.")
        Testimonial.objects.create(name="Anil Desai", role="Commercial Client", rating=5, content="Timely delivery and robust structural quality. The Skyline complex was handed over ahead of schedule.")
        Testimonial.objects.create(name="Sunita Sharma", role="Homeowner", rating=4, content="Great interior finishing and solid structure. Very responsive team.")

        # 7. Projects
        self.stdout.write("Seeding Projects...")
        proj_res = ProjectCategory.objects.create(name="Residential")
        proj_com = ProjectCategory.objects.create(name="Commercial")
        
        Project.objects.create(
            title="Modern Oasis Villa",
            slug=slugify("Modern Oasis Villa"),
            category=proj_res,
            location="Alkapuri, Vadodara",
            description="A stunning contemporary villa designed with open-plan living and seamless indoor-outdoor integration. Features a minimalist aesthetic with extensive use of glass and natural stone.",
            client_name="The Sharma Family",
            built_area="4,500 sq.ft."
        )
        Project.objects.create(
            title="Heritage Restoration",
            slug=slugify("Heritage Restoration"),
            category=proj_res,
            location="Sayajigunj, Vadodara",
            description="Careful restoration of a 50-year-old heritage property, maintaining its original architectural charm while upgrading all internal systems to modern standards.",
            client_name="Private Trust",
            built_area="6,200 sq.ft."
        )
        Project.objects.create(
            title="Skyline Commercial Complex",
            slug=slugify("Skyline Commercial Complex"),
            category=proj_com,
            location="Gotri, Vadodara",
            description="A 5-story commercial building featuring premium office spaces, retail outlets on the ground floor, and a rooftop cafe.",
            client_name="Skyline Developers",
            built_area="15,000 sq.ft."
        )
        Project.objects.create(
            title="Tranquil Woods Estate",
            slug=slugify("Tranquil Woods Estate"),
            category=proj_res,
            location="Sevasi, Vadodara",
            description="A premium farmhouse estate nestled in nature, featuring eco-friendly materials and a large private pool.",
            client_name="Undisclosed",
            built_area="8,000 sq.ft."
        )
        Project.objects.create(
            title="Nexus Tech Hub",
            slug=slugify("Nexus Tech Hub"),
            category=proj_com,
            location="Bhayli, Vadodara",
            description="Modern IT park with large open collaborative spaces and energy-efficient glass facades.",
            client_name="Nexus IT",
            built_area="25,000 sq.ft."
        )
        Project.objects.create(
            title="Urban Row Houses",
            slug=slugify("Urban Row Houses"),
            category=proj_res,
            location="Sama-Savli, Vadodara",
            description="A cluster of 12 luxury row houses with modern amenities and shared landscaped gardens.",
            client_name="Urban Living Group",
            built_area="30,000 sq.ft."
        )

        # 8. Blogs
        self.stdout.write("Seeding Blogs...")
        bcat_tech = BlogCategory.objects.create(name="Construction Tech")
        bcat_design = BlogCategory.objects.create(name="Design & Planning")

        BlogPost.objects.create(
            title="The Future of Smart Buildings",
            slug=slugify("The Future of Smart Buildings"),
            category=bcat_tech,
            content="<p>Smart buildings are revolutionizing the construction industry. By integrating IoT devices, automated HVAC, and predictive maintenance, we are reducing energy consumption by over 30% on average.</p><p>This means long-term cost savings and significantly smaller carbon footprints for commercial developments.</p>",
            author="Alice Engineer"
        )
        BlogPost.objects.create(
            title="Sustainable Materials in 2026",
            slug=slugify("Sustainable Materials in 2026"),
            category=bcat_design,
            content="<p>As we push for greener cities, the materials we use matter more than ever. The industry is rapidly adopting new standards.</p><ul><li>Cross-Laminated Timber (CLT)</li><li>Recycled Steel Rebars</li><li>Low-Carbon Cement Alternatives</li></ul><p>These materials offer equal or superior structural integrity while drastically reducing embodied carbon.</p>",
            author="Bob Architect"
        )
        BlogPost.objects.create(
            title="Mastering Project Timelines",
            slug=slugify("Mastering Project Timelines"),
            category=bcat_tech,
            content="<p>Keeping a large-scale structural project on schedule requires meticulous planning and real-time data tracking.</p><p>In this guide, we break down our proprietary 5-step milestone tracking methodology that prevents delays and ensures smooth handovers.</p>",
            author="Charlie SiteManager"
        )

        # 9. Packages (Reuse dummy package logic)
        self.stdout.write("Seeding Packages...")
        categories = [
            "Design & Drawings", "Civil Construction", "Architectural Design",
            "Interior Design", "Structural Designing", "MEP Designing",
            "Government Liaison Assistance", "Flooring & Wall Tiling",
            "Painting", "Electrical", "Plumbing", "Fixtures", "Doors",
            "Windows", "Fabrication", "Compound Wall", "Elevation"
        ]
        cat_map = {}
        for idx, c in enumerate(categories):
            cat_map[c] = PackageMaterialCategory.objects.create(name=c, order=idx)

        packages_data = [
            {
                "name": "Standard Package",
                "price": "1499",
                "tagline": "Strong concrete framing and standard shell layouts.",
                "best_for": "Budget-conscious homeowners seeking structural safety.",
                "project_type": "Independent Villas & Row Houses",
                "warranty": "5 Years Structural Warranty",
                "timeline": "6 to 8 Months",
                "grade": "Standard Structural M20",
                "plot_size": "1,000 - 2,500 sq.ft.",
                "floors": "Ground + 1 Floor max",
                "description": "Our Standard package offers a robust structural base with basic functional finishes. Excellent choice for those focusing on structural core strength at an economical rate.",
                "ideal_customer": "First-time homebuilders looking for essential layouts.",
                "limitations": "Basic floor tiling layouts; custom elevations not included.",
                "upgrades": "Option to upgrade individual paint coats and plumbing brands.",
                "maintenance": "Standard 1-year general maintenance support.",
                "why_choose": "Highest structural safety-to-cost ratio in the market.",
                "construction_quality": "Rigid soil compaction and reinforced steel grid frames.",
                "recommended_budget": "₹20L - ₹35L overall",
                "is_popular": False,
                "order": 1,
                "advantages": ['Extremely Cost-effective', 'Fastest build time duration', 'Zero structural compromise'],
                "faqs": [
                  { 'q': 'Is the standard package structurally safe?', 'a': 'Yes. We utilize standard Fe 500 steel grids and UltraTech/ACC cement.' }
                ],
                "specs": {
                  'Design & Drawings': { 'brand': 'Paramarsh Design Cell', 'grade': '2D Planning', 'spec': 'Standard 2D floor plans & basic elevation layouts', 'why': 'Establishes clear spatial configuration before execution', 'upgrade': 'Structural drawing clearance', 'warranty': 'N/A' },
                  'Civil Construction': { 'brand': 'Local Certified Materials', 'grade': 'M20 Concrete', 'spec': 'Standard M20 structural concrete & structural framing', 'why': 'Guarantees reliable load safety limits', 'upgrade': 'M25 Concrete', 'warranty': '5 Years' }
                }
            },
            {
                "name": "Premium Package",
                "price": "1799",
                "tagline": "Premium finishes and smart home integrations.",
                "best_for": "Urban families seeking modern interior styles and automation.",
                "project_type": "Modern Villas, Bungalows & Corporate Offices",
                "warranty": "10 Years Structural Warranty",
                "timeline": "9 to 11 Months",
                "grade": "Premium Seismic M25",
                "plot_size": "1,200 - 4,000 sq.ft.",
                "floors": "Ground + 3 Floors max",
                "description": "Our most popular tier. Features premium raw materials (TATA steel, UltraTech cement), modular kitchen ducts, and false ceilings, delivering high visual style and superior longevity.",
                "ideal_customer": "Modern families aiming for high aesthetic value and premium utility.",
                "limitations": "Limited luxury marble selections; pool structures extra.",
                "upgrades": "Easily upgrade to smart control hubs and premium sanitary brands.",
                "maintenance": "Extended 2-year complete maintenance support.",
                "why_choose": "Optimal balance of state-of-the-art materials and design value.",
                "construction_quality": "Double coat external plastering works and high-grade rebar casting.",
                "recommended_budget": "₹40L - ₹75L overall",
                "is_popular": True,
                "order": 2,
                "advantages": ['Certified branded materials', 'Smart home ready conduits', 'Generous 10-year warranty'],
                "faqs": [
                  { 'q': 'What smart home features are standard here?', 'a': 'We install modular conduits ready for smart control hubs, digital switches, and home automation systems.' }
                ],
                "specs": {
                  'Design & Drawings': { 'brand': 'Paramarsh Design Cell', 'grade': '3D Elevation', 'spec': 'Complete 3D visual models, electrical schematics & site plans', 'why': 'Avoids execution redesign costs', 'upgrade': 'Custom VR visualizations', 'warranty': 'N/A' },
                  'Civil Construction': { 'brand': 'Branded Certified', 'grade': 'M25 Concrete', 'spec': 'M25 grade structural frame casting & AAC block brickwork', 'why': 'Provides seismic structural safety', 'upgrade': 'M30 heavy concrete', 'warranty': '10 Years' }
                }
            },
            {
                "name": "Luxury Package",
                "price": "2111",
                "tagline": "Custom luxury villa designs and high-end finishes.",
                "best_for": "Clients aiming for bespoke luxury landmarks, pools, and high-end marbles.",
                "project_type": "High-end Estates, Farms & Commercial complexes",
                "warranty": "15 Years Structural Warranty",
                "timeline": "12 to 15 Months",
                "grade": "Luxury Ultra M30",
                "plot_size": "2,000 - 10,000 sq.ft.",
                "floors": "Ground + 4 Floors max",
                "description": "The ultimate luxury building package. Loaded with pre-polished Italian marble, Legrand smart automation arrays, soundproof UPVC frames, and custom landscaping.",
                "ideal_customer": "Handovers of luxury estates and elite corporate headquarters.",
                "limitations": "Higher initial budget requirements.",
                "upgrades": "Bespoke customization included standard.",
                "maintenance": "3-Year complete premium maintenance package.",
                "why_choose": "For those who want zero compromises and fully bespoke architectural landmarks.",
                "construction_quality": "Heavy concrete foundations, customized soil testing, and triple waterproofing coats.",
                "recommended_budget": "₹80L+ overall",
                "is_popular": False,
                "order": 3,
                "advantages": ['Italian marble layouts', '100% custom architectural planning', 'Complete 15-year safety coverage'],
                "faqs": [
                  { 'q': 'Can we customize the architectural designs from scratch?', 'a': 'Absolutely. The Luxury package includes full custom architectural design revisions, spatial blueprints, 3D renders, and zoning NOC clearance assistance without any layout limits.' }
                ],
                "specs": {
                  'Design & Drawings': { 'brand': 'Bespoke Design Cell', 'grade': 'Full custom VR', 'spec': 'Unlimited architectural plans, 3D renderings & interior maps', 'why': 'Full visual control before laying foundation', 'upgrade': 'Custom architectural consultant', 'warranty': 'N/A' },
                  'Civil Construction': { 'brand': 'Ultra-Luxury Grade', 'grade': 'M30 heavy duty', 'spec': 'M30 heavy reinforcement concrete structure & Porotherm blocks', 'why': 'Ultimate durability and thermal insulation', 'upgrade': 'Custom pile layouts', 'warranty': '15 Years' }
                }
            }
        ]

        for p_data in packages_data:
            pkg = Package.objects.create(
                name=p_data['name'],
                price=p_data['price'],
                tagline=p_data['tagline'],
                best_for=p_data['best_for'],
                project_type=p_data['project_type'],
                warranty=p_data['warranty'],
                timeline=p_data['timeline'],
                grade=p_data['grade'],
                plot_size=p_data['plot_size'],
                floors=p_data['floors'],
                description=p_data['description'],
                ideal_customer=p_data['ideal_customer'],
                limitations=p_data['limitations'],
                upgrades=p_data['upgrades'],
                maintenance=p_data['maintenance'],
                why_choose=p_data['why_choose'],
                construction_quality=p_data['construction_quality'],
                recommended_budget=p_data['recommended_budget'],
                is_popular=p_data['is_popular'],
                order=p_data['order']
            )
            for idx, adv in enumerate(p_data['advantages']):
                PackageAdvantage.objects.create(package=pkg, text=adv, order=idx)
            for idx, faq in enumerate(p_data['faqs']):
                PackageFAQ.objects.create(package=pkg, question=faq['q'], answer=faq['a'], order=idx)
            for cat_name, spec_data in p_data['specs'].items():
                if cat_name in cat_map:
                    PackageMaterialSpec.objects.create(
                        package=pkg,
                        category=cat_map[cat_name],
                        brand=spec_data['brand'],
                        grade=spec_data['grade'],
                        spec=spec_data['spec'],
                        why=spec_data['why'],
                        upgrade=spec_data['upgrade'],
                        warranty=spec_data['warranty']
                    )

        self.stdout.write(self.style.SUCCESS('Successfully seeded all dummy data!'))
