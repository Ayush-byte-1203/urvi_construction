import os
import django
import requests
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue, JourneyMilestone, BlogCategory, BlogPost, GalleryImage
)

def download_image(url, filename):
    print(f"Downloading {filename}...")
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            return ContentFile(response.content, name=filename)
    except Exception as e:
        print(f"Failed to download {url}: {e}")
    return None

def wipe_db():
    print("Wiping existing data...")
    SiteSettings.objects.all().delete()
    PageContent.objects.all().delete()
    ServiceCategory.objects.all().delete()
    Service.objects.all().delete()
    Package.objects.all().delete()
    ProjectCategory.objects.all().delete()
    Project.objects.all().delete()
    Testimonial.objects.all().delete()
    FAQCategory.objects.all().delete()
    FAQ.objects.all().delete()
    CoreValue.objects.all().delete()
    JourneyMilestone.objects.all().delete()
    BlogCategory.objects.all().delete()
    BlogPost.objects.all().delete()
    GalleryImage.objects.all().delete()

def seed_settings():
    print("Seeding Settings...")
    SiteSettings.objects.create(
        site_name="Paramarsh Construction",
        contact_email="hello@paramarsh.com",
        contact_phone="+91 9428694361",
        address="Vadodara, Gujarat, India 390007"
    )

def seed_pages():
    print("Seeding Pages...")
    pages = [
        {"page": "home", "title": "Paramarsh Construction | Built on Trust"},
        {"page": "about", "title": "About Us | Paramarsh Vadodara"},
        {"page": "services", "title": "Our Services | Turnkey Excellence"},
        {"page": "packages", "title": "Construction Packages | Transparent Pricing"},
        {"page": "projects", "title": "Portfolio | Our Work in Gujarat"},
        {"page": "contact", "title": "Contact Paramarsh Construction"},
        {"page": "faq", "title": "Frequently Asked Questions"},
        {"page": "blog", "title": "Construction Insights"}
    ]
    for p in pages:
        PageContent.objects.create(**p)

def seed_services():
    print("Seeding Services...")
    cat_res = ServiceCategory.objects.create(name="Residential")
    cat_com = ServiceCategory.objects.create(name="Commercial")

    s1 = Service.objects.create(
        category=cat_res,
        title="Custom Home Construction",
        slug="custom-home-construction",
        description="End-to-end residential construction in Vadodara, tailored to your lifestyle.",
        icon_name="Home",
        tagline="Your Dream Home, Engineered to Perfection",
        scope_text="We manage everything from architectural drafting to the final coat of paint, ensuring a hassle-free experience for homeowners in Gujarat.",
        estimated_timeline="6-10 Months",
        video_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        features=[
            {"name": "Architectural Design", "description": "Full home design services", "icon": "PenTool"},
            {"name": "Structural Engineering", "description": "Robust and safe structures", "icon": "Layers"},
            {"name": "Interior Fit-outs", "description": "Premium finishings", "icon": "Home"}
        ],
        benefits=[
            {"title": "100% Transparent Pricing", "text": "No hidden costs, ever."},
            {"title": "Dedicated Project Manager", "text": "Single point of contact."},
            {"title": "10-Year Structural Warranty", "text": "Peace of mind guaranteed."}
        ],
        workflow_steps=[
            {"title": "Initial Consultation", "description": "We discuss your vision and requirements."},
            {"title": "Design & Approvals", "description": "Architectural drafting and city approvals."},
            {"title": "Foundation & Structure", "description": "Building the robust framework."},
            {"title": "Finishing works", "description": "Interiors, painting, and polishing."},
            {"title": "Handover", "description": "Final walkthrough and key handover."}
        ],
        included_features=[
            {"name": "Soil Testing", "description": "Pre-construction checks", "icon": "Map"},
            {"name": "Building Approvals", "description": "All legal paperwork", "icon": "FileText"},
            {"name": "Material Procurement", "description": "A-grade materials", "icon": "Box"}
        ],
        excluded_features=["Loose Furniture", "Soft Furnishings"]
    )
    img_file = download_image("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "home_const.jpg")
    if img_file:
        s1.image.save("home_const.jpg", img_file, save=True)
        img_file.seek(0)
        s1.detail_image.save("home_const_detail.jpg", img_file, save=True)

    s2 = Service.objects.create(
        category=cat_com,
        title="Commercial Spaces",
        slug="commercial-spaces",
        description="High-performance commercial buildings and retail spaces.",
        icon_name="Building2",
        tagline="Built for Business Growth",
        scope_text="Delivering modern corporate offices and retail outlets with optimized layouts and robust structural integrity.",
        estimated_timeline="8-14 Months",
        features=[
            {"name": "Office Buildings", "description": "Modern corporate hubs", "icon": "Building2"},
            {"name": "Retail Showrooms", "description": "High-footfall designs", "icon": "Store"},
            {"name": "Warehouses", "description": "Efficient storage layouts", "icon": "Warehouse"}
        ],
        benefits=[
            {"title": "Timely Delivery", "text": "Strict adherence to schedules."},
            {"title": "Safety Compliance", "text": "Following international standards."},
            {"title": "Energy Efficient Designs", "text": "Sustainable commercial spaces."}
        ],
        workflow_steps=[
            {"title": "Site Survey", "description": "Evaluating commercial feasibility."},
            {"title": "Commercial Planning", "description": "Maximizing ROI layouts."},
            {"title": "Construction", "description": "Rapid build phase."},
            {"title": "MEP Integration", "description": "HVAC, Electrical, Plumbing."},
            {"title": "Handover", "description": "Ready for business."}
        ],
        included_features=[
            {"name": "Structural Framing", "description": "Steel and concrete", "icon": "Layers"},
            {"name": "Basic MEP", "description": "Essential services", "icon": "Zap"},
            {"name": "Facade Works", "description": "Exterior styling", "icon": "Layout"}
        ],
        excluded_features=["Specialized Machinery Installation"]
    )
    img_file = download_image("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", "comm_const.jpg")
    if img_file:
        s2.image.save("comm_const.jpg", img_file, save=True)
        img_file.seek(0)
        s2.detail_image.save("comm_const_detail.jpg", img_file, save=True)

    s3 = Service.objects.create(
        category=cat_res,
        title="Architectural Consulting",
        slug="architectural-consulting",
        description="Expert architectural design and 3D visualization.",
        icon_name="PenTool",
        tagline="Designing Spaces that Inspire",
        scope_text="Our expert architects in Vadodara create spatial layouts that perfectly balance aesthetics and functionality.",
        estimated_timeline="1-2 Months",
        features=[
            {"name": "3D Renderings", "description": "Photorealistic views", "icon": "Image"},
            {"name": "Floor Plans", "description": "Optimized layouts", "icon": "Layout"},
            {"name": "Vastu Consulting", "description": "Traditional alignment", "icon": "Compass"}
        ],
        benefits=[
            {"title": "Optimized Space", "text": "Making the most of every inch."},
            {"title": "Modern Aesthetics", "text": "Contemporary and timeless designs."},
            {"title": "Vastu Compliant", "text": "Positive energy flow."}
        ],
        workflow_steps=[
            {"title": "Concept Design", "description": "Brainstorming and ideation."},
            {"title": "3D Modeling", "description": "Visualizing the space."},
            {"title": "Client Approval", "description": "Revisions and sign-off."},
            {"title": "Working Drawings", "description": "Detailed execution plans."}
        ],
        included_features=[
            {"name": "2D Plans", "description": "Detailed blueprints", "icon": "FileText"},
            {"name": "3D Elevations", "description": "Exterior visualization", "icon": "Monitor"},
            {"name": "Structural Drawings", "description": "Engineering details", "icon": "Layers"}
        ],
        excluded_features=["Physical Construction Execution"]
    )
    img_file = download_image("https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", "arch.jpg")
    if img_file:
        s3.image.save("arch.jpg", img_file, save=True)
        img_file.seek(0)
        s3.detail_image.save("arch_detail.jpg", img_file, save=True)

def seed_packages():
    print("Seeding Packages...")
    p1 = Package.objects.create(
        name="Essential Package", price="1600", tagline="Perfect for standard builds.",
        project_type="Residential", is_popular=False, order=1
    )
    p2 = Package.objects.create(
        name="Premium Package", price="1850", tagline="Our most popular choice.",
        project_type="Residential", is_popular=True, order=2
    )
    p3 = Package.objects.create(
        name="Luxury Package", price="2200", tagline="Uncompromised quality.",
        project_type="Residential", is_popular=False, order=3
    )

    cat_struct = PackageMaterialCategory.objects.create(name="Structure", order=1)
    cat_fin = PackageMaterialCategory.objects.create(name="Finishes", order=2)

    # Advantages
    for p in [p1, p2, p3]:
        PackageAdvantage.objects.create(package=p, text="Dedicated Project Manager", order=1)
        PackageAdvantage.objects.create(package=p, text="10 Year Warranty", order=2)

    # Material Specs for Premium
    PackageMaterialSpec.objects.create(package=p2, category=cat_struct, brand="Tata Steel / JSW", spec="TMT Bars Fe500D")
    PackageMaterialSpec.objects.create(package=p2, category=cat_fin, brand="Asian Paints", spec="Premium Emulsion")

def seed_projects():
    print("Seeding Projects...")
    cat_r = ProjectCategory.objects.create(name="Residential")
    cat_c = ProjectCategory.objects.create(name="Commercial")

    pr1 = Project.objects.create(
        title="Alkapuri Luxury Villa", slug="alkapuri-luxury-villa",
        category=cat_r, client_name="Mr. Sharma", location="Alkapuri, Vadodara",
        completion_date="2023-11-15", built_area="4500",
        description="A stunning modern villa located in the heart of Vadodara.",
    )
    img_file = download_image("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "proj1.jpg")
    if img_file:
        pr1.image.save("proj1.jpg", img_file, save=True)
        img_file.seek(0)
        ProjectImage.objects.create(project=pr1, image=img_file)

    pr2 = Project.objects.create(
        title="Gotri Business Hub", slug="gotri-business-hub",
        category=cat_c, client_name="Paramount Corp", location="Gotri, Vadodara",
        completion_date="2024-02-20", built_area="12000",
        description="A state-of-the-art commercial complex in Gotri.",
    )
    img_file = download_image("https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", "proj2.jpg")
    if img_file:
        pr2.image.save("proj2.jpg", img_file, save=True)
        img_file.seek(0)
        ProjectImage.objects.create(project=pr2, image=img_file)

def seed_core_and_journey():
    print("Seeding Journey & Core Values...")
    CoreValue.objects.create(title="Quality First", description="Uncompromising quality.", icon_name="Shield", order=1)
    CoreValue.objects.create(title="Transparency", description="No hidden costs.", icon_name="Eye", order=2)

    j1 = JourneyMilestone.objects.create(year="2016", title="The Foundation in Vadodara", description="Paramarsh Construction was founded.", order=1)
    img_file = download_image("https://images.unsplash.com/photo-1541888081600-01103f6f1c4e?w=800&q=80", "journey1.jpg")
    if img_file:
        j1.image.save("journey1.jpg", img_file, save=True)

    j2 = JourneyMilestone.objects.create(year="2019", title="Expanding Across Gujarat", description="Completed our 50th project.", order=2)
    img_file = download_image("https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", "journey2.jpg")
    if img_file:
        j2.image.save("journey2.jpg", img_file, save=True)
        
def seed_blogs_and_testimonials():
    print("Seeding Blogs & Testimonials...")
    bc = BlogCategory.objects.create(name="Construction Tips")
    b1 = BlogPost.objects.create(title="Top 5 Trends in 2024", slug="top-5-trends", category=bc, content="Content here...")
    img_file = download_image("https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80", "blog1.jpg")
    if img_file:
        b1.image.save("blog1.jpg", img_file, save=True)
        
    t1 = Testimonial.objects.create(name="Rahul Desai", role="Homeowner", content="Amazing experience.", rating=5)
    img_file = download_image("https://images.unsplash.com/photo-1590495914106-4d048d6db95a?w=800&q=80", "test1.jpg")
    if img_file:
        t1.image.save("test1.jpg", img_file, save=True)

def run():
    wipe_db()
    seed_settings()
    seed_pages()
    seed_services()
    seed_packages()
    seed_projects()
    seed_core_and_journey()
    seed_blogs_and_testimonials()
    print("Done seeding V4!")

if __name__ == '__main__':
    run()
