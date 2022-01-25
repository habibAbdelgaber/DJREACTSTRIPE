import datetime
from django.core.mail import send_mail
from src import config
from django.http import HttpResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from jobs.models import Job, JobSponsored

import stripe

# This is your test secret API key.
stripe.api_key = config.base.STRIPE_SECRET_KEY


class StripePaymentView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            # data = request.data
            # print(data)
            # Create a PaymentIntent with the order amount and currency
            intent = stripe.PaymentIntent.create(
                amount=int(1000),
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
                metadata={
                    "job_id": request.data["job_id"]
                }
            )
            return Response({'clientSecret': intent['client_secret']})
        except Exception as e:
            return Response({'error': str(e)}, status=403)


@csrf_exempt
def webhook(request):
    event = None
    payload = request.body
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, config.base.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # ... handle other event types
        job_id = payment_intent["metadata"]["job_id"]
        job = Job.objects.get(id=job_id)

        JobSponsored.objects.create(
            job=job,
            sponsored_to=datetime.date.today() + datetime.timedelta(days=7),
            stripe_payment_intent_id=payment_intent["id"]
        )

        job.sponsored = True
        job.save()

        send_mail(
            subject='Your sponsored job post is live!',
            message=f'Thanks for your purchase. Your job: {job.name} is now sponsored!',
            recipient_list=[job.user.email],
            from_email='noreply@gmail.com'
        )

    else:
        print('Unhandled event type {}'.format(event['type']))

    return HttpResponse(status=200)
