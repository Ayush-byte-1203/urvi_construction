import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import TrustFeature, WhyChooseUsItem, ProcessStep, JourneyMilestone, CoreValue, SiteSettings

def seed_all():
    print("Clearing dynamic content tables...")
    TrustFeature.objects.all().delete()
    WhyChooseUsItem.objects.all().delete()
    ProcessStep.objects.all().delete()
    JourneyMilestone.objects.all().delete()

    print("Updating Site Settings Hero & Media Fields...")
    settings = SiteSettings.objects.first()
    if not settings:
        settings = SiteSettings.objects.create(site_name="Paramarsh Construction")
    
    settings.hero_headline = "Crafting Architecturally <br/><span class=\"emphasized\">Superior</span> Homes"
    settings.hero_subtext = "Turnkey construction solutions designed for durability, aesthetics, and flawless execution from concept to handover."
    settings.hero_primary_btn_text = "Free Consultation"
    settings.hero_secondary_btn_text = "View Projects"
    settings.hero_stat_pill_1 = "10+ Live Projects"
    settings.hero_stat_pill_2 = "₹1600/sq.ft Starting Price"
    settings.save()

    print("Seeding Trust Features...")
    TrustFeature.objects.create(
        title="150+ Point Quality Inspection",
        description="Every stage from foundation to plaster is audited by senior structural leads.",
        icon_name="ShieldCheck",
        order=1
    )
    TrustFeature.objects.create(
        title="Fixed-Price Guarantee",
        description="100% transparent pricing with zero cost escalation contractually guaranteed.",
        icon_name="Lock",
        order=2
    )
    TrustFeature.objects.create(
        title="On-Time Handover",
        description="Strict project management milestones backed by financial delay clauses.",
        icon_name="Clock",
        order=3
    )
    TrustFeature.objects.create(
        title="25-Year Structural Warranty",
        description="Long-term peace of mind with branded high-grade civil construction materials.",
        icon_name="Award",
        order=4
    )

    print("Seeding Why Choose Us Items...")
    WhyChooseUsItem.objects.create(
        title="Fixed Price & Zero Escalation",
        description="No hidden charges or unexpected price hikes mid-construction. The agreed price is final.",
        icon_name="DollarSign",
        order=1
    )
    WhyChooseUsItem.objects.create(
        title="150+ Quality Control Checks",
        description="Rigorous multi-stage inspections by certified structural engineers for long-term safety.",
        icon_name="ShieldCheck",
        order=2
    )
    WhyChooseUsItem.objects.create(
        title="Guaranteed Timely Delivery",
        description="Strict project scheduling with financial penalties for any unjustified delay.",
        icon_name="Clock",
        order=3
    )
    WhyChooseUsItem.objects.create(
        title="In-House Expert Team",
        description="Architects, structural engineers, interior designers, and project leads under one roof.",
        icon_name="Users",
        order=4
    )
    WhyChooseUsItem.objects.create(
        title="Live Progress Tracking",
        description="Stay updated with daily photos, videos, and site reports directly on your phone.",
        icon_name="Smartphone",
        order=5
    )
    WhyChooseUsItem.objects.create(
        title="Branded Material Quality",
        description="We use only top-tier certified materials (Ultratech, Tata Tiscon, Kohler, Asian Paints).",
        icon_name="CheckCircle2",
        order=6
    )

    print("Seeding Process Steps...")
    ProcessStep.objects.create(
        step_number="01",
        title="Design & Architectural Planning",
        description="We create customized 2D floor plans, 3D elevations, and Vastu-compliant layouts tailored to your aspirations.",
        icon_name="PenTool",
        order=1
    )
    ProcessStep.objects.create(
        step_number="02",
        title="Transparent Cost Estimation",
        description="Detailed BOQ & transparent pricing with zero hidden costs before signing the contract.",
        icon_name="FileText",
        order=2
    )
    ProcessStep.objects.create(
        step_number="03",
        title="Quality Civil Construction",
        description="Execution by expert engineers using 150+ point quality control checklists at every build milestone.",
        icon_name="HardHat",
        order=3
    )
    ProcessStep.objects.create(
        step_number="04",
        title="Interiors & Key Handover",
        description="Factory-finished woodwork, painting, deep cleaning, and hassle-free key delivery.",
        icon_name="Key",
        order=4
    )

    print("Seeding Journey Milestones...")
    JourneyMilestone.objects.create(
        year="2016",
        title="The Foundation",
        description="Founded with a vision to revolutionize turnkey construction with transparent pricing and in-house engineering.",
        order=1
    )
    JourneyMilestone.objects.create(
        year="2018",
        title="Expanding the Horizon",
        description="Successfully delivered our 50th residential project and expanded our team of in-house architects and designers.",
        order=2
    )
    JourneyMilestone.objects.create(
        year="2020",
        title="Commercial Division",
        description="Launched our commercial division, taking on large-scale office spaces and retail hubs across Gujarat.",
        order=3
    )
    JourneyMilestone.objects.create(
        year="2022",
        title="ISO Certification",
        description="Achieved ISO 9001:2015 certification for our stringent quality control and 150+ point inspection process.",
        order=4
    )
    JourneyMilestone.objects.create(
        year="2024",
        title="Industry Leaders",
        description="Recognized as one of the fastest-growing premium construction firms, with over 120 completed projects.",
        order=5
    )

    print("Dynamic content seeded successfully!")

if __name__ == "__main__":
    seed_all()
