from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue,
    BlogCategory, BlogPost)

class PageContentAdmin(admin.ModelAdmin):
    pass

class PackageAdvantageInline(admin.TabularInline):
    model = PackageAdvantage
    extra = 1

class PackageFAQInline(admin.TabularInline):
    model = PackageFAQ
    extra = 1

class PackageMaterialSpecInline(admin.TabularInline):
    model = PackageMaterialSpec
    extra = 1

class PackageAdmin(admin.ModelAdmin):
    inlines = [PackageAdvantageInline, PackageFAQInline, PackageMaterialSpecInline]

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline]

admin.site.register(SiteSettings)
admin.site.register(PageContent, PageContentAdmin)
admin.site.register(ServiceCategory)
admin.site.register(Service)
admin.site.register(Package, PackageAdmin)
admin.site.register(PackageAdvantage)
admin.site.register(PackageFAQ)
admin.site.register(PackageMaterialCategory)
admin.site.register(PackageMaterialSpec)
admin.site.register(ProjectCategory)
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)
admin.site.register(Testimonial)
admin.site.register(FAQCategory)
admin.site.register(FAQ)
admin.site.register(CoreValue)

admin.site.register(BlogCategory)
admin.site.register(BlogPost)

# Mega Menu Admin
from .models import MegaMenu, MegaMenuCategory, MegaMenuLink, MegaMenuFeatured

class MegaMenuFeaturedInline(admin.StackedInline):
    model = MegaMenuFeatured
    extra = 0

class MegaMenuCategoryInline(admin.TabularInline):
    model = MegaMenuCategory
    extra = 1

class MegaMenuAdmin(admin.ModelAdmin):
    inlines = [MegaMenuFeaturedInline, MegaMenuCategoryInline]

class MegaMenuLinkInline(admin.TabularInline):
    model = MegaMenuLink
    extra = 1

class MegaMenuCategoryAdmin(admin.ModelAdmin):
    inlines = [MegaMenuLinkInline]
    list_display = ('group_title', 'menu', 'order')
    list_filter = ('menu',)

admin.site.register(MegaMenu, MegaMenuAdmin)
admin.site.register(MegaMenuCategory, MegaMenuCategoryAdmin)
