from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter
from django.urls import path
from .api.views import JobRetrieveAPIView


urlpatterns = [
    path('detail/<pk>/', JobRetrieveAPIView.as_view(), name='job-detail')
]


# if settings.DEBUG:
#     router = DefaultRouter()
# else:
#     router = SimpleRouter()


# urlpatterns = router.urls
