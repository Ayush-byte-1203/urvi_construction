from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _

from .models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue, JourneyMilestone,
    BlogCategory, BlogPost, GalleryImage, PaymentTerm
)

class CustomAdminSite(AdminSite):
    site_header = "Paramarsh Construction Admin"
    site_title = "Paramarsh Admin Portal"
    index_title = "Welcome to Paramarsh Admin Portal"

    def get_app_list(self, request, app_label=None):
        app_list = super().get_app_list(request)
        custom_app_list = []
        
        groups = {
            "Global Configuration": {
                "models": [SiteSettings, CoreValue, FAQCategory, FAQ],
            },
            "Pages": {
                "models": [PageContent, JourneyMilestone],
            },
            "Services": {
                "models": [ServiceCategory, Service],
            },
            "Packages": {
                "models": [Package, PackageMaterialCategory, PaymentTerm],
            },
            "Portfolio": {
                "models": [ProjectCategory, Project, GalleryImage],
            },
            "Blog & Testimonials": {
                "models": [BlogCategory, BlogPost, Testimonial],
            },
        }

        model_dict = {}
        for app in app_list:
            for m in app['models']:
                model_dict[m['object_name']] = m

        for group_name, group_data in groups.items():
            group_models = []
            for model_cls in group_data["models"]:
                if model_cls.__name__ in model_dict:
                    group_models.append(model_dict[model_cls.__name__])
            
            if group_models:
                custom_app_list.append({
                    "name": group_name,
                    "app_label": group_name.lower().replace(" ", "_"),
                    "app_url": "",
                    "has_module_perms": True,
                    "models": group_models,
                })

        return custom_app_list

custom_admin_site = CustomAdminSite(name='custom_admin')

# --- SINGLETONS ---
class SingletonModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        if self.model.objects.count() >= 1:
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        return False

class SiteSettingsAdmin(SingletonModelAdmin):
    list_display = ('site_name', 'contact_email', 'contact_phone')

class PageContentAdmin(SingletonModelAdmin):
    list_display = ('page', 'title')

class JourneyMilestoneAdmin(admin.ModelAdmin):
    list_display = ('year', 'title', 'order')
    ordering = ('order',)

# --- SERVICES ---
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'estimated_timeline')
    search_fields = ('title', 'description')
    list_filter = ('category',)
    prepopulated_fields = {'slug': ('title',)}

class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# --- PACKAGES ---
class PackageAdvantageInline(admin.TabularInline):
    model = PackageAdvantage
    extra = 1

class PackageFAQInline(admin.StackedInline):
    model = PackageFAQ
    extra = 1

class PackageMaterialSpecInline(admin.TabularInline):
    model = PackageMaterialSpec
    extra = 1
    fields = ('category', 'brand', 'grade', 'spec', 'why', 'upgrade', 'warranty')

class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'project_type', 'is_popular', 'order')
    list_filter = ('is_popular',)
    list_editable = ('is_popular', 'order')
    search_fields = ('name', 'tagline', 'description')
    inlines = [PackageAdvantageInline, PackageMaterialSpecInline, PackageFAQInline]
    ordering = ('order',)

class PackageMaterialCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'order')
    ordering = ('order',)

class PaymentTermAdmin(admin.ModelAdmin):
    list_display = ('stage_name', 'percentage_or_condition', 'order')
    list_editable = ('percentage_or_condition', 'order')
    search_fields = ('stage_name', 'percentage_or_condition', 'note')
    ordering = ('order',)

# --- PORTFOLIO ---
class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'location', 'completion_date', 'built_area')
    search_fields = ('title', 'location', 'client_name')
    list_filter = ('category', 'completion_date')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]

class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# --- BLOG ---
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'date')
    search_fields = ('title', 'content', 'author')
    list_filter = ('category', 'date')
    prepopulated_fields = {'slug': ('title',)}

class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# --- OTHERS ---
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating')
    search_fields = ('name', 'role', 'quote')
    list_filter = ('rating',)

class CoreValueAdmin(admin.ModelAdmin):
    list_display = ('title', 'order')
    ordering = ('order',)

class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category')
    list_filter = ('category',)
    search_fields = ('question', 'answer')

class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)


# Register everything on the custom site
custom_admin_site.register(SiteSettings, SiteSettingsAdmin)
custom_admin_site.register(PageContent, PageContentAdmin)
custom_admin_site.register(JourneyMilestone, JourneyMilestoneAdmin)

custom_admin_site.register(ServiceCategory, ServiceCategoryAdmin)
custom_admin_site.register(Service, ServiceAdmin)

custom_admin_site.register(Package, PackageAdmin)
custom_admin_site.register(PackageMaterialCategory, PackageMaterialCategoryAdmin)
custom_admin_site.register(PaymentTerm, PaymentTermAdmin)

custom_admin_site.register(ProjectCategory, ProjectCategoryAdmin)
custom_admin_site.register(Project, ProjectAdmin)
custom_admin_site.register(GalleryImage)

custom_admin_site.register(BlogCategory, BlogCategoryAdmin)
custom_admin_site.register(BlogPost, BlogPostAdmin)
custom_admin_site.register(Testimonial, TestimonialAdmin)

custom_admin_site.register(CoreValue, CoreValueAdmin)
custom_admin_site.register(FAQCategory, FAQCategoryAdmin)
custom_admin_site.register(FAQ, FAQAdmin)
