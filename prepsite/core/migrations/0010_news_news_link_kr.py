# Generated by Django 2.1.4 on 2019-02-15 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20190212_0656'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='news_link_kr',
            field=models.CharField(blank=True, default='', max_length=2000, null=True),
        ),
    ]
