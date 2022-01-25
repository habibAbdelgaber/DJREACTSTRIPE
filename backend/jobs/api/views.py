from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny

from .serializers import JobSerializer, JobSponsoredSerializer
from jobs.models import Job, JobSponsored


class JobRetrieveAPIView(RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = JobSerializer

    def get_queryset(self):
        return Job.objects.all()
