from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet, PageContentViewSet, ServiceViewSet,
    PackageViewSet, ProjectViewSet, TestimonialViewSet, FAQViewSet,
    CoreValueViewSet, MilestoneViewSet, CompanyStatViewSet,
    ProcessStepViewSet, TrustPartnerViewSet, BlogCategoryViewSet, BlogPostViewSet
)

router = DefaultRouter()
router.register(r'settings', SiteSettingsViewSet)
router.register(r'pages', PageContentViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'packages', PackageViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'core-values', CoreValueViewSet)
router.register(r'milestones', MilestoneViewSet)
router.register(r'company-stats', CompanyStatViewSet)
router.register(r'process-steps', ProcessStepViewSet)
router.register(r'trust-partners', TrustPartnerViewSet)
router.register(r'blog-categories', BlogCategoryViewSet)
router.register(r'blogs', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
