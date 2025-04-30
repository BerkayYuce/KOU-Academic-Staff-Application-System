from django.urls import path
from .views import IlanListCreateView, IlanRetrieveUpdateDestroyView

urlpatterns = [
    path('', IlanListCreateView.as_view(), name='ilan-list-create'),
    path('<int:pk>/', IlanRetrieveUpdateDestroyView.as_view(), name='ilan-detail'),
]
