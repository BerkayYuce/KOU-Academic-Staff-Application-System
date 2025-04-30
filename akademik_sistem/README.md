# Proje: Akademik Personel Basvuru Sistemi
# Backend: Django + PostgreSQL

# 1. Django Projesi Olusturma

# Komutlar:
# python -m venv venv
# source venv/bin/activate (Linux/Mac) veya venv\Scripts\activate (Windows)
# pip install django djangorestframework psycopg2-binary djangorestframework-simplejwt
# django-admin startproject akademik_sistem
# cd akademik_sistem
# python manage.py startapp users
# python manage.py startapp ilanlar
# python manage.py startapp basvurular
# python manage.py startapp juri

# veritabanı kurulumu
# python manage.py makemigrations
# python manage.py migrate
# python manage.py runserver


- Kurulum Talimatları
- cd akademik-backend
- python -m venv venv
- source venv/bin/activate
- pip install -r requirements.txt
- python manage.py migrate
- python manage.py runserver

# Proje klasor yapisi:
# akademik_sistem/
#   akademik_sistem/
#     settings.py
#     urls.py
#     wsgi.py
#     asgi.py
#   users/  --> Kullanici islemleri (Aday, Admin, Yonetici, Juri)
#   ilanlar/ --> Ilan islemleri
#   basvurular/ --> Basvuru islemleri
#   juri/ --> Juri islemleri
#   manage.py