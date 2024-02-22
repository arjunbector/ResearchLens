from ast import With
import re

def clean_text(text):
    text = re.sub(r'\n{1,}', '\n', text)
    text = text.strip()
    
    return text

from googletrans import Translator

def translate_text_auto(text, dest_lang):
    translator = Translator(service_urls=['translate.google.com'])
    translations = []
    for i in range(0, len(text), 5000):  # Google Translate API has a limit of 5000 characters
        part = text[i:i+5000]
        translation = translator.translate(part, dest=dest_lang)
        translations.append(translation.text)
    return ' '.join(translations)

def restructure_prompt(prompt, lang):

        cleaned_prompt = clean_text(prompt)
        translated_prompt = translate_text_auto(cleaned_prompt, lang)
        return translated_prompt

    
    

def wit_response(prompt, lang):
    cleaned_prompt = clean_text(prompt)
    translated_prompt = translate_text_auto(cleaned_prompt, lang)
    
    # Replace with your Wit.ai access token
    access_token = "YOUR_WIT_AI_ACCESS_TOKEN"
    client = With(access_token)
    response = client.message(translated_prompt)
    
    return response