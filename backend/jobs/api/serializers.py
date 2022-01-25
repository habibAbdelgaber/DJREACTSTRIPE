from rest_framework import serializers
from jobs.models import Job, JobSponsored


class JobSerializer(serializers.ModelSerializer):
    user = serializers.CharField(read_only=True)

    class Meta:
        model = Job
        fields = ['id', 'user', 'name', 'salary', 'is_available']


class JobSponsoredSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobSponsored
        fields = ['id', 'job', 'sponsored_from',
                  'sponsored_to', 'stripe_payment_intent_id']
