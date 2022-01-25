from django.contrib.auth.models import User
from django.db import models


class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    salary = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=False)
    sponsored = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.name


class JobSponsored(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    sponsored_from = models.DateTimeField(auto_now_add=True)
    sponsored_to = models.DateTimeField()
    stripe_payment_intent_id = models.CharField(max_length=50)

    def __str__(self):
        return str(self.job)
