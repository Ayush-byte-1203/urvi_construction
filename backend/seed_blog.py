import os
import django
import sys

# Ensure backend directory is in path for module resolution
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from core.models import BlogCategory, BlogPost

# Create categories
tech, _ = BlogCategory.objects.get_or_create(name="Construction Tech")
design, _ = BlogCategory.objects.get_or_create(name="Design & Planning")

# Create posts
BlogPost.objects.get_or_create(
    title="The Future of Smart Buildings",
    category=tech,
    content="<p>Smart buildings are revolutionizing the construction industry. By integrating IoT devices, automated HVAC, and predictive maintenance, we are reducing energy consumption by over 30% on average.</p><p>This means long-term cost savings and significantly smaller carbon footprints for commercial developments.</p>",
    author="Alice Engineer"
)

BlogPost.objects.get_or_create(
    title="Sustainable Materials in 2026",
    category=design,
    content="<p>As we push for greener cities, the materials we use matter more than ever. The industry is rapidly adopting new standards.</p><ul><li>Cross-Laminated Timber (CLT)</li><li>Recycled Steel Rebars</li><li>Low-Carbon Cement Alternatives</li></ul><p>These materials offer equal or superior structural integrity while drastically reducing embodied carbon.</p>",
    author="Bob Architect"
)

BlogPost.objects.get_or_create(
    title="Mastering Project Timelines",
    category=tech,
    content="<p>Keeping a large-scale structural project on schedule requires meticulous planning and real-time data tracking.</p><p>In this guide, we break down our proprietary 5-step milestone tracking methodology that prevents delays and ensures smooth handovers.</p>",
    author="Charlie SiteManager"
)

print("Successfully added dummy blog data!")
