from ast import With
import re

def clean_text(text):
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    text = text.strip()
    text = re.sub(r'\n+', '\n', text)
    
    return text


from googletrans import Translator

def translate_text_auto(text, dest_lang):
    translator = Translator(service_urls=['translate.google.com'])
    if not isinstance(text, str):
        text = str(text)
    translation = translator.translate(text, dest=dest_lang)
    return translation.text


def restructure_prompt(prompt, lang):

        cleaned_prompt = (prompt)
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