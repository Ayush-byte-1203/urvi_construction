
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import Package, PackageMaterialCategory, PackageMaterialSpec

def seed_standard():
    try:
        standard_pkg = Package.objects.get(name__icontains="Standard")
    except Package.DoesNotExist:
        print("Standard package not found.")
        return

    # Clear old specs for this package
    PackageMaterialSpec.objects.filter(package=standard_pkg).delete()

    data = {
        "Designs & Drawings": [
            "Architectural Layout | 2D / 3D",
            "Structural Design",
            "3D Elevation",
            "MEP Drawings"
        ],
        "Structure": [
            "Steel- Kamadhenu or Primegold",
            "Cement - Dalmia or Bharathi of 43 or 53 grade",
            "Aggregates - 20mm & 40mm",
            "Blocks - Standard Solid Concrete blocks. 6 inch 4 inch",
            "RCC Design Mix - M20 / M25 or As per the structural designer recommendation",
            "Ceiling Height - 10 feet (Finished Floor level to Finished Floor level)"
        ],
        "Kitchen": [
            "Ceramic Wall Dado - Upto Rs.40 per Sqft",
            "Main Sink Faucet - Upto Rs.1300",
            "Any other Faucet or Accessories - ISI Marked",
            "Kitchen Sink - Stainless Steel of Single Sink make worth Rs.3,000"
        ],
        "Bathroom": [
            "Ceramic Wall Dado upto 7' height - Upto Rs.40 per Sqft",
            "Sanitarywares & CP fittings upto Rs. 30,000 per 1000 Sqft of Cera make",
            "CPVC Pipe - Apollo or Astral Pipes",
            "Bathroom doors - Waterproof flush doors or WPC"
        ],
        "Doors & Windows": [
            "Windows - Aluminium Windows with glass shutters and mesh shutters (3 track with 1 mesh) of Jindal Profiles",
            "Main Door - Flush Door with Veneer. Sal wood frame of 5 inch by 3 inch, worth Rs.20,000 including fixtures.",
            "Internal Doors - Membrane doors / Flush Door with Laminates upto Rs.11,000 including fixtures. Door Frames of Sal Wood 4 inch by 2.5 inch."
        ],
        "Painting": [
            "Interior Painting - JK Putty + Tractor Emulsion Paint",
            "Exterior Painting - Asian Primer + Ace Exterior emulsion Paint"
        ],
        "Flooring": [
            "Living & Dining Flooring - Tiles of value upto Rs.50 per sqft",
            "Rooms & Kitchen Flooring - Tiles of value upto Rs.50 per sqft",
            "Balcony and Open Areas Flooring - Anti-skid tiles of value upto Rs.40 per sqft",
            "Staircase Flooring - Sadarahalli Granite of value upto ₹ 70 per sqft",
            "Parking Tiles - Anti-skid tiles of value upto ₹ 40 per sqft"
        ],
        "Electrical": [
            "All wiring shall be done with fire proof wires of Finolex or Anchor or Havells",
            "Switches & Sockets - Legrand Allzy or GM(G9) or Hi-Fi or Great White"
        ],
        "Miscellaneous": [
            "Overhead Tank - Double Layered tank of 1000 Ltrs of Apollo make",
            "Underground Sump - 4000 Ltrs",
            "Staircase Railing - MS Railing",
            "Window Grills - Basic MS Grill with enamel Paint at Rs. 195 per Sqft"
        ]
    }

    order = 1
    for cat_name, points in data.items():
        cat, _ = PackageMaterialCategory.objects.get_or_create(name=cat_name)
        cat.order = order
        cat.save()
        order += 1
        
        for point in points:
            PackageMaterialSpec.objects.create(
                package=standard_pkg,
                category=cat,
                brand=point,
                grade="",
                spec=""
            )

    print("Updated Standard Package with exact bullet points!")

if __name__ == "__main__":
    seed_standard()
