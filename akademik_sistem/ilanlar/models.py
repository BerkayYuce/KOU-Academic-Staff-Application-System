from django.db import models

class Ilan(models.Model):
    KADRO_TIPI_CHOICES = [
        ('dr', 'Doktor Öğretim Üyesi'),
        ('docent', 'Doçent'),
        ('prof', 'Profesör'),
    ]

    baslik = models.CharField(max_length=255)
    aciklama = models.TextField()
    kadro_tipi = models.CharField(max_length=10, choices=KADRO_TIPI_CHOICES)
    baslangic_tarihi = models.DateField()
    bitis_tarihi = models.DateField()
    aktif = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.baslik} ({self.kadro_tipi})"
