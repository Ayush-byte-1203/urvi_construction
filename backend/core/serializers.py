from rest_framework import serializers
from .models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue,
    BlogCategory, BlogPost
)

class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'

class PageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageContent
        fields = '__all__'

class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Service
        fields = '__all__'

class PackageAdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageAdvantage
        fields = '__all__'

class PackageMaterialCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageMaterialCategory
        fields = '__all__'

class PackageMaterialSpecSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = PackageMaterialSpec
        fields = '__all__'

class PackageFAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackageFAQ
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    advantages = PackageAdvantageSerializer(many=True, read_only=True)
    material_specs = PackageMaterialSpecSerializer(many=True, read_only=True)
    faqs = PackageFAQSerializer(many=True, read_only=True)
    
    class Meta:
        model = Package
        fields = '__all__'

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = '__all__'

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FAQCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQCategory
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = FAQ
        fields = '__all__'

class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = '__all__'



class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = BlogPost
        fields = '__all__'

from .models import MegaMenu, MegaMenuCategory, MegaMenuLink, MegaMenuFeatured

class MegaMenuLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = MegaMenuLink
        fields = '__all__'

class MegaMenuCategorySerializer(serializers.ModelSerializer):
    links = MegaMenuLinkSerializer(many=True, read_only=True)
    class Meta:
        model = MegaMenuCategory
        fields = '__all__'

class MegaMenuFeaturedSerializer(serializers.ModelSerializer):
    class Meta:
        model = MegaMenuFeatured
        fields = '__all__'

class MegaMenuSerializer(serializers.ModelSerializer):
    categories = MegaMenuCategorySerializer(many=True, read_only=True)
    featured = MegaMenuFeaturedSerializer(read_only=True)
    class Meta:
        model = MegaMenu
        fields = '__all__'
