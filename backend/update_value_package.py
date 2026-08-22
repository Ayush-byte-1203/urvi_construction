import os
import django
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
try:
    django.setup()
except Exception as e:
    print(f"Error setting up Django: {e}")
    sys.exit(1)

from core.models import Package, PackageMaterialCategory, PackageMaterialSpec

def run():
    print("Updating the Value Package (Essential Tier) with new data...")
    # Get the first package which is Essential Tier / Value Package
    pkg = Package.objects.order_by('order').first()
    if not pkg:
        print("No packages found!")
        return

    print(f"Found package to update: {pkg.name}")
    pkg.name = "Value Package"  # Update name based on user prompt 'Our packages Value'
    pkg.save()

    # Clear old materials for this package
    PackageMaterialSpec.objects.filter(package=pkg).delete()

    new_materials = [
        {
            "category": "Architecture",
            "brand": "Designs & Drawings: Architectural Layout | 2D / 3D",
            "spec": "Structural Design, 3D Elevation, MEP Drawings",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Structure",
            "brand": "Steel: Kamadhenu or Primegold | Cement: Dalmia or Bharathi (43/53 grade)",
            "grade": "M20 / M25 RCC Design Mix (or as per structural designer)",
            "spec": "Standard Solid Concrete blocks (6 inch / 4 inch) | Aggregates: 20mm & 40mm",
            "why": "Ceiling Height: 10 feet (FFL to FFL)",
            "upgrade": "", "warranty": ""
        },
        {
            "category": "Kitchen",
            "brand": "Kitchen Sink: Stainless Steel (Single Sink) worth Rs. 3,000",
            "spec": "Ceramic Wall Dado: Upto Rs.40 per Sqft",
            "upgrade": "Main Sink Faucet: Upto Rs.1300 | Accessories: ISI Marked",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Bathroom",
            "brand": "Sanitarywares & CP fittings: Cera make (upto Rs. 30,000 per 1000 Sqft)",
            "grade": "CPVC Pipe: Apollo or Astral Pipes",
            "spec": "Ceramic Wall Dado upto 7' height: Upto Rs.40 per Sqft",
            "why": "Bathroom doors: Waterproof flush doors or WPC",
            "upgrade": "", "warranty": ""
        },
        {
            "category": "Doors & Windows",
            "brand": "Windows: Aluminium Windows with glass shutters & mesh (3 track with 1 mesh) Jindal Profiles",
            "spec": "Main Door: Flush Door with Veneer, Sal wood frame 5x3 inch (worth Rs.20k)",
            "why": "Internal Doors: Membrane/Flush Door with Laminates (upto Rs.11k). Door Frames: Sal Wood 4x2.5 inch",
            "grade": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Painting",
            "brand": "Interior: JK Putty + Tractor Emulsion Paint",
            "spec": "Exterior: Asian Primer + Ace Exterior emulsion Paint",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Flooring",
            "brand": "Living, Dining, Rooms & Kitchen: Tiles upto Rs.50 per sqft",
            "spec": "Balcony, Open Areas & Parking: Anti-skid tiles upto Rs.40 per sqft",
            "upgrade": "Staircase: Sadarahalli Granite upto Rs. 70 per sqft",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Electrical",
            "brand": "Switches & Sockets: Legrand Allzy, GM(G9), Hi-Fi, or Great White",
            "spec": "Wiring: Fire proof wires of Finolex, Anchor, or Havells",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Miscellaneous",
            "brand": "Overhead Tank: Double Layered tank (1000 Ltrs Apollo) | Underground Sump: 4000 Ltrs",
            "spec": "Staircase Railing: MS Railing | Window Grills: Basic MS Grill with enamel Paint (Rs. 195/Sqft)",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        }
    ]

    for spec_data in new_materials:
        cat, _ = PackageMaterialCategory.objects.get_or_create(name=spec_data['category'])
        PackageMaterialSpec.objects.create(
            package=pkg,
            category=cat,
            brand=spec_data['brand'],
            grade=spec_data['grade'],
            spec=spec_data['spec'],
            why=spec_data['why'],
            upgrade=spec_data['upgrade'],
            warranty=spec_data['warranty']
        )
        print(f"Added category: {cat.name} with all details consolidated.")

    print(f"\nSuccess! Updated '{pkg.name}' with the provided categories, combining details so no duplicate categories are created.")

if __name__ == '__main__':
    run()
