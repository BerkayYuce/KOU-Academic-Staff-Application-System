from rest_framework import serializers
from .models import Ilan

class IlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ilan
        fields = '__all__'
