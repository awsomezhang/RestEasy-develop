import uuid

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.TextField(max_length=500, blank=True)


class StripeToken(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token_id = models.TextField(max_length=128, blank=False)
    payee_email = models.TextField(max_length=50, blank=False)


class Memorial(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    url = models.TextField(max_length=50, unique=True, blank=False, editable=True)
    title = models.TextField(max_length=50, blank=False)
    date = models.TextField(max_length=50, blank=True)
    guest_msg = models.TextField(max_length=150, blank=True)


class RegistryItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    memorial = models.ForeignKey(Memorial, on_delete=models.CASCADE)
    name = models.TextField(max_length=50, blank=False)
    price = models.FloatField(null=False, blank=False, editable=False)
    img_url = models.TextField(max_length=100, blank=False, editable=True)
    paid = models.BooleanField(default=False, editable=True)


class RegistryPayment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    datetime = models.DateTimeField(null=False, blank=False, editable=False)
    amount = models.FloatField(null=False, blank=False, editable=False)
    payee_email = models.EmailField(max_length=70, blank=False, editable=False)

    payment_id = models.TextField(max_length=100,  blank=False, editable=False)
    card_id = models.TextField(max_length=100,  blank=False, editable=False)

    memorial = models.ForeignKey(Memorial, on_delete=models.CASCADE)


@receiver(post_save, sender=User)
def update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


class Document(models.Model):
    docfile = models.FileField()