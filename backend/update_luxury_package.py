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
    print("Updating the Luxury Package (Smart Tier) with new data...")
    # Get the third package which is Luxury Tier
    pkg = Package.objects.filter(order=3).first()
    if not pkg:
        pkg = Package.objects.filter(name__icontains='Luxury').first()
        
    if not pkg:
        print("No Luxury package found!")
        return

    print(f"Found package to update: {pkg.name}")

    # Clear old materials for this package
    PackageMaterialSpec.objects.filter(package=pkg).delete()

    new_materials = [
        {
            "category": "Architecture",
            "brand": "Designs & Drawings: Architectural Layout | 2D / 3D, Structural Design",
            "spec": "3D Elevation, MEP Drawings",
            "why": "Digital site survey, Isometric Drawings",
            "grade": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Structure",
            "brand": "Steel: Indus or Jindal Panther | Cement: Ultratech or Ramco Supercrete (43/53 grade)",
            "grade": "ACC or Ultratech M20/M25 RCC Design Mix (or as per structural designer)",
            "spec": "Standard Solid Concrete blocks (6 inch & 4 inch) | Aggregates: 20mm & 40mm",
            "why": "Ceiling Height: 10 feet (FFL to FFL)",
            "upgrade": "", "warranty": ""
        },
        {
            "category": "Kitchen",
            "brand": "Kitchen Sink: Stainless Steel or granite finish worth Rs. 8,000 (Futura, Carysil)",
            "spec": "Ceramic Wall Dado: Upto Rs.80 per Sqft",
            "upgrade": "Main Sink Faucet: Upto Rs.3500 (Parryware / Hindware / Jaquar)",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Bathroom",
            "brand": "Sanitarywares & CP fittings: Jaquar make (upto Rs. 70,000 per 1000 Sqft)",
            "grade": "CPVC Pipe: Apollo or Astral | Bathroom doors: Waterproof flush doors or WPC",
            "spec": "Ceramic Wall Dado upto 7' height: Upto Rs.80 per Sqft",
            "why": "Mirror, Soap Dish, Towel Rail - Worth Rs. 7,000 till 1000 ft of Construction",
            "upgrade": "Solar water heater provision", "warranty": ""
        },
        {
            "category": "Doors & Windows",
            "brand": "Windows: UPVC Windows with glass & mesh shutters (3 track with 1 mesh) of NCL Veka, Prominance, V-tech, or Greentech",
            "spec": "Main Door: Teak Door With Teak frame 5x3.5 inch (worth Rs.40k)",
            "why": "Internal Doors: Membrane/Flush Door with Laminates (upto Rs.13k). Door Frames: Sal Wood 4x3 inch",
            "upgrade": "1 Pooja Room Door: Burma Teak with Teak frame 5x2.5 inch (worth Rs. 28k per 2000 sft)",
            "grade": "", "warranty": ""
        },
        {
            "category": "Painting",
            "brand": "Interior: JK Putty + Apcolite Premium Emulsion",
            "spec": "Exterior: Asian Primer + Apex Exterior Emulsion Paint",
            "grade": "", "why": "", "upgrade": "", "warranty": ""
        },
        {
            "category": "Flooring",
            "brand": "Living, Dining, Rooms & Kitchen: Tiles or Granite upto Rs.120-Rs.140 per sqft",
            "spec": "Balcony & Open Areas: Anti-skid tiles upto Rs.80 per sqft | Parking Tiles: Anti-skid tiles upto Rs.70 per sqft",
            "upgrade": "Staircase: Sadarahalli Granite upto Rs. 110 per sqft",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Electrical",
            "brand": "Switches & Sockets: Legrand mylinc, Havells Coral, or Roma",
            "spec": "Wiring: Fire proof wires of Finolex, Anchor, or Havells",
            "upgrade": "UPS Wiring Provision",
            "grade": "", "why": "", "warranty": ""
        },
        {
            "category": "Miscellaneous",
            "brand": "Overhead Tank: Sintex Double layered 2000L (Extra capacity @ INR 9/L, Platform charged extra)",
            "spec": "Underground Sump: 7000 Ltrs | Staircase Railing: SS (Stainless) Railing of SS 304 grade",
            "why": "Window Grills: Basic MS Grill with enamel Paint (Rs. 195/Sqft)",
            "grade": "", "upgrade": "", "warranty": ""
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
