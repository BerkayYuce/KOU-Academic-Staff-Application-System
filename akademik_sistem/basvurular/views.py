from rest_framework import generics, permissions
from .models import Basvuru, Tablo5
from .serializers import BasvuruSerializer, Tablo5Serializer
from django.http import HttpResponse
from reportlab.pdfgen import canvas

class BasvuruCreateView(generics.CreateAPIView):
    queryset = Basvuru.objects.all()
    serializer_class = BasvuruSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BasvuruListView(generics.ListAPIView):
    queryset = Basvuru.objects.all()
    serializer_class = BasvuruSerializer
    permission_classes = [permissions.IsAdminUser]

class BasvuruDetailView(generics.RetrieveAPIView):
    queryset = Basvuru.objects.all()
    serializer_class = BasvuruSerializer
    permission_classes = [permissions.IsAdminUser]

class Tablo5CreateView(generics.CreateAPIView):
    queryset = Tablo5.objects.all()
    serializer_class = Tablo5Serializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        makale = self.request.data.get('makale_sayisi', 0)
        bildiri = self.request.data.get('bildiri_sayisi', 0)
        kitap = self.request.data.get('kitap_sayisi', 0)
        hakemlik = self.request.data.get('hakemlik_sayisi', 0)

        toplam_puan = int(makale) * 10 + int(bildiri) * 5 + int(kitap) * 15 + int(hakemlik) * 2

        serializer.save(toplam_puan=toplam_puan)

class Tablo5PDFView(generics.RetrieveAPIView):
    queryset = Tablo5.objects.all()
    serializer_class = Tablo5Serializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        tablo5 = self.get_object()

        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename=\"Tablo5_{tablo5.basvuru.user.username}.pdf\"'

        p = canvas.Canvas(response)
        p.drawString(100, 800, f"Tablo 5 Raporu: {tablo5.basvuru.user.username}")
        p.drawString(100, 780, f"Makale Sayisi: {tablo5.makale_sayisi}")
        p.drawString(100, 760, f"Bildiri Sayisi: {tablo5.bildiri_sayisi}")
        p.drawString(100, 740, f"Kitap Sayisi: {tablo5.kitap_sayisi}")
        p.drawString(100, 720, f"Hakemlik Sayisi: {tablo5.hakemlik_sayisi}")
        p.drawString(100, 700, f"Toplam Puan: {tablo5.toplam_puan}")
        p.showPage()
        p.save()

        return response
