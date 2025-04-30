from django.urls import path
from .views import (
    JuriAtamaCreateView, JuriAtamaListView,
    JuriDegerlendirmeCreateView, JuriDegerlendirmeListView
)

urlpatterns = [
    path('atama/create/', JuriAtamaCreateView.as_view(), name='juri-atama-create'),
    path('atama/list/', JuriAtamaListView.as_view(), name='juri-atama-list'),
    path('degerlendirme/create/', JuriDegerlendirmeCreateView.as_view(), name='juri-degerlendirme-create'),
    path('degerlendirme/list/', JuriDegerlendirmeListView.as_view(), name='juri-degerlendirme-list'),
]
