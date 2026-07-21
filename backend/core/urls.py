from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet, PageContentViewSet, ServiceViewSet,
    PackageViewSet, ProjectViewSet, TestimonialViewSet, FAQViewSet,
    CoreValueViewSet, BlogCategoryViewSet, BlogPostViewSet,
    ServiceCategoryViewSet, ProjectCategoryViewSet, FAQCategoryViewSet,
    PackageAdvantageViewSet, PackageMaterialCategoryViewSet, PackageMaterialSpecViewSet, PackageFAQViewSet,
    ProjectImageViewSet, MegaMenuCategoryViewSet, MegaMenuLinkViewSet, MegaMenuFeaturedViewSet
)

router = DefaultRouter()
router.register(r'package-advantages', PackageAdvantageViewSet)
router.register(r'package-material-categories', PackageMaterialCategoryViewSet)
router.register(r'package-material-specs', PackageMaterialSpecViewSet)
router.register(r'package-faqs', PackageFAQViewSet)
router.register(r'project-images', ProjectImageViewSet)
router.register(r'mega-menu-categories', MegaMenuCategoryViewSet)
router.register(r'mega-menu-links', MegaMenuLinkViewSet)
router.register(r'mega-menu-featured', MegaMenuFeaturedViewSet)
router.register(r'service-categories', ServiceCategoryViewSet)
router.register(r'project-categories', ProjectCategoryViewSet)
router.register(r'faq-categories', FAQCategoryViewSet)
router.register(r'settings', SiteSettingsViewSet)
router.register(r'pages', PageContentViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'packages', PackageViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'core-values', CoreValueViewSet)
router.register(r'blog-categories', BlogCategoryViewSet)
router.register(r'blogs', BlogPostViewSet)

from .views import MegaMenuViewSet
router.register(r'mega-menus', MegaMenuViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
