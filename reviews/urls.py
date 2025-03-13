from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('bad/', views.bad_review, name='bad_review'),
    path('good/', views.good_review, name='good_review'),
    path('generate/', views.generate_ai_comment, name='generate_ai_comment'),
    path('redirect_google/', views.redirect_google_review, name='redirect_google_review'),
]
