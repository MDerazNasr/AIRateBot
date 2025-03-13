from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from .forms import ComplaintForm, KeywordsForm
from .models import Complaint
from django.conf import settings
import openai

# Initialize OpenAI with your API key
openai.api_key = settings.OPENAI_API_KEY

def index(request):
    """
    Landing page asking the user whether their experience was good or bad.
    """
    return render(request, 'reviews/index.html')

def bad_review(request):
    """
    Displays a complaint/contact form for a bad experience.
    """
    if request.method == 'POST':
        form = ComplaintForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'reviews/complaint_thanks.html')
    else:
        form = ComplaintForm()
    return render(request, 'reviews/bad_review.html', {'form': form})

def good_review(request):
    """
    Displays a keyword selection form for a good experience.
    """
    if request.method == 'POST':
        form = KeywordsForm(request.POST)
        if form.is_valid():
            keywords = form.cleaned_data['keywords']
            # Save keywords in session for use in AI generation
            request.session['selected_keywords'] = keywords
            return redirect('generate_ai_comment')
    else:
        form = KeywordsForm()
    return render(request, 'reviews/good_review.html', {'form': form})

def generate_ai_comment(request):
    """
    Uses the selected keywords to generate an AI comment.
    The user may choose to regenerate the comment or continue to the Google review page.
    """
    keywords = request.session.get('selected_keywords', [])
    generated_comment = None
    error_message = None

    if request.method == 'POST':
        action = request.POST.get('action')
        if action in ['regenerate', 'generate']:
            prompt = f"Generate a review comment based on the following keywords: {', '.join(keywords)}."
            try:
                response = openai.Completion.create(
                    engine="text-davinci-003",  # choose the model you prefer
                    prompt=prompt,
                    max_tokens=60,
                    n=1,
                    stop=None,
                    temperature=0.7,
                )
                generated_comment = response.choices[0].text.strip()
                # Save the generated comment so the user can later copy it
                request.session['generated_comment'] = generated_comment
            except Exception as e:
                error_message = f"Error generating comment: {e}"
        elif action == 'continue':
            # User accepts the comment and is redirected to the Google review page
            return redirect('redirect_google')
    else:
        # On GET, generate the comment automatically based on the keywords
        prompt = f"Generate a review comment based on the following keywords: {', '.join(keywords)}."
        try:
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=60,
                n=1,
                stop=None,
                temperature=0.7,
            )
            generated_comment = response.choices[0].text.strip()
            request.session['generated_comment'] = generated_comment
        except Exception as e:
            error_message = f"Error generating comment: {e}"

    context = {
        'generated_comment': generated_comment,
        'keywords': keywords,
        'error_message': error_message,
    }
    return render(request, 'reviews/generate_ai_comment.html', context)

def redirect_google_review(request):
    """
    Redirects the user to the Google review page of the business.
    """
    # Replace the URL below with your actual Google review page URL
    google_review_url = "https://www.google.com/search?q=your+business+name+google+reviews"
    return HttpResponseRedirect(google_review_url)
