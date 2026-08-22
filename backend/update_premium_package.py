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
    print("Updating the Premium Package with new data...")
    # Get the second package which is typically Premium Tier
    pkg = Package.objects.filter(order=2).first()
    if not pkg:
        pkg = Package.objects.filter(name__icontains='Premium').first()
        
    if not pkg:
        print("No Premium package found!")
        return

    print(f"Found package to update: {pkg.name}")

    # Clear old materials for this package
    PackageMaterialSpec.objects.filter(package=pkg).delete()

    new_materials = [
        {
            "category": "Architecture",
            "brand": "Designs & Drawings: Architectural Layout | 2D / 3D",
            "spec": "Structural Design, 3D Elevation, MEP Drawings, Digital site survey",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Structure",
            "brand": "Steel: Indus or Jindal Panther | Cement: Dalmia or Bharathi (43/53 grade)",
            "grade": "M20 / M25 RCC Design Mix (or as per structural designer)",
            "spec": "Standard Solid Concrete blocks (6 inch & 4 inch) | Aggregates: 20mm & 40mm",
            "why": "Ceiling Height: 10 feet (FFL to FFL)",
            "upgrade": "", "warranty": ""
        },
        {
            "category": "Kitchen",
            "brand": "Kitchen Sink: Stainless Steel (Single Sink) worth Rs. 6,000",
            "spec": "Ceramic Wall Dado: Upto Rs.60 per Sqft",
            "upgrade": "Main Sink Faucet: Upto Rs.2000 | Accessories: ISI Marked",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Bathroom",
            "brand": "Sanitarywares & CP fittings: Hindware or Parryware make (upto Rs. 50,000 per 1000 Sqft)",
            "grade": "CPVC Pipe: Apollo or Astral Pipes",
            "spec": "Ceramic Wall Dado upto 7' height: Upto Rs.60 per Sqft",
            "why": "Bathroom doors: Waterproof flush doors or WPC",
            "upgrade": "", "warranty": ""
        },
        {
            "category": "Doors & Windows",
            "brand": "Windows: UPVC Windows with glass & mesh shutters (3 track with 1 mesh) of Luftung, Plastone, or Lesso eiti",
            "spec": "Main Door: Teak Door With Teak frame 5x3 inch (worth Rs.30k)",
            "why": "Internal Doors: Membrane/Flush Door with Laminates (upto Rs.11k). Door Frames: Sal Wood 4x2.5 inch",
            "grade": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Painting",
            "brand": "Interior: JK Putty + Tractor Shyne Emulsion Paint",
            "spec": "Exterior: Asian Primer + Apex Exterior Emulsion Paint",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Flooring",
            "brand": "Living, Dining: Tiles or Granite upto Rs.100 per sqft | Rooms & Kitchen: Tiles upto Rs.80 per sqft",
            "spec": "Balcony & Open Areas: Anti-skid tiles upto Rs.60 per sqft | Parking Tiles: Anti-skid tiles upto Rs.50 per sqft",
            "upgrade": "Staircase: Sadarahalli Granite upto Rs. 80 per sqft",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Electrical",
            "brand": "Switches & Sockets: Roma, Lisha, Legrand Lyncus, or Havells Fabio",
            "spec": "Wiring: Fire proof wires of Finolex, Anchor, or Havells",
            "upgrade": "UPS Wiring Provision",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Miscellaneous",
            "brand": "Overhead Tank: Double Layered tank (1500 Ltrs Apollo) | Underground Sump: 6000 Ltrs",
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
