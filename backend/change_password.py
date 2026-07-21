import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth.models import User

admin_user = User.objects.filter(username="admin").first()
if admin_user:
    admin_user.set_password("SecureAdmin!2024")
    admin_user.save()
    print("Admin password updated successfully.")
else:
    print("Admin user not found.")
