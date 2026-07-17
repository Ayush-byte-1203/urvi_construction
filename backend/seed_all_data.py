import os
import django
import json

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import (
    ServiceCategory, Service, CoreValue, Milestone, CompanyStat, ProcessStep, TrustPartner, SiteSettings
)

def seed_data():
    print("Clearing old data...")
    Service.objects.all().delete()
    ServiceCategory.objects.all().delete()
    CoreValue.objects.all().delete()
    Milestone.objects.all().delete()
    CompanyStat.objects.all().delete()
    ProcessStep.objects.all().delete()
    TrustPartner.objects.all().delete()
    SiteSettings.objects.all().delete()

    print("Seeding Site Settings...")
    SiteSettings.objects.create(
        site_name="Paramarsh Construction",
        contact_email="contact@urviconstruction.com",
        contact_phone="+91 9428694361",
        address="Vadodara, Gujarat, India"
    )

    print("Seeding Service Categories...")
    cat_res = ServiceCategory.objects.create(name="Residential")
    cat_com = ServiceCategory.objects.create(name="Commercial")
    cat_ind = ServiceCategory.objects.create(name="Industrial")
    cat_arch = ServiceCategory.objects.create(name="Architecture")

    print("Seeding Services...")
    Service.objects.create(
        category=cat_res,
        title="Residential Construction",
        description="Crafting luxury custom residential developments. We construct premium homes tailored to your aspirations.",
        icon_name="Home",
        features=["Custom Luxury Homes", "Multi-Family Residences", "High-Rise Apartments"]
    )
    Service.objects.create(
        category=cat_com,
        title="Commercial Developments",
        description="High-performance buildings for modern corporations.",
        icon_name="Building",
        features=["Office Buildings", "Shopping Plazas", "Corporate Headquarters"]
    )
    Service.objects.create(
        category=cat_ind,
        title="Interior Designing",
        description="Robust infrastructure engineered for processing & manufacture.",
        icon_name="Factory",
        features=["Logistics Warehouses", "Manufacturing Plants", "Refineries"]
    )
    Service.objects.create(
        category=cat_arch,
        title="Structural/Architectural Consulting",
        description="Designing spatial systems that inspire human lives.",
        icon_name="PenTool",
        features=["Structural Analysis", "3D Visualizations", "BIM Modelling"]
    )

    print("Seeding Core Values...")
    CoreValue.objects.create(title="Safety First", description="Zero incident track record across all our sites.", icon_name="ShieldCheck", order=1)
    CoreValue.objects.create(title="Quality Assurance", description="Using only premium graded materials.", icon_name="CheckCircle2", order=2)
    CoreValue.objects.create(title="Timely Delivery", description="Strict adherence to project schedules.", icon_name="Clock", order=3)

    print("Seeding Company Stats...")
    CompanyStat.objects.create(number="15+", label="Years Experience", order=1)
    CompanyStat.objects.create(number="250+", label="Projects Delivered", order=2)
    CompanyStat.objects.create(number="50+", label="Expert Engineers", order=3)

    print("Seeding Trust Partners...")
    TrustPartner.objects.create(name="UltraTech Cement", order=1)
    TrustPartner.objects.create(name="Asian Paints", order=2)
    TrustPartner.objects.create(name="Tata Steel", order=3)

    print("Seeding complete! Check your Django admin panel.")

if __name__ == "__main__":
    seed_data()
