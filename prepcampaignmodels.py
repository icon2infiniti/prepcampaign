# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CorePrep(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    name = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    introduction = models.CharField(max_length=2000, blank=True, null=True)
    server_location = models.CharField(max_length=100, blank=True, null=True)
    server_type = models.CharField(max_length=100, blank=True, null=True)
    server_spec = models.CharField(max_length=2000, blank=True, null=True)
    logo = models.CharField(max_length=100, blank=True, null=True)
    server_location_latlong = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField()
    display = models.BooleanField()
    updated_at = models.DateTimeField()
    proposal_rich = models.TextField(blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)
    self_intro_video = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'core_prep'


class CorePrepsocial(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    social_select = models.CharField(max_length=20, blank=True, null=True)
    prep = models.ForeignKey(CorePrep, models.DO_NOTHING, blank=True, null=True)
    link = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'core_prepsocial'


class CorePrepteam(models.Model):
    id = models.IntegerField(primary_key=True)  # AutoField?
    avatar = models.CharField(max_length=100, blank=True, null=True)
    background = models.CharField(max_length=2000, blank=True, null=True)
    prep = models.ForeignKey(CorePrep, models.DO_NOTHING, blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'core_prepteam'