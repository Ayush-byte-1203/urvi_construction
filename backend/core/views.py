from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import (
    SiteSettings, PageContent, Service, Package,
    Project, Testimonial, FAQ, CoreValue, JourneyMilestone,
    BlogCategory, BlogPost,
    ServiceCategory, ProjectCategory, FAQCategory,
    PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectImage, GalleryImage, AdminUserProfile,
    WhyChooseUsItem, ProcessStep, TrustFeature, PaymentTerm
)
from .serializers import (
    SiteSettingsSerializer, PageContentSerializer, ServiceSerializer,
    PackageSerializer, ProjectSerializer, TestimonialSerializer, FAQSerializer,
    CoreValueSerializer, JourneyMilestoneSerializer,
    BlogCategorySerializer, BlogPostSerializer,
    ServiceCategorySerializer, ProjectCategorySerializer, FAQCategorySerializer,
    PackageAdvantageSerializer, PackageMaterialCategorySerializer, PackageMaterialSpecSerializer, PackageFAQSerializer,
    ProjectImageSerializer, GalleryImageSerializer, AdminUserSerializer,
    WhyChooseUsSerializer, ProcessStepSerializer, TrustFeatureSerializer, PaymentTermSerializer
)

class PackageAdvantageViewSet(viewsets.ModelViewSet):
    queryset = PackageAdvantage.objects.all()
    serializer_class = PackageAdvantageSerializer

class PackageMaterialCategoryViewSet(viewsets.ModelViewSet):
    queryset = PackageMaterialCategory.objects.all().order_by('order')
    serializer_class = PackageMaterialCategorySerializer

class PackageMaterialSpecViewSet(viewsets.ModelViewSet):
    queryset = PackageMaterialSpec.objects.all()
    serializer_class = PackageMaterialSpecSerializer

class PackageFAQViewSet(viewsets.ModelViewSet):
    queryset = PackageFAQ.objects.all()
    serializer_class = PackageFAQSerializer

class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
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

class JourneyMilestoneViewSet(viewsets.ModelViewSet):
    queryset = JourneyMilestone.objects.all().order_by('order')
    serializer_class = JourneyMilestoneSerializer

class BlogCategoryViewSet(viewsets.ModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-date')
    serializer_class = BlogPostSerializer

class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all().order_by('order')
    serializer_class = GalleryImageSerializer


from rest_framework.exceptions import PermissionDenied

class AdminUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-id')
    serializer_class = AdminUserSerializer
    permission_classes = [IsAuthenticated]

    def check_user_edit_permission(self, request):
        if request.user.is_superuser:
            return True
        profile = getattr(request.user, 'profile', None)
        perms = profile.permissions if profile else {}
        if not perms.get('users', {}).get('edit', False):
            raise PermissionDenied("You do not have permission to edit or create user accounts.")

    def create(self, request, *args, **kwargs):
        self.check_user_edit_permission(request)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.check_user_edit_permission(request)
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        self.check_user_edit_permission(request)
        return super().partial_update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        self.check_user_edit_permission(request)
        return super().destroy(request, *args, **kwargs)


class CurrentAdminUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = AdminUserSerializer(user)
        return Response(serializer.data)


class WhyChooseUsViewSet(viewsets.ModelViewSet):
    queryset = WhyChooseUsItem.objects.all().order_by('order')
    serializer_class = WhyChooseUsSerializer

class ProcessStepViewSet(viewsets.ModelViewSet):
    queryset = ProcessStep.objects.all().order_by('order')
    serializer_class = ProcessStepSerializer

class TrustFeatureViewSet(viewsets.ModelViewSet):
    queryset = TrustFeature.objects.all().order_by('order')
    serializer_class = TrustFeatureSerializer

class PaymentTermViewSet(viewsets.ModelViewSet):
    queryset = PaymentTerm.objects.all().order_by('order')
    serializer_class = PaymentTermSerializer


def sitemap_xml_view(request):
    from django.http import HttpResponse
    from django.utils.timezone import now
    from .models import Service, BlogPost
    base_url = "https://pccbuild.in"
    today = now().strftime('%Y-%m-%d')

    core_pages = [
        ('/', '1.0', 'daily'),
        ('/about', '0.8', 'weekly'),
        ('/services', '0.9', 'weekly'),
        ('/packages', '0.9', 'weekly'),
        ('/projects', '0.9', 'weekly'),
        ('/blog', '0.7', 'weekly'),
        ('/contact', '0.8', 'monthly'),
        ('/privacy-policy', '0.3', 'yearly'),
        ('/terms-and-conditions', '0.3', 'yearly'),
    ]

    cities = ['vadodara', 'ahmedabad', 'surat', 'rajkot', 'gandhinagar', 'mumbai']

    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
    ]

    for path, priority, changefreq in core_pages:
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{base_url}{path}</loc>')
        xml_lines.append(f'    <lastmod>{today}</lastmod>')
        xml_lines.append(f'    <changefreq>{changefreq}</changefreq>')
        xml_lines.append(f'    <priority>{priority}</priority>')
        xml_lines.append('  </url>')

    for service in Service.objects.all():
        slug_or_id = service.slug or str(service.id)
        lastmod = service.updated_at.strftime('%Y-%m-%d') if hasattr(service, 'updated_at') and getattr(service, 'updated_at', None) else today
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{base_url}/services/{slug_or_id}</loc>')
        xml_lines.append(f'    <lastmod>{lastmod}</lastmod>')
        xml_lines.append('    <changefreq>monthly</changefreq>')
        xml_lines.append('    <priority>0.8</priority>')
        xml_lines.append('  </url>')

    for blog in BlogPost.objects.all():
        slug_or_id = blog.slug or str(blog.id)
        lastmod = blog.date.strftime('%Y-%m-%d') if hasattr(blog, 'date') and getattr(blog, 'date', None) else today
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{base_url}/blog/{slug_or_id}</loc>')
        xml_lines.append(f'    <lastmod>{lastmod}</lastmod>')
        xml_lines.append('    <changefreq>weekly</changefreq>')
        xml_lines.append('    <priority>0.7</priority>')
        xml_lines.append('  </url>')

    for city in cities:
        xml_lines.append('  <url>')
        xml_lines.append(f'    <loc>{base_url}/{city}</loc>')
        xml_lines.append(f'    <lastmod>{today}</lastmod>')
        xml_lines.append('    <changefreq>monthly</changefreq>')
        xml_lines.append('    <priority>0.7</priority>')
        xml_lines.append('  </url>')

    xml_lines.append('</urlset>')
    return HttpResponse('\n'.join(xml_lines), content_type='application/xml')
