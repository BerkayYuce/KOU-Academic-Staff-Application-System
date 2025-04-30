from django.urls import path
from .views import (
    BasvuruCreateView, BasvuruListView, BasvuruDetailView,
    Tablo5CreateView, Tablo5PDFView
)

urlpatterns = [
    path('create/', BasvuruCreateView.as_view(), name='basvuru-create'),
    path('list/', BasvuruListView.as_view(), name='basvuru-list'),
    path('<int:pk>/', BasvuruDetailView.as_view(), name='basvuru-detail'),
    path('tablo5/create/', Tablo5CreateView.as_view(), name='tablo5-create'),
    path('tablo5/<int:pk>/pdf/', Tablo5PDFView.as_view(), name='tablo5-pdf'),
]
