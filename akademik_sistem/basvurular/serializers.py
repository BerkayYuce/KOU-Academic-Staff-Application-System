from rest_framework import serializers
from .models import Basvuru, Tablo5

class BasvuruSerializer(serializers.ModelSerializer):
    class Meta:
        model = Basvuru
        fields = '__all__'
        read_only_fields = ('user', 'basvuru_tarihi')

class Tablo5Serializer(serializers.ModelSerializer):
    class Meta:
        model = Tablo5
        fields = '__all__'
