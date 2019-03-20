# Generated by Django 2.1.4 on 2019-01-10 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20190109_0418'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('news_image', models.ImageField(blank=True, default='preview.jpg', null=True, upload_to='news/')),
                ('news_title', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('news_blurb', models.TextField(blank=True, default='', max_length=2000, null=True)),
                ('news_link', models.CharField(blank=True, default='', max_length=2000, null=True)),
                ('created_on', models.DateField(auto_now_add=True)),
                ('updated_on', models.DateField(auto_now=True)),
                ('publish_on', models.DateField()),
            ],
        ),
        migrations.AddField(
            model_name='prep',
            name='email',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
