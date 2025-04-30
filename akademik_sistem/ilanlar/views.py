from rest_framework import generics, permissions
from .models import Ilan
from .serializers import IlanSerializer

class IlanListCreateView(generics.ListCreateAPIView):
    queryset = Ilan.objects.all()
    serializer_class = IlanSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

class IlanRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ilan.objects.all()
    serializer_class = IlanSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]
