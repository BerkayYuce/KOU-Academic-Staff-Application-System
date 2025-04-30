from rest_framework import generics, permissions
from .models import JuriAtama, JuriDegerlendirme
from .serializers import JuriAtamaSerializer, JuriDegerlendirmeSerializer

class JuriAtamaCreateView(generics.CreateAPIView):
    queryset = JuriAtama.objects.all()
    serializer_class = JuriAtamaSerializer
    permission_classes = [permissions.IsAdminUser]

class JuriAtamaListView(generics.ListAPIView):
    queryset = JuriAtama.objects.all()
    serializer_class = JuriAtamaSerializer
    permission_classes = [permissions.IsAdminUser]

class JuriDegerlendirmeCreateView(generics.CreateAPIView):
    queryset = JuriDegerlendirme.objects.all()
    serializer_class = JuriDegerlendirmeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(juri=self.request.user)

class JuriDegerlendirmeListView(generics.ListAPIView):
    serializer_class = JuriDegerlendirmeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JuriDegerlendirme.objects.filter(juri=self.request.user)
