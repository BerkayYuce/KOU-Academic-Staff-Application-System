from rest_framework import serializers
from .models import JuriAtama, JuriDegerlendirme

class JuriAtamaSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuriAtama
        fields = '__all__'

class JuriDegerlendirmeSerializer(serializers.ModelSerializer):
    class Meta:
        model = JuriDegerlendirme
        fields = '__all__'
