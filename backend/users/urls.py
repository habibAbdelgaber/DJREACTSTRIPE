from django.urls import path
from .api.views import UserProfile, Profiles
urlpatterns = [
    path('', Profiles.as_view(), name='users'),
    path('<pk>/', UserProfile.as_view(), name='user-detail')
]
