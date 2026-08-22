import os
import django
import sys

# Setup django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
try:
    django.setup()
except Exception as e:
    print(f"Error setting up Django: {e}")
    sys.exit(1)

from core.models import Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ

# Dummy comprehensive data
packages_data = [
    {
        "name": "Essential Tier",
        "price": "1,800",
        "is_popular": False,
        "description": "Perfect for budget-conscious homeowners looking for quality foundational construction without luxury frills.",
        "order": 1,
        "tagline": "Quality construction on a budget",
        "best_for": "First-time homeowners",
        "project_type": "Residential",
        "warranty": "5 Years Structural",
        "timeline": "6-8 Months",
        "grade": "Standard",
        "plot_size": "Upto 1500 sq.ft",
        "floors": "G+1",
        "ideal_customer": "Budget-conscious families",
        "limitations": "Basic finishes, no smart home features",
        "upgrades": "Flooring, Kitchen fixtures",
        "maintenance": "Standard maintenance required",
        "why_choose": "Best value for money",
        "construction_quality": "IS Standard materials",
        "recommended_budget": "₹25L - ₹40L",
        "advantages": [
            "Affordable pricing",
            "Fast completion time",
            "Reliable standard materials",
            "5-year structural warranty"
        ],
        "faqs": [
            {"q": "Can I upgrade materials later?", "a": "Yes, you can upgrade specific materials by paying the difference."},
            {"q": "Does this include government approvals?", "a": "No, approval fees are separate but we assist with the process."}
        ],
        "materials": [
            { "category": "Structure", "detail": "RCC Framed Structure", "brand": "Standard TMT", "grade": "Fe-500", "spec": "IS Standard", "why": "Reliable strength", "upgrade": "Tata Tiscon", "warranty": "5 Yrs" },
            { "category": "Walls", "detail": "Standard Red Bricks", "brand": "Local Premium", "grade": "First Class", "spec": "9 inch outer, 4.5 inch inner", "why": "Good insulation", "upgrade": "AAC Blocks", "warranty": "N/A" },
            { "category": "Flooring", "detail": "Vitrified Tiles", "brand": "Kajaria/Somany", "grade": "Standard", "spec": "2x2 ft, up to ₹50/sq.ft", "why": "Durable and easy to clean", "upgrade": "Large format tiles", "warranty": "1 Yr" },
            { "category": "Kitchen", "detail": "Granite Countertop", "brand": "Standard", "grade": "Black/Brown", "spec": "With SS Sink", "why": "Classic look", "upgrade": "Quartz", "warranty": "1 Yr" },
            { "category": "Plumbing", "detail": "Standard CPVC", "brand": "Ashirvad/Supreme", "grade": "Standard", "spec": "Concealed plumbing", "why": "Leak-proof", "upgrade": "Astral", "warranty": "5 Yrs" },
            { "category": "Electrical", "detail": "Standard Switches", "brand": "Anchor/Roma", "grade": "Standard", "spec": "Polycab Wires", "why": "Safe and reliable", "upgrade": "Legrand", "warranty": "5 Yrs" }
        ]
    },
    {
        "name": "Premium Tier",
        "price": "2,200",
        "is_popular": True,
        "description": "Our most chosen package balancing high-end materials with excellent value. Built for lasting elegance.",
        "order": 2,
        "tagline": "The perfect balance of luxury and value",
        "best_for": "Growing families",
        "project_type": "Premium Residential",
        "warranty": "10 Years Structural",
        "timeline": "8-10 Months",
        "grade": "Premium",
        "plot_size": "1500 - 3000 sq.ft",
        "floors": "G+2",
        "ideal_customer": "Families looking for modern amenities",
        "limitations": "No imported marble included",
        "upgrades": "Smart home integration, Home theater",
        "maintenance": "Low maintenance",
        "why_choose": "High-quality finishes at reasonable price",
        "construction_quality": "Premium branded materials",
        "recommended_budget": "₹50L - ₹1Cr",
        "advantages": [
            "Premium branded fixtures",
            "Enhanced structural strength",
            "Modern architectural designs",
            "10-year structural warranty",
            "Dedicated project manager"
        ],
        "faqs": [
            {"q": "Are electrical fittings included?", "a": "Yes, premium branded electrical fittings and concealed wiring are included."},
            {"q": "Can I customize the floor plan?", "a": "Yes, up to 3 revisions of the floor plan are included free of charge."}
        ],
        "materials": [
            { "category": "Structure", "detail": "Earthquake Resistant RCC", "brand": "Tata/Jindal", "grade": "Fe-550", "spec": "High Grade", "why": "Superior safety", "upgrade": "Fe-600", "warranty": "10 Yrs" },
            { "category": "Walls", "detail": "Premium Red Bricks / Siporex", "brand": "Premium", "grade": "Export Quality", "spec": "Waterproofed", "why": "Better thermal insulation", "upgrade": "Porotherm Blocks", "warranty": "N/A" },
            { "category": "Flooring", "detail": "Double Charged Vitrified", "brand": "Kajaria/Nitco", "grade": "Premium", "spec": "up to ₹90/sq.ft", "why": "Stain resistant, long lasting", "upgrade": "Italian Marble", "warranty": "2 Yrs" },
            { "category": "Kitchen", "detail": "Premium Granite/Quartz", "brand": "Premium", "grade": "High End", "spec": "Double Bowl Sink", "why": "Aesthetic and scratch resistant", "upgrade": "Modular Kitchen", "warranty": "2 Yrs" },
            { "category": "Plumbing", "detail": "Premium CPVC/UPVC", "brand": "Astral/Ashirvad", "grade": "Premium", "spec": "Jaquar/Kohler Fittings", "why": "High pressure handling", "upgrade": "Grohe", "warranty": "10 Yrs" },
            { "category": "Electrical", "detail": "Modular Switches", "brand": "Legrand/Schneider", "grade": "Premium", "spec": "Finolex Wires", "why": "Premium look, high safety", "upgrade": "Smart Switches", "warranty": "10 Yrs" }
        ]
    },
    {
        "name": "Luxury Tier",
        "price": "2,800",
        "is_popular": False,
        "description": "Uncompromising luxury and state-of-the-art materials. For those who want their homes to be a masterpiece.",
        "order": 3,
        "tagline": "Uncompromising luxury and perfection",
        "best_for": "Luxury Villas",
        "project_type": "Luxury Residential",
        "warranty": "15 Years Structural",
        "timeline": "10-14 Months",
        "grade": "Luxury",
        "plot_size": "Above 3000 sq.ft",
        "floors": "Any",
        "ideal_customer": "HNIs and those seeking the absolute best",
        "limitations": "None",
        "upgrades": "Fully automated smart home, imported fixtures",
        "maintenance": "Comprehensive AMC available",
        "why_choose": "The absolute best in class materials and craftsmanship",
        "construction_quality": "International standard materials",
        "recommended_budget": "₹1.5Cr+",
        "advantages": [
            "Imported marble and fixtures",
            "Smart home automation ready",
            "Exclusive architectural designs",
            "15-year structural warranty",
            "Turnkey interior solutions available"
        ],
        "faqs": [
            {"q": "Do you provide interior design too?", "a": "Yes, our luxury tier includes basic interior design consulting, with full turnkey options available."},
            {"q": "Are imported materials used?", "a": "Yes, we use imported marble, premium international bath fittings, and top-tier global brands."}
        ],
        "materials": [
            { "category": "Structure", "detail": "Heavy Duty RCC", "brand": "JSW/Tata", "grade": "Fe-550D/600", "spec": "Earthquake Resistant", "why": "Maximum durability and safety", "upgrade": "N/A", "warranty": "15 Yrs" },
            { "category": "Walls", "detail": "First Class Red Bricks", "brand": "Premium", "grade": "Grade A", "spec": "Advanced Waterproofing", "why": "Weather proofing", "upgrade": "N/A", "warranty": "N/A" },
            { "category": "Flooring", "detail": "Italian Marble / Premium Tiles", "brand": "Imported", "grade": "Luxury", "spec": "up to ₹150/sq.ft", "why": "Ultimate luxury aesthetic", "upgrade": "Exotic Stone", "warranty": "5 Yrs" },
            { "category": "Kitchen", "detail": "Modular Ready", "brand": "Imported Granite/Quartz", "grade": "Luxury", "spec": "Premium Sink setup", "why": "Gourmet kitchen standard", "upgrade": "Fully fitted modular", "warranty": "5 Yrs" },
            { "category": "Plumbing", "detail": "Silencio Pipes", "brand": "Astral", "grade": "Luxury", "spec": "Grohe/Hansgrohe Premium", "why": "Noise free, international standard", "upgrade": "N/A", "warranty": "15 Yrs" },
            { "category": "Electrical", "detail": "Smart Home Ready", "brand": "Legrand Arteor/Honeywell", "grade": "Luxury", "spec": "Havells Wires", "why": "Automation compatible", "upgrade": "Full Home Automation", "warranty": "15 Yrs" }
        ]
    }
]

def run():
    print("Clearing existing packages to rebuild properly...")
    Package.objects.all().delete()
    PackageMaterialCategory.objects.all().delete()
    PackageAdvantage.objects.all().delete()
    PackageFAQ.objects.all().delete()
    PackageMaterialSpec.objects.all().delete()
    
    for p_data in packages_data:
        print(f"Creating package: {p_data['name']}")
        pkg = Package.objects.create(
            name=p_data['name'],
            price=p_data['price'],
            is_popular=p_data['is_popular'],
            description=p_data['description'],
            order=p_data['order'],
            tagline=p_data['tagline'],
            best_for=p_data['best_for'],
            project_type=p_data['project_type'],
            warranty=p_data['warranty'],
            timeline=p_data['timeline'],
            grade=p_data['grade'],
            plot_size=p_data['plot_size'],
            floors=p_data['floors'],
            ideal_customer=p_data['ideal_customer'],
            limitations=p_data['limitations'],
            upgrades=p_data['upgrades'],
            maintenance=p_data['maintenance'],
            why_choose=p_data['why_choose'],
            construction_quality=p_data['construction_quality'],
            recommended_budget=p_data['recommended_budget']
        )
        
        # Advantages
        for idx, adv in enumerate(p_data['advantages']):
            PackageAdvantage.objects.create(package=pkg, text=adv, order=idx)
            
        # FAQs
        for idx, faq in enumerate(p_data['faqs']):
            PackageFAQ.objects.create(package=pkg, question=faq['q'], answer=faq['a'], order=idx)
        
        # Materials
        for spec_data in p_data['materials']:
            cat, _ = PackageMaterialCategory.objects.get_or_create(name=spec_data['category'])
            PackageMaterialSpec.objects.create(
                package=pkg,
                category=cat,
                brand=spec_data['brand'],
                grade=spec_data['grade'],
                spec=spec_data['detail'] + " - " + spec_data['spec'],
                why=spec_data['why'],
                upgrade=spec_data['upgrade'],
                warranty=spec_data['warranty']
            )
            
    print("Packages created successfully with all advantages, faqs, and detailed materials!")

if __name__ == '__main__':
    run()
