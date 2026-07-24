from django.db import models

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=255, default="Paramarsh Construction")
    logo = models.ImageField(upload_to="site/", null=True, blank=True)
    contact_email = models.EmailField(null=True, blank=True)
    contact_phone = models.CharField(max_length=50, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    
    facebook_url = models.URLField(null=True, blank=True)
    twitter_url = models.URLField(null=True, blank=True)
    linkedin_url = models.URLField(null=True, blank=True)
    instagram_url = models.URLField(max_length=255, null=True, blank=True)
    
    # Hero Section
    hero_headline = models.TextField(null=True, blank=True, help_text="e.g., Your Dream <br/> Our Build <br/> Complete Site Solutions Under One Roof!")
    hero_video_url = models.URLField(max_length=500, null=True, blank=True, help_text="URL to the background video for the homepage hero")
    hero_poster_url = models.URLField(max_length=500, null=True, blank=True, help_text="URL to the poster image while video loads")
    # EmailJS Credentials
    emailjs_service_id = models.CharField(max_length=255, null=True, blank=True, help_text="e.g., service_xxxxxxx")
    emailjs_template_id = models.CharField(max_length=255, null=True, blank=True, help_text="e.g., template_xxxxxxx")
    emailjs_public_key = models.CharField(max_length=255, null=True, blank=True, help_text="e.g., your_public_key")
    emailjs_private_key = models.CharField(max_length=255, null=True, blank=True, help_text="Optional, for backend/server usage")
    
    def __str__(self):
        return self.site_name
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"


class PageContent(models.Model):
    PAGE_CHOICES = [
        ('home', 'Home'),
        ('about', 'About'),
        ('services', 'Services'),
        ('packages', 'Packages'),
        ('projects', 'Projects'),
        ('process', 'Process'),
        ('contact', 'Contact'),
    ]
    page = models.CharField(max_length=50, choices=PAGE_CHOICES, unique=True)
    title = models.CharField(max_length=255)
    subtitle = models.TextField(null=True, blank=True)
    hero_image = models.ImageField(upload_to="pages/", null=True, blank=True)
    hero_video = models.FileField(upload_to="pages/videos/", null=True, blank=True, help_text="Upload a background video (e.g. mp4). Overrides hero_image if provided.")
    
    def __str__(self):
        return f"{self.get_page_display()} Page"





class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Service Categories"


class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon_name = models.CharField(max_length=100, help_text="Lucide react icon name, e.g., Building2")
    image = models.ImageField(upload_to="services/", null=True, blank=True)
    category = models.ForeignKey(ServiceCategory, on_delete=models.SET_NULL, null=True, blank=True)
    features = models.JSONField(default=list, help_text="List of features as JSON array (used as Key Deliverables in side box)")
    estimated_timeline = models.CharField(max_length=255, null=True, blank=True, help_text="E.g., '3-6 Months' or 'Contact us' for side box timeline")
    
    # New detailed fields for ServiceDetail page
    tagline = models.CharField(max_length=255, null=True, blank=True, help_text="E.g., 'Premium Quality' used in detailed page hero banner")
    detail_image = models.ImageField(upload_to="services/details/", null=True, blank=True)
    scope_text = models.TextField(null=True, blank=True, help_text="Detailed text under Scope & Specifications")
    benefits = models.JSONField(default=list, blank=True, help_text="List of detailed engineering benefits")
    workflow_steps = models.JSONField(default=list, blank=True, help_text="List of workflow milestones")
    video_url = models.URLField(null=True, blank=True, help_text="URL for the staging video")
    
    def __str__(self):
        return self.title


class Package(models.Model):
    name = models.CharField(max_length=255)
    price = models.CharField(max_length=100)
    tagline = models.TextField(null=True, blank=True)
    best_for = models.TextField(null=True, blank=True)
    project_type = models.CharField(max_length=255, null=True, blank=True)
    warranty = models.CharField(max_length=100, null=True, blank=True)
    timeline = models.CharField(max_length=100, null=True, blank=True)
    grade = models.CharField(max_length=100, null=True, blank=True)
    plot_size = models.CharField(max_length=100, null=True, blank=True)
    floors = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    ideal_customer = models.TextField(null=True, blank=True)
    limitations = models.TextField(null=True, blank=True)
    upgrades = models.TextField(null=True, blank=True)
    maintenance = models.TextField(null=True, blank=True)
    why_choose = models.TextField(null=True, blank=True)
    construction_quality = models.TextField(null=True, blank=True)
    recommended_budget = models.CharField(max_length=100, null=True, blank=True)
    is_popular = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class PackageAdvantage(models.Model):
    package = models.ForeignKey(Package, related_name='advantages', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return f"{self.package.name} - {self.text}"

class PackageMaterialCategory(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        verbose_name_plural = "Package Material Categories"
        
    def __str__(self):
        return self.name

class PackageMaterialSpec(models.Model):
    package = models.ForeignKey(Package, related_name='material_specs', on_delete=models.CASCADE)
    category = models.ForeignKey(PackageMaterialCategory, on_delete=models.CASCADE)
    brand = models.TextField()
    
    class Meta:
        ordering = ['category__order']
    
    def __str__(self):
        return f"{self.package.name} - {self.category.name}"

class PackageFAQ(models.Model):
    package = models.ForeignKey(Package, related_name='faqs', on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return self.question


class ProjectCategory(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Project Categories"


class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(ProjectCategory, on_delete=models.SET_NULL, null=True, blank=True)
    location = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="projects/")
    completion_date = models.DateField(null=True, blank=True)
    client_name = models.CharField(max_length=255, null=True, blank=True)
    built_area = models.CharField(max_length=255, null=True, blank=True)
    floors_count = models.CharField(max_length=255, null=True, blank=True)
    material_grade = models.CharField(max_length=255, null=True, blank=True)
    seismic_protection = models.CharField(max_length=255, null=True, blank=True)
    architect_name = models.CharField(max_length=255, null=True, blank=True)
    client_requirements = models.TextField(null=True, blank=True)
    
    # Premium Case Study Fields
    completion_year = models.CharField(max_length=50, null=True, blank=True, help_text="e.g. 2024")
    duration = models.CharField(max_length=100, null=True, blank=True, help_text="e.g. 18 Months")
    budget_range = models.CharField(max_length=100, null=True, blank=True, help_text="e.g. ₹5 Cr - ₹7 Cr")
    challenges = models.TextField(null=True, blank=True)
    solutions = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    STAGE_CHOICES = [
        ('Planning', 'Planning'),
        ('Design', 'Design'),
        ('Structure', 'Structure'),
        ('Finished', 'Finished'),
    ]
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to="projects/gallery/")
    stage = models.CharField(max_length=50, choices=STAGE_CHOICES, default='Finished')
    caption = models.CharField(max_length=255, null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.project.title} - {self.stage}"

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True, null=True)
    project_name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    image = models.ImageField(upload_to="testimonials/", null=True, blank=True)
    profile_image = models.ImageField(upload_to="testimonials/profiles/", null=True, blank=True)
    
    def __str__(self):
        return self.name


class FAQCategory(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "FAQ Categories"


class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.ForeignKey(FAQCategory, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.question

class CoreValue(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon_name = models.CharField(max_length=100, help_text="Lucide react icon name")
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
        
    def __str__(self):
        return self.title



class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True)
    author = models.CharField(max_length=255, default="Paramarsh Construction")
    date = models.DateField(auto_now_add=True)
    content = models.TextField()
    image = models.ImageField(upload_to="blog/", null=True, blank=True)
    
    def __str__(self):
        return self.title

class GalleryImage(models.Model):
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, null=True, blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.caption or f"Gallery Image {self.id}"


