import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from core.models import JourneyMilestone

if not JourneyMilestone.objects.exists():
    milestones = [
        {"year": "2016", "title": "The Foundation", "description": "Paramarsh Construction was founded with a vision to bring transparency and engineering excellence to turnkey building.", "order": 1},
        {"year": "2018", "title": "First 50 Homes", "description": "Reached a major milestone of 50 custom residential homes completed across our primary regions, establishing our reputation for quality.", "order": 2},
        {"year": "2021", "title": "Commercial Expansion", "description": "Expanded our portfolio into premium commercial complexes and office spaces, proving our capability to handle scale.", "order": 3},
        {"year": "2023", "title": "ISO Certification", "description": "Awarded ISO 9001:2015 for our rigorous 150+ quality checkpoints, standardized material procurement, and project management processes.", "order": 4},
        {"year": "2024", "title": "200+ Projects Strong", "description": "Now operating across multiple cities, delivering luxury living spaces and turnkey solutions at scale without compromising on our core values.", "order": 5}
    ]
    for m in milestones:
        JourneyMilestone.objects.create(**m)
    print("Milestones seeded.")
else:
    print("Milestones already exist.")
