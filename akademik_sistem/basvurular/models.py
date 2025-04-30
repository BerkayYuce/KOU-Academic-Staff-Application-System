from django.db import models
from users.models import User
from ilanlar.models import Ilan

def basvuru_dosya_yolu(instance, filename):
    return f"basvurular/{instance.user.username}/{filename}"

class Basvuru(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='basvurular')
    ilan = models.ForeignKey(Ilan, on_delete=models.CASCADE, related_name='basvurular')
    cv = models.FileField(upload_to=basvuru_dosya_yolu)
    diploma = models.FileField(upload_to=basvuru_dosya_yolu)
    yayin_listesi = models.FileField(upload_to=basvuru_dosya_yolu)
    ek_dosya = models.FileField(upload_to=basvuru_dosya_yolu, null=True, blank=True)

    basvuru_tarihi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} -> {self.ilan.baslik}"

class Tablo5(models.Model):
    basvuru = models.OneToOneField(Basvuru, on_delete=models.CASCADE, related_name='tablo5')
    makale_sayisi = models.IntegerField(default=0)
    bildiri_sayisi = models.IntegerField(default=0)
    kitap_sayisi = models.IntegerField(default=0)
    hakemlik_sayisi = models.IntegerField(default=0)
    toplam_puan = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.basvuru.user.username} Tablo 5"
