from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet, PageContentViewSet, ServiceViewSet,
    PackageViewSet, ProjectViewSet, TestimonialViewSet, FAQViewSet,
    CoreValueViewSet, BlogCategoryViewSet, BlogPostViewSet,
    ServiceCategoryViewSet, ProjectCategoryViewSet, FAQCategoryViewSet,
    PackageAdvantageViewSet, PackageMaterialCategoryViewSet, PackageMaterialSpecViewSet, PackageFAQViewSet,
    ProjectImageViewSet, GalleryImageViewSet, JourneyMilestoneViewSet,
    AdminUserViewSet, CurrentAdminUserView,
    WhyChooseUsViewSet, ProcessStepViewSet, TrustFeatureViewSet, PaymentTermViewSet,
    sitemap_xml_view
)

router = DefaultRouter()
router.register(r'package-advantages', PackageAdvantageViewSet)
router.register(r'package-material-categories', PackageMaterialCategoryViewSet)
router.register(r'package-material-specs', PackageMaterialSpecViewSet)
router.register(r'package-faqs', PackageFAQViewSet)
router.register(r'payment-terms', PaymentTermViewSet)
router.register(r'project-images', ProjectImageViewSet)
router.register(r'gallery-images', GalleryImageViewSet)

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
router.register(r'journey', JourneyMilestoneViewSet)
router.register(r'why-choose-us', WhyChooseUsViewSet)
router.register(r'process-steps', ProcessStepViewSet)
router.register(r'trust-features', TrustFeatureViewSet)
router.register(r'users', AdminUserViewSet)


urlpatterns = [
    path('me/', CurrentAdminUserView.as_view(), name='current_user'),
    path('sitemap.xml', sitemap_xml_view, name='sitemap_xml'),
    path('', include(router.urls)),
]


