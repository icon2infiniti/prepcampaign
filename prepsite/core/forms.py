from django import forms
from django.forms import modelformset_factory
from django.utils.translation import ugettext_lazy as _
from .models import Prep, PrepTeam, PrepSocial


class PrepForm(forms.ModelForm):

    class Meta:
        model = Prep
        fields = ('name', 'email', 'location', 'introduction', 'server_location', 'server_location_latlong', 'server_type', 'server_spec', 'logo', 'proposal_rich')
        widgets = {
            # About
            'name': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Official P-Rep Candidate Name')
                }
            ),
            'email': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Contact Email')
                }
            ),
            'location': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Location of headquarters')
                }
            ),

            'introduction': forms.Textarea(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Brief Introduction'),
                    'rows': 5
                }
            ),

            # Network
            'server_location_latlong': forms.HiddenInput(),
            'server_location': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Mark Server Location'),
                    #'readonly': 'readonly'
                }
            ),
            'server_type': forms.TextInput(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Type of Servers(eg: cloud, bare metal, etc)'),
                }
            ),
            'server_spec': forms.Textarea(
                attrs={
                    'class': 'form-control',
                    'placeholder': _('*Server Specs'),
                    'rows': 5
                }
            ),

            # Upload
            'logo': forms.FileInput(
                attrs={
                    'class': 'none',
                }
            ),
            # 'proposal': forms.FileInput(
            #    attrs={
            #        'class': 'none',
            #    }
            # ),
        }


TeamFormset = modelformset_factory(
    PrepTeam,
    fields=('avatar', 'name', 'background'),
    extra=1,
    widgets={
        'name': forms.TextInput(
            attrs={
                'class': 'form-control',
                'placeholder': _('Enter team member name')
            }
        ),
        'background': forms.Textarea(
            attrs={
                'class': 'form-control',
                'placeholder': _('Member background information'),
                'rows': 5
            }
        ),
    }
)


SocialFormset = modelformset_factory(
    PrepSocial,
    fields=('social_select', 'link'),
    extra=1,
    widgets={
        'social_select': forms.Select(
            attrs={
                'class': 'form-control',
            }
        ),
        'link': forms.TextInput(
            attrs={
                'class': 'form-control',
                'placeholder': _('Enter URL...')
            }
        )
    }
)