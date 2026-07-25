import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from django.utils.text import slugify
from core.models import Service, Project, BlogPost

for obj in Service.objects.all():
    if obj.title:
        obj.slug = slugify(obj.title)
        obj.save()

for obj in Project.objects.all():
    if obj.title:
        obj.slug = slugify(obj.title)
        obj.save()

for obj in BlogPost.objects.all():
    if obj.title:
        obj.slug = slugify(obj.title)
        obj.save()

print("Slugs generated successfully.")
