from rest_framework import viewsets
from .models import (
    SiteSettings, PageContent, Service, Package,
    Project, Testimonial, FAQ, CoreValue,
    BlogCategory, BlogPost,
    ServiceCategory, ProjectCategory, FAQCategory,
    PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectImage, GalleryImage
)
from .serializers import (
    SiteSettingsSerializer, PageContentSerializer, ServiceSerializer,
    PackageSerializer, ProjectSerializer, TestimonialSerializer, FAQSerializer,
    CoreValueSerializer,
    BlogCategorySerializer, BlogPostSerializer,
    ServiceCategorySerializer, ProjectCategorySerializer, FAQCategorySerializer,
    PackageAdvantageSerializer, PackageMaterialCategorySerializer, PackageMaterialSpecSerializer, PackageFAQSerializer,
    ProjectImageSerializer, GalleryImageSerializer
)

class PackageAdvantageViewSet(viewsets.ModelViewSet):
    queryset = PackageAdvantage.objects.all().order_by('order')
    serializer_class = PackageAdvantageSerializer

class PackageMaterialCategoryViewSet(viewsets.ModelViewSet):
    queryset = PackageMaterialCategory.objects.all().order_by('order')
    serializer_class = PackageMaterialCategorySerializer

class PackageMaterialSpecViewSet(viewsets.ModelViewSet):
    queryset = PackageMaterialSpec.objects.all()
    serializer_class = PackageMaterialSpecSerializer

class PackageFAQViewSet(viewsets.ModelViewSet):
    queryset = PackageFAQ.objects.all().order_by('order')
    serializer_class = PackageFAQSerializer

class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all().order_by('order')
    serializer_class = ProjectImageSerializer



class ServiceCategoryViewSet(viewsets.ModelViewSet):
    queryset = ServiceCategory.objects.all()
    serializer_class = ServiceCategorySerializer

class ProjectCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer

class FAQCategoryViewSet(viewsets.ModelViewSet):
    queryset = FAQCategory.objects.all()
    serializer_class = FAQCategorySerializer

class SiteSettingsViewSet(viewsets.ModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

class PageContentViewSet(viewsets.ModelViewSet):
    queryset = PageContent.objects.all()
    serializer_class = PageContentSerializer
    lookup_field = 'page'

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all().order_by('order')
    serializer_class = PackageSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all().order_by('order')
    serializer_class = CoreValueSerializer



class BlogCategoryViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('order')
    serializer_class = GalleryImageSerializer
