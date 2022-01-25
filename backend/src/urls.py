from django.contrib import admin
from django.urls import path, include
from payments import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('users/', include('users.urls')),
    path('jobs-api/', include('jobs.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/password_reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),


    # Payment intent
    path('create-payment-intent/',
         views.StripePaymentView.as_view(), name='payment-intent'),
    path('webhook/payment/', views.webhook, name='payment-intent')
]
