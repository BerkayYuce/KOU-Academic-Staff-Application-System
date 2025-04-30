from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/ilanlar/', include('ilanlar.urls')),
    path('api/basvurular/', include('basvurular.urls')),
    path('api/juri/', include('juri.urls')),
]
