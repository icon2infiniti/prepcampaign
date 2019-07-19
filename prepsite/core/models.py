from django.db import models

from ckeditor_uploader.fields import RichTextUploadingField


class News(models.Model):
    news_image = models.ImageField(upload_to='news/', default='news/preview.jpg', null=True, blank=True)
    news_title = models.CharField(max_length=200, default='', null=True, blank=True)
    news_blurb = models.TextField(max_length=2000, default='', null=True, blank=True)
    news_link = models.CharField(max_length=2000, default='', null=True, blank=True)
    news_link_kr = models.CharField(max_length=2000, default='', null=True, blank=True)

    created_on = models.DateField(auto_now_add=True)
    updated_on = models.DateField(auto_now=True)
    publish_on = models.DateField()

    def __str__(self):
        return self.news_title


class Prep(models.Model):
    # Basic Information
    name = models.CharField(max_length=100, null=True, blank=True)
    email = models.CharField(max_length=100, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    introduction = models.TextField(max_length=2000, default='', null=True, blank=True)

    # Network Information
    server_location = models.CharField(max_length=100, default='', null=True, blank=True)
    server_location_latlong = models.CharField(max_length=200, default='', null=True, blank=True)
    server_type = models.CharField(max_length=100, default='', null=True, blank=True)
    server_spec = models.CharField(max_length=2000, default='', null=True, blank=True)

    # Uploads
    logo = models.ImageField(upload_to='logos/', default='preview.jpg', null=True, blank=True)
    # proposal = models.FileField(upload_to='proposals/')

    # Proposal
    proposal_rich = RichTextUploadingField(blank=True, null=True)

    # Self-intro video
    self_intro_video = models.URLField(max_length=500, default='', null=True, blank=True)

    # Misc
    display = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_team(self):
        # return ', '.join(self.team.all().values_list('avatar', 'name', 'background'))
        return self.team.all()

    def get_social(self):
        # return ', '.join(self.social.all().values_list('social_select', 'link'))
        return self.social.all()


class PrepTeam(models.Model):
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    background = models.CharField(max_length=2000, default='', null=True)
    prep = models.ForeignKey(
        Prep,
        related_name='team', on_delete=models.SET_NULL,
        null=True)

    def __str__(self):
        return self.name


SOCIAL_CHOICES = (
    ('select', 'Select Network'),
    ('website', 'Website'),
    ('youtube', 'YouTube'),
    ('medium', 'Medium'),
    ('twitter', 'Twitter'),
    ('telegram', 'Telegram'),
    ('slack', 'Slack'),
    ('reddit', 'Reddit'),
    ('facebook', 'Facebook'),
    ('linkedin', 'LinkedIn'),
    ('other', 'Other')
)


class PrepSocial(models.Model):
    social_select = models.CharField(max_length=20, choices=SOCIAL_CHOICES, default='Select', null=True)
    link = models.URLField(max_length=500, default='', null=True, blank=True)
    prep = models.ForeignKey(
        Prep,
        related_name='social', on_delete=models.SET_NULL,
        null=True)

    def __str__(self):
        return self.link
