from rest_framework import viewsets
from .models import (
    SiteSettings, PageContent, Service, Package,
    Project, Testimonial, FAQ, CoreValue, Milestone,
    CompanyStat, ProcessStep, TrustPartner, BlogCategory, BlogPost
)
from .serializers import (
    SiteSettingsSerializer, PageContentSerializer, ServiceSerializer,
    PackageSerializer, ProjectSerializer, TestimonialSerializer, FAQSerializer,
    CoreValueSerializer, MilestoneSerializer, CompanyStatSerializer,
    ProcessStepSerializer, TrustPartnerSerializer, BlogCategorySerializer, BlogPostSerializer
)

class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

class PageContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PageContent.objects.all()
    serializer_class = PageContentSerializer
    lookup_field = 'page'

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class PackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class CoreValueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer

class MilestoneViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Milestone.objects.all()
    serializer_class = MilestoneSerializer

class CompanyStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CompanyStat.objects.all()
    serializer_class = CompanyStatSerializer

class ProcessStepViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer

class TrustPartnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrustPartner.objects.all()
    serializer_class = TrustPartnerSerializer

class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer
