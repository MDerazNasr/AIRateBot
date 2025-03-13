from django import forms
from .models import Complaint

class ComplaintForm(forms.ModelForm):
    class Meta:
        model = Complaint
        fields = ['name', 'email', 'complaint']

class KeywordsForm(forms.Form):
    KEYWORD_CHOICES = [
        ('friendly', 'Friendly'),
        ('efficient', 'Efficient'),
        ('affordable', 'Affordable'),
        ('high_quality', 'High Quality'),
        ('poor_service', 'Poor Service'),
        ('unprofessional', 'Unprofessional'),
        ('outstanding', 'Outstanding'),
        ('clean', 'Clean'),
        ('slow', 'Slow'),
        ('innovative', 'Innovative'),
    ]
    keywords = forms.MultipleChoiceField(
        choices=KEYWORD_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=True
    )
