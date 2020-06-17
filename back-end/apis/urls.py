from django.conf.urls import url

from apis.views import userSignUp, userLogin, uploadMedia, saveStripeToken, getMemorial, createMemorial, registryPayment

urlpatterns = [
    # Auth
    url(r'^userSignUp/$', userSignUp, name='userSignUp'),
    url(r'^userLogin/$', userLogin, name='userLogin'),

    url(r'^uploadMedia/$', uploadMedia, name='uploadMedia'),

    # memorial apis
    url(r'^getMemorial/$', getMemorial, name='getMemorial'),
    url(r'^createMemorial/$', createMemorial, name='createMemorial'),

    # payment
    url(r'^registryPayment/$', registryPayment, name='registryPayment'),
    url(r'^saveStripeToken/$', saveStripeToken, name='saveStripeToken'),
]
