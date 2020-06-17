import json
import traceback
from datetime import datetime

from django.contrib.auth.models import User
from django.db import transaction
from django.http import JsonResponse
from apis.models import Document, StripeToken, Memorial, RegistryItem, RegistryPayment

from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import obtain_auth_token


def getUserDetails(user):
    return {
        'email': user.email,
        'name': user.profile.name
    }


# register a new user
def userSignUp(request):
    payload = json.loads(request.body)

    # verifyPayload
    required_fields = ['name', 'email', 'password']
    for fieldName in required_fields:
        if not payload.get(fieldName):
            return JsonResponse(
                {
                    'message': f"{fieldName} should not be empty",
                },
                status=404
            )
    if User.objects.filter(username=payload["email"]).exists():
        return JsonResponse(
            {
                'message': "User with this email already exists",
            },
            status=404
        )

    with transaction.atomic():
        user = User.objects.create_user(
            payload['email'],
            payload['email'],
            payload['password'],
        )
        user.refresh_from_db()  # load the Profile instance created by the django signal
        user.profile.name = payload['name']
        user.save()  # don’t need to call user.profile.save()
        token, _ = Token.objects.get_or_create(user=user)

    return JsonResponse(
        {
            'success': True,
            'access_token': token.key,
            'user_data': getUserDetails(user)
        },
        status=200
    )


def userLogin(request):
    """
          View to verify user credential
    """
    try:
        response = obtain_auth_token(request)
        response.render()
        token = json.loads(response.content)['token']
        user = Token.objects.get(key=token).user
        return JsonResponse(
            {
                'success': True,
                'message': 'Login Successful',
                "access_token": token,
                'user_data': getUserDetails(user),
            })
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )


@api_view(('POST',))
def saveStripeToken(request):
    try:
        user = request.user
        with transaction.atomic():
            StripeToken.objects.create(user=user,
                                       token_id=request.data['token_id'],
                                       payee_email=request.data['payee_email'])
        return JsonResponse(
            {
                'message': 'Payment updated',
                'success': True,
            },
            status=200
        )
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )


def uploadMedia(request):
    try:
        new_doc = Document(docfile=request.FILES['file'])
        new_doc.save()

        return JsonResponse(
            {
                'message': 'File uploaded',
                'success': True,
            },
            status=200
        )
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )


def getMemorialDetails(memorial):
    items = RegistryItem.objects.filter(memorial=memorial)
    items = [{
        'title': itm.name,
        'price': itm.price,
        'img_url': itm.img_url,
    } for itm in items]

    return {
        'title': memorial.title,
        'date': memorial.date,
        'guest_msg': memorial.guest_msg,
        'registry_items': items
    }


@api_view(('POST',))
def getMemorial(request):
    try:
        url = request.data['url']
        memorials = Memorial.objects.filter(url=url)
        if memorials and len(memorials) >= 1:
            return JsonResponse(
                {
                    'memorial': getMemorialDetails(memorials[0]),
                    'success': True,
                },
                status=200
            )
        else:
            return JsonResponse(
                {
                    'message': 'No memorial with given url found',
                    'success': False,
                },
                status=200
            )
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )


@api_view(('POST',))
def createMemorial(request):
    try:
        user = request.user
        title = request.data['title']
        date = request.data['date']
        url = request.data['url']
        guest_msg = request.data['guest_msg']
        registry_items = json.loads(request.data['registry_items'])

        with transaction.atomic():
            # create memorial object
            memorial = Memorial.objects.create(
                user=user,
                url=url,
                date=date,
                title=title,
                guest_msg=guest_msg
            )

            # create individual items
            for item in registry_items:
                RegistryItem.objects.create(
                    memorial=memorial,
                    price=item['price'],
                    name=item['title'],
                    img_url=item['img_url']
                )

        return JsonResponse(
            {
                'message': 'Memorial Created',
                'success': True,
            },
            status=200
        )
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )


@api_view(('POST',))
def registryPayment(request):
    try:
        memorial_url = request.data['memorial_url']
        payment_epoch_time = request.data['payment_epoch_time']
        payment_amount = request.data['payment_amount']
        payment_id = request.data['payment_id']
        card_id = request.data['card_id']
        payee_email = request.data['payee_email']

        # first find associated memorial object
        memorials = Memorial.objects.filter(url=memorial_url)
        if memorials and len(memorials) >= 1:
            pass
        else:
            return JsonResponse(
                {
                    'message': 'No memorial with given url found',
                    'success': False,
                },
                status=200
            )

        # create payment object
        with transaction.atomic():
            RegistryPayment.objects.create(
                datetime=datetime.fromtimestamp(int(payment_epoch_time)),
                amount=float(payment_amount),
                payee_email=payee_email,
                card_id=card_id,
                payment_id=payment_id,
                memorial=memorials[0],
            )

        # todo: link with paid items

        return JsonResponse(
            {
                'message': 'Payment successful',
                'success': True,
            },
            status=200
        )
    except Exception as e:
        print(traceback.format_exc())
        return JsonResponse(
            {
                'message': str(e),
                'success': False,
            },
            status=404
        )