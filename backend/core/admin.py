from django.contrib import admin
# pyrefly: ignore [missing-import]
from .models import (
    SiteSettings, PageContent, PageSection, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue, Milestone, CompanyStat, ProcessStep, TrustPartner,
    BlogCategory, BlogPost)

class PageSectionInline(admin.StackedInline):
    model = PageSection
    extra = 1

class PageContentAdmin(admin.ModelAdmin):
    inlines = [PageSectionInline]

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
# Still register PageSection individually if needed
admin.site.register(PageSection)
admin.site.register(ServiceCategory)
admin.site.register(Service)
admin.site.register(Package, PackageAdmin)
# Still register these individually in case they want to view the full lists
admin.site.register(PackageAdvantage)
admin.site.register(PackageMaterialCategory)
admin.site.register(PackageMaterialSpec)
admin.site.register(PackageFAQ)
admin.site.register(ProjectCategory)
admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)
admin.site.register(Testimonial)
admin.site.register(FAQCategory)
admin.site.register(FAQ)
admin.site.register(CoreValue)
admin.site.register(Milestone)
admin.site.register(CompanyStat)
admin.site.register(ProcessStep)
admin.site.register(TrustPartner)
admin.site.register(BlogCategory)
admin.site.register(BlogPost)
