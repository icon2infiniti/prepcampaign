from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from prepsite.core import views

urlpatterns = [
    path('i18n/', include('django.conf.urls.i18n')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('admin/', admin.site.urls),
    path('', views.redirect_root, name='redirect_root'),
    path('iconsensus/', views.index, name='index'),
    path('iconsensus/preapplication/', views.preapplication_form, name='preapplication_form'),
    path('iconsensus/application/', views.application_form, name='application_form'),
    path('iconsensus/candidates/', views.candidate_list, name='candidate_list'),
    path('iconsensus/thankyou/', views.thankyou, name='thankyou'),
    path('iconsensus/about/', views.about, name='about'),
    path('iconsensus/candidates/<int:pk>/', views.candidate_detail, name='candidate_detail'),
    path('iconsensus/index2/', views.index2, name='index2'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
