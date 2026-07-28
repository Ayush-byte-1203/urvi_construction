from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    SiteSettings, PageContent, ServiceCategory, Service,
    Package, PackageAdvantage, PackageMaterialCategory, PackageMaterialSpec, PackageFAQ,
    ProjectCategory, Project, ProjectImage, Testimonial, FAQCategory, FAQ,
    CoreValue, JourneyMilestone,
    BlogCategory, BlogPost, GalleryImage, AdminUserProfile,
    WhyChooseUsItem, ProcessStep, TrustFeature, PaymentTerm
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

class JourneyMilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = JourneyMilestone
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

class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = '__all__'


class AdminUserSerializer(serializers.ModelSerializer):
    permissions = serializers.JSONField(source='profile.permissions', required=False, default=dict)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_superuser', 'is_staff', 'is_active', 'password', 'permissions']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Ensure permissions dictionary exists
        profile, _ = AdminUserProfile.objects.get_or_create(user=instance)
        ret['permissions'] = profile.permissions or {}
        return ret

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password', None)
        user = User.objects.create(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()

        permissions = profile_data.get('permissions', {})
        AdminUserProfile.objects.create(user=user, permissions=permissions)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()

        permissions = profile_data.get('permissions', None)
        if permissions is not None:
            profile, _ = AdminUserProfile.objects.get_or_create(user=instance)
            profile.permissions = permissions
            profile.save()

        return instance


class WhyChooseUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyChooseUsItem
        fields = '__all__'

class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = '__all__'

class TrustFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrustFeature
        fields = '__all__'

class PaymentTermSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTerm
        fields = '__all__'

