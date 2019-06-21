from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.core.mail import BadHeaderError, send_mail
from django.template import loader

from .forms import PrepForm, TeamFormset, SocialFormset
from .models import Prep, PrepTeam, PrepSocial, News


def redirect_root(request):
    return HttpResponseRedirect('/iconsensus/')


def index(request):
    news = News.objects.all().order_by('-publish_on')
    preps = Prep.objects.filter(display=True).order_by('-id')[:6]
    return render(request, 'index.html', {'preps': preps, 'news': news})


def about(request):
    preps = Prep.objects.filter(display=True).order_by('-id')
    return render(request, 'about.html', {'preps': preps})


def thankyou(request):
    return render(request, 'thankyou.html')


def preapplication_form(request):
    return render(request, 'preapplication_form.html')


def application_form(request):
    if request.method == 'POST':
        prepform = PrepForm(request.POST, request.FILES)
        teamformset = TeamFormset(request.POST, request.FILES, prefix='teamform')
        socialformset = SocialFormset(request.POST, prefix='socialform')
        if prepform.is_valid() and teamformset.is_valid() and socialformset.is_valid():
            prep = prepform.save()
            for form in teamformset:
                team = form.save(commit=False)
                team.prep = prep
                team.save()
            for form in socialformset:
                social = form.save(commit=False)
                social.prep = prep
                social.save()

            subject = 'Thank you for applying'
            txt_message = 'Hello, ' + prep.name + '!\r\n' \
                'ICONSENSUS is a journey toward mass adoption of blockchain ' \
                'consisting of four key items: P-Rep, DBP, EEP, and C-Rep. The election ' \
                'of P-Reps is not only the beginning of ICONSENSUS but also first step ' \
                'to realize the goal of a truly decentralized network. \r\n\r\n' \
                'Campaign Timeline\r\n\r\n' \
                'P-Rep Pre-registration : Mid-Jan 2019 ~ Sep 2019\r\n' \
                'P-Rep On-chain Registration & Election : Mid-Sep 2019\r\n\r\n' \
                'Join Private P-Rep Channel: https://t.me/joinchat/GCwj4xS-Iceh7tsF77MKVw \r\n\r\n' \
                'P-Rep campaign webpage : http://icon.community/iconsensus/ \r\n' \
                'Introduction for Public Representative: https://bit.ly/2APyVsq \r\n' \
                'Introduction for ICONist: https://bit.ly/2HhrSPa \r\n' \
                'For further inquiries, please respond directly to this email' \

            from_email = 'support@icon.community'
            to_email = request.POST.get('email')
            html_message = loader.render_to_string('email.html', {'prep_name': prep.name})

            try:
                send_mail(subject, txt_message, from_email, [to_email], fail_silently=False)
            except BadHeaderError:
                pass

            return HttpResponseRedirect(reverse('thankyou'))
    else:
        # Return an empty form
        prepform = PrepForm()
        teamformset = TeamFormset(queryset=PrepTeam.objects.none(), prefix='teamform')
        socialformset = SocialFormset(queryset=PrepSocial.objects.none(), prefix='socialform')
    return render(request, 'application_form.html', {'prepform': prepform, 'teamformset': teamformset, 'socialformset': socialformset})


# Get marker data
def get_map_marker(prep):
    position = prep.server_location_latlong.replace('(', '').replace(')', '').strip().split(',')
    url = 'https://icon.community/iconsensus/candidates/'+str(prep.id)+'/'
    if position and len(position) > 1:
        data = {
            'icon': prep.logo.url if prep.logo else settings.DEFAULT_LOGO,
            'position': {
                'lat': position[0],
                'lng': position[1]
            },
            'url': url
        }
        return data


def candidate_list(request):
    # preps = Prep.objects.filter(server_location_latlong__isnull=False)
    preps = Prep.objects.filter(display=True).order_by('-id')
    total = Prep.objects.filter(display=True).count

    # Prepare Database Prep Map Locations
    locations = []
    for prep in preps:
        try:
            location = get_map_marker(prep)
            if location:
                locations.append(location)
        except Exception as e:
            pass

    return render(request, 'candidate_list.html', {'preps': preps, 'prep_locations': locations, 'total': total})


def candidate_detail(request, pk):
    prep = Prep.objects.get(pk=pk)
    return render(request, 'candidate_detail.html', {'prep': prep})


def index2(request):
    return render(request, 'index2.html')

