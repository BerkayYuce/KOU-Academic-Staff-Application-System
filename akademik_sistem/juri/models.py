from django.db import models
from users.models import User
from ilanlar.models import Ilan
from basvurular.models import Basvuru

def juri_rapor_yolu(instance, filename):
    return f"juri_raporlari/{instance.juri.username}/{filename}"

class JuriAtama(models.Model):
    ilan = models.ForeignKey(Ilan, on_delete=models.CASCADE, related_name='juri_atamalari')
    juri = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'juri'})
    atama_tarihi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ilan.baslik} -> {self.juri.username}"

class JuriDegerlendirme(models.Model):
    basvuru = models.ForeignKey(Basvuru, on_delete=models.CASCADE, related_name='juri_degerlendirmeleri')
    juri = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'role': 'juri'})
    puan = models.DecimalField(max_digits=5, decimal_places=2)
    rapor = models.FileField(upload_to=juri_rapor_yolu)
    degerlendirme_tarihi = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.juri.username} -> {self.basvuru.user.username} : {self.puan}"
