# Generated by Django 2.1.4 on 2018-12-12 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='prep',
            name='server_location_latlong',
            field=models.CharField(default='', max_length=200),
        ),
    ]
